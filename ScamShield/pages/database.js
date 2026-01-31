// Database Page Component
function renderDatabasePage() {
    const main = document.getElementById('main-content');
    if (!main) return;

    main.innerHTML = `
        <div class="database-page animate-fade-in">
            <div class="container">
                <header class="page-header" style="text-align: center; margin-bottom: 3rem;">
                    <h1 class="gradient-text">Scam Awareness & Database</h1>
                    <p>Comprehensive report on financial frauds and cyber threats in India</p>
                </header>

                <!-- Scam Awareness Report Section (Dynamic) -->
                <section class="awareness-report glass-strong animate-fade-in-delayed" style="padding: 3rem; border-radius: 24px; margin-bottom: 4rem;">
                    <div class="report-grid">
                        <div class="report-content" style="width: 100%;">
                            <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem;">The Growing Threat in India</h2>
                            <div class="academic-insight" style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.8;">
                                <p style="margin-bottom: 1rem;">
                                    As per the <strong>Reserve Bank of India (RBI)</strong> annual report, frauds reported by banks increased by <strong>28% in volume</strong> and <strong>159% in value</strong> during 2019-20. 
                                    A staggering <strong>99% of frauds</strong> occurred in the advances portfolio.
                                </p>
                                <div class="stat-card-mini glass" style="padding: 1rem; border-radius: 12px; border-left: 4px solid var(--primary); margin-bottom: 1.5rem;">
                                    <p style="margin: 0; font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Key Finding</p>
                                    <p style="margin: 0; font-size: 1.1rem; font-weight: 600; color: var(--text-primary);">Top 50 records constitute 76% of total fraud value.</p>
                                </div>
                                <p>
                                    Cyber attacks like <strong>Phishing, Ransomware, and SIM Swap</strong> have evolved. 
                                    India's financial sector is the primary target as reserves are now digitally stored and moved.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="academic-details" style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
                        <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Major Historical Scams</h3>
                        <div class="scam-history-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                            <div class="history-item glass" style="padding: 1.5rem; border-radius: 16px;">
                                <h4 style="font-size: 1rem; color: var(--primary);">Harshad Mehta (1992)</h4>
                                <p style="font-size: 0.85rem;">Stock market scam involving diverted bank funds (₹3,500 Cr).</p>
                            </div>
                            <div class="history-item glass" style="padding: 1.5rem; border-radius: 16px;">
                                <h4 style="font-size: 1rem; color: var(--primary);">Satyam Computers (2009)</h4>
                                <p style="font-size: 0.85rem;">Accounting fraud of ₹7,000 Cr using 7,500+ fake bills.</p>
                            </div>
                            <div class="history-item glass" style="padding: 1.5rem; border-radius: 16px;">
                                <h4 style="font-size: 1rem; color: var(--primary);">Yes Bank/PMC (2018-19)</h4>
                                <p style="font-size: 0.85rem;">Lending irregularities leading to massive NPA crisis.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Search & Filters -->
                <div class="search-bar-container glass animate-fade-in" style="padding: 1.5rem; border-radius: 20px; margin-bottom: 2rem; display: flex; gap: 1rem; align-items: center;">
                    <div style="flex: 1; position: relative;">
                        <input type="text" id="db-search" placeholder="Search scam types, tactics..." style="width: 100%; padding: 1rem 1.5rem; padding-left: 3rem; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" style="position: absolute; left: 1rem; top: 1.1rem;">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <select id="db-filter" style="padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary); cursor: pointer;">
                        <option value="all">All Categories</option>
                        <option value="phishing">Phishing</option>
                        <option value="malware">Malware / Apps</option>
                        <option value="impersonation">Govt/Police Impersonation</option>
                        <option value="financial">Financial Fraud</option>
                    </select>
                </div>

                <!-- Database Grid -->
                <div id="database-grid" class="database-grid animate-fade-in" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">
                    <!-- Cards will be injected by JS -->
                </div>
            </div>
        </div>
    `;

    // Database content
    const scams = [
        {
            title: 'KYC Update / Bank Fraud',
            type: 'phishing',
            severity: 'Critical',
            description: 'Fake SMS about expired KYC. Leads to screen-sharing apps like AnyDesk/QuickSupport.',
            details: 'The study identifies "Cyber Attacks in India" as a primary concern. Fraudsters use fake sites and cloned messages to steal credentials. Banks reported a 28% increase in such cases.',
            tactics: 'SMS Links, APK files, Screen Sharing requests.'
        },
        {
            title: 'Digital Arrest / Police Impersonation',
            type: 'impersonation',
            severity: 'Critical',
            description: 'Calls from pseudo-CBI/Police claiming illegal parcels found in your name.',
            details: 'Uses fear and social engineering. Often involves Skype video calls to fake police rooms. Part of the "Nexus of advertisers" mentioned in academic reports.',
            tactics: 'Video call harassment, Fake warrants, Digital confinement.'
        },
        {
            title: 'Part-Time Job / Telegram Scam',
            type: 'financial',
            severity: 'High',
            description: 'Offers of ₹5000/day for rating hotels or likes. Asks for initial deposits.',
            details: 'Classic "Criminal intent of the advertiser". Targets job seekers by promising high returns for minimal work.',
            tactics: 'Telegram groups, Prepaid tasks, Withdrawal freeze.'
        },
        {
            title: 'Electricity Bill Scam',
            type: 'impersonation',
            severity: 'High',
            description: 'Warning message about power cut tonight. Asks to call a scammer-controlled number.',
            details: 'Creates urgency. The victim is coerced into paying via a fake portal or giving OTP.',
            tactics: 'Urgent SMS, 10-digit mobile numbers as "helpline".'
        },
        {
            title: 'SIM Swap / Porting Fraud',
            type: 'malware',
            severity: 'Critical',
            description: 'Involves social engineering to get you to send an SMS for SIM replacement.',
            details: 'Academic Insight: SIM Swap allows attackers to intercept OTPs. "Cybercrimes are successful because of lack of staggered authentication."',
            tactics: 'SMS porting requests, Identity theft.'
        },
        {
            title: 'Loan App / Extortion',
            type: 'financial',
            severity: 'Critical',
            description: 'Illegal loan apps that access contacts and photos to harass you for high interest.',
            details: 'Reflects the "lack of specialized ability to evaluate" in the digital lending space. Often based in foreign jurisdictions.',
            tactics: 'Permission abuse, Morphing photos, Harassment calls.'
        }
    ];

    const grid = document.getElementById('database-grid');
    const searchInput = document.getElementById('db-search');
    const filterSelect = document.getElementById('db-filter');

    // Store in global state for modal access
    window.currentScams = scams;

    function renderCards(filteredScams) {
        grid.innerHTML = filteredScams.map(scam => createScamCard(scam)).join('');
    }

    renderCards(scams);

    // Filter Logic
    const filterData = () => {
        const query = searchInput.value.toLowerCase();
        const category = filterSelect.value;
        const filtered = scams.filter(s => {
            const matchesSearch = s.title.toLowerCase().includes(query) || s.description.toLowerCase().includes(query);
            const matchesFilter = category === 'all' || s.type === category;
            return matchesSearch && matchesFilter;
        });
        renderCards(filtered);
    };

    searchInput.addEventListener('input', filterData);
    filterSelect.addEventListener('change', filterData);
}

function createScamCard(scam) {
    const severityColors = {
        'Critical': 'var(--danger)',
        'High': 'var(--warning)',
        'Medium': 'var(--info)',
        'Low': 'var(--success)'
    };

    // Use dataset to store data safely to avoid syntax errors in inline strings
    return `
        <div class="scam-card glass animate-fade-in" style="padding: 1.5rem; border-radius: 20px; display: flex; flex-direction: column; gap: 1rem; position: relative; overflow: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <h3 style="font-size: 1.1rem; margin: 0; font-weight: 700;">${scam.title}</h3>
                <span style="background: ${severityColors[scam.severity]}; color: white; font-size: 0.7rem; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; font-weight: 800;">${scam.severity}</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--primary); font-weight: 600; text-transform: uppercase;">${scam.type}</span>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">${scam.description}</p>
            
            <button class="learn-more-btn" style="margin-top: auto; padding: 0.75rem; border: none; border-radius: 12px; background: var(--bg-tertiary); color: var(--text-primary); font-weight: 600; cursor: pointer; transition: all 0.2s;" 
                onclick="window.showScamInfo('${scam.title.replace(/'/g, "\\'")}')">
                Learn More
            </button>
        </div>
    `;
}

// Global function to handle information display
window.showScamInfo = function (title) {
    if (!window.currentScams) return;
    const scam = window.currentScams.find(s => s.title === title);
    if (!scam) return;

    const content = `
        <div class="scam-detail-report animate-fade-in" style="line-height: 1.8;">
            <div class="glass" style="padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; border-left: 5px solid var(--primary);">
                <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Academic Report & Analysis</h4>
                <p style="font-size: 0.95rem; font-style: italic;">"${scam.details}"</p>
            </div>
            
            <h4 style="margin-bottom: 1rem;">Operating Tactics</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                ${scam.tactics.split(',').map(t => `<span class="glass" style="padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">${t.trim()}</span>`).join('')}
            </div>

            <h4 style="margin-bottom: 1rem;">Prevention Steps</h4>
            <ul style="padding-left: 1.25rem; color: var(--text-secondary);">
                <li>Verify identity through official government portals.</li>
                <li>Never share banking PIN or OTP with anyone.</li>
                <li>Report such incidents immediately on the 1930 Helpline.</li>
            </ul>
        </div>
    `;

    window.showModal(scam.title, content);
};

window.renderDatabasePage = renderDatabasePage;
