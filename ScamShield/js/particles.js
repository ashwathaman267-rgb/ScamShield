// Particle Background System
// Creates an interactive particle background that follows mouse movement

class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.particleCount = 250; // Maximum density for "star string" effect

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const colors = this.getThemeColors();

        for (let i = 0; i < this.particleCount; i++) {
            const size = Math.random() * 2.5 + 1; // Slightly smaller for better star effect
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const speedX = (Math.random() - 0.5) * 1.0; // Faster movement
            const speedY = (Math.random() - 0.5) * 1.0;
            const color = colors[Math.floor(Math.random() * colors.length)];

            this.particles.push({
                x, y, size, speedX, speedY, color,
                baseX: x,
                baseY: y,
                density: (Math.random() * 40) + 1
            });
        }
    }

    getThemeColors() {
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            return [
                'rgba(129, 140, 248, 0.9)', // Higher opacity
                'rgba(192, 132, 252, 0.7)',
                'rgba(52, 211, 153, 0.5)'
            ];
        }
        return [
            'rgba(99, 102, 241, 0.9)',
            'rgba(168, 85, 247, 0.7)',
            'rgba(16, 185, 129, 0.5)'
        ];
    }

    // ... setupEventListeners ...

    drawParticle(particle) {
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 160) { // Increased connection distance again
                    const opacity = (1 - distance / 120) * 0.3;
                    this.ctx.strokeStyle = this.particles[i].color.replace(/[\d.]+\)$/g, opacity + ')');
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    updateParticles() {
        for (let particle of this.particles) {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
            }

            // Mouse interaction
            if (this.mouse.x != null && this.mouse.y != null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = this.mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * particle.density;
                const directionY = forceDirectionY * force * particle.density;

                if (distance < this.mouse.radius) {
                    particle.x -= directionX;
                    particle.y -= directionY;
                } else {
                    // Slowly return to base position
                    if (particle.x !== particle.baseX) {
                        const dx = particle.x - particle.baseX;
                        particle.x -= dx / 20;
                    }
                    if (particle.y !== particle.baseY) {
                        const dy = particle.y - particle.baseY;
                        particle.y -= dy / 20;
                    }
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.updateParticles();
        this.connectParticles();

        for (let particle of this.particles) {
            this.drawParticle(particle);
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle background when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.particleBackground = new ParticleBackground();
    });
} else {
    window.particleBackground = new ParticleBackground();
}
