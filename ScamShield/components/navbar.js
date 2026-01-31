// Navigation Bar Component

function renderNavbar() {
    const navbar = document.getElementById('navbar');
    const currentPath = window.location.pathname;

    const navItems = [
        { name: 'Home', href: '/', icon: getHomeIcon() },
        { name: 'Scan', href: '/scan', icon: getScanIcon() },
        { name: 'Dashboard', href: '/dashboard', icon: getDashboardIcon() },
        { name: 'Database', href: '/database', icon: getDatabaseIcon() },
        { name: 'Learn', href: '/learn', icon: getBookIcon() }
    ];

    navbar.innerHTML = `
        <div class="navbar glass-strong">
            <div class="container">
                <div class="navbar-content">
                    <a href="/" data-link class="navbar-logo">
                        <div class="logo-icon">
                            ${getShieldIcon()}
                        </div>
                        <span class="logo-text gradient-text">ScamShield</span>
                    </a>
                    
                    <div class="navbar-menu">
                        ${navItems.map(item => `
                            <a href="${item.href}" data-link class="navbar-link ${currentPath === item.href ? 'active' : ''}">
                                ${item.icon}
                                <span>${item.name}</span>
                            </a>
                        `).join('')}
                    </div>
                    
                    <div class="navbar-actions">
                        <div id="theme-toggle-container"></div>
                        <a href="/scan" data-link class="navbar-cta-btn">
                            ${getScanIcon()}
                            <span>Quick Scan</span>
                        </a>
                        <button class="navbar-mobile-toggle" id="mobile-menu-toggle">
                            ${getMenuIcon()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="navbar-mobile-menu" id="mobile-menu">
            <div class="navbar-mobile-content">
                ${navItems.map(item => `
                    <a href="${item.href}" data-link class="navbar-mobile-link ${currentPath === item.href ? 'active' : ''}">
                        ${item.icon}
                        <span>${item.name}</span>
                    </a>
                `).join('')}
                <a href="/scan" data-link class="navbar-mobile-cta">
                    ${getScanIcon()}
                    <span>Quick Scan</span>
                </a>
            </div>
        </div>
    `;

    // Add theme toggle
    const themeContainer = navbar.querySelector('#theme-toggle-container');
    const themeToggle = window.createThemeToggle();
    themeContainer.appendChild(themeToggle);

    // Setup mobile menu
    setupMobileMenu();
}

function setupMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Icons
function getShieldIcon() {
    // Main Brand Logo
    return `<img src="assets/images/logo.png" alt="ScamShield" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);">`;
}

function getHomeIcon() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
}

function getScanIcon() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path></svg>`;
}

function getDashboardIcon() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`;
}

function getDatabaseIcon() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`;
}

function getBookIcon() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`;
}

function getMenuIcon() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
}

// Navbar styles
const navbarStyles = `
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    animation: slideInDown 0.5s ease-out;
}

.navbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    gap: 2rem;
}

.navbar-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    transition: transform var(--transition-fast);
}

.navbar-logo:hover {
    transform: scale(1.05);
}

.logo-icon {
    width: 42px;
    height: 42px;
    /* background: var(--gradient-primary); -- Removed to let logo image show clearly */
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-glow);
    overflow: hidden; /* Ensure image stays within bounds */
}

.logo-icon svg {
    color: white;
    width: 24px;
    height: 24px;
}

.logo-text {
    font-size: 1.5rem;
    font-weight: 800;
}

.navbar-menu {
    display: none;
    gap: 0.5rem;
}

.navbar-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    border-radius: var(--radius-lg);
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 500;
    transition: all var(--transition-fast);
}

.navbar-link svg {
    width: 18px;
    height: 18px;
}

.navbar-link:hover {
    background: var(--bg-secondary);
}

.navbar-link.active {
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary);
}

.navbar-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.navbar-cta-btn {
    display: none;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    background: var(--gradient-primary);
    color: white;
    border-radius: var(--radius-lg);
    font-weight: 600;
    text-decoration: none;
    transition: all var(--transition-fast);
}

.navbar-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
}

.navbar-cta-btn svg {
    width: 18px;
    height: 18px;
}

.theme-toggle {
    width: 40px;
    height: 40px;
    border: none;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-primary);
    transition: all var(--transition-fast);
}

.theme-toggle:hover {
    background: var(--bg-tertiary);
    transform: scale(1.1);
}

.navbar-mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
}

.navbar-mobile-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--glass-bg);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    z-index: 999;
    transform: translateY(-100%);
    opacity: 0;
    transition: all var(--transition-base);
    pointer-events: none;
}

.navbar-mobile-menu.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
}

.navbar-mobile-content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.navbar-mobile-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: var(--radius-lg);
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 500;
    transition: all var(--transition-fast);
}

.navbar-mobile-link svg {
    width: 20px;
    height: 20px;
}

.navbar-mobile-link:hover,
.navbar-mobile-link.active {
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary);
}

.navbar-mobile-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--gradient-primary);
    color: white;
    border-radius: var(--radius-lg);
    font-weight: 600;
    text-decoration: none;
    margin-top: 1rem;
}

@media (min-width: 768px) {
    .navbar-menu {
        display: flex;
    }
    
    .navbar-cta-btn {
        display: flex;
    }
    
    .navbar-mobile-toggle {
        display: none;
    }
}
`;

if (!document.getElementById('navbar-styles')) {
    const style = document.createElement('style');
    style.id = 'navbar-styles';
    style.textContent = navbarStyles;
    document.head.appendChild(style);
}

window.renderNavbar = renderNavbar;


window.updateNavbar = function (path) {
    const currentPath = path || window.location.pathname;

    // Helper to normalize path for comparison (strip trailing slash if not root)
    const normalize = (p) => p === '/' ? p : p.replace(/\/$/, "");
    const targetPath = normalize(currentPath);

    const updateLink = (link) => {
        const linkHref = normalize(link.getAttribute('href'));

        // User requested to unhighlight Home.
        // If the matching link is '/', we do NOT add active.
        if (linkHref === targetPath && linkHref !== '/') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    };

    // Update Desktop Links
    document.querySelectorAll('.navbar-link').forEach(updateLink);

    // Update Mobile Links
    document.querySelectorAll('.navbar-mobile-link').forEach(updateLink);
};
