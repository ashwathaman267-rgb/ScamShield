// Interactive Donut/Pie Chart Component
// Robust implementation with polar coordinates helper
console.log("LOADING InteractivePieChart Script...");

class InteractivePieChart {
    constructor(elementId, data, options = {}) {
        this.container = document.getElementById(elementId);
        this.data = data;
        this.options = {
            colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b', '#ef4444'],
            innerRadius: 0, // 0 for pie, >0 for donut
            ...options
        };

        console.log('Initializing Chart:', elementId, data);
        this.init();
    }

    init() {
        if (!this.container) {
            console.error('Chart container not found:', this.container);
            return;
        }
        try {
            this.render();
        } catch (e) {
            console.error('Chart render error:', e);
            this.container.innerHTML = `<div style="color:red; text-align:center;">Error loading chart: ${e.message}</div>`;
        }
    }

    // Helper to calculate coordinates
    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        // SVG coordinates: 0 degrees is usually 3 o'clock. 
        // We want 0 to be 12 o'clock, so subtract 90.
        // Actually, let's stick to standard math (0 = 3 o'clock) and just rotate the group if needed.
        // My previous code assumed 0 = 3 o'clock.

        var angleInRadians = (angleInDegrees) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    render() {
        const total = this.data.reduce((sum, item) => sum + item.value, 0);
        let startAngle = 0;
        const radius = 80;
        const innerRadius = this.options.innerRadius || 0;
        const centerX = 0;
        const centerY = 0;

        // Container Style for Overlay
        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden'; // Ensure overlay stays within bounds if needed, or remove for pop-out

        // Create SVG
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "-100 -100 200 200");
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.overflow = "visible";
        svg.setAttribute("class", "interactive-pie-chart");

        // Add styles for animations
        const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
        style.textContent = `
            @keyframes pie-enter {
                from { opacity: 0; transform: scale(0) rotate(-90deg); }
                to { opacity: 1; transform: scale(1) rotate(0); }
            }
            .pie-slice {
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.27), filter 0.3s ease;
                cursor: pointer;
                stroke: rgba(255,255,255,0.5); /* Visible Border */
                stroke-width: 1px;
                transform-origin: 0 0;
                opacity: 0; 
                animation: pie-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .pie-slice:hover {
                transform: scale(1.1);
                filter: brightness(1.2) drop-shadow(0 0 15px rgba(255,255,255,0.3));
                z-index: 10;
                stroke: white;
                stroke-width: 2px;
            }
            .pie-label-text {
                pointer-events: none;
                font-family: 'Inter', sans-serif;
                font-weight: 600;
                font-size: 7px;
                fill: white;
                text-anchor: middle;
                dominant-baseline: middle;
                text-shadow: 0 1px 3px rgba(0,0,0,0.8);
                opacity: 0;
                animation: pie-enter 0.8s 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
        `;
        svg.appendChild(style);

        this.data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * 360;
            const endAngle = startAngle + sliceAngle;
            const largeArcFlag = sliceAngle > 180 ? 1 : 0;

            // Path Calculation
            const startOuter = this.polarToCartesian(centerX, centerY, radius, startAngle);
            const endOuter = this.polarToCartesian(centerX, centerY, radius, endAngle);
            const startInner = this.polarToCartesian(centerX, centerY, innerRadius, startAngle);
            const endInner = this.polarToCartesian(centerX, centerY, innerRadius, endAngle);

            let d = "";
            if (innerRadius > 0) {
                // Donut
                d = ["M", startOuter.x, startOuter.y, "A", radius, radius, 0, largeArcFlag, 1, endOuter.x, endOuter.y, "L", endInner.x, endInner.y, "A", innerRadius, innerRadius, 0, largeArcFlag, 0, startInner.x, startInner.y, "Z"].join(" ");
            } else {
                // Pie
                d = ["M", centerX, centerY, "L", startOuter.x, startOuter.y, "A", radius, radius, 0, largeArcFlag, 1, endOuter.x, endOuter.y, "Z"].join(" ");
            }

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", d);
            const color = this.options.colors[index % this.options.colors.length];
            path.setAttribute("fill", color);
            path.setAttribute("class", "pie-slice");
            path.style.animationDelay = `${index * 0.1}s`; // Staggered animation

            // Interaction
            path.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showDynamicOverlay(item, color);
            });

            svg.appendChild(path);

            // Add Label Calculation
            if (sliceAngle > 15) { // Only show label if slice is > 15 degrees (~4%)
                const midAngle = startAngle + (sliceAngle / 2);
                // Position label at 65% radius
                const labelPos = this.polarToCartesian(centerX, centerY, radius * 0.65, midAngle);

                const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", labelPos.x);
                text.setAttribute("y", labelPos.y);
                text.setAttribute("class", "pie-label-text");
                text.textContent = item.label;
                text.style.animationDelay = `${(index * 0.1) + 0.3}s`;

                svg.appendChild(text);
            }
            startAngle = endAngle;
        });

        // Overlay Container (Hidden by default)
        const overlay = document.createElement('div');
        overlay.id = `chart-overlay-${this.container.id}`;
        overlay.style.cssText = `
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(10, 10, 20, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
            z-index: 20;
            border-radius: 20px;
        `;
        overlay.innerHTML = `
            <div class="overlay-content" style="
                background: linear-gradient(145deg, rgba(30,30,40,0.95), rgba(20,20,30,0.98));
                padding: 2rem;
                border-radius: 20px;
                text-align: center;
                max-width: 85%;
                transform: translateY(20px);
                transition: transform 0.4s ease;
                border: 1px solid rgba(255,255,255,0.1);
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            ">
                <h3 id="overlay-title" style="margin: 0 0 0.5rem; font-size: 2rem; font-weight: 800;"></h3>
                <div id="overlay-value" style="font-size: 3.5rem; font-weight: 900; margin-bottom: 1rem; line-height: 1;"></div>
                <p id="overlay-desc" style="color: #bbb; line-height: 1.6; font-size: 0.95rem; margin-bottom: 1.5rem;"></p>
                <button onclick="this.closest('.glass').querySelector('.close-overlay-btn').click()" style="
                    padding: 0.5rem 2rem;
                    border: none;
                    background: rgba(255,255,255,0.1);
                    color: white;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: background 0.3s;
                ">Close</button>
            </div>
            <button class="close-overlay-btn" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; cursor: pointer; padding: 10px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        `;

        // Close logic
        const closeBtn = overlay.querySelector('.close-overlay-btn');
        const closeAction = (e) => {
            if (e) e.stopPropagation();
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            overlay.querySelector('.overlay-content').style.transform = 'translateY(20px)';
        };
        closeBtn.onclick = closeAction;
        overlay.querySelector('button[onclick]').onclick = closeAction;
        overlay.onclick = (e) => { if (e.target === overlay) closeAction(); };

        this.container.innerHTML = '';
        this.container.appendChild(svg);
        this.container.appendChild(overlay);
        this.overlayWithContext = { overlay, title: overlay.querySelector('#overlay-title'), value: overlay.querySelector('#overlay-value'), desc: overlay.querySelector('#overlay-desc') };
    }

    showDynamicOverlay(item, color) {
        const { overlay, title, value, desc } = this.overlayWithContext;

        title.textContent = item.label;
        title.style.color = color;

        value.textContent = item.value + '%';
        value.style.background = `linear-gradient(to right, white, ${color})`;
        value.style.webkitBackgroundClip = 'text';
        value.style.webkitTextFillColor = 'transparent';

        desc.textContent = item.description;

        // Show
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';
        overlay.querySelector('.overlay-content').style.transform = 'translateY(0)';
    }

    // Deprecated for this version
    showReport(item) { }
}

window.InteractivePieChart = InteractivePieChart;
