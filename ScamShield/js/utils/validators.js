// Validation Utilities

const validators = {
    // URL validation
    isValidURL(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    },

    // Email validation
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Phone number validation (basic)
    isValidPhone(phone) {
        // Remove all non-numeric characters
        const cleaned = phone.replace(/\D/g, '');
        // Check if it's between 10-15 digits
        return cleaned.length >= 7 && cleaned.length <= 15;
    },

    // Check for suspicious phone patterns (premium rate, common scam prefixes)
    isSuspiciousPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        
        const suspiciousPrefixes = [
            /^800|888|877|866|855/i, // Toll-free (can be spoofed/used for fake support)
            /^1900|1976/i, // Premium rate lines
            /^447|448/i, // UK mobile/VOIP often used in scams
            /^234|233|229|254/i, // High-risk international prefixes for scams
            /^92|880/i, // Other common scam origin countries
        ];

        // Check for "unusual" lengths or all same digits
        if (/^(\d)\1+$/.test(cleaned)) return true; // e.g. 1111111111
        
        return suspiciousPrefixes.some(prefix => prefix.test(cleaned));
    },

    // Check for suspicious patterns in URLs
    isSuspiciousURL(url) {
        const suspiciousPatterns = [
            /bit\.ly|tinyurl|goo\.gl|t\.co|ow\.ly/i, // URL shorteners
            /@/i, // @ symbol in URL (phishing technique)
            /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i, // IP address instead of domain
            /-(login|verify|update|secure|account|support|help|bank|wallet)/i, // Suspicious keywords in domain
            /\.(zip|mov|app|ink|link|xyz|top|site|online)$/i, // Risky/Uncommon TLDs for scams
        ];

        let suspicious = suspiciousPatterns.some(pattern => pattern.test(url));
        if (this.checkTyposquatting(url)) suspicious = true;

        return suspicious;
    },

    // Check for typosquatting (subtle spelling variations of famous brands)
    checkTyposquatting(url) {
        try {
            const domain = new URL(url).hostname.toLowerCase();
            const topDomains = [
                'google.com', 'amazon.com', 'microsoft.com', 'apple.com', 'facebook.com',
                'netflix.com', 'paypal.com', 'youtube.com', 'instagram.com', 'linkedin.com',
                'twitter.com', 'binance.com', 'coinbase.com', 'blockchain.com', 'chase.com',
                'wellsfargo.com', 'bankofamerica.com', 'hsbc.com', 'icloud.com', 'outlook.com'
            ];

            for (const top of topDomains) {
                const brand = top.split('.')[0];
                // Check if brand name is in the domain but not exactly the top domain
                if (domain.includes(brand) && domain !== top) {
                    // Check if it's a subdomain (allowed, e.g. login.google.com) or a spoof
                    const parts = domain.split('.');
                    const mainDomain = parts.slice(-2).join('.');
                    if (mainDomain !== top && domain.includes(brand)) {
                        return true; // Likely a spoof like "google-security.com" or "g0ogle.com"
                    }
                }

                // Check for common visual substitutions (homoglyphs/typos)
                const spoofRegexPattern = brand.replace(/o/g, '[o0d]').replace(/a/g, '[a4]').replace(/i/g, '[i1l!]').replace(/l/g, '[l1i!]').replace(/e/g, '[e3]');
                const spoofRegex = new RegExp(`^${spoofRegexPattern}$`, 'i');
                const domainParts = domain.split('.');
                const secondLevelDomain = domainParts[domainParts.length - 2];
                if (spoofRegex.test(secondLevelDomain) && domain !== top) {
                    return true;
                }
            }
        } catch {
            return false;
        }
        return false;
    },

    // Check for suspicious keywords in text
    isSuspiciousText(text) {
        const suspiciousKeywords = [
            /urgent|immediate action required|verify your account/i,
            /suspended|locked|unusual activity|unauthorized access/i,
            /click here|download|update payment|refresh billing/i,
            /congratulations|you've won|claim your prize|lucky winner/i,
            /IRS|refund|tax return|government agency/i,
            /bitcoin|cryptocurrency|investment opportunity|guaranteed returns/i,
            /wire transfer|western union|gift card|zelle/i,
            /otp|verification code|one-time password/i,
        ];

        return suspiciousKeywords.some(pattern => pattern.test(text));
    },

    // UPI ID (VPA) validation
    isValidUPIID(id) {
        const regex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
        return regex.test(id);
    },

    // UPI Transaction ID (UTR) validation
    isValidUTR(id) {
        // Typically 12 digits numeric
        return /^\d{12}$/.test(id);
    },

    // Check for suspicious UTR patterns
    isSuspiciousUTR(id) {
        const cleaned = id.replace(/\D/g, '');
        if (cleaned.length !== 12) return true;

        const suspiciousPatterns = [
            /^0{12}$/, // All zeros
            /^123456789/, // Sequential prefix
            /^(\d)\1{11}$/, // Repeated digits (e.g., 999999999999)
        ];

        return suspiciousPatterns.some(pattern => pattern.test(cleaned));
    },

    // Sanitize input
    sanitizeInput(input) {
        return input
            .trim()
            .replace(/[<>]/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+=/gi, '');
    },

    // Check password strength
    checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        if (strength < 2) return 'weak';
        if (strength < 4) return 'medium';
        return 'strong';
    },

    // Validate required fields
    validateRequired(value) {
        return value !== null && value !== undefined && value.trim() !== '';
    },

    // Validate min length
    validateMinLength(value, min) {
        return value.length >= min;
    },

    // Validate max length
    validateMaxLength(value, max) {
        return value.length <= max;
    },
};

// Export validators
window.validators = validators;
