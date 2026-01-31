// Card Component

function createCard(options = {}) {
    const {
        title = '',
        subtitle = '',
        content = '',
        footer = '',
        className = '',
        variant = 'default'
    } = options;

    const card = document.createElement('div');
    card.className = `card card-${variant} ${className}`.trim();

    if (title || subtitle) {
        const header = document.createElement('div');
        header.className = 'card-header';

        if (title) {
            const titleEl = document.createElement('h3');
            titleEl.className = 'card-title';
            titleEl.textContent = title;
            header.appendChild(titleEl);
        }

        if (subtitle) {
            const subtitleEl = document.createElement('p');
            subtitleEl.className = 'card-subtitle';
            subtitleEl.textContent = subtitle;
            header.appendChild(subtitleEl);
        }

        card.appendChild(header);
    }

    if (content) {
        const body = document.createElement('div');
        body.className = 'card-body';
        if (typeof content === 'string') {
            body.innerHTML = content;
        } else if (content instanceof Node) {
            body.appendChild(content);
        }
        card.appendChild(body);
    }

    if (footer) {
        const footerEl = document.createElement('div');
        footerEl.className = 'card-footer';
        if (typeof footer === 'string') {
            footerEl.innerHTML = footer;
        } else if (footer instanceof Node) {
            footerEl.appendChild(footer);
        }
        card.appendChild(footerEl);
    }

    return card;
}

// Card styles
const cardStyles = `
.card {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: all var(--transition-base);
}

.card-glass {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
}

.card-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-primary);
}

.card-subtitle {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0.5rem 0 0 0;
}

.card-body {
    padding: 1.5rem;
}

.card-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--border-color);
    background: var(--bg-secondary);
}

.card-gradient {
    background: var(--gradient-primary);
    color: white;
    border: none;
}

.card-gradient .card-title,
.card-gradient .card-subtitle {
    color: white;
}

.card-gradient .card-header {
    border-color: rgba(255, 255, 255, 0.2);
}

.card-gradient .card-footer {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
}
`;

if (!document.getElementById('card-styles')) {
    const style = document.createElement('style');
    style.id = 'card-styles';
    style.textContent = cardStyles;
    document.head.appendChild(style);
}

window.createCard = createCard;
