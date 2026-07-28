/**
 * HeroLogo Component (Vanilla JS Module)
 * 
 * Reusable, optional interactive text effects for the main KHATA brand logo.
 * Replicates the behavior and options of the React Bits Variable Proximity component.
 */

class HeroLogo {
    constructor(container, options = {}) {
        this.container = container;
        this.text = "KHATA";
        
        // Default options matching specifications
        this.options = {
            interactive: false,
            radius: 90,           // between 80px and 100px
            falloff: 'linear',    // linear falloff
            minWeight: 300,       // subtle weight range (around 400 -> 800, using 300-800 for Roboto Flex light weights)
            maxWeight: 800,
            ...options
        };

        this.chars = [];
        this.rectsCache = [];
        this.mouseMoveHandler = null;
        this.resizeHandler = null;

        this.init();
    }

    init() {
        if (!this.container) return;

        if (!this.options.interactive) {
            // Render plain static typography
            this.container.innerHTML = this.text;
            this.container.style.fontVariationSettings = `'wght' 300, 'opsz' 36`;
            return;
        }

        // Render characters wrapped in spans for interactive weight morphing
        this.container.innerHTML = this.text.split("").map(char => {
            return `<span class="prox-char" style="display:inline-block; font-variation-settings: 'wght' ${this.options.minWeight}, 'opsz' 36;">${char}</span>`;
        }).join("");

        this.chars = this.container.querySelectorAll(".prox-char");
        
        // Cache initial bounding boxes to avoid page layouts on mousemove (performance optimization)
        this.cacheMeasurements();

        // Bind interactive event handlers
        this.mouseMoveHandler = (e) => this.handleMouseMove(e);
        this.resizeHandler = () => this.cacheMeasurements();

        document.addEventListener("mousemove", this.mouseMoveHandler);
        window.addEventListener("resize", this.resizeHandler);
        window.addEventListener("scroll", this.resizeHandler);
    }

    cacheMeasurements() {
        this.rectsCache = Array.from(this.chars).map(char => {
            const rect = char.getBoundingClientRect();
            return {
                element: char,
                centerX: rect.left + rect.width / 2 + window.scrollX,
                centerY: rect.top + rect.height / 2 + window.scrollY
            };
        });
    }

    handleMouseMove(e) {
        const mouseX = e.clientX + window.scrollX;
        const mouseY = e.clientY + window.scrollY;
        const radius = this.options.radius;
        const { minWeight, maxWeight, falloff } = this.options;

        this.rectsCache.forEach(cache => {
            const dist = Math.hypot(mouseX - cache.centerX, mouseY - cache.centerY);
            let weight = minWeight;

            if (dist < radius) {
                let ratio = 0;
                if (falloff === 'linear') {
                    // Linear falloff: weight fades linearly as distance increases
                    ratio = (radius - dist) / radius;
                } else if (falloff === 'gaussian') {
                    // Gaussian falloff
                    ratio = Math.exp(-Math.pow(dist / (radius * 0.6), 2));
                }
                
                // Keep ratio bounded [0, 1]
                ratio = Math.max(0, Math.min(1, ratio));
                weight = minWeight + Math.round(ratio * (maxWeight - minWeight));
            }

            cache.element.style.fontVariationSettings = `'wght' ${weight}, 'opsz' 36`;
        });
    }

    destroy() {
        // Cleanup event listeners when component is destroyed or re-rendered
        if (this.mouseMoveHandler) {
            document.removeEventListener("mousemove", this.mouseMoveHandler);
        }
        if (this.resizeHandler) {
            window.removeEventListener("resize", this.resizeHandler);
            window.removeEventListener("scroll", this.resizeHandler);
        }
    }
}

// Expose component to global window namespace
window.HeroLogo = HeroLogo;
