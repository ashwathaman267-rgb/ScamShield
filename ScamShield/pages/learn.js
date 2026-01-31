// Learn Page Component

// Define switchTab globally so it's accessible from onclick events
window.switchTab = function (tabId) {
    // Reset Buttons
    document.querySelectorAll('.stat-tab').forEach(b => {
        b.style.background = 'transparent';
        b.style.border = '1px solid var(--border-color)';
        b.style.color = 'var(--text-secondary)';
    });

    // Set Active Button - find the button that was clicked
    // Since we can't easily get 'event.target' reliably in inline handlers sometimes, we use querySelector
    // But actually, event.target works. Let's make it robust.
    const activeBtn = document.querySelector(`button[onclick="switchTab('${tabId}')"]`);
    if (activeBtn) {
        activeBtn.style.background = 'rgba(99, 102, 241, 0.2)';
        activeBtn.style.border = '1px solid var(--primary)';
        activeBtn.style.color = 'white';
    }

    // Hide all contents
    document.querySelectorAll('.stat-content').forEach(c => c.style.display = 'none');
    // Show target
    const target = document.getElementById('tab-content-' + tabId);
    if (target) {
        target.style.display = 'block';
    }
};

function renderLearnPage() {
    const main = document.getElementById('main-content');
    if (!main) return;

    main.innerHTML = `
        <div class="learn-page">
            <div class="container">
                <header class="page-header">
                    <h1>Learn & Stay Protected</h1>
                    <p>Educational resources to help you recognize and avoid scams</p>
                </header>

                <!-- Data Analysis Section -->
                <div class="glass" style="padding: 2rem; margin-bottom: 3rem; border-radius: 20px;">
                    <h2 class="gradient-text" style="text-align: center; margin-bottom: 2rem;">Cyber Crime Distribution Analysis</h2>
                    
                    <div class="analysis-layout" style="display: flex; flex-wrap: wrap; gap: 3rem; align-items: center; justify-content: center;">
                        <!-- Chart Side -->
                        <div class="chart-side" style="flex: 1; min-width: 300px; display: flex; flex-direction: column; align-items: center;">
                            <!-- Explicit Style for Visibility -->
                            <div id="learn-chart-container" style="height: 350px; width: 350px; position: relative; display: block;"></div>
                        </div>

                        <!-- Tabs Side -->
                        <div class="tabs-side" style="flex: 1; min-width: 300px;">
                            <div class="stats-tabs">
                                <div class="tab-header" style="display: flex; gap: 1rem; margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 5px;">
                                    <button class="stat-tab active" onclick="switchTab('volume')" style="padding: 0.75rem 1.5rem; background: rgba(99, 102, 241, 0.2); border: 1px solid var(--primary); color: white; border-radius: 50px; cursor: pointer;">Volume</button>
                                    <button class="stat-tab" onclick="switchTab('value')" style="padding: 0.75rem 1.5rem; background: transparent; border: 1px solid var(--border-color); color: var(--text-secondary); border-radius: 50px; cursor: pointer;">Value</button>
                                    <button class="stat-tab" onclick="switchTab('risk')" style="padding: 0.75rem 1.5rem; background: transparent; border: 1px solid var(--border-color); color: var(--text-secondary); border-radius: 50px; cursor: pointer;">Risk</button>
                                </div>

                                <div id="tab-content-volume" class="stat-content active-content">
                                    <h3 style="font-size: 3.5rem; color: var(--warning); margin: 0;">28%</h3>
                                    <h4 style="margin: 0.5rem 0 1rem;">Increase in Fraud Volume</h4>
                                    <p style="color: var(--text-secondary); line-height: 1.6;">Reports indicate a sharp 28% rise in the sheer number of cyber fraud incidents compared to the previous fiscal year.</p>
                                </div>

                                <div id="tab-content-value" class="stat-content" style="display: none;">
                                    <h3 style="font-size: 3.5rem; color: var(--danger); margin: 0;">159%</h3>
                                    <h4 style="margin: 0.5rem 0 1rem;">Increase in Fraud Value</h4>
                                    <p style="color: var(--text-secondary); line-height: 1.6;">While volume grew by 28%, the actual money lost skyrocketed by 159%, indicating scammers are targeting higher-value transactions.</p>
                                </div>

                                <div id="tab-content-risk" class="stat-content" style="display: none;">
                                    <h3 style="font-size: 3.5rem; color: var(--primary); margin: 0;">76%</h3>
                                    <h4 style="margin: 0.5rem 0 1rem;">Top 50 Accounts</h4>
                                    <p style="color: var(--text-secondary); line-height: 1.6;">Concentration Risk: 76% of the total fraud value is held within just the top 50 compromised accounts/cases.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="learn-grid">
                    <div class="learn-card glass">
                        <div class="learn-icon" style="background: var(--gradient-primary)">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </div>
                        <h3>What is Phishing?</h3>
                        <p>Phishing is a type of cyber attack where scammers impersonate legitimate organizations to steal your personal information.</p>
                        <div class="warning-signs">
                            <h4>Warning Signs:</h4>
                            <ul>
                                <li>Urgent or threatening language</li>
                                <li>Generic greetings (e.g., "Dear Customer")</li>
                                <li>Suspicious email addresses or URLs</li>
                                <li>Unexpected attachments</li>
                            </ul>
                        </div>
                    </div>

                    <div class="learn-card glass">
                        <div class="learn-icon" style="background: var(--gradient-success)">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                <path d="M9 12l2 2 4-4"></path>
                            </svg>
                        </div>
                        <h3>How to Stay Safe</h3>
                        <p>Follow these best practices to protect yourself from online scams:</p>
                        <ul class="tips-list">
                            <li>Always verify the sender's identity</li>
                            <li>Never share passwords or sensitive info via email</li>
                            <li>Use strong, unique passwords for each account</li>
                            <li>Enable two-factor authentication</li>
                            <li>Keep software and devices updated</li>
                            <li>Trust your instincts - if it feels wrong, it probably is</li>
                        </ul>
                    </div>

                    <div class="learn-card glass">
                        <div class="learn-icon" style="background: var(--gradient-danger)">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </div>
                        <h3>India's Cyber Crime Helpline</h3>
                        <p>If you have lost money to a cyber fraud, immediate action is crucial:</p>
                        <div class="warning-signs">
                            <h4 style="color: var(--danger); font-size: 2rem; margin: 1rem 0;">Dial 1930</h4>
                            <p><strong>National Cyber Crime Reporting Portal</strong></p>
                            <ul>
                                <li>Call 1930 immediately (formerly 155260)</li>
                                <li>Register complaint at <a href="#" style="color: var(--primary)">cybercrime.gov.in</a></li>
                                <li>Contact your bank to freeze the transaction</li>
                            </ul>
                        </div>
                    </div>

                    <div class="learn-card glass">
                        <div class="learn-icon" style="background: var(--gradient-warning)">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <h3>Reporting Checklist</h3>
                        <p>When reporting a scam to 1930 or Police, keep these ready:</p>
                        <ol class="steps-list">
                            <li>Transaction ID / UTR Number</li>
                            <li>Screenshot of payment & chat</li>
                            <li>Scammer's Phone Number / UPI ID</li>
                            <li>Bank Statement showing debit</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize Chart on Learn Page
    setTimeout(() => {
        const chartElement = document.getElementById('learn-chart-container');
        const isChartLibDefined = typeof InteractivePieChart !== 'undefined';

        console.log("Debug Chart Init:", {
            elementExists: !!chartElement,
            libDefined: isChartLibDefined,
            windowLib: !!window.InteractivePieChart
        });

        if (isChartLibDefined && chartElement) {
            chartElement.innerHTML = '';
            try {
                new InteractivePieChart('learn-chart-container', [
                    { label: 'Phishing', value: 35, description: 'Fake emails/SMS leading to data theft.', tactics: 'Urgency, Fake Links', sources: [{ title: 'CII Report', pub: '2021' }] },
                    { label: 'UPI Fraud', value: 25, description: 'QR Code and PIN scams.', tactics: 'Collect Request, Cashback', sources: [{ title: 'NPCI', pub: '2023' }] },
                    { label: 'Investment', value: 20, description: 'Fake crypto/stock apps.', tactics: 'High Returns, WhatsApp Groups', sources: [{ title: 'Forcepoint', pub: '2022' }] },
                    { label: 'Digi. Arrest', value: 15, description: 'Fake Police video calls.', tactics: 'Fear, Isolation', sources: [{ title: 'MHA', pub: '2024' }] },
                    { label: 'Others', value: 5, description: 'SIM Swap, Sextortion, etc.', tactics: 'Varied', sources: [{ title: 'CERT-In', pub: '2023' }] }
                ], {
                    colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b'], // Vibrant Full Spectrum
                    innerRadius: 0 // Full Pie
                });

                console.log("Colorful Chart Initialized on Learn Page");
            } catch (err) {
                console.error("Critical Chart Error:", err);
                chartElement.innerHTML = `<div style="color:red; p-4">Chart Error: ${err.message}</div>`;
            }
        } else {
            console.error("Chart Init Failed:", {
                libType: typeof InteractivePieChart,
                container: chartElement
            });
            if (chartElement) chartElement.innerHTML = `<div style="color:red; text-align:center; padding:1rem;">Chart Library Failed to Load.<br>Check Console for details.</div>`;

            // Attempt Dynamic Recovery
            console.log("Attempting dynamic script load...");
            const script = document.createElement('script');
            script.src = 'components/interactive-chart.js';
            script.onload = () => {
                console.log("Dynamic Load Success! Retrying init...");
                // Retry init logic with correct colorful data
                if (typeof InteractivePieChart !== 'undefined') {
                    new InteractivePieChart('learn-chart-container', [
                        { label: 'Phishing', value: 35, description: 'Fake emails/SMS leading to data theft.', tactics: 'Urgency, Fake Links', sources: [{ title: 'CII Report', pub: '2021' }] },
                        { label: 'UPI Fraud', value: 25, description: 'QR Code and PIN scams.', tactics: 'Collect Request, Cashback', sources: [{ title: 'NPCI', pub: '2023' }] },
                        { label: 'Investment', value: 20, description: 'Fake crypto/stock apps.', tactics: 'High Returns, WhatsApp Groups', sources: [{ title: 'Forcepoint', pub: '2022' }] },
                        { label: 'Digi. Arrest', value: 15, description: 'Fake Police video calls.', tactics: 'Fear, Isolation', sources: [{ title: 'MHA', pub: '2024' }] },
                        { label: 'Others', value: 5, description: 'SIM Swap, Sextortion, etc.', tactics: 'Varied', sources: [{ title: 'CERT-In', pub: '2023' }] }
                    ], {
                        colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b'],
                        innerRadius: 0 // Full Pie
                    });
                }
            };
            document.head.appendChild(script);
        }
    }, 500);
}

const learnStyles = `
.learn-page {
    padding: 2rem 0;
}

.learn-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.learn-card {
    padding: 2rem;
    border-radius: var(--radius-xl);
}

.learn-icon {
    width: 64px;
    height: 64px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-lg);
}

.learn-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.learn-card p {
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.warning-signs h4,
.learn-card h4 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
}

.warning-signs ul,
.tips-list,
.steps-list {
    padding-left: 1.5rem;
}

.warning-signs li,
.tips-list li,
.steps-list li {
    margin-bottom: 0.75rem;
    color: var(--text-secondary);
    line-height: 1.6;
}

.accordion-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.accordion-item {
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    border-left: 4px solid var(--primary);
}

.accordion-item strong {
    color: var(--text-primary);
    display: block;
    margin-bottom: 0.25rem;
}

@media (max-width: 768px) {
    .learn-grid {
        grid-template-columns: 1fr;
    }
    .analysis-layout {
        flex-direction: column;
    }
}
`;

if (!document.getElementById('learn-styles')) {
    const style = document.createElement('style');
    style.id = 'learn-styles';
    style.textContent = learnStyles;
    document.head.appendChild(style);
}

window.renderLearnPage = renderLearnPage;
