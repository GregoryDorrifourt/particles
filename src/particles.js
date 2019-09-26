export default class Particles {

    constructor(config = {}) {
        this.defaultConfig = {
            element: 'particles-background',
            contain: false,
            threshold: 150,
            particlesForScreenWidths: {
                small: 70,
                medium: 100,
                large: 150
            },
            fullscreen: false,
            addParticleOnClick: false,
            color: '#404040',
            bubble: true
        };
        this.config = { ...this.defaultConfig, ...config };
        this.stopped = false;
        this.rAF = null;
    }

    render(){

        const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        const canvas = document.getElementById(this.config.element);

        const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
        
        let mouseData = null;
        
        const ctx = canvas.getContext('2d');
        
        if(this.config.fullscreen) {

            let ww = window.innerWidth;
            let wh = window.innerHeight;
            
            ctx.canvas.width = ww;
            ctx.canvas.height = wh;
            
            // Resize canvas
            window.addEventListener('resize', () => {
                ww = window.innerWidth;
                wh = window.innerHeight;
                ctx.canvas.width = ww;
                ctx.canvas.height = wh;
            });
        }

        const color = this.convertHexToRgb(this.config.color);

        const threshold = this.config.threshold;
        
        let numParticles = this.config.particlesForScreenWidths.small;
        
        if (window.matchMedia("(min-width: 481px)").matches && !!this.config.particlesForScreenWidths.medium) {
            numParticles = this.config.particlesForScreenWidths.medium;
        }
        if (window.matchMedia("(min-width: 1025px)").matches && !!this.config.particlesForScreenWidths.large) {
            numParticles = this.config.particlesForScreenWidths.large;
        }

        const particles = [];
        for(let i=0; i<numParticles; i++) {
            particles.push(new Particle(canvas, this.config));
        }
        
        /* Event listeners */
        if (!isMobile) {

            // Track mouse move
            document.addEventListener('mousemove', (e) => {
                mouseData = {
                    x: e.clientX,
                    y: e.clientY
                }
            });

            // Remove mouse data on leave
            document.addEventListener('mouseleave', () => { mouseData = null }); 
            
            if(this.config.addParticleOnClick) {
                document.addEventListener('click', () => {
                    if(particles.length < (numParticles+50)){
                        particles.push(new Particle(canvas, this.config, mouseData))
                    }
                })
            }
        }
        
        const draw = () => {

            if(!document.hidden && !this.stopped) { // Check if tab is active
                
                ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    
                for (let i = 0; i < particles.length; i++) {
                    
                    const p = particles[i];
                    
                    const connectNearbyDots = (target, xd, yd) => {
                        const alpha = 1-(Math.max(xd,yd)/threshold);
                        ctx.beginPath();
                        ctx.lineWidth = 0.2;
                        ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(target.x, target.y);
                        ctx.stroke();
                    }
                    
                    /* Check nearby particles */
                    particles.forEach((nearbyParticle)=>{
                        
                        const xd = Math.abs(nearbyParticle.x - p.x);
                        if (xd < threshold) {
                            
                            const yd = Math.abs(nearbyParticle.y - p.y);
                            if (yd < threshold) {
                                connectNearbyDots(nearbyParticle, xd, yd)
                            }
                        }
                    });
    
                    let radius = p.size;
                    
                    /* Check mouse position if not on mobile device */
                    if(this.config.bubble && !isMobile && mouseData){
                        const mouseThreshold = threshold || 150;
                        const mxd = Math.abs(mouseData.x - p.x);
                        if(mxd<mouseThreshold){
                            
                            const myd = Math.abs(mouseData.y - p.y);
                            if (myd<mouseThreshold) {
                                if(threshold) { 
                                    connectNearbyDots(mouseData, mxd, myd);
                                }
                                radius += (mouseThreshold - Math.max(mxd,myd))/5;
                            }
                        }
                    }
                    
                    const basicAlpha = p.size/10;
                    ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${basicAlpha})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, radius, Math.PI * 2, false);
                    ctx.fill();
                    p.move();
                }
            }
            
            this.rAF = requestAnimationFrame(draw);
            
        }

        draw();
    
    }

    convertHexToRgb(color) {
        const arr = color.replace('#','').match(/.{1,2}/g);
        const r = parseInt(arr[0], 16);
        const g = parseInt(arr[1], 16);
        const b = parseInt(arr[2], 16);
        return {r, g, b};
    }

    stop() {
        this.stopped = true;
    }
    
    resume() {
        this.stopped = false;
    }

    reset(config) {
        this.config = {...this.defaultConfig, ...config};
        const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        cancelAnimationFrame(this.rAF);
        this.render();
    }
}

class Particle {

    constructor(canvas, config, coordinates = null) {
        
        this.maxPx = 30;
        this.canvas = canvas;
        this.coordinates = coordinates;
        
        if(canvas && !coordinates){
            this.ch = Math.max(canvas.height, (config.contain ? 0:800));
            this.cw = Math.max(canvas.width, (config.contain ? 0:1000));

            this.x = Math.random() * this.cw;
            this.y = Math.random() * this.ch;
        } else {
            this.x = coordinates.x;
            this.y = coordinates.y;
        }

        this.setSize();
        this.setVelocity();
    }
    
    setSize(){
        if(!this.size || this.size === 6) {
            this.size = Math.floor(Math.random()*3)+2;
        }
    }
    setVelocity() {
        this.vx = (Math.floor(Math.random()*10)-5)/10; // X axis velocity
        this.vy = (Math.floor(Math.random()*10)-5)/10; // Y axis velocity
    }

    move(){
        this.gpId = null;
        
        if(!this.vx || ! this.vy ){
            this.setVelocity();
        }

        this.x += this.vx;
        this.y += this.vy;

        if(this.canvas) {
            if(this.y > this.ch + 20) {
                this.y = -10;
                this.x = Math.random() * this.cw;
            }
            if(this.y < -20) {
                this.y = this.ch + 10;
                this.x = Math.random() * this.cw;
            }
            if(this.x > this.cw + 20) {
                this.y = Math.random() * this.ch;
                this.x = -10;
            }
            if(this.x < -20) {
                this.y = Math.random() * this.ch;
                this.x = this.cw + 10;
            }
        }
    }
    
}