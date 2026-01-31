const fetch = require('node-fetch');

const API_KEY = 'AIzaSyBvBtqkMiMKRCWevX15nJGSOG9nhlPceDM';
const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function listModels() {
    console.log(`Listing available models...`);
    
    try {
        const response = await fetch(URL);

        if (!response.ok) {
            const error = await response.json();
            console.error('API Error:', JSON.stringify(error, null, 2));
            process.exit(1);
        }

        const data = await response.json();
        console.log('Available Models:');
        data.models.forEach(model => {
            console.log(`- ${model.name} (${model.supportedGenerationMethods.join(', ')})`);
        });
    } catch (error) {
        console.error('Fetch Error:', error.message);
        process.exit(1);
    }
}

listModels();
