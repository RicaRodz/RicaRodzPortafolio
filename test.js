// Particle Animation System
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.container = document.getElementById('particles');
    this.maxParticles = 50;
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random color variation
    const colors = ['#00d4ff', '#ff6b6b', '#4ecdc4', '#ffd93d'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    this.container.appendChild(particle);
    this.particles.push(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
        this.particles = this.particles.filter(p => p !== particle);
        this.createParticle(); // Create a new one
      }
    }, 8000);
  }

  animate() {
    // Continuous particle creation
    setInterval(() => {
      if (this.particles.length < this.maxParticles) {
        this.createParticle();
      }
    }, 200);
  }
}

// Number Counter Animation
class NumberCounter {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = parseInt(target);
    this.duration = duration;
    this.current = 0;
    this.increment = this.target / (this.duration / 16);
    this.hasAnimated = false;
  }

  animate() {
    if (this.hasAnimated) return;
    
    const timer = setInterval(() => {
      this.current += this.increment;
      
      if (this.current >= this.target) {
        this.current = this.target;
        clearInterval(timer);
        this.hasAnimated = true;
      }
      
      this.element.textContent = Math.floor(this.current);
    }, 16);
  }
}

// Intersection Observer for animations
class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: 0.1, rootMargin: '50px' }
    );
    this.init();
  }

  init() {
    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach(el => {
      this.observer.observe(el);
    });

    // Observe project cards
    document.querySelectorAll('.project').forEach(el => {
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('stat-number')) {
          const target = entry.target.dataset.target;
          const counter = new NumberCounter(entry.target, target);
          counter.animate();
        }
        
        if (entry.target.classList.contains('project')) {
          entry.target.style.animationPlayState = 'running';
        }
      }
    });
  }
}

// Project Card Interactions
class ProjectInteractions {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.project').forEach(project => {
      this.addHoverEffects(project);
      this.addClickEffects(project);
    });
  }

  addHoverEffects(project) {
    project.addEventListener('mouseenter', () => {
      this.addGlowEffect(project);
    });

    project.addEventListener('mouseleave', () => {
      this.removeGlowEffect(project);
    });
  }

  addClickEffects(project) {
    project.addEventListener('click', (e) => {
      if (!e.target.closest('.project-btn')) {
        this.createRippleEffect(e, project);
      }
    });
  }

  addGlowEffect(project) {
    const overlay = project.querySelector('.project-overlay');
    if (overlay) {
      overlay.style.opacity = '1';
    }
  }

  removeGlowEffect(project) {
    const overlay = project.querySelector('.project-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
    }
  }

  createRippleEffect(e, project) {
    const ripple = document.createElement('div');
    const rect = project.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      animation: ripple 0.6s ease-out;
      z-index: 10;
    `;

    project.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// Smooth Scrolling
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Typing Effect for Dynamic Text
class TypingEffect {
  constructor(element, texts, speed = 100) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.init();
  }

  init() {
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500; // Pause before next text
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.fps = 0;
    this.lastTime = performance.now();
    this.init();
  }

  init() {
    this.monitor();
  }

  monitor() {
    const currentTime = performance.now();
    this.frameCount++;

    if (currentTime - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = currentTime;
      
      // Adjust particle count based on performance
      if (this.fps < 30 && window.particleSystem) {
        window.particleSystem.maxParticles = Math.max(20, window.particleSystem.maxParticles - 5);
      } else if (this.fps > 50 && window.particleSystem) {
        window.particleSystem.maxParticles = Math.min(80, window.particleSystem.maxParticles + 2);
      }
    }

    requestAnimationFrame(() => this.monitor());
  }
}

// Theme Controller
class ThemeController {
  constructor() {
    this.themes = {
      cyberpunk: {
        primary: '#00d4ff',
        secondary: '#ff6b6b',
        success: '#4ecdc4',
        warning: '#ffd93d'
      },
      neon: {
        primary: '#ff0080',
        secondary: '#00ff80',
        success: '#8000ff',
        warning: '#ffff00'
      },
      ocean: {
        primary: '#0080ff',
        secondary: '#ff8000',
        success: '#00ff40',
        warning: '#ff4000'
      }
    };
    this.currentTheme = 'cyberpunk';
  }

  switchTheme(themeName) {
    if (!this.themes[themeName]) return;
    
    const theme = this.themes[themeName];
    const root = document.documentElement;
    
    root.style.setProperty('--primary-accent', theme.primary);
    root.style.setProperty('--secondary-accent', theme.secondary);
    root.style.setProperty('--success-color', theme.success);
    root.style.setProperty('--warning-color', theme.warning);
    
    this.currentTheme = themeName;
  }
}

// Audio Feedback (optional)
class AudioFeedback {
  constructor() {
    this.sounds = {};
    this.enabled = false; // Disabled by default for better UX
  }

  createSound(frequency, duration = 100, type = 'sine') {
    if (!this.enabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  }

  playHover() {
    this.createSound(800, 50);
  }

  playClick() {
    this.createSound(400, 100);
  }
}

// Main Application Controller
class PortfolioApp {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all components
      this.components.particleSystem = new ParticleSystem();
      this.components.animationObserver = new AnimationObserver();
      this.components.projectInteractions = new ProjectInteractions();
      this.components.smoothScroll = new SmoothScroll();
      this.components.performanceMonitor = new PerformanceMonitor();
      this.components.themeController = new ThemeController();
      this.components.audioFeedback = new AudioFeedback();

      // Global reference for performance monitoring
      window.particleSystem = this.components.particleSystem;

      // Add CSS animations
      this.addDynamicStyles();

      // Initialize typing effect for subtitle
      const subtitleEl = document.querySelector('.typing-text');
      if (subtitleEl) {
        const roles = [
          'Software Engineer',
          'Full Stack Developer',
          'AI Enthusiast',
          'Problem Solver'
        ];
        setTimeout(() => {
          new TypingEffect(subtitleEl, roles, 80);
        }, 3000);
      }

      // Add keyboard shortcuts
      this.initKeyboardShortcuts();

      console.log('Portfolio initialized successfully!');
    } catch (error) {
      console.error('Error initializing portfolio:', error);
    }
  }

  addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        0% {
          transform: scale(0);
          opacity: 0.6;
        }
        100% {
          transform: scale(1);
          opacity: 0;
        }
      }

      .project-btn {
        position: relative;
        overflow: hidden;
      }

      .project-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
      }

      .project-btn:hover::before {
        width: 300px;
        height: 300px;
      }
    `;
    document.head.appendChild(style);
  }

  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Theme switching shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            this.components.themeController.switchTheme('cyberpunk');
            break;
          case '2':
            e.preventDefault();
            this.components.themeController.switchTheme('neon');
            break;
          case '3':
            e.preventDefault();
            this.components.themeController.switchTheme('ocean');
            break;
        }
      }
    });
  }

  // Public methods for external control
  switchTheme(theme) {
    this.components.themeController.switchTheme(theme);
  }

  toggleAudio() {
    this.components.audioFeedback.enabled = !this.components.audioFeedback.enabled;
    return this.components.audioFeedback.enabled;
  }
}

// Initialize the application
const portfolioApp = new PortfolioApp();