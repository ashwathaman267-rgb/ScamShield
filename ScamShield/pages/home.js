// Home Page Component
function renderHomePage() {
    const main = document.getElementById('main-content');
    if (!main) return;

    main.innerHTML = `
        <div class="home-page animate-fade-in">
            <!-- Hero Section -->
            <section class="hero-section">
                <div class="container">
                    <div class="hero-content">
                        <div class="hero-badge animate-fade-in-delayed">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5"></path>
                                <path d="M2 12l10 5 10-5"></path>
                            </svg>
                            AI-Powered Protection
                        </div>
                        <h1 class="hero-title animate-fade-in">
                            Your Digital <span class="gradient-text">Guardian</span><br/>
                            Against Online Scams
                        </h1>
                        <p class="hero-description animate-fade-in-delayed">
                            Stay safe with real-time AI-powered scam detection. Protect yourself from phishing, fraud, and malicious content before it's too late.
                        </p>
                        <div class="hero-actions animate-fade-in-delayed">
                            <a href="/scan" data-link class="hero-btn-primary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                                    <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                                    <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                                    <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                                </svg>
                                Start Scanning Now
                            </a>
                            <a href="/learn" data-link class="hero-btn-secondary">
                                View Scam Database
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </a>
                        </div>
                        
                        <!-- Educational Chips -->
                        <div class="scam-types-preview animate-fade-in-delayed">
                            <p class="preview-label">Detects Common Indian Scams:</p>
                            <div class="chip-container">
                                <span class="scam-chip">🚫 UPI Fraud</span>
                                <span class="scam-chip">📱 Paytm KYC</span>
                                <span class="scam-chip">⚡ Electricity Bill</span>
                                <span class="scam-chip">👮 Fake Police/Customs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Statistics Section -->
            <section class="stats-section animate-fade-in">
                <div class="container">
                    <div class="section-header">
                        <h2>Scam Awareness Report 2024</h2>
                        <p>Real-time analysis of prevailing cyber threats in India</p>
                    </div>
                    
                    <div class="stats-grid-layout">
                        <!-- Black Box with SAS Logo -->
                        <div class="logo-wrapper glass" style="
                            padding: 2rem; 
                            border-radius: 20px; 
                            height: 400px; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center;
                            background: black;
                            border: 1px solid rgba(255,255,255,0.1);
                        ">
                            <img src="/assets/images/sas-logo.png" alt="SAS Logo" style="max-width: 80%; max-height: 80%; filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));">
                        </div>
                        
                        <div class="stats-info">
                            <h3 class="gradient-text">India's Cyber Threat Landscape</h3>
                            <p>Recent data from the National Cyber Crime Reporting Portal (1930) indicates a surge in financial frauds.</p>
                            
                            <div class="stat-highlight glass highlight-primary animate-fade-in-delayed">
                                <h4>₹7,000 Cr+</h4>
                                <p>Lost to cyber frauds in 2023-24</p>
                            </div>

                            <div class="stat-highlight glass highlight-success animate-fade-in-delayed">
                                <h4>1.2 Lakh+</h4>
                                <p>Complaints prevented/resolved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="features-section animate-fade-in">
                <div class="container">
                    <div class="section-header">
                        <h2>Comprehensive Protection</h2>
                        <p>Advanced AI technology tuned for Indian cyberspace threats</p>
                    </div>
                    <div class="features-grid">
                        ${createFeatureCard('URL Scanner', 'Scan suspicious links received via SMS, WhatsApp, or Email. Detects fake banking and government sites.', 'link')}
                        ${createFeatureCard('Message Analyzer', 'Paste messages from WhatsApp/Telegram. Our AI detects social engineering in "Part-time Job" or "Lottery" offers.', 'message')}
                        ${createFeatureCard('Image Scanner', 'Upload screenshots of QR codes or payment requests. We analyze text for typical UPI scam patterns.', 'image')}
                        ${createFeatureCard('Phone Validator', 'Check identifiers against known scammer databases in India.', 'phone')}
                        ${createFeatureCard('Scam Database', 'Browse our verified database of reported scams including Sextortion, Fedex scams, and more.', 'database')}
                        ${createFeatureCard('Safety Guide', 'Learn RBI guidelines and how to report cyber crime on 1930.', 'book')}
                    </div>
                </div>
            </section>

            <!-- Protection Tips Section -->
            <section class="tips-section animate-fade-in">
                <div class="container">
                    <div class="section-header">
                        <h2>How to Protect Yourself</h2>
                        <p>Simple steps to stay safe digitally</p>
                    </div>
                    <div class="tips-grid">
                        <div class="tip-card glass">
                            <div class="tip-icon icon-primary">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <h3>Verify First</h3>
                            <p>Never pay before verifying identity. Official sources won't ask for PINs.</p>
                        </div>
                        <div class="tip-card glass">
                            <div class="tip-icon icon-success">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <h3>Secure UPI</h3>
                            <p>Don't enter UPI PIN to receive money. PIN is ONLY for sending money.</p>
                        </div>
                        <div class="tip-card glass">
                            <div class="tip-icon icon-warning">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                            </div>
                            <h3>Report 1930</h3>
                            <p>Dial 1930 immediately if you face financial fraud to freeze funds.</p>
                        </div>
                        <div class="tip-card glass">
                            <div class="tip-icon icon-danger">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <h3>Ignore APKs</h3>
                            <p>Do not install 'Support Apps' (AnyDesk, TeamViewer) asked by strangers.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="cta-section animate-fade-in">
                <div class="container">
                    <div class="cta-card glass-strong">
                        <h2>Ready to Stay Protected?</h2>
                        <p>Join thousands of users who trust ScamShield to keep them safe online.</p>
                        <a href="/scan" data-link class="cta-button">
                            Get Started Free
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    `;

    // Chart initialization removed
}

function createFeatureCard(title, description, iconType) {
    const icons = {
        link: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
        message: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
        image: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
        phone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
        database: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
        book: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>'
    };

    return `
        <div class="feature-card glass">
            <div class="feature-icon">
                ${icons[iconType]}
            </div>
            <h3 class="feature-title">${title}</h3>
            <p class="feature-description">${description}</p>
        </div>
    `;
}

// Home page styles
const homeStyles = `
.home-page { animation: fadeIn 0.5s ease-out; }
.hero-section { padding: 6rem 0; min-height: 80vh; display: flex; align-items: center; }
.hero-content { text-align: center; max-width: 800px; margin: 0 auto; }
.hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: var(--radius-full); color: var(--primary); font-size: 0.875rem; font-weight: 600; margin-bottom: 2rem; }
.hero-title { font-size: 3.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 1.5rem; }
.hero-description { font-size: 1.25rem; color: var(--text-secondary); margin-bottom: 2.5rem; line-height: 1.8; }
.hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 4rem; }
.hero-btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: var(--gradient-primary); color: white; border-radius: var(--radius-lg); font-weight: 700; text-decoration: none; transition: all var(--transition-base); box-shadow: var(--shadow-lg); }
.hero-btn-primary:hover { transform: translateY(-4px); box-shadow: var(--shadow-glow); }
.hero-btn-secondary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: var(--bg-secondary); color: var(--text-primary); border-radius: var(--radius-lg); font-weight: 700; text-decoration: none; transition: all var(--transition-base); }
.hero-btn-secondary:hover { background: var(--bg-tertiary); transform: translateY(-2px); }

.scam-types-preview { margin-top: 2rem; text-align: center; }
.preview-label { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
.chip-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
.scam-chip { padding: 0.5rem 1rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-full); font-size: 0.875rem; font-weight: 600; color: var(--text-primary); transition: all var(--transition-fast); cursor: default; }
.scam-chip:hover { border-color: var(--primary); transform: translateY(-2px); background: rgba(99, 102, 241, 0.1); }

.stats-section { padding: 4rem 0; }
.stats-grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.chart-container { height: 400px; width: 100%; border-radius: 20px; padding: 2rem; display: flex; align-items: center; justify-content: center; }
.chart-hint { text-align: center; margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem; }
.stat-highlight { padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; }
.highlight-primary { border-left: 4px solid var(--primary); }
.highlight-success { border-left: 4px solid var(--success); }
.stat-highlight h4 { margin: 0; font-size: 2rem; }
.stat-highlight p { margin: 0; color: var(--text-secondary); }

.features-section { padding: 6rem 0; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.feature-card { padding: 2rem; border-radius: var(--radius-xl); transition: all var(--transition-base); }
.feature-card:hover { transform: translateY(-8px); }
.feature-icon { width: 56px; height: 56px; background: var(--gradient-primary); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; box-shadow: var(--shadow-glow); }
.feature-icon svg { color: white; }
.feature-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem; }
.feature-description { color: var(--text-secondary); line-height: 1.7; }

.tips-section { padding: 4rem 0; }
.tips-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; }
.tip-card { padding: 2rem; border-radius: var(--radius-xl); text-align: center; }
.tip-icon { width: 64px; height: 64px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
.icon-primary { background: var(--gradient-primary); }
.icon-success { background: var(--gradient-success); }
.icon-warning { background: var(--gradient-warning); }
.icon-danger { background: var(--gradient-primary); }
.tip-card h3 { margin-bottom: 0.5rem; font-size: 1.5rem; }
.tip-card p { color: var(--text-secondary); font-size: 0.9rem; }

.cta-section { padding: 4rem 0 6rem; }
.cta-card { padding: 4rem 2rem; border-radius: var(--radius-xl); text-align: center; }
.cta-card h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; }
.cta-card p { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; }
.cta-button { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2.5rem; background: var(--gradient-primary); color: white; border-radius: var(--radius-lg); font-weight: 700; text-decoration: none; transition: all var(--transition-base); box-shadow: var(--shadow-lg); }
.cta-button:hover { transform: translateY(-4px); box-shadow: var(--shadow-glow); }

@media (max-width: 768px) {
    .hero-title { font-size: 2.5rem; }
    .hero-section { padding: 4rem 0; min-height: auto; }
    .features-grid { grid-template-columns: 1fr; }
    .stats-grid-layout { grid-template-columns: 1fr; gap: 2rem; }
    .tips-grid { grid-template-columns: 1fr; }
}
`;

if (!document.getElementById('home-styles')) {
    const style = document.createElement('style');
    style.id = 'home-styles';
    style.textContent = homeStyles;
    document.head.appendChild(style);
}

window.renderHomePage = renderHomePage;
