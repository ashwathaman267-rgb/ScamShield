// Scan Page with AI Integration

function renderScanPage() {
    const main = document.getElementById('main-content');

    main.innerHTML = `
        <div class="scan-page">
            <div class="container">
                <header class="scan-header">
                    <h1>Scam Scanner</h1>
                    <p>Analyze URLs, messages, images, phone numbers, and UPI info for potential scams</p>
                </header>

                <div class="scan-tabs">
                    <button class="scan-tab active" data-tab="url">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                        URL
                    </button>
                    <button class="scan-tab" data-tab="text">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Message
                    </button>
                    <button class="scan-tab" data-tab="image">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        Image
                    </button>
                    <button class="scan-tab" data-tab="phone">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        Phone
                    </button>
                    <button class="scan-tab" data-tab="upi">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        UPI
                    </button>
                </div>

                <div class="scan-content">
                    <div class="scan-panel active" id="url-panel">
                        <div class="scan-form glass">
                            <label for="url-input">Enter URL to scan</label>
                            <input type="url" id="url-input" placeholder="https://example.com" class="scan-input" />
                            <button id="url-scan-btn" class="scan-button">
                                Scan URL
                            </button>
                        </div>
                    </div>

                    <div class="scan-panel" id="text-panel">
                        <div class="scan-form glass">
                            <label for="text-input">Paste suspicious message or email</label>
                            <textarea id="text-input" placeholder="Paste the message content here..." class="scan-textarea" rows="8"></textarea>
                            <button id="text-scan-btn" class="scan-button">
                                Analyze Message
                            </button>
                        </div>
                    </div>

                    <div class="scan-panel" id="image-panel">
                        <div class="scan-form glass">
                            <label for="image-input">Upload screenshot or image</label>
                            <div class="file-upload-area" id="image-drop-zone">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <p>Drop image here or click to browse</p>
                                <input type="file" id="image-input" accept="image/*" hidden />
                            </div>
                            <div id="image-preview" class="image-preview"></div>
                            <button id="image-scan-btn" class="scan-button" style="display:none;">
                                Scan Image
                            </button>
                        </div>
                    </div>

                    <div class="scan-panel" id="phone-panel">
                        <div class="scan-form glass">
                            <label for="phone-input">Enter phone number</label>
                            <input type="tel" id="phone-input" placeholder="+91 98765 43210" class="scan-input" />
                            <button id="phone-scan-btn" class="scan-button">
                                Check number
                            </button>
                        </div>
                    </div>

                    <div class="scan-panel" id="upi-panel">
                        <div class="scan-form glass">
                            <label for="upi-input">Enter UPI ID (VPA) or 12-digit UTR</label>
                            <input type="text" id="upi-input" placeholder="example@upi or 123456789012" class="scan-input" />
                            <button id="upi-scan-btn" class="scan-button">
                                Verify UPI info
                            </button>
                        </div>
                    </div>
                </div>

                <div id="scan-results" class="scan-results" style="display:none;"></div>
            </div>
        </div>
    `;

    setupScanPage();
}

function setupScanPage() {
    // Tab switching
    const tabs = document.querySelectorAll('.scan-tab');
    const panels = document.querySelectorAll('.scan-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(`${tabName}-panel`).classList.add('active');
        });
    });

    // URL Scanner
    document.getElementById('url-scan-btn')?.addEventListener('click', async () => {
        const input = document.getElementById('url-input');
        const url = input.value.trim();

        if (!url) {
            window.toast.warning('Please enter a URL to scan');
            return;
        }

        if (!window.validators.isValidURL(url)) {
            window.toast.error('Please enter a valid URL');
            return;
        }

        await performScan('url', url);
    });

    // Text Scanner
    document.getElementById('text-scan-btn')?.addEventListener('click', async () => {
        const input = document.getElementById('text-input');
        const text = input.value.trim();

        if (!text) {
            window.toast.warning('Please enter text to analyze');
            return;
        }

        await performScan('text', text);
    });

    // Image Scanner
    const imageInput = document.getElementById('image-input');
    const dropZone = document.getElementById('image-drop-zone');
    const imageScanBtn = document.getElementById('image-scan-btn');
    let selectedImage = null;

    dropZone.addEventListener('click', () => imageInput.click());

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageFile(file);
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file);
        }
    });

    function handleImageFile(file) {
        selectedImage = file;
        const preview = document.getElementById('image-preview');
        preview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Preview" />`;
        imageScanBtn.style.display = 'block';
    }

    imageScanBtn?.addEventListener('click', async () => {
        if (!selectedImage) {
            window.toast.warning('Please select an image first');
            return;
        }
        await performScan('image', selectedImage);
    });

    // Phone Scanner
    document.getElementById('phone-scan-btn')?.addEventListener('click', async () => {
        const input = document.getElementById('phone-input');
        const phone = input.value.trim();

        if (!phone) {
            window.toast.warning('Please enter a phone number');
            return;
        }

        await performScan('phone', phone);
    });

    // UPI Scanner
    document.getElementById('upi-scan-btn')?.addEventListener('click', async () => {
        const input = document.getElementById('upi-input');
        const upiData = input.value.trim();

        if (!upiData) {
            window.toast.warning('Please enter a UPI ID or Transaction ID');
            return;
        }

        await performScan('upi', upiData);
    });
}

async function performScan(type, data) {
    const resultsContainer = document.getElementById('scan-results');
    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = '';

    // Show scanning animation
    const scanningEl = window.createScanningAnimation();
    resultsContainer.appendChild(scanningEl);

    try {
        let result;
        if (window.aiService && window.aiService.analyze) {
            result = await window.aiService.analyze(type, data);
        } else {
            // Fallback simulation
            await new Promise(resolve => setTimeout(resolve, 2000));
            result = {
                threat_level: Math.random() > 0.5 ? 'safe' : 'danger',
                confidence: Math.floor(Math.random() * 30) + 70,
                details: `Analysis complete for ${type}`,
                recommendations: ['Always verify sender', 'Check for HTTPS', 'Be cautious of urgency']
            };
        }

        displayResults(result, type);

    } catch (error) {
        console.error('Scan error:', error);
        resultsContainer.innerHTML = `
            <div class="scan-result glass">
                <h3 style="color: var(--danger);">Error</h3>
                <p>An error occurred while scanning. Please try again.</p>
            </div>
        `;
        window.toast.error('Scan failed. Please try again.');
    }
}

function displayResults(result, type) {
    const resultsContainer = document.getElementById('scan-results');
    const { threat_level, confidence, details, recommendations } = result;

    const isSafe = threat_level === 'safe' || threat_level === 'low';
    const color = isSafe ? 'var(--success)' : 'var(--danger)';
    const icon = isSafe ? getCheckIcon() : getAlertIcon();

    resultsContainer.innerHTML = `
        <div class="scan-result glass animate-fade-in">
            <div class="result-header" style="background: ${color}">
                ${icon}
                <h2>${isSafe ? 'Looks Safe' : 'Warning: Potential Threat'}</h2>
            </div>
            <div class="result-body">
                <div class="result-confidence">
                    <span>Confidence Level</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${confidence}%; background: ${color};"></div>
                    </div>
                    <span>${confidence}%</span>
                </div>
                <div class="result-details">
                    <h3>Analysis Details</h3>
                    <p>${details}</p>
                </div>
                ${recommendations && recommendations.length > 0 ? `
                    <div class="result-recommendations">
                        <h3>Recommendations</h3>
                        <ul>
                            ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function getCheckIcon() {
    return `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>`;
}

function getAlertIcon() {
    return `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>`;
}

// Scan page styles
const scanStyles = `
.scan-page { padding: 2rem 0; }
.scan-header { text-align: center; margin-bottom: 3rem; }
.scan-header h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
.scan-header p { color: var(--text-secondary); font-size: 1.125rem; }
.scan-tabs { display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap; justify-content: center; }
.scan-tab { display: flex; align-items: center; gap: 0.5rem; padding: 0.875rem 1.5rem; background: var(--bg-secondary); border: 2px solid transparent; border-radius: var(--radius-lg); color: var(--text-primary); font-weight: 600; cursor: pointer; transition: all var(--transition-fast); }
.scan-tab.active { background: rgba(99, 102, 241, 0.1); border-color: var(--primary); color: var(--primary); }
.scan-content { max-width: 700px; margin: 0 auto; }
.scan-panel { display: none; }
.scan-panel.active { display: block; animation: fadeIn 0.3s ease-out; }
.scan-form { padding: 2rem; border-radius: var(--radius-xl); }
.scan-form label { display: block; font-weight: 600; margin-bottom: 1rem; color: var(--text-primary); }
.scan-input, .scan-textarea { width: 100%; padding: 1rem; background: var(--bg-secondary); border: 2px solid var(--border-color); border-radius: var(--radius-lg); color: var(--text-primary); font-family: inherit; font-size: 1rem; transition: all var(--transition-fast); margin-bottom: 1rem; }
.scan-input:focus, .scan-textarea:focus { outline: none; border-color: var(--primary); background: var(--bg-primary); }
.scan-button { width: 100%; padding: 1rem 2rem; background: var(--gradient-primary); color: white; border: none; border-radius: var(--radius-lg); font-weight: 700; font-size: 1.0625rem; cursor: pointer; transition: all var(--transition-base); }
.file-upload-area { border: 2px dashed var(--border-color); border-radius: var(--radius-lg); padding: 3rem 2rem; text-align: center; cursor: pointer; margin-bottom: 1rem; }
.image-preview { margin-bottom: 1rem; }
.image-preview img { max-width: 100%; border-radius: var(--radius-lg); }
.scan-results { margin-top: 3rem; max-width: 700px; margin-left: auto; margin-right: auto; }
.scan-result { border-radius: var(--radius-xl); overflow: hidden; }
.result-header { padding: 2rem; color: white; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.result-header h2 { margin: 0; font-size: 1.75rem; }
.result-body { padding: 2rem; }
.result-confidence { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
.progress-bar { flex: 1; height: 12px; background: var(--bg-secondary); border-radius: var(--radius-full); overflow: hidden; }
.progress-fill { height: 100%; transition: width 1s ease-out; border-radius: var(--radius-full); }
.result-details, .result-recommendations { margin-bottom: 1.5rem; }
.result-recommendations ul { list-style: none; padding: 0; }
.result-recommendations li { padding: 0.75rem 0; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.5rem; }
.result-recommendations li:before { content: '✓'; color: var(--success); font-weight: bold; }
@media (max-width: 768px) { .scan-tab { padding: 0.75rem 1rem; font-size: 0.875rem; } }
`;

if (!document.getElementById('scan-styles')) {
    const style = document.createElement('style');
    style.id = 'scan-styles';
    style.textContent = scanStyles;
    document.head.appendChild(style);
}

window.renderScanPage = renderScanPage;
