// Footer Component

function renderFooter() {
    const footer = document.getElementById('footer');

    footer.innerHTML = `
        <div class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-logo">
                            <div class="logo-icon">
                                ${getShieldIcon()}
                            </div>
                            <span class="gradient-text">ScamShield</span>
                        </div>
                        <p class="footer-description">
                            Your AI-powered guardian against online scams. Stay safe with real-time threat detection.
                        </p>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul class="footer-links">
                            <li><a href="/" data-link>Home</a></li>
                            <li><a href="/scan" data-link>Scan</a></li>
                            <li><a href="/dashboard" data-link>Dashboard</a></li>
                            <li><a href="/database" data-link>Database</a></li>
                            <li><a href="/learn" data-link>Learn</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Resources</h4>
                        <ul class="footer-links">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Stay Safe</h4>
                        <p class="footer-description-small">
                            Get the latest scam alerts and security tips.
                        </p>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} ScamShield • Built by the Members Of Team Limitless And For The Safer Internet</p>
                </div>
            </div>
        </div>
    `;
}

function getShieldIcon() {
    return `<img src="assets/images/logo.png" alt="ScamShield Logo" style="width: 100%; height: 100%; object-fit: contain;">`;
}

// Footer styles
const footerStyles = `
.footer {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    padding: 3rem 0 1rem;
    margin-top: 4rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.footer-logo .logo-icon {
    width: 40px;
    height: 40px;
    background: var(--gradient-primary);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-logo .logo-icon svg {
    color: white;
    width: 22px;
    height: 22px;
}

.footer-logo span {
    font-size: 1.25rem;
    font-weight: 800;
}

.footer-description {
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.6;
}

.footer-description-small {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.footer-section h4 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.footer-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color var(--transition-fast);
}

.footer-links a:hover {
    color: var(--primary);
}

.footer-bottom {
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.footer-bottom p {
    margin: 0.25rem 0;
}

@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
    }
}
`;

if (!document.getElementById('footer-styles')) {
    const style = document.createElement('style');
    style.id = 'footer-styles';
    style.textContent = footerStyles;
    document.head.appendChild(style);
}

window.renderFooter = renderFooter;
