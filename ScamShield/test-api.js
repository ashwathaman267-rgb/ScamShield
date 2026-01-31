const fetch = require('node-fetch');

const API_KEY = 'AIzaSyBvBtqkMiMKRCWevX15nJGSOG9nhlPceDM';
const MODEL = 'gemini-2.0-flash';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

async function testApi() {
    console.log(`Testing Gemini API with model: ${MODEL}...`);
    
    const body = {
        contents: [{
            parts: [{ text: "Hello, this is a test from ScamShield. Are you working?" }]
        }],
        generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 100
        }
    };

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('API Error:', JSON.stringify(error, null, 2));
            process.exit(1);
        }

        const data = await response.json();
        console.log('API Response received successfully!');
        console.log('Response content:', data.candidates[0].content.parts[0].text);
    } catch (error) {
        console.error('Fetch Error:', error.message);
        process.exit(1);
    }
}

testApi();
