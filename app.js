// Global variables
let particleSystem;
let signalCanvas;
let particlesCanvas;
let signalCtx;
let particlesCtx;
let animationId;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvas();
    initializeParticleSystem();
    initializeSignalWaveforms();
    initializeCountdown();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeInteractiveElements();
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
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.life = 1.0;
        this.decay = 0.01;
        this.size = Math.random() * 3 + 1;
        this.type = type;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = (Math.random() - 0.5) * 0.02;
        this.pulse = Math.random() * Math.PI * 2;
        this.originalX = x;
        this.originalY = y;
        this.amplitude = Math.random() * 20 + 10;
    }
    
    update(mouseX, mouseY) {
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            this.vx -= (dx / distance) * force * 0.02;
            this.vy -= (dy / distance) * force * 0.02;
        }
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Add floating motion
        this.pulse += 0.02;
        this.y += Math.sin(this.pulse) * 0.3;
        
        // Boundary collision
        if (this.x <= 0 || this.x >= particlesCanvas.width) this.vx *= -0.8;
        if (this.y <= 0 || this.y >= particlesCanvas.height) this.vy *= -0.8;
        
        // Keep in bounds
        this.x = Math.max(0, Math.min(particlesCanvas.width, this.x));
        this.y = Math.max(0, Math.min(particlesCanvas.height, this.y));
        
        // Rotation and life decay
        this.angle += this.rotation;
        this.life -= this.decay * 0.1;
        
        // Reset if life is too low
        if (this.life <= 0) {
            this.life = 1.0;
            this.x = Math.random() * particlesCanvas.width;
            this.y = Math.random() * particlesCanvas.height;
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life * 0.6;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        switch(this.type) {
            case 'ecg':
                this.drawECG(ctx);
                break;
            case 'eeg':
                this.drawEEG(ctx);
                break;
            case 'medical':
                this.drawMedical(ctx);
                break;
            default:
                this.drawDefault(ctx);
        }
        
        ctx.restore();
    }
    
    drawDefault(ctx) {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, '#00ffff');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawECG(ctx) {
        ctx.strokeStyle = '#ff5459';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(-2, 0);
        ctx.lineTo(0, -10);
        ctx.lineTo(2, 15);
        ctx.lineTo(4, -5);
        ctx.lineTo(6, 0);
        ctx.lineTo(8, 0);
        ctx.stroke();
    }
    
    drawEEG(ctx) {
        ctx.strokeStyle = '#0066ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = -8; i <= 8; i++) {
            const y = Math.sin(i * 0.5) * 5;
            if (i === -8) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
        }
        ctx.stroke();
    }
    
    drawMedical(ctx) {
        ctx.strokeStyle = '#39ff14';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Draw a plus sign
        ctx.moveTo(0, -6);
        ctx.lineTo(0, 6);
        ctx.moveTo(-6, 0);
        ctx.lineTo(6, 0);
        ctx.stroke();
    }
}

function initializeParticleSystem() {
    particleSystem = [];
    const particleTypes = ['default', 'ecg', 'eeg', 'medical'];
    
    for (let i = 0; i < 50; i++) {
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        particleSystem.push(new Particle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            type
        ));
    }
}

// Signal Waveforms
class SignalWaveform {
    constructor(type, y, color, frequency = 0.01) {
        this.type = type;
        this.y = y;
        this.color = color;
        this.frequency = frequency;
        this.amplitude = 30;
        this.offset = 0;
        this.points = [];
    }
    
    update() {
        this.offset += this.frequency;
        this.points = [];
        
        if (!signalCanvas) return;
        
        for (let x = 0; x <= signalCanvas.width + 50; x += 5) {
            let y;
            switch(this.type) {
                case 'ecg':
                    y = this.generateECG(x);
                    break;
                case 'eeg':
                    y = this.generateEEG(x);
                    break;
                case 'emg':
                    y = this.generateEMG(x);
                    break;
                default:
                    y = this.generateDefault(x);
            }
            this.points.push({ x: x - this.offset * 100, y: this.y + y });
        }
    }
    
    generateECG(x) {
        const baseFreq = 0.01;
        const pos = x * baseFreq + this.offset;
        
        // ECG pattern: P wave, QRS complex, T wave
        let signal = 0;
        const cyclePos = (pos % (Math.PI * 2));
        
        if (cyclePos > 1.0 && cyclePos < 1.5) {
            // P wave
            signal = Math.sin((cyclePos - 1.0) * 4) * 8;
        } else if (cyclePos > 2.5 && cyclePos < 3.2) {
            // QRS complex
            const qrsPos = (cyclePos - 2.5) / 0.7;
            if (qrsPos < 0.3) signal = -qrsPos * 15;
            else if (qrsPos < 0.6) signal = (qrsPos - 0.3) * 50 - 5;
            else signal = -(qrsPos - 0.6) * 25 + 10;
        } else if (cyclePos > 4.0 && cyclePos < 5.0) {
            // T wave
            signal = Math.sin((cyclePos - 4.0) * Math.PI) * 12;
        }
        
        return signal + Math.sin(pos * 10) * 2; // Add some noise
    }
    
    generateEEG(x) {
        const pos = x * 0.02 + this.offset;
        return Math.sin(pos) * 15 + 
               Math.sin(pos * 1.5) * 8 + 
               Math.sin(pos * 2.3) * 5 +
               Math.random() * 4 - 2;
    }
    
    generateEMG(x) {
        const pos = x * 0.03 + this.offset;
        return (Math.random() - 0.5) * 25 + 
               Math.sin(pos) * 10 +
               Math.sin(pos * 0.5) * 15;
    }
    
    generateDefault(x) {
        const pos = x * 0.02 + this.offset;
        return Math.sin(pos) * this.amplitude;
    }
    
    draw(ctx) {
        if (!ctx) return;
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = 0.4;
        
        ctx.beginPath();
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            if (point.x > -50 && point.x < signalCanvas.width + 50) {
                if (i === 0 || this.points[i-1].x < -50) {
                    ctx.moveTo(point.x, point.y);
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

let signalWaveforms = [];

function initializeSignalWaveforms() {
    if (!signalCanvas) return;
    
    signalWaveforms = [
        new SignalWaveform('ecg', signalCanvas.height * 0.2, '#ff5459', 0.008),
        new SignalWaveform('eeg', signalCanvas.height * 0.5, '#0066ff', 0.012),
        new SignalWaveform('emg', signalCanvas.height * 0.8, '#39ff14', 0.015)
    ];
}

// Countdown Timer
function initializeCountdown() {
    // Target date: September 28th, 2025 (Round 1)
    const targetDate = new Date('2025-09-28T00:00:00').getTime();
    
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
        const step = targetValue > currentValue ? 1 : -1;
        const newValue = currentValue + step;
        element.textContent = newValue.toString().padStart(2, '0');
        
        // Add pulse effect
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
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
                
                // Animate round items
                if (entry.target.classList.contains('round-item')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.stat-item, .purpose-card, .track-card, .award-card, .round-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
    
    // Observe stat numbers separately
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
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

// Smooth Scrolling - FIXED
function initializeSmoothScrolling() {
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('data-scroll');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Interactive Elements - FIXED
function initializeInteractiveElements() {
    let mouseX = 0;
    let mouseY = 0;
    
    // Track mouse movement for particle interactions
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Store mouse position for particle system
        window.mouseX = mouseX;
        window.mouseY = mouseY;
    });
    
    // Register button interactions - FIXED
    const registerBtn = document.getElementById('register-btn');
    const floatingRegister = document.getElementById('floating-register');
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showRegistrationModal();
        });
    }
    
    if (floatingRegister) {
        floatingRegister.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showRegistrationModal();
        });
    }
    
    // Track card hover effects
    document.querySelectorAll('.track-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'rgba(0, 255, 255, 0.6)';
            card.style.boxShadow = '0 30px 60px rgba(0, 255, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'rgba(0, 255, 255, 0.15)';
            card.style.boxShadow = 'none';
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Floating action button scroll behavior
    const floatingBtn = document.getElementById('floating-register');
    if (floatingBtn) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled > 500) {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.transform = `translateY(${rate * 0.1}px) scale(1)`;
            } else {
                floatingBtn.style.opacity = '0';
                floatingBtn.style.transform = `translateY(${rate * 0.1}px) scale(0.8)`;
            }
        });
    }
}

// Registration Modal - FIXED
function showRegistrationModal() {
    // Remove any existing modals first
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
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); border: 2px solid #00ffff; border-radius: 20px; padding: 3rem; max-width: 500px; width: 90%; text-align: center; position: relative; box-shadow: 0 0 50px rgba(0, 255, 255, 0.3);">
            <button id="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #00ffff; font-size: 2rem; cursor: pointer; transition: all 0.3s ease;">&times;</button>
            <h2 style="color: #00ffff; margin-bottom: 2rem; font-size: 2rem; text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);">Registration Opening Soon!</h2>
            <p style="color: #cccccc; margin-bottom: 2rem; line-height: 1.6;">
                Registration for the Signal Processing Cup Challenge 2025 will open soon. 
                Stay tuned for updates on our official channels.
            </p>
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #ff6b35; margin-bottom: 1rem; text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);">Important Dates:</h3>
                <ul style="text-align: left; color: #cccccc; list-style: none; padding: 0;">
                    <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                        <span style="position: absolute; left: 0; color: #00ffff;">→</span>
                        PPT Screening: September 28, 2025
                    </li>
                    <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                        <span style="position: absolute; left: 0; color: #00ffff;">→</span>
                        Online Round: Sept - Oct 2, 2025
                    </li>
                    <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                        <span style="position: absolute; left: 0; color: #00ffff;">→</span>
                        Final Round: Oct 16-17, 2025
                    </li>
                </ul>
            </div>
            <button id="notify-btn" style="background: linear-gradient(135deg, #00ffff, #0066ff); color: #1a1a2e; padding: 1rem 2rem; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1rem; transition: all 0.3s ease; box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);">
                Notify Me When Registration Opens
            </button>
        </div>
    `;
    
    // Add fade in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .registration-modal > div {
            animation: fadeIn 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('#close-modal');
    const notifyBtn = modal.querySelector('#notify-btn');
    
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    
    // Notify button
    notifyBtn.addEventListener('click', () => {
        notifyBtn.textContent = '✓ You\'ll be notified!';
        notifyBtn.style.background = 'linear-gradient(135deg, #39ff14, #00ff7f)';
        setTimeout(() => {
            closeBtn.click();
        }, 1500);
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
        
        if (particleSystem) {
            particleSystem.forEach(particle => {
                particle.update(mouseX, mouseY);
                particle.draw(particlesCtx);
            });
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    
    // Reinitialize particle system with new canvas size
    if (particleSystem) {
        particleSystem = [];
        initializeParticleSystem();
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

// Add some interactive easter eggs
let clickCount = 0;
document.addEventListener('click', (e) => {
    clickCount++;
    
    // Add particle burst on click
    if (particleSystem && particleSystem.length < 100) {
        for (let i = 0; i < 5; i++) {
            const types = ['ecg', 'eeg', 'medical'];
            const randomType = types[Math.floor(Math.random() * types.length)];
            particleSystem.push(new Particle(
                e.clientX + (Math.random() - 0.5) * 50,
                e.clientY + (Math.random() - 0.5) * 50,
                randomType
            ));
        }
    }
    
    // Special effect after multiple clicks
    if (clickCount === 10) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
            clickCount = 0;
        }, 2000);
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'r':
        case 'R':
            if (e.ctrlKey || e.metaKey) return;
            e.preventDefault();
            showRegistrationModal();
            break;
        case 'Escape':
            // Close any open modals
            const modals = document.querySelectorAll('.registration-modal');
            modals.forEach(modal => {
                if (modal.parentNode) modal.parentNode.removeChild(modal);
            });
            break;
    }
});

console.log('🚀 Signal Processing Cup Challenge 2025 - Interactive Website Loaded!');
console.log('💡 Press "R" to open registration modal');
console.log('🎨 Click anywhere to create particle effects');
console.log('⚡ Built with love for biomedical signal processing');