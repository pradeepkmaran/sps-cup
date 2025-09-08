// Application data and configuration
const APP_DATA = {
    navigation: {
        brand: "SPS CUP 2025",
        pages: [
            {"id": "home", "title": "Home", "icon": "home"},
            {"id": "overview", "title": "Overview", "icon": "info"},
            {"id": "tracks", "title": "Tracks", "icon": "layers"},
            {"id": "timeline", "title": "Timeline", "icon": "calendar"},
            {"id": "guidelines", "title": "Guidelines", "icon": "rules"},
            {"id": "contact", "title": "Contact", "icon": "contact"}
        ]
    },
    pages: {
        home: {
            title: "Signal Processing Cup Challenge",
            subtitle: "A National-Level Innovation Challenge",
            organizers: "IEEE Madras Section & SSN College of Engineering, Chennai",
            registration_dates: "16-25 September 2025",
            grand_demo: "16-17 October 2025",
            cta_text: "Register Now",
            highlights: [
                "5 Challenging Tracks",
                "National Level Competition", 
                "Cash Prizes & Certificates",
                "Industry Expert Judges"
            ]
        },
        tracks: {
            title: "Competition Tracks",
            subtitle: "Choose your challenge and innovate",
            tracks: [
                {
                    id: "bci",
                    title: "Biomedical Signal Processing",
                    subtitle: "Brain-Computer Interface (BCI)",
                    color: "#0066ff",
                    icon: "🧠",
                    description: "Develop cutting-edge brain-computer interfaces using EEG signal processing",
                    problems: [
                        {
                            title: "Motor Imagery EEG Control",
                            description: "Design a system that decodes motor imagery from EEG signals to allow hands-free control interfaces. Build a signal processing pipeline that classifies multi-channel EEG data based on imagined limb movements, such as left hand versus right hand.",
                            techniques: ["CSP (Common Spatial Patterns)", "Wavelet Transforms", "SVM", "CNN"],
                            bonus: "Real-time implementation or virtual interface integration"
                        },
                        {
                            title: "Emotional State Recognition",
                            description: "Develop a model that identifies emotional states using EEG signals to support mental health monitoring and user interfaces that adjust to needs. Create a system that processes EEG data to classify emotional states, including happiness, stress, or calmness.",
                            datasets: ["DEAP", "DREAMER"],
                            techniques: ["Frequency band analysis", "Entropy measures", "Machine learning classifiers"],
                            focus: "Interpretable and reliable results across subjects"
                        },
                        {
                            title: "Cognitive Workload Estimation",
                            description: "Estimate cognitive workload from EEG signals to improve human-computer interaction and learning systems. Design a pipeline that analyzes EEG recordings to measure cognitive load during tasks, such as problem-solving or multitasking.",
                            features: ["Theta/beta ratio", "Spectral power", "Real-time feedback"],
                            applications: ["Adaptive systems", "Learning optimization"]
                        }
                    ]
                },
                {
                    id: "wireless",
                    title: "Wireless Sensing",
                    subtitle: "Wi-Fi Vision",
                    color: "#00bcd4",
                    icon: "📡",
                    description: "Harness Wi-Fi signals for device-free sensing and activity recognition",
                    problems: [
                        {
                            title: "Device-Free Activity Recognition",
                            description: "Use Channel State Information (CSI) extracted from standard Wi-Fi packets to detect and classify human activities in a room (e.g., walking, sitting, waving) without using cameras or wearables.",
                            technology: "Wi-Fi CSI analysis",
                            activities: ["Walking", "Sitting", "Waving", "Gestures"],
                            advantage: "Privacy-preserving sensing without cameras or wearables"
                        }
                    ]
                },
                {
                    id: "environmental",
                    title: "Environmental & Geospatial",
                    subtitle: "Signal Processing",
                    color: "#4caf50",
                    icon: "🌍",
                    description: "Apply signal processing to environmental monitoring and geospatial analysis",
                    problems: [
                        {
                            title: "Seismic Event Classifier",
                            description: "Identify earthquakes by clear P and S arrivals, emergent onset, long coda, and strong low-frequency surface waves. Detect explosions through impulsive P waves, weak or absent S waves, short duration, and high-frequency content.",
                            events: ["Earthquakes", "Explosions", "Urban noise"],
                            features: ["P/S wave analysis", "Frequency content", "Signal duration"]
                        },
                        {
                            title: "Acoustic Source Localization",
                            description: "Set up an array of microphones at precisely known positions in the environment. Record the sound signal as it reaches each microphone. Calculate the Time Difference of Arrival (TDOA) of the sound between microphones.",
                            method: "TDOA-based triangulation",
                            setup: "Microphone array with known positions",
                            output: "Precise source location coordinates"
                        },
                        {
                            title: "Deforestation Detector with Radar Imagery",
                            description: "Collect time-series Synthetic Aperture Radar (SAR) satellite images of the target region. Preprocess the imagery to remove noise and align datasets. Compare images across different time intervals to identify significant changes.",
                            data: "SAR satellite imagery",
                            analysis: "Time-series change detection",
                            output: "Deforestation mapping and monitoring"
                        }
                    ]
                },
                {
                    id: "ev",
                    title: "Electronic Vehicles",
                    subtitle: "Signal Processing",
                    color: "#ff9800",
                    icon: "⚡",
                    description: "Develop signal processing solutions for electric vehicle monitoring and diagnostics",
                    problems: [
                        {
                            title: "Inverter Fault Detection",
                            description: "Build a system that detects inverter faults in EVs by analyzing current and voltage waveforms. The pipeline should include preprocessing signals with filtering and denoising methods and extracting features using FFT, Wavelet Transform, and time-frequency analysis.",
                            signals: ["Current waveforms", "Voltage patterns"],
                            techniques: ["FFT", "Wavelet Transform", "Time-frequency analysis"],
                            faults: ["Harmonic distortions", "Short circuits", "Switching faults"],
                            integration: "Vehicle control units and cloud dashboards"
                        },
                        {
                            title: "Electric Motor Condition Monitoring",
                            description: "Develop a signal processing pipeline that continuously checks EV motor health using stator current, vibration, and sound emission signals. Use Envelope Detection, Hilbert-Huang Transform, and Spectrogram analysis.",
                            signals: ["Stator current", "Vibration", "Sound emission"],
                            techniques: ["Envelope Detection", "Hilbert-Huang Transform", "Spectrogram analysis"],
                            faults: ["Bearing wear", "Rotor misalignment", "Insulation breakdown"],
                            ai_models: ["SVM", "CNN"]
                        },
                        {
                            title: "Road Condition Classification",
                            description: "Develop a road-condition classification system for EVs using vibration signal processing. Acquire vibration signals from accelerometers attached to the suspension and chassis using time-frequency analysis.",
                            sensors: "Accelerometers on suspension and chassis",
                            analysis: ["STFT", "Wavelet Transforms"],
                            conditions: ["Smooth", "Rough", "Potholes", "Wet", "Gravel"],
                            applications: ["Adaptive suspension", "Safety features", "Route optimization"]
                        }
                    ]
                },
                {
                    id: "innovation",
                    title: "Student Innovation",
                    subtitle: "Open Track",
                    color: "#9c27b0",
                    icon: "💡",
                    description: "Propose your own innovative signal processing solution",
                    problems: [
                        {
                            title: "Open Innovation Track",
                            description: "Propose your own innovative signal processing solution to address real-world challenges. This track encourages creative thinking and novel applications of signal processing techniques across any domain.",
                            scope: "Any signal processing application",
                            focus: "Innovation and real-world impact",
                            domains: ["Healthcare", "Smart cities", "Agriculture", "Security", "Communication"],
                            evaluation: "Novelty, feasibility, and societal impact"
                        }
                    ]
                }
            ]
        },
        timeline: {
            title: "Competition Timeline",
            subtitle: "From submission to Grand Demo Day",
            phases: [
                {
                    phase: "Registration",
                    dates: "16-25 September 2025",
                    description: "Team registration opens",
                    status: "upcoming",
                    tasks: ["Form teams of 3-4 members", "Select competition track", "Submit team details"]
                },
                {
                    phase: "Round 1: Idea Submission",
                    dates: "September 2025",
                    description: "Online presentation submission",
                    status: "upcoming",
                    format: "Presentation based on provided template",
                    evaluation: ["Novelty", "Feasibility", "Cost-effectiveness", "Scalability"],
                    criteria: "Less than 10% AI-generated content allowed"
                },
                {
                    phase: "Grand Demo Day",
                    dates: "16-17 October 2025",
                    location: "SSN College of Engineering",
                    description: "Offline final round for top 10 teams",
                    status: "upcoming",
                    rounds: [
                        {
                            round: "Setup & Evaluation",
                            time: "Until 4PM Day 1",
                            description: "Implementation and setup with expert suggestions",
                            evaluation: "Internal Jury at 5PM"
                        },
                        {
                            round: "Implementation Review", 
                            time: "1PM Day 2",
                            description: "Assessment of implemented changes and suggestions"
                        },
                        {
                            round: "Final Presentation",
                            time: "9AM Day 2", 
                            description: "Final review by External Jury",
                            format: "Live demos and presentations"
                        }
                    ]
                }
            ]
        },
        guidelines: {
            title: "Guidelines & Rules",
            sections: {
                team_formation: {
                    title: "Team Formation",
                    rules: [
                        "Each team must have 3 to 4 members",
                        "Team members can be from different academic backgrounds",
                        "Each team selects one track to compete in"
                    ]
                },
                evaluation_criteria: {
                    title: "Evaluation Criteria",
                    criteria: [
                        "Novelty and originality of the proposed solution",
                        "Complexity and depth of technical approach",
                        "Clarity, structure, and details in submission format",
                        "Feasibility of implementation with available resources",
                        "Sustainability of the solution over time",
                        "Scalability of the solution"
                    ]
                },
                general_rules: {
                    title: "General Rules",
                    rules: [
                        "Projects must be developed during the hackathon period",
                        "Use of open-source or existing code must be declared",
                        "All team members must be present for evaluations",
                        "Plagiarism will lead to disqualification",
                        "Respect deadlines and conduct - violations result in penalties"
                    ]
                },
                awards: {
                    title: "Awards & Recognition",
                    prizes: [
                        {
                            title: "Track Winners",
                            description: "Top 2 teams from each track",
                            prize: "Cash prizes and certificates"
                        },
                        {
                            title: "Participation Recognition",
                            description: "All shortlisted final round teams",
                            prize: "Participation certificates"
                        }
                    ]
                },
                expected_outcomes: {
                    title: "Expected Outcomes",
                    outcomes: [
                        "Encourages innovation and problem-solving culture among students",
                        "Provides hands-on learning experience in applying theoretical concepts",
                        "Strengthens teamwork, leadership, and collaboration skills",
                        "Builds exposure to real-world industry problems and research trends",
                        "Enhances presentation, communication, and pitching abilities",
                        "Offers networking opportunities with peers, mentors, and professionals",
                        "Inspires participants to pursue research, startups, or career paths",
                        "Contributes to creating a community of innovators for global challenges"
                    ]
                }
            }
        },
        contact: {
            title: "Registration & Contact",
            registration: {
                title: "Registration Information",
                dates: "16-25 September 2025", 
                process: "Online registration through official portal",
                eligibility: "Students, researchers, and professionals in engineering, computer science, and related fields"
            },
            venue: {
                title: "Grand Demo Venue",
                name: "Sri Sivasubramaniya Nadar College of Engineering",
                dates: "16-17 October 2025",
                format: "In-person final presentations and demonstrations"
            },
            organizers: {
                primary: {
                    name: "IEEE Madras Section",
                    role: "Primary Organizer"
                },
                host: {
                    name: "SSN College of Engineering, Chennai",
                    role: "Host Institution"
                }
            }
        }
    }
};

// Global variables
let particleSystem = [];
let signalCanvas, particlesCanvas;
let signalCtx, particlesCtx;
let animationId;
let signalWaveforms = [];
let currentPage = 'home';
let isAnimating = false;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing application...');
    initializeLoadingScreen();
    initializeCanvas();
    initializeParticleSystem();
    initializeSignalWaveforms();
    initializeNavigation();
    initializeCountdown();
    initializeScrollBehavior();
    initializeInteractiveElements();
    startAnimationLoop();
    
    // Load initial content after a short delay
    setTimeout(() => {
        loadPageContent('home');
        hideLoadingScreen();
    }, 1500);
});

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        console.log('Loading screen initialized');
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
        }, 100);
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        console.log('Hiding loading screen');
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500);
    }
}

// Canvas and Animation System
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
        this.decay = 0.003;
        this.size = Math.random() * 3 + 1;
        this.type = type;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = (Math.random() - 0.5) * 0.02;
        this.pulse = Math.random() * Math.PI * 2;
        this.color = this.getTypeColor(type);
    }
    
    getTypeColor(type) {
        const colors = {
            'biomedical': '#0066ff',
            'wireless': '#00bcd4', 
            'environmental': '#4caf50',
            'vehicles': '#ff9800',
            'innovation': '#9c27b0',
            'default': '#33828d'
        };
        return colors[type] || colors['default'];
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
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Add floating motion
        this.pulse += 0.02;
        this.y += Math.sin(this.pulse) * 0.3;
        this.x += Math.cos(this.pulse * 0.7) * 0.2;
        
        // Boundary wrapping
        if (this.x < 0) this.x = particlesCanvas.width;
        if (this.x > particlesCanvas.width) this.x = 0;
        if (this.y < 0) this.y = particlesCanvas.height;
        if (this.y > particlesCanvas.height) this.y = 0;
        
        // Life management
        this.angle += this.rotation;
        this.life -= this.decay;
        
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
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

function initializeParticleSystem() {
    particleSystem = [];
    const particleTypes = ['biomedical', 'wireless', 'environmental', 'vehicles', 'innovation', 'default'];
    
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
        
        for (let x = 0; x <= signalCanvas.width + 50; x += 6) {
            let y = this.generateSignal(x);
            this.points.push({ x: x - this.offset * 100, y: this.y + y });
        }
    }
    
    generateSignal(x) {
        const pos = x * this.frequency + this.offset;
        
        switch(this.type) {
            case 'biomedical':
                return Math.sin(pos * 3) * 15 + Math.sin(pos * 7) * 8 + Math.random() * 4 - 2;
            case 'wireless':
                return Math.sin(pos * 2) * 12 + Math.sin(pos * 1.5) * 8;
            case 'environmental':
                const cyclePos = (pos % (Math.PI * 3));
                let signal = Math.sin(pos * 0.8) * 6;
                if (cyclePos > 2 && cyclePos < 2.2) {
                    signal += Math.sin((cyclePos - 2) * 15) * 20;
                }
                return signal;
            case 'vehicles':
                return Math.sin(pos * 2.5) * 10 + Math.cos(pos * 1.2) * 6 + (Math.random() - 0.5) * 6;
            default:
                return Math.sin(pos * 2) * this.amplitude * 0.5;
        }
    }
    
    draw(ctx) {
        if (!ctx || this.points.length === 0) return;
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.4;
        
        ctx.beginPath();
        let started = false;
        
        for (let point of this.points) {
            if (point.x > -50 && point.x < signalCanvas.width + 50) {
                if (!started) {
                    ctx.moveTo(point.x, point.y);
                    started = true;
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            }
        }
        
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

function initializeSignalWaveforms() {
    if (!signalCanvas) return;
    
    signalWaveforms = [
        new SignalWaveform('biomedical', signalCanvas.height * 0.2, '#0066ff', 0.008),
        new SignalWaveform('wireless', signalCanvas.height * 0.4, '#00bcd4', 0.01),
        new SignalWaveform('environmental', signalCanvas.height * 0.6, '#4caf50', 0.006),
        new SignalWaveform('vehicles', signalCanvas.height * 0.8, '#ff9800', 0.012)
    ];
}

// Navigation System
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    // Desktop navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            console.log('Desktop nav clicked:', page);
            if (page && !isAnimating) {
                navigateToPage(page);
            }
        });
    });
    
    // Mobile navigation
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            console.log('Mobile nav clicked:', page);
            if (page && !isAnimating) {
                navigateToPage(page);
                closeMobileNav();
            }
        });
    });
    
    // Mobile menu toggle - FIXED
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    
    if (mobileMenuBtn) {
        console.log('Mobile menu button found, adding event listener');
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button clicked');
            openMobileNav();
        });
    } else {
        console.error('Mobile menu button not found');
    }
    
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile nav close clicked');
            closeMobileNav();
        });
    }
    
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile nav overlay clicked');
            closeMobileNav();
        });
    }
    
    // Breadcrumb navigation
    document.addEventListener('click', (e) => {
        if (e.target.matches('.breadcrumb a')) {
            e.preventDefault();
            const page = e.target.dataset.page;
            if (page && !isAnimating) {
                navigateToPage(page);
            }
        }
    });
    
    // Brand logo navigation
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isAnimating) {
                navigateToPage('home');
            }
        });
    }
}

function openMobileNav() {
    console.log('Opening mobile nav...');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileNav) {
        mobileNav.classList.add('active');
        console.log('Mobile nav activated');
    }
    if (mobileNavOverlay) {
        mobileNavOverlay.classList.add('active');
        console.log('Mobile overlay activated');
    }
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.add('active');
        console.log('Mobile button activated');
    }
    
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    console.log('Closing mobile nav...');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileNav) {
        mobileNav.classList.remove('active');
    }
    if (mobileNavOverlay) {
        mobileNavOverlay.classList.remove('active');
    }
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
    }
    
    document.body.style.overflow = '';
}

function navigateToPage(pageId) {
    console.log('Navigating to page:', pageId);
    if (isAnimating || currentPage === pageId) return;
    
    isAnimating = true;
    
    // Update active navigation states
    updateActiveNavigation(pageId);
    
    // Hide current page
    const currentPageEl = document.getElementById(`page-${currentPage}`);
    if (currentPageEl) {
        currentPageEl.style.opacity = '0';
        currentPageEl.style.transform = 'translateY(-20px)';
    }
    
    setTimeout(() => {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPageEl = document.getElementById(`page-${pageId}`);
        if (targetPageEl) {
            targetPageEl.classList.add('active');
            
            // Load content if not already loaded
            loadPageContent(pageId);
            
            // Animate in
            requestAnimationFrame(() => {
                targetPageEl.style.opacity = '1';
                targetPageEl.style.transform = 'translateY(0)';
            });
        }
        
        currentPage = pageId;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setTimeout(() => {
            isAnimating = false;
        }, 300);
        
    }, 150);
}

function updateActiveNavigation(pageId) {
    // Desktop nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });
    
    // Mobile nav
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });
}

// Content Loading System
function loadPageContent(pageId) {
    switch(pageId) {
        case 'tracks':
            loadTracksContent();
            break;
        case 'timeline':
            loadTimelineContent();
            break;
        case 'guidelines':
            loadGuidelinesContent();
            break;
        case 'contact':
            loadContactContent();
            break;
    }
}

function loadTracksContent() {
    const tracksGrid = document.getElementById('tracks-grid');
    if (!tracksGrid || tracksGrid.hasChildNodes()) return;
    
    const tracks = APP_DATA.pages.tracks.tracks;
    
    tracks.forEach(track => {
        const trackCard = document.createElement('div');
        trackCard.className = 'track-card';
        trackCard.style.setProperty('--track-color', track.color);
        
        trackCard.innerHTML = `
            <div class="track-header">
                <div class="track-icon" style="background: rgba(${hexToRgb(track.color)}, 0.1); border-color: rgba(${hexToRgb(track.color)}, 0.3); color: ${track.color};">
                    ${track.icon}
                </div>
                <div>
                    <h3 class="track-title">${track.title}</h3>
                    <p class="track-subtitle">${track.subtitle}</p>
                </div>
            </div>
            <p class="track-description">${track.description}</p>
            <div class="track-problems">
                <div class="problem-count">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                    ${track.problems.length} Problem${track.problems.length !== 1 ? 's' : ''}
                </div>
            </div>
        `;
        
        trackCard.addEventListener('click', () => {
            showTrackModal(track);
        });
        
        tracksGrid.appendChild(trackCard);
    });
}

function loadTimelineContent() {
    const timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer || timelineContainer.hasChildNodes()) return;
    
    const phases = APP_DATA.pages.timeline.phases;
    
    phases.forEach((phase, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        let detailsHTML = '';
        if (phase.tasks) {
            detailsHTML += `
                <div class="timeline-details">
                    <h4>Tasks:</h4>
                    <ul>
                        ${phase.tasks.map(task => `<li>${task}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (phase.evaluation) {
            detailsHTML += `
                <div class="timeline-details">
                    <h4>Evaluation Criteria:</h4>
                    <ul>
                        ${phase.evaluation.map(criteria => `<li>${criteria}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (phase.rounds) {
            detailsHTML += `
                <div class="timeline-details">
                    <h4>Competition Rounds:</h4>
                    ${phase.rounds.map(round => `
                        <div style="margin-bottom: 1rem; padding: 1rem; background: rgba(var(--color-primary-rgb, 33, 128, 141), 0.05); border-radius: 8px;">
                            <strong>${round.round}</strong> - ${round.time}<br>
                            <span style="color: var(--color-text-secondary);">${round.description}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3 class="timeline-phase">${phase.phase}</h3>
                <div class="timeline-dates">${phase.dates}</div>
                ${phase.location ? `<div style="color: var(--color-warning); font-weight: 600; margin-bottom: 0.5rem;">📍 ${phase.location}</div>` : ''}
                <p class="timeline-description">${phase.description}</p>
                ${detailsHTML}
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

function loadGuidelinesContent() {
    const guidelinesContent = document.getElementById('guidelines-content');
    if (!guidelinesContent || guidelinesContent.hasChildNodes()) return;
    
    const sections = APP_DATA.pages.guidelines.sections;
    
    Object.entries(sections).forEach(([key, section]) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'guidelines-section';
        
        let contentHTML = '';
        
        if (section.rules) {
            contentHTML = `
                <div class="guidelines-list">
                    ${section.rules.map((rule, index) => `
                        <div class="guideline-item">
                            <strong>${index + 1}.</strong> ${rule}
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (section.criteria) {
            contentHTML = `
                <div class="guidelines-list">
                    ${section.criteria.map((criteria, index) => `
                        <div class="guideline-item">
                            <strong>${index + 1}.</strong> ${criteria}
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (section.prizes) {
            contentHTML = `
                <div class="awards-grid">
                    ${section.prizes.map(prize => `
                        <div class="award-card">
                            <h4>${prize.title}</h4>
                            <p>${prize.description}</p>
                            <strong style="color: var(--color-primary);">${prize.prize}</strong>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (section.outcomes) {
            contentHTML = `
                <div class="guidelines-list">
                    ${section.outcomes.map((outcome, index) => `
                        <div class="guideline-item">
                            <strong>${index + 1}.</strong> ${outcome}
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        sectionDiv.innerHTML = `
            <h2>${section.title}</h2>
            ${contentHTML}
        `;
        
        guidelinesContent.appendChild(sectionDiv);
    });
}

function loadContactContent() {
    const contactContent = document.getElementById('contact-content');
    if (!contactContent || contactContent.hasChildNodes()) return;
    
    const contact = APP_DATA.pages.contact;
    
    contactContent.innerHTML = `
        <div class="contact-grid">
            <div class="contact-card">
                <h3>${contact.registration.title}</h3>
                <div class="contact-info">
                    <div class="contact-item">
                        <strong>Registration Period:</strong> ${contact.registration.dates}
                    </div>
                    <div class="contact-item">
                        <strong>Process:</strong> ${contact.registration.process}
                    </div>
                    <div class="contact-item">
                        <strong>Eligibility:</strong> ${contact.registration.eligibility}
                    </div>
                </div>
            </div>
            
            <div class="contact-card">
                <h3>${contact.venue.title}</h3>
                <div class="contact-info">
                    <div class="contact-item">
                        <strong>Venue:</strong> ${contact.venue.name}
                    </div>
                    <div class="contact-item">
                        <strong>Dates:</strong> ${contact.venue.dates}
                    </div>
                    <div class="contact-item">
                        <strong>Format:</strong> ${contact.venue.format}
                    </div>
                </div>
            </div>
            
            <div class="contact-card">
                <h3>Organizers</h3>
                <div class="contact-info">
                    <div class="contact-item">
                        <strong>${contact.organizers.primary.role}:</strong> ${contact.organizers.primary.name}
                    </div>
                    <div class="contact-item">
                        <strong>${contact.organizers.host.role}:</strong> ${contact.organizers.host.name}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Track Modal
function showTrackModal(track) {
    // Remove existing modal
    const existingModal = document.querySelector('.problem-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'problem-modal';
    
    const problemsHTML = track.problems.map((problem, index) => {
        let detailsHTML = '';
        
        // Add different details based on problem properties
        Object.entries(problem).forEach(([key, value]) => {
            if (key !== 'title' && key !== 'description' && Array.isArray(value)) {
                detailsHTML += `<p><strong>${key.replace(/_/g, ' ').toUpperCase()}:</strong> ${value.join(', ')}</p>`;
            } else if (key !== 'title' && key !== 'description' && typeof value === 'string') {
                detailsHTML += `<p><strong>${key.replace(/_/g, ' ').toUpperCase()}:</strong> ${value}</p>`;
            }
        });
        
        return `
            <div style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(${hexToRgb(track.color)}, 0.05); border-radius: 12px; border-left: 4px solid ${track.color};">
                <h4 style="color: ${track.color}; margin-bottom: 1rem;">${index + 1}. ${problem.title}</h4>
                <p style="margin-bottom: 1rem; line-height: 1.6;">${problem.description}</p>
                ${detailsHTML}
            </div>
        `;
    }).join('');
    
    modal.innerHTML = `
        <div class="problem-modal-content">
            <div class="problem-modal-header">
                <h2 class="problem-modal-title" style="color: ${track.color};">
                    ${track.icon} ${track.title}
                </h2>
                <button class="problem-modal-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="problem-modal-body">
                <p style="font-size: 1.1rem; margin-bottom: 2rem; color: var(--color-text-secondary);">${track.description}</p>
                <h3 style="margin-bottom: 1.5rem; color: var(--color-text);">Problem Statements</h3>
                ${problemsHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    
    // Event listeners
    modal.querySelector('.problem-modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Countdown Timer
function initializeCountdown() {
    const targetDate = new Date('2025-09-16T00:00:00').getTime();
    
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
            const regText = document.querySelector('.reg-text');
            if (regText) {
                regText.textContent = 'Registration is now open!';
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
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// Scroll Behavior
function initializeScrollBehavior() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    const floatingRegister = document.getElementById('floating-register');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar scroll behavior
        if (navbar) {
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Back to top button
        if (backToTop) {
            if (scrollTop > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        // Floating register button
        if (floatingRegister) {
            if (scrollTop > 800 && currentPage !== 'home') {
                floatingRegister.classList.add('visible');
            } else {
                floatingRegister.classList.remove('visible');
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Back to top functionality
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Interactive Elements - FIXED
function initializeInteractiveElements() {
    console.log('Initializing interactive elements...');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Mouse tracking for particle interactions
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        window.mouseX = mouseX;
        window.mouseY = mouseY;
    });
    
    // Registration buttons - FIXED
    const registerBtn = document.getElementById('register-btn');
    const floatingRegister = document.getElementById('floating-register');
    
    if (registerBtn) {
        console.log('Register button found, adding event listener');
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Register button clicked');
            showRegistrationModal();
        });
    } else {
        console.error('Register button not found');
    }
    
    if (floatingRegister) {
        console.log('Floating register button found, adding event listener');
        floatingRegister.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Floating register button clicked');
            showRegistrationModal();
        });
    }
}

// Registration Modal - FIXED
function showRegistrationModal() {
    console.log('Showing registration modal...');
    
    const existingModal = document.querySelector('.registration-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'problem-modal registration-modal';
    modal.style.zIndex = '10001';
    
    modal.innerHTML = `
        <div class="problem-modal-content" style="max-width: 600px;">
            <div class="problem-modal-header">
                <h2 class="problem-modal-title" style="color: var(--color-primary);">
                    🚀 Registration Opens Soon!
                </h2>
                <button class="problem-modal-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="problem-modal-body" style="text-align: center;">
                <p style="font-size: 1.1rem; margin-bottom: 2rem; color: var(--color-text-secondary);">
                    Get ready for the most exciting signal processing challenge! Registration for the Signal Processing Cup Challenge 2025 will open during the specified dates.
                </p>
                
                <div style="background: rgba(var(--color-primary-rgb, 33, 128, 141), 0.1); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
                    <h3 style="color: var(--color-primary); margin-bottom: 1.5rem;">📅 Important Dates</h3>
                    <div style="display: grid; gap: 1rem;">
                        <div style="background: var(--color-surface); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--color-primary);">
                            <strong style="color: var(--color-primary);">Registration Period:</strong><br>
                            <span>16-25 September 2025</span>
                        </div>
                        <div style="background: var(--color-surface); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--color-warning);">
                            <strong style="color: var(--color-warning);">Grand Demo Day:</strong><br>
                            <span>16-17 October 2025</span>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn--primary" id="modal-notify-btn">
                        🔔 Notify Me
                    </button>
                    <button class="btn btn--outline" id="modal-learn-btn">
                        📖 Learn More
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    
    // Event listeners
    const closeBtn = modal.querySelector('.problem-modal-close');
    const notifyBtn = modal.querySelector('#modal-notify-btn');
    const learnBtn = modal.querySelector('#modal-learn-btn');
    
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Modal close clicked');
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    
    notifyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Notify button clicked');
        notifyBtn.innerHTML = '✅ You\'ll be notified!';
        notifyBtn.disabled = true;
        setTimeout(() => closeBtn.click(), 2000);
    });
    
    learnBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Learn more button clicked');
        closeBtn.click();
        setTimeout(() => navigateToPage('tracks'), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
    
    // ESC key support
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeBtn.click();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    console.log('Registration modal created and shown');
}

// Animation Loop
function startAnimationLoop() {
    function animate() {
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
        
        particleSystem.forEach(particle => {
            particle.update(mouseX, mouseY);
            particle.draw(particlesCtx);
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// Utility Functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        '33, 128, 141';
}

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    if (signalWaveforms.length > 0) {
        initializeSignalWaveforms();
    }
});

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (animationId) cancelAnimationFrame(animationId);
    } else {
        startAnimationLoop();
    }
});

// Initialize mouse position
window.mouseX = window.innerWidth / 2;
window.mouseY = window.innerHeight / 2;

// Console message
console.log('🚀 Signal Processing Cup Challenge 2025 - Multi-page Website Loaded!');
console.log('💻 Enhanced UX with responsive navigation and professional design');
console.log('🔧 Fixed registration modal and mobile navigation issues');