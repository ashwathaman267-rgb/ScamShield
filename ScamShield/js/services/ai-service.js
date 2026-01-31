// AI Service for Scam Detection
// This uses Google's Gemini API and other safety APIs for analysis

class AIService {
    constructor() {
        this.config = window.CONFIG || {};
        this.provider = this.config.AI_PROVIDER || 'google';
        this.baseUrl = this.config.AI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/models';
    }

    async analyze(type, data) {
        try {
            // First, get External API data if applicable
            let externalData = null;
            if (type === 'url' && this.config.SAFE_BROWSING_API_KEY) {
                externalData = await this.checkSafeBrowsing(data);
            } else if (type === 'phone' && this.config.NUMVERIFY_API_KEY) {
                externalData = await this.checkNumverify(data);
            } else if (type === 'upi' && this.config.SETU_CLIENT_ID && this.config.SETU_CLIENT_SECRET) {
                externalData = await this.checkSetuUPI(data);
            }

            // Now call Gemini with the input + external data for context
            if (!this.config.GEMINI_API_KEY || this.config.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
                console.warn('Gemini API key not found, using fallback analysis.');
                return this.fallbackAnalysis(type, data);
            }

            const model = this.config.GEMINI_MODEL || (this.provider === 'google' ? 'gemini-flash-latest' : 'gemini-2.0-pro-exp-02-05');
            let url, body, headers;

            if (this.provider === 'google') {
                url = `${this.baseUrl}/${model}:generateContent?key=${this.config.GEMINI_API_KEY}`;
                headers = { 'Content-Type': 'application/json' };
                
                let contents;
                if (type === 'image') {
                    const base64Data = await this.fileToText(data);
                    contents = [{
                        parts: [
                            { text: this.buildPrompt(type) },
                            {
                                inline_data: {
                                    mime_type: data.type,
                                    data: base64Data.split(',')[1]
                                }
                            }
                        ]
                    }];
                } else {
                    contents = [{
                        parts: [{ text: this.buildPrompt(type, data, externalData) }]
                    }];
                }
                body = JSON.stringify({
                    contents: contents,
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 1024,
                        response_mime_type: "application/json"
                    }
                });
            } else {
                // OpenAI compatible format (aimlapi)
                url = `${this.baseUrl}/chat/completions`;
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.GEMINI_API_KEY}`
                };

                const messages = [{
                    role: 'user',
                    content: this.buildPrompt(type, data, externalData)
                }];

                // Note: Image support differs in OpenAI format, but for now focusing on Text/URL/UPI
                body = JSON.stringify({
                    model: model,
                    messages: messages,
                    temperature: 0.3,
                    response_format: { type: "json_object" }
                });
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Gemini API Error details:', errorData);
                throw new Error(errorData.error?.message || 'API request failed');
            }

            const result = await response.json();
            return this.parseAIResponse(result);

        } catch (error) {
            console.error('AI Analysis error:', error);
            window.toast.error('AI Analysis failed. Using local heuristic scan.');
            return this.fallbackAnalysis(type, data);
        }
    }

    async checkSafeBrowsing(url) {
        try {
            const endpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${this.config.SAFE_BROWSING_API_KEY}`;
            const body = {
                client: { clientId: "scamshield", clientVersion: "1.0.0" },
                threatInfo: {
                    threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                    platformTypes: ["ANY_PLATFORM"],
                    threatEntryTypes: ["URL"],
                    threatEntries: [{ url: url }]
                }
            };
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify(body)
            });
            const data = await response.json();
            return data.matches ? { status: "unsafe", type: data.matches[0].threatType } : { status: "safe" };
        } catch (e) {
            console.error('Safe Browsing Error:', e);
            return null;
        }
    }

    async checkNumverify(phone) {
        try {
            const cleaned = phone.replace(/\D/g, '');
            const endpoint = `http://apilayer.net/api/validate?access_key=${this.config.NUMVERIFY_API_KEY}&number=${cleaned}`;
            const response = await fetch(endpoint);
            return await response.json();
        } catch (e) {
            console.error('Numverify Error:', e);
            return null;
        }
    }

    async getSetuToken() {
        try {
            const response = await fetch('/api/proxy/setu/auth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientID: this.config.SETU_CLIENT_ID,
                    secret: this.config.SETU_CLIENT_SECRET
                })
            });
            const data = await response.json();
            return data.token;
        } catch (e) {
            console.error('Setu Auth Error:', e);
            return null;
        }
    }

    async checkSetuUPI(upiData) {
        try {
            const token = await this.getSetuToken();
            if (!token) return null;

            // If it's a 12-digit UTR
            if (/^\d{12}$/.test(upiData)) {
                const response = await fetch('/api/proxy/setu/bifrost/collect/reports', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        filters: { utr: upiData }
                    })
                });
                const data = await response.json();
                return { type: 'utr', status: data.data?.length > 0 ? 'found' : 'not_found', details: data.data?.[0] };
            }
            
            // For VPA validation, Setu uses a different endpoint usually, but we can return basic check
            return { type: 'vpa', info: 'Setu API configured for UTR checks' };
        } catch (e) {
            console.error('Setu UPI Check Error:', e);
            return null;
        }
    }

    async fileToText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    buildPrompt(type, data, externalData) {
        const baseInstructions = `You are a high-level security expert specializing in scam detection and fraud prevention. 
        Your task is to analyze the provided input and determine if it's a scam.
        
        REQUIRED JSON STRUCTURE:
        {
            "threat_level": "safe" | "low" | "medium" | "high" | "critical",
            "confidence": 0-100,
            "details": "string explaining exactly WHY this is or isn't a scam",
            "recommendations": ["string", "string"]
        }`;

        const externalContext = externalData ? `\nEXTRA DATA FROM SECURITY APIs: ${JSON.stringify(externalData)}` : '';

        const prompts = {
            url: `${baseInstructions}\n\nAnalyze this URL: "${data}"${externalContext}
            Looking for:
            1. Typosquatting/Homoglyphs: Is it pretending to be a famous brand (e.g., g00gle.com instead of google.com)?
            2. Domain age indicators (if known): Is it a new or suspicious TLD like .xyz, .top, .app?
            3. Phishing patterns: Does the path contain keywords like "verify", "account", "login" following a hyphen?
            4. Unnecessary redirects or masked links.
            Provide a deep security assessment.`,
            
            text: `${baseInstructions}\n\nAnalyze this message: "${data}"
            Looking for:
            1. Social Engineering: Urgency, threats, or enticing rewards.
            2. Authority spoofing: Pretending to be a bank, government agency, or tech support.
            3. Suspicious requests: Asking for OTPs, passwords, or gift cards.
            4. Poor grammar/spelling combined with urgency.`,
            
            phone: `${baseInstructions}\n\nAnalyze this phone number: "${data}"${externalContext}
            Looking for:
            1. VOIP/Virtual patterns often used by scammers.
            2. Premium rate numbers.
            3. International mismatches (e.g., a "local" government calling from a +234 number).
            4. Known scam prefixes.`,
            
            upi: `${baseInstructions}\n\nAnalyze this UPI credential: "${data}"
            Looking for:
            1. UTR Structure: Is it a valid 12-digit numeric sequence? Does it have a realistic date prefix?
            2. VPA Red Flags: Does the handle look like a spoof (e.g., "bank-support@ybl") or use suspicious keywords?
            3. Common Scam IDs: Check for known fraudulent UPI IDs or sequential UTRs like "123456789012".
            4. Context: Does it match standard Indian payment ecosystem patterns?`,

            image: `${baseInstructions}\n\nAnalyze this screenshot for scam indicators. 
            Look for:
            1. Fake UI elements: Buttons that don't look native, deceptive overlays.
            2. Fraudulent text: Lottery wins, account suspension notices.
            3. Suspicious QR codes.
            4. Branding inconsistencies.`
        };

        return prompts[type] || prompts.text;
    }

    parseAIResponse(apiResponse) {
        try {
            let text;
            if (this.provider === 'google') {
                text = apiResponse.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            } else {
                // OpenAI / AIMLAPI format
                text = apiResponse.choices?.[0]?.message?.content?.trim();
            }
            
            if (!text) throw new Error('Empty response from AI');

            // Handle common markdown wrapping if it occurs
            if (text.startsWith('```')) {
                text = text.replace(/^```(json)?/, '').replace(/```$/, '').trim();
            }

            const result = JSON.parse(text);
            
            return {
                threat_level: result.threat_level || 'medium',
                confidence: result.confidence || 75,
                details: result.details || 'Analysis complete.',
                recommendations: result.recommendations || ['Stay vigilant.']
            };
        } catch (error) {
            console.error('AI Parse error:', error);
            console.log('Attempting to extract JSON from raw text:', apiResponse.candidates?.[0]?.content?.parts?.[0]?.text);
            
            // Final attempt: extract anything that looks like a JSON object
            try {
                let rawText;
                if (this.provider === 'google') {
                    rawText = apiResponse.candidates?.[0]?.content?.parts?.[0]?.text;
                } else {
                    rawText = apiResponse.choices?.[0]?.message?.content;
                }

                if (!rawText) return this.fallbackAnalysis(type, 'Unparseable response');

                const jsonMatch = rawText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const result = JSON.parse(jsonMatch[0]);
                    return {
                        threat_level: result.threat_level || 'medium',
                        confidence: result.confidence || 75,
                        details: result.details || 'Analysis complete (recovered from malformed response).',
                        recommendations: result.recommendations || ['Stay vigilant.']
                    };
                }
            } catch (e) {
                console.error('Final extraction attempt failed:', e);
            }

            return this.fallbackAnalysis('text', 'AI returned malformed or unparseable response');
        }
    }

    fallbackAnalysis(type, data) {
        const dataStr = typeof data === 'string' ? data : '';
        let threatLevel = 'safe';
        let confidence = 70;
        const details = [];

        if (type === 'url' && window.validators?.isSuspiciousURL(dataStr)) {
            threatLevel = 'high';
            confidence = 85;
            details.push('URL contains suspicious patterns or matches typosquatting signatures');
        } else if (type === 'text' && window.validators?.isSuspiciousText(dataStr)) {
            threatLevel = 'high';
            confidence = 80;
            details.push('Message contains red flags common in scam attempts');
        } else if (type === 'phone') {
            const isSuspicious = window.validators?.isSuspiciousPhone?.(dataStr);
            if (isSuspicious) {
                threatLevel = 'high';
                confidence = 85;
                details.push('Phone number matches known scam prefix or suspicious VOIP pattern');
            } else if (!window.validators?.isValidPhone(dataStr)) {
                threatLevel = 'medium';
                confidence = 60;
                details.push('Phone number format is invalid or unreachable');
            }
        } else if (type === 'upi') {
            const isSuspiciousUTR = window.validators?.isSuspiciousUTR?.(dataStr);
            const isValidVPA = window.validators?.isValidUPIID?.(dataStr);
            const isValidUTR = window.validators?.isValidUTR?.(dataStr);

            if (isSuspiciousUTR) {
                threatLevel = 'high';
                confidence = 90;
                details.push('UPI Transaction ID (UTR) matches signatures of fake generators or sequential input');
            } else if (!isValidVPA && !isValidUTR) {
                threatLevel = 'medium';
                confidence = 70;
                details.push('Input format does not match a valid UPI ID or 12-digit UTR');
            }
        }

        if (details.length === 0) {
            details.push('No obvious threat indicators detected by local heuristic scan.');
        }

        return {
            threat_level: threatLevel,
            confidence: confidence,
            details: details.join('. '),
            recommendations: [
                'Verify sender identity through official channels',
                'Never click suspicious links',
                'Do not share personal info or passwords',
                'Be cautious of urgency or emotional manipulation'
            ]
        };
    }
}

// Initialize AI service
window.aiService = new AIService();
