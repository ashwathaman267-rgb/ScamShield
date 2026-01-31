// Button Component Factory

function createButton(text, options = {}) {
    const {
        variant = 'primary',
        size = 'md',
        icon = null,
        onClick = null,
        className = '',
        disabled = false,
        type = 'button'
    } = options;

    const button = document.createElement('button');
    button.type = type;
    button.className = `btn btn-${variant} btn-${size} ${className}`.trim();

    if (icon) {
        button.innerHTML = icon;
    }

    if (text) {
        const span = document.createElement('span');
        span.textContent = text;
        button.appendChild(span);
    }

    if (onClick) {
        button.addEventListener('click', onClick);
    }

    if (disabled) {
        button.disabled = true;
    }

    return button;
}

// Add button styles to CSS
const buttonStyles = `
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 600;
    border-radius: var(--radius-lg);
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: inherit;
    white-space: nowrap;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Sizes */
.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

.btn-md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
}

.btn-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
}

/* Variants */
.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.btn-gradient {
    background: var(--gradient-primary);
    color: white;
    position: relative;
    overflow: hidden;
}

.btn-gradient::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gradient-primary-hover);
    opacity: 0;
    transition: opacity var(--transition-fast);
}

.btn-gradient:hover:not(:disabled)::before {
    opacity: 1;
}

.btn-gradient:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
}

.btn-gradient span {
    position: relative;
    z-index: 1;
}

.btn-gradient svg {
    position: relative;
    z-index: 1;
}

.btn-secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

.btn-secondary:hover:not(:disabled) {
    background: var(--bg-tertiary);
}

.btn-ghost {
    background: transparent;
    color: var(--text-primary);
}

.btn-ghost:hover:not(:disabled) {
    background: var(--bg-secondary);
}

.btn-danger {
    background: var(--danger);
    color: white;
}

.btn-danger:hover:not(:disabled) {
    background: var(--danger-dark);
    box-shadow: var(--shadow-glow-danger);
}

.btn-success {
    background: var(--success);
    color: white;
}

.btn-success:hover:not(:disabled) {
    background: var(--success-dark);
    box-shadow: var(--shadow-glow-success);
}

.btn-icon {
    padding: 0.75rem;
    aspect-ratio: 1;
}
`;

// Inject button styles
if (!document.getElementById('button-styles')) {
    const style = document.createElement('style');
    style.id = 'button-styles';
    style.textContent = buttonStyles;
    document.head.appendChild(style);
}

window.createButton = createButton;
