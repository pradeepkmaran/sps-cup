// Global variables
let particleSystem = [];
let signalCanvas;
let particlesCanvas;
let signalCtx;
let particlesCtx;
let animationId;
let signalWaveforms = [];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvas();
    initializeParticleSystem();
    initializeSignalWaveforms();
    initializeCountdown();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeInteractiveElements();
    initializeProblemCards();
    startAnimationLoop();
});

// Canvas initialization
function initializeCanvas() {
    signalCanvas = document.getElementById('signal-canvas');
    particlesCanvas = document.getElementById('particles-canvas');
    
    if (!signalCanvas || !particlesCanvas) return;
    
    signalCtx = signalCanvas.getContext('2d');
    particlesCtx = particlesCanvas.getContext('2d');
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    if (!signalCanvas || !particlesCanvas) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    signalCanvas.width = width;
    signalCanvas.height = height;
    particlesCanvas.width = width;
    particlesCanvas.height = height;
}

// Particle System
class Particle {
    constructor(x, y, type = 'default') {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.life = 1.0;
        this.decay = 0.008;
        this.size = Math.random() * 4 + 1;
        this.type = type;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = (Math.random() - 0.5) * 0.03;
        this.pulse = Math.random() * Math.PI * 2;
        this.originalX = x;
        this.originalY = y;
        this.amplitude = Math.random() * 30 + 15;
        this.color = this.getTypeColor(type);
    }
    
    getTypeColor(type) {
        const colors = {
            'biomedical': '#00ffff',
            'wireless': '#0066ff', 
            'environmental': '#39ff14',
            'vehicles': '#ff6b35',
            'innovation': '#e91e63',
            'default': '#ffffff'
        };
        return colors[type] || colors['default'];
    }
    
    update(mouseX, mouseY) {
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            const force = (150 - distance) / 150;
            this.vx -= (dx / distance) * force * 0.03;
            this.vy -= (dy / distance) * force * 0.03;
        }
        
        // Update position with velocity damping
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Add floating motion
        this.pulse += 0.025;
        this.y += Math.sin(this.pulse) * 0.4;
        this.x += Math.cos(this.pulse * 0.7) * 0.2;
        
        // Boundary collision with bounce
        if (this.x <= 0 || this.x >= particlesCanvas.width) {
            this.vx *= -0.7;
            this.x = Math.max(0, Math.min(particlesCanvas.width, this.x));
        }
        if (this.y <= 0 || this.y >= particlesCanvas.height) {
            this.vy *= -0.7;
            this.y = Math.max(0, Math.min(particlesCanvas.height, this.y));
        }
        
        // Rotation and life decay
        this.angle += this.rotation;
        this.life -= this.decay * 0.3;
        
        // Reset if life is too low
        if (this.life <= 0) {
            this.life = 1.0;
            this.x = Math.random() * particlesCanvas.width;
            this.y = Math.random() * particlesCanvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life * 0.7;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        switch(this.type) {
            case 'biomedical':
                this.drawBiomedical(ctx);
                break;
            case 'wireless':
                this.drawWireless(ctx);
                break;
            case 'environmental':
                this.drawEnvironmental(ctx);
                break;
            case 'vehicles':
                this.drawVehicles(ctx);
                break;
            case 'innovation':
                this.drawInnovation(ctx);
                break;
            default:
                this.drawDefault(ctx);
        }
        
        ctx.restore();
    }
    
    drawDefault(ctx) {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawBiomedical(ctx) {
        // Draw EEG-like wave
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        for (let i = -10; i <= 10; i++) {
            const y = Math.sin(i * 0.5 + this.pulse) * 4;
            if (i === -10) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
        }
        ctx.stroke();
    }
    
    drawWireless(ctx) {
        // Draw Wi-Fi signal waves
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        
        for (let i = 1; i <= 3; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, i * 3, -Math.PI/4, Math.PI/4);
            ctx.stroke();
        }
    }
    
    drawEnvironmental(ctx) {
        // Draw seismic wave pattern
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-3, -8);
        ctx.lineTo(0, 12);
        ctx.lineTo(3, -6);
        ctx.lineTo(5, 0);
        ctx.lineTo(8, 0);
        ctx.stroke();
    }
    
    drawVehicles(ctx) {
        // Draw gear-like pattern
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const x1 = Math.cos(angle) * 4;
            const y1 = Math.sin(angle) * 4;
            const x2 = Math.cos(angle) * 8;
            const y2 = Math.sin(angle) * 8;
            
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }
        ctx.stroke();
    }
    
    drawInnovation(ctx) {
        // Draw star pattern
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * 6;
            const y = Math.sin(angle) * 6;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }
}

function initializeParticleSystem() {
    particleSystem = [];
    const particleTypes = ['biomedical', 'wireless', 'environmental', 'vehicles', 'innovation', 'default'];
    
    for (let i = 0; i < 60; i++) {
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        particleSystem.push(new Particle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            type
        ));
    }
}

// Signal Waveforms for background
class SignalWaveform {
    constructor(type, y, color, frequency = 0.01) {
        this.type = type;
        this.y = y;
        this.color = color;
        this.frequency = frequency;
        this.amplitude = 40;
        this.offset = 0;
        this.points = [];
    }
    
    update() {
        this.offset += this.frequency;
        this.points = [];
        
        if (!signalCanvas) return;
        
        for (let x = 0; x <= signalCanvas.width + 100; x += 8) {
            let y;
            switch(this.type) {
                case 'biomedical':
                    y = this.generateBiomedical(x);
                    break;
                case 'wireless':
                    y = this.generateWireless(x);
                    break;
                case 'environmental':
                    y = this.generateEnvironmental(x);
                    break;
                case 'vehicles':
                    y = this.generateVehicles(x);
                    break;
                default:
                    y = this.generateDefault(x);
            }
            this.points.push({ x: x - this.offset * 150, y: this.y + y });
        }
    }
    
    generateBiomedical(x) {
        const baseFreq = 0.015;
        const pos = x * baseFreq + this.offset;
        
        // EEG-like pattern
        return Math.sin(pos) * 20 + 
               Math.sin(pos * 2.3) * 12 + 
               Math.sin(pos * 3.7) * 8 +
               Math.random() * 6 - 3;
    }
    
    generateWireless(x) {
        const pos = x * 0.02 + this.offset;
        return Math.sin(pos) * 15 + 
               Math.sin(pos * 1.8) * 10 + 
               Math.cos(pos * 0.7) * 18;
    }
    
    generateEnvironmental(x) {
        const pos = x * 0.012 + this.offset;
        const cyclePos = (pos % (Math.PI * 4));
        
        let signal = Math.sin(pos * 0.5) * 8;
        
        // Add seismic spike occasionally
        if (cyclePos > 3 && cyclePos < 3.3) {
            signal += Math.sin((cyclePos - 3) * 10) * 25;
        }
        
        return signal + Math.random() * 4 - 2;
    }
    
    generateVehicles(x) {
        const pos = x * 0.025 + this.offset;
        return Math.sin(pos) * 12 + 
               Math.cos(pos * 1.5) * 8 + 
               Math.sin(pos * 0.3) * 15 +
               (Math.random() - 0.5) * 8;
    }
    
    generateDefault(x) {
        const pos = x * 0.02 + this.offset;
        return Math.sin(pos) * this.amplitude * 0.7;
    }
    
    draw(ctx) {
        if (!ctx || this.points.length === 0) return;
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = 0.3;
        
        ctx.beginPath();
        let started = false;
        
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            if (point.x > -100 && point.x < signalCanvas.width + 100) {
                if (!started) {
                    ctx.moveTo(point.x, point.y);
                    started = true;
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            }
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
}

function initializeSignalWaveforms() {
    if (!signalCanvas) return;
    
    signalWaveforms = [
        new SignalWaveform('biomedical', signalCanvas.height * 0.15, '#00ffff', 0.01),
        new SignalWaveform('wireless', signalCanvas.height * 0.35, '#0066ff', 0.013),
        new SignalWaveform('environmental', signalCanvas.height * 0.55, '#39ff14', 0.008),
        new SignalWaveform('vehicles', signalCanvas.height * 0.75, '#ff6b35', 0.016),
        new SignalWaveform('default', signalCanvas.height * 0.9, '#e91e63', 0.011)
    ];
}

// Countdown Timer
function initializeCountdown() {
    // Target date: September 25th, 2025 (Registration deadline)
    const targetDate = new Date('2025-09-25T23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            animateNumber('days', days);
            animateNumber('hours', hours);
            animateNumber('minutes', minutes);
            animateNumber('seconds', seconds);
        } else {
            // Registration period ended
            const regText = document.querySelector('.registration-info .reg-text');
            if (regText) {
                regText.textContent = 'Registration Period Ended';
            }
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function animateNumber(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue !== targetValue) {
        element.textContent = targetValue.toString().padStart(2, '0');
        
        // Add pulse effect
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }
}

// Problem Cards Expandable Functionality
function initializeProblemCards() {
    const problemCards = document.querySelectorAll('.problem-card');
    
    problemCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const details = card.querySelector('.problem-details');
        
        if (expandBtn && details) {
            expandBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isExpanded = expandBtn.getAttribute('data-expanded') === 'true';
                
                if (isExpanded) {
                    // Collapse
                    details.classList.remove('expanded');
                    expandBtn.setAttribute('data-expanded', 'false');
                    expandBtn.textContent = '+';
                } else {
                    // Expand
                    details.classList.add('expanded');
                    expandBtn.setAttribute('data-expanded', 'true');
                    expandBtn.textContent = '−';
                }
                
                // Add visual feedback
                card.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 200);
                
                // Create particle burst effect
                createParticleBurst(expandBtn);
            });
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate statistics counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // Animate structure items
                if (entry.target.classList.contains('structure-item')) {
                    entry.target.classList.add('visible');
                }
                
                // Add staggered animation for grids
                if (entry.target.classList.contains('purpose-grid') || 
                    entry.target.classList.contains('criteria-grid') ||
                    entry.target.classList.contains('outcomes-grid')) {
                    const cards = entry.target.querySelectorAll('.purpose-card, .criteria-card, .outcome-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll('.stat-item, .purpose-card, .criteria-card, .outcome-card, .structure-item, .award-highlight, .purpose-grid, .criteria-grid, .outcomes-grid');
    
    elementsToObserve.forEach(el => {
        if (!el.classList.contains('purpose-grid') && 
            !el.classList.contains('criteria-grid') &&
            !el.classList.contains('outcomes-grid')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.8s ease';
        }
        observer.observe(el);
    });
    
    // Observe stat numbers separately
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);

    const baseSpeed = 50;
    const minDuration = 200;
    const maxDuration = 1200;

    let duration = Math.max(minDuration, Math.min(maxDuration, target * baseSpeed));
    duration += Math.random() * 500;

    const start = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        let progress = elapsed / duration;
        if (progress > 1) progress = 1;

        // Linear progress without easing
        const current = Math.floor(progress * target);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}


// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('data-scroll');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Track mouse movement for particle interactions
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Store mouse position globally
        window.mouseX = mouseX;
        window.mouseY = mouseY;
    });
    
    // Register button interactions
    const registerBtn = document.getElementById('register-btn');
    const floatingRegister = document.getElementById('floating-register');
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            showRegistrationModal();
        });
    }
    
    if (floatingRegister) {
        floatingRegister.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            showRegistrationModal();
        });
    }
    
    // Brand logo click to scroll to top
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Navbar scroll behavior
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            // Add background opacity based on scroll
            const opacity = Math.min(scrollTop / 100, 0.95);
            navbar.style.background = `rgba(10, 10, 10, ${opacity})`;
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Floating action button behavior
    const floatingBtn = document.getElementById('floating-register');
    if (floatingBtn) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            if (scrolled > 800) {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.transform = 'scale(1)';
            } else {
                floatingBtn.style.opacity = '0';
                floatingBtn.style.transform = 'scale(0.8)';
            }
        });
    }
    
    // Add hover effects to track sections
    const trackSections = document.querySelectorAll('.track-section');
    trackSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.borderColor = 'rgba(0, 255, 255, 0.4)';
            section.style.backgroundColor = 'rgba(0, 255, 255, 0.02)';
        });
        
        section.addEventListener('mouseleave', () => {
            section.style.borderColor = 'rgba(0, 255, 255, 0.1)';
            section.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        });
    });
}

// Registration Modal
function showRegistrationModal() {
    // Remove any existing modals
    const existingModals = document.querySelectorAll('.registration-modal');
    existingModals.forEach(modal => modal.remove());
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'registration-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.92);
        backdrop-filter: blur(15px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: modalFadeIn 0.4s ease;
    `;
    
    modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); border: 2px solid #00ffff; border-radius: 25px; padding: 3rem; max-width: 600px; width: 90%; text-align: center; position: relative; box-shadow: 0 0 60px rgba(0, 255, 255, 0.4); animation: modalSlideIn 0.4s ease;">
            <button id="close-modal" style="position: absolute; top: 1rem; right: 1.5rem; background: none; border: none; color: #00ffff; font-size: 2.5rem; cursor: pointer; transition: all 0.3s ease; line-height: 1;">&times;</button>
            
            <div style="margin-bottom: 2rem;">
                <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #00ffff, #0066ff); border-radius: 50%; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; animation: iconPulse 2s infinite;">
                    <span style="font-size: 2rem; color: #1a1a2e;">🚀</span>
                </div>
            </div>
            
            <h2 style="color: #ffffff; margin-bottom: 1rem; font-size: 2.2rem; text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);">Registration Opens Soon!</h2>
            
            <p style="color: #ffffff; margin-bottom: 2.5rem; line-height: 1.7; font-size: 1.1rem;">
                Get ready for the most exciting signal processing challenge! Registration for the Signal Processing Cup Challenge 2025 will open during the specified dates.
            </p>
            
            <div style="background: rgba(0, 0, 0, 0.4); border-radius: 15px; padding: 2rem; margin-bottom: 2rem;">
                <h3 style="color: #ff6b35; margin-bottom: 1.5rem; text-shadow: 0 0 10px rgba(255, 107, 53, 0.5); font-size: 1.3rem;">📅 Important Dates</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; text-align: left;">
                    <div style="background: rgba(0, 255, 255, 0.1); padding: 1rem; border-radius: 10px; border-left: 3px solid #00ffff;">
                        <strong style="color: #00ffff;">Registration Period:</strong><br>
                        <span style="color: #ffffff;">16-25 September 2025</span>
                    </div>
                    <div style="background: rgba(0, 102, 255, 0.1); padding: 1rem; border-radius: 10px; border-left: 3px solid #0066ff;">
                        <strong style="color: #0066ff;">Grand Demo Day:</strong><br>
                        <span style="color: #ffffff;">16-17 October 2025</span>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button id="notify-btn" style="background: linear-gradient(135deg, #00ffff, #0066ff); color: #1a1a2e; padding: 1rem 2rem; border: none; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 1rem; transition: all 0.3s ease; box-shadow: 0 0 25px rgba(0, 255, 255, 0.4); position: relative; overflow: hidden;">
                    <span style="position: relative; z-index: 1;">🔔 Notify Me</span>
                </button>
                <button id="learn-more-btn" style="background: rgba(255, 107, 53, 0.1); color: #ff6b35; padding: 1rem 2rem; border: 2px solid #ff6b35; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 1rem; transition: all 0.3s ease;">
                    📖 Learn More
                </button>
            </div>
            
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(0, 255, 255, 0.2);">
                <h4 style="color: #39ff14; margin-bottom: 1rem;">🏆 What You Can Win</h4>
                <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <span style="display: block; font-size: 1.5rem; margin-bottom: 0.5rem;">💰</span>
                        <span style="color: #ffffff; font-size: 0.9rem;">Cash Prizes</span>
                    </div>
                    <div style="text-align: center;">
                        <span style="display: block; font-size: 1.5rem; margin-bottom: 0.5rem;">🏅</span>
                        <span style="color: #ffffff; font-size: 0.9rem;">Certificates</span>
                    </div>
                    <div style="text-align: center;">
                        <span style="display: block; font-size: 1.5rem; margin-bottom: 0.5rem;">🤝</span>
                        <span style="color: #ffffff; font-size: 0.9rem;">Recognition</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes modalSlideIn {
            from { opacity: 0; transform: scale(0.8) translateY(-50px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        @keyframes modalFadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.9); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Event listeners
    const closeBtn = modal.querySelector('#close-modal');
    const notifyBtn = modal.querySelector('#notify-btn');
    const learnMoreBtn = modal.querySelector('#learn-more-btn');
    
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.animation = 'modalFadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    
    notifyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        notifyBtn.innerHTML = '<span style="position: relative; z-index: 1;">✅ You\'ll be notified!</span>';
        notifyBtn.style.background = 'linear-gradient(135deg, #39ff14, #00ff7f)';
        
        // Add particle burst effect
        createParticleBurst(notifyBtn);
        
        setTimeout(() => {
            closeBtn.click();
        }, 2000);
    });
    
    learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeBtn.click();
        setTimeout(() => {
            // Scroll to tracks section
            const tracksSection = document.getElementById('tracks');
            if (tracksSection) {
                tracksSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
    
    // Close on ESC key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeBtn.click();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Create particle burst when modal opens
    setTimeout(() => {
        createParticleBurst(modal.querySelector('h2'));
    }, 400);
}

// Particle burst effect
function createParticleBurst(element) {
    if (!element || !particleSystem) return;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Add temporary particles for burst effect
    for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const velocity = 3 + Math.random() * 2;
        const particle = new Particle(centerX, centerY, 'innovation');
        particle.vx = Math.cos(angle) * velocity;
        particle.vy = Math.sin(angle) * velocity;
        particle.life = 0.8;
        particleSystem.push(particle);
    }
}

// Main Animation Loop
function startAnimationLoop() {
    if (!signalCanvas || !particlesCanvas) return;
    
    function animate() {
        // Clear canvases
        if (signalCtx) signalCtx.clearRect(0, 0, signalCanvas.width, signalCanvas.height);
        if (particlesCtx) particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        
        // Update and draw signal waveforms
        signalWaveforms.forEach(waveform => {
            waveform.update();
            waveform.draw(signalCtx);
        });
        
        // Update and draw particles
        const mouseX = window.mouseX || particlesCanvas.width / 2;
        const mouseY = window.mouseY || particlesCanvas.height / 2;
        
        if (particleSystem && particleSystem.length > 0) {
            // Remove dead particles and update living ones
            particleSystem = particleSystem.filter(particle => {
                particle.update(mouseX, mouseY);
                particle.draw(particlesCtx);
                return particle.life > 0;
            });
            
            // Maintain minimum particle count
            while (particleSystem.length < 60) {
                const types = ['biomedical', 'wireless', 'environmental', 'vehicles', 'innovation', 'default'];
                const randomType = types[Math.floor(Math.random() * types.length)];
                particleSystem.push(new Particle(
                    Math.random() * particlesCanvas.width,
                    Math.random() * particlesCanvas.height,
                    randomType
                ));
            }
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    
    // Reinitialize signal waveforms
    if (signalWaveforms.length > 0) {
        initializeSignalWaveforms();
    }
});

// Performance optimization: pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    } else {
        startAnimationLoop();
    }
});

// Easter eggs and interactions
let clickCount = 0;
document.addEventListener('click', (e) => {
    clickCount++;
    
    // Add particle burst on click
    if (particleSystem && particleSystem.length < 100) {
        for (let i = 0; i < 8; i++) {
            const types = ['biomedical', 'wireless', 'environmental', 'vehicles', 'innovation'];
            const randomType = types[Math.floor(Math.random() * types.length)];
            const angle = (i / 8) * Math.PI * 2;
            const particle = new Particle(e.clientX, e.clientY, randomType);
            particle.vx = Math.cos(angle) * 2;
            particle.vy = Math.sin(angle) * 2;
            particleSystem.push(particle);
        }
    }
    
    // Special effect after multiple clicks
    if (clickCount === 15) {
        document.body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
        setTimeout(() => {
            document.body.style.filter = 'none';
            clickCount = 0;
        }, 3000);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'r':
        case 'R':
            if (e.ctrlKey || e.metaKey) return;
            e.preventDefault();
            showRegistrationModal();
            break;
        case 'Escape':
            const modals = document.querySelectorAll('.registration-modal');
            modals.forEach(modal => {
                if (modal.parentNode) modal.parentNode.removeChild(modal);
            });
            break;
        case ' ': // Spacebar
            if (e.target === document.body) {
                e.preventDefault();
                // Add burst of particles
                for (let i = 0; i < 20; i++) {
                    const types = ['biomedical', 'wireless', 'environmental', 'vehicles', 'innovation'];
                    const randomType = types[Math.floor(Math.random() * types.length)];
                    particleSystem.push(new Particle(
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight,
                        randomType
                    ));
                }
            }
            break;
    }
});

// Console messages
console.log('🚀 SPS CUP 2025 - Signal Processing Cup Challenge - Interactive Website Loaded!');
console.log('💡 Press "R" to open registration modal');
console.log('🎨 Click anywhere to create particle effects');
console.log('⚡ Press Spacebar for particle burst');
console.log('🔬 Built with passion for signal processing innovation');

// Initialize mouse position
window.mouseX = window.innerWidth / 2;
window.mouseY = window.innerHeight / 2;