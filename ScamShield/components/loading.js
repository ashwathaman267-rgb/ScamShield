// Loading Component

function createLoadingSpinner(size = 'md') {
    const spinner = document.createElement('div');
    spinner.className = `loading-spinner loading-${size}`;
    spinner.innerHTML = `
        <svg viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
        </svg>
    `;
    return spinner;
}

function createSkeletonLoader(type = 'text') {
    const skeleton = document.createElement('div');
    skeleton.className = `skeleton skeleton-${type}`;
    return skeleton;
}

function createScanningAnimation() {
    const container = document.createElement('div');
    container.className = 'scanning-animation';
    container.innerHTML = `
        <div class="scan-circle"></div>
        <div class="scan-circle"></div>
        <div class="scan-circle"></div>
        <div class="scan-text">Scanning...</div>
    `;
    return container;
}

// Inject loading styles
const loadingStyles = `
.loading-spinner {
    display: inline-block;
    animation: spin 1s linear infinite;
}

.loading-spinner svg {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
}

.loading-sm svg { width: 20px; height: 20px; }
.loading-md svg { width: 40px; height: 40px; }
.loading-lg svg { width: 60px; height: 60px; }

@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
}

.skeleton {
    background: linear-gradient(
        90deg,
        var(--bg-secondary) 0%,
        var(--bg-tertiary) 50%,
        var(--bg-secondary) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: var(--radius-md);
}

.skeleton-text {
    height: 1rem;
    width: 100%;
    margin-bottom: 0.5rem;
}

.skeleton-title {
    height: 2rem;
    width: 60%;
    margin-bottom: 1rem;
}

.skeleton-card {
    height: 200px;
    width: 100%;
}

.scanning-animation {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 3rem;
}

.scan-circle {
    width: 120px;
    height: 120px;
    border: 4px solid var(--primary);
    border-radius: 50%;
    position: absolute;
    animation: pulse 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
}

.scan-circle:nth-child(2) {
    animation-delay: 0.3s;
    opacity: 0.6;
}

.scan-circle:nth-child(3) {
    animation-delay: 0.6s;
    opacity: 0.3;
}

.scan-text {
    margin-top: 150px;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-secondary);
    animation: pulse 1.5s ease-in-out infinite;
}
`;

if (!document.getElementById('loading-styles')) {
    const style = document.createElement('style');
    style.id = 'loading-styles';
    style.textContent = loadingStyles;
    document.head.appendChild(style);
}

window.createLoadingSpinner = createLoadingSpinner;
window.createSkeletonLoader = createSkeletonLoader;
window.createScanningAnimation = createScanningAnimation;
