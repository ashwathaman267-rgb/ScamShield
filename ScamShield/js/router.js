// Simple SPA Router
// Handles client-side routing without page reloads

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => this.handleRoute());
        document.addEventListener('click', (e) => this.handleLinkClick(e));
        // Do not handleRoute immediately. Wait for App to register routes.
    }

    register(path, handler) {
        this.routes[path] = handler;
    }

    handleLinkClick(e) {
        const link = e.target.closest('a[data-link]');
        if (link) {
            e.preventDefault();
            const href = link.getAttribute('href');
            this.navigate(href);
        }
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    handleRoute() {
        let path = window.location.pathname;

        // Normalize path
        if (path === '' || path === '/index.html') path = '/';
        if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);

        console.log('Routing to:', path);
        this.currentRoute = path;

        // Update Navbar Active State
        if (window.updateNavbar) {
            window.updateNavbar(path);
        }

        // Find matching route
        const handler = this.routes[path];

        // Default to 404 if no match
        if (!handler) {
            console.warn('Route not found, showing 404:', path);
            handler = this.routes['/404'] || (() => {
                const main = document.getElementById('main-content');
                main.innerHTML = `
                    <div class="container" style="text-align: center; padding-top: 10vh;">
                        <div class="glass" style="padding: 3rem; display: inline-block; border-radius: var(--radius-xl);">
                            <h1 style="font-size: 4rem; margin-bottom: 1rem; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">404</h1>
                            <h2 style="margin-bottom: 2rem;">Page Not Found</h2>
                            <p style="margin-bottom: 2rem; color: var(--text-secondary);">The page you are looking for doesn't exist.</p>
                            <a href="/" data-link class="hero-btn-primary">Go Home</a>
                        </div>
                    </div>
                `;
            });
        }

        // Execute route handler
        if (handler) {
            this.transitionPage(handler);
        }
    }

    transitionPage(handler) {
        const main = document.getElementById('main-content');

        // Add exit animation
        main.classList.add('page-transition-exit');

        setTimeout(() => {
            main.classList.remove('page-transition-exit');
            main.classList.add('page-transition-enter');

            // Execute handler
            handler();

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            setTimeout(() => {
                main.classList.remove('page-transition-enter');
            }, 250);
        }, 150);
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
}

// Initialize router
window.router = new Router();
