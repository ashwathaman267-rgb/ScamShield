// Dashboard Page

function renderDashboardPage() {
    const main = document.getElementById('main-content');

    main.innerHTML = `
        <div class="dashboard-page">
            <div class="container">
                <header class="page-header">
                    <h1>Security Dashboard</h1>
                    <p>Monitor your scanning history and security metrics</p>
                </header>

                <div class="dashboard-grid">
                    <div class="dashboard-card glass">
                        <h3>Safety Score</h3>
                        <div class="score-display">
                            <div class="score-circle">
                                <svg width="150" height="150">
                                    <circle cx="75" cy="75" r="60" fill="none" stroke="var(--bg-tertiary)" stroke-width="12"/>
                                    <circle cx="75" cy="75" r="60" fill="none" stroke="url(#gradient)" stroke-width="12" 
                                        stroke-dasharray="377" stroke-dashoffset="95" stroke-linecap="round" transform="rotate(-90 75 75)"/>
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style="stop-color:var(--primary)"/>
                                            <stop offset="100%" style="stop-color:var(--accent)"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div class="score-text">
                                    <span class="score-number">85</span>
                                    <span class="score-label">Good</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-card glass">
                        <h3>Recent Scans</h3>
                        <div class="scan-list">
                            <div class="scan-item">
                                <div class="scan-icon safe">✓</div>
                                <div class="scan-details">
                                    <p class="scan-url">google.com</p>
                                    <p class="scan-time">2 hours ago</p>
                                </div>
                            </div>
                            <div class="scan-item">
                                <div class="scan-icon dangerous">!</div>
                                <div class="scan-details">
                                    <p class="scan-url">suspicious-site.xyz</p>
                                    <p class="scan-time">5 hours ago</p>
                                </div>
                            </div>
                            <div class="scan-item">
                                <div class="scan-icon safe">✓</div>
                                <div class="scan-details">
                                    <p class="scan-url">amazon.com</p>
                                    <p class="scan-time">Yesterday</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-card glass">
                        <h3>Threat Distribution</h3>
                        <canvas id="threat-chart" width="300" height="200"></canvas>
                    </div>

                    <div class="dashboard-card glass">
                        <h3>Statistics</h3>
                        <div class="stats-list">
                            <div class="stat-item">
                                <span class="stat-label">Total Scans</span>
                                <span class="stat-value">247</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Threats Blocked</span>
                                <span class="stat-value">18</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Safe Sites</span>
                                <span class="stat-value">229</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Draw threat chart
    setTimeout(() => {
        const canvas = document.getElementById('threat-chart');
        if (canvas && window.createChart) {
            window.createChart(canvas, [229, 12, 6], {
                type: 'doughnut',
                colors: ['#10b981', '#f59e0b', '#ef4444'],
                labels: ['Safe', 'Suspicious', 'Dangerous']
            });
        }
    }, 100);
}

const dashboardStyles = `
.dashboard-page {
    padding: 2rem 0;
}

.page-header {
    margin-bottom: 3rem;
}

.page-header h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
}

.page-header p {
    color: var(--text-secondary);
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.dashboard-card {
    padding: 2rem;
    border-radius: var(--radius-xl);
}

.dashboard-card h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
}

.score-display {
    display: flex;
    justify-content: center;
}

.score-circle {
    position: relative;
    display: inline-block;
}

.score-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.score-number {
    display: block;
    font-size: 2.5rem;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.score-label {
    display: block;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 600;
}

.scan-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.scan-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
}

.scan-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
}

.scan-icon.safe {
    background: var(--success);
}

.scan-icon.dangerous {
    background: var(--danger);
}

.scan-details {
    flex: 1;
}

.scan-url {
    font-weight: 600;
    margin: 0;
    font-size: 0.875rem;
}

.scan-time {
    margin: 0;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.stats-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
}

.stat-label {
    color: var(--text-secondary);
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
`;

if (!document.getElementById('dashboard-styles')) {
    const style = document.createElement('style');
    style.id = 'dashboard-styles';
    style.textContent = dashboardStyles;
    document.head.appendChild(style);
}

window.renderDashboardPage = renderDashboardPage;
