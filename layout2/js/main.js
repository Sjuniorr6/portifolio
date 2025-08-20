// ===== GLOBAL VARIABLES =====
let typewriterIndex = 0;
let typewriterTexts = [
    'experiências digitais',
    'soluções inovadoras',
    'aplicações web',
    'sistemas inteligentes'
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    

});

function initializeApp() {
    // Initialize all components
    initLoadingScreen();
    initNavbar();
    initTypewriter();
    initHeroAnimations();
    initSkillsAnimation();
    initContactForm();
    initScrollAnimations();
    initParticleEffects();
    initCustomCursor();
    initAOS();
    initMobileMenu();
    
    console.log('🚀 Portfolio inicializado com sucesso!');
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    function typeWriter() {
        const currentText = typewriterTexts[typewriterIndex];
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < currentText.length) {
                typewriterElement.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100);
            } else {
                setTimeout(eraseText, 2000);
            }
        }
        
        function eraseText() {
            if (typewriterElement.textContent.length > 0) {
                typewriterElement.textContent = typewriterElement.textContent.slice(0, -1);
                setTimeout(eraseText, 50);
            } else {
                typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
                setTimeout(typeWriter, 500);
            }
        }
        
        typewriterElement.textContent = '';
        typeChar();
    }
    
    typeWriter();
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    // Hero animations can be added here in the future
    console.log('Hero animations initialized');
}

// ===== SKILLS ANIMATION =====
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const animateSkills = () => {
        skillItems.forEach((item, index) => {
            const progressBar = item.querySelector('.skill-progress');
            const width = progressBar.getAttribute('data-width');
            
            setTimeout(() => {
                progressBar.style.width = width;
            }, index * 200);
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const skillsSection = document.getElementById('habilidades');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}





// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
            
            // Reset form labels
            const labels = form.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = 'var(--space-4)';
                label.style.fontSize = 'var(--font-size-base)';
                label.style.color = 'var(--gray-500)';
            });
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== PARTICLE EFFECTS =====
function initParticleEffects() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(heroSection);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: float-particle ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.7;
        }
        50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.5;
        }
        75% {
            transform: translateY(-30px) translateX(5px);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--gradient-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Cursor effects on hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(2)`;
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(1)`;
        });
    });
}

// ===== AOS INITIALIZATION =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (mobileMenuIcon && navbarCollapse) {
        mobileMenuIcon.addEventListener('click', () => {
            const isActive = mobileMenuIcon.classList.contains('active');
            
            if (isActive) {
                // If menu is open (X is visible), close it
                mobileMenuIcon.classList.remove('active');
                navbarCollapse.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    navbarCollapse.classList.remove('show');
                }, 100);
            } else {
                // If menu is closed (hamburger is visible), open it
                mobileMenuIcon.classList.add('active');
                navbarCollapse.classList.add('show');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuIcon.classList.remove('active');
                navbarCollapse.classList.remove('show');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuIcon.contains(e.target) && !navbarCollapse.contains(e.target)) {
                mobileMenuIcon.classList.remove('active');
                navbarCollapse.classList.remove('show');
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuIcon.classList.contains('active')) {
                mobileMenuIcon.classList.remove('active');
                navbarCollapse.classList.remove('show');
            }
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--primary)'};
        color: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}



// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce resize events
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16));

// Apply debouncing to resize events
window.addEventListener('resize', debounce(() => {
    // Resize-based adjustments can be added here
}, 250));

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Erro capturado:', e.error);
    showNotification('Ocorreu um erro. Por favor, recarregue a página.', 'error');
});

// ===== ACCESSIBILITY =====
// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Skip to main content
    if (e.key === 'Tab' && e.target === document.body) {
        e.preventDefault();
        document.querySelector('main')?.focus();
    }
    
    // Close modals with Escape
    if (e.key === 'Escape') {
        // Close any open modals or dropdowns
    }
});

// Focus management
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    });
}

// ===== ANALYTICS & TRACKING =====
function trackEvent(eventName, properties = {}) {
    // Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Custom tracking
    console.log(`📊 Event tracked: ${eventName}`, properties);
}

// Track important interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.project-link')) {
        trackEvent('project_view', {
            project: e.target.closest('.project-card')?.querySelector('.project-title')?.textContent
        });
    }
    
    if (e.target.matches('.social-link')) {
        trackEvent('social_click', {
            platform: e.target.querySelector('i').className
        });
    }
});

// ===== EXPORT FUNCTIONS =====
window.portfolioApp = {
    scrollToSection,
    showNotification,
    trackEvent
};

console.log('🎨 Portfolio carregado com todas as funcionalidades!');
