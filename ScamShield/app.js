// Main Application Entry Point

class App {
    constructor() {
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }

        // Hide Global Loader with absolute certainty
        // We do this independently of the app logic so it NEVER stays stuck
        setTimeout(() => {
            const loader = document.getElementById('global-loader');
            if (loader) {
                // 1. Fade out
                loader.style.transition = 'opacity 0.5s ease-out';
                loader.style.opacity = '0';

                // 2. Remove from flow
                setTimeout(() => {
                    loader.style.display = 'none'; // Hard remove

                    // 3. User Requested: Force redirect to Home
                    if (window.router) {
                        console.log("Boot sequence complete. Redirecting to Home.");
                        window.router.navigate('/');
                    }
                }, 500);
            }
        }, 1500); // 1.5s boot time
    }

    start() {
        console.log('🚀 ScamShield App Starting...');

        // Initialize components
        this.setupRouter();
        this.renderLayout();

        // Register service worker for PWA
        this.registerServiceWorker();

        console.log('✅ ScamShield App Ready');
    }

    setupRouter() {
        // Register all routes
        window.router.register('/', () => {
            if (window.renderHomePage) window.renderHomePage();
        });

        window.router.register('/scan', () => {
            if (window.renderScanPage) window.renderScanPage();
        });

        window.router.register('/dashboard', () => {
            if (window.renderDashboardPage) window.renderDashboardPage();
        });

        window.router.register('/database', () => {
            if (window.renderDatabasePage) window.renderDatabasePage();
        });

        window.router.register('/learn', () => {
            if (window.renderLearnPage) window.renderLearnPage();
        });

        // Trigger router to handle current URL immediately
        // This ensures content is ready BEHIND the loader before it fades
        if (window.router) {
            window.router.handleRoute();
        }
    }

    renderLayout() {
        // Render navbar and footer
        if (window.renderNavbar) {
            window.renderNavbar();
        }

        if (window.renderFooter) {
            window.renderFooter();
        }

        // Initial Navbar Update
        if (window.updateNavbar) {
            window.updateNavbar(window.location.pathname);
        }
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/service-worker.js');
                console.log('Service Worker registered:', registration);
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    }
}

// Initialize the app
new App();
