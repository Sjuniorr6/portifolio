// ===== GLOBAL VARIABLES =====
/**
 * Variáveis globais para controle de animações e estado da aplicação
 * @type {number} currentLine - Linha atual sendo animada
 * @type {boolean} isTyping - Indica se está ocorrendo animação de digitação
 * @type {boolean} cursorVisible - Controla visibilidade do cursor
 */
let currentLine = 0;
let isTyping = false;
let cursorVisible = true;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Função principal de inicialização da aplicação
 * Configura todos os componentes e funcionalidades do portfolio
 * @function initializeApp
 * @returns {void}
 */
// Variável para controlar se já foi inicializado
let isAppInitialized = false;

function initializeApp() {
    // Evitar inicialização duplicada
    if (isAppInitialized) {
        console.warn('⚠️ App já foi inicializado');
        return;
    }
    
    try {
        // Inicializa todos os componentes da aplicação
        // Só inicializa loading screen se o elemento existir
        if (document.getElementById('loading-screen')) {
            initLoadingScreen();
        }
        initNavbar();             // Navegação responsiva
        initCodeAnimations();     // Animações dos editores de código
        initScrollAnimations();   // Animações baseadas em scroll
        initMobileMenu();         // Menu mobile
        initCursorEffect();       // Efeitos de cursor personalizado
        initParticleEffect();     // Efeito de partículas no fundo
        initNavbarScroll();       // Navbar que desce com scroll
        initTracking();           // Sistema de tracking de eventos
        
        isAppInitialized = true;
        console.log('🚀 Portfolio Code Editor inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao inicializar app:', error);
    }
}

// Função para resetar o estado da aplicação
function resetAppState() {
    isAppInitialized = false;
    isTrackingInitialized = false;
    console.log('🔄 Estado da aplicação resetado');
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    try {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Se não há loading screen, simplesmente retorna sem erro
        if (!loadingScreen) {
            console.log('ℹ️ Loading screen não encontrada - pulando inicialização');
            return;
        }
        
        // Verificar se o elemento ainda existe no DOM
        if (!document.body.contains(loadingScreen)) {
            console.log('ℹ️ Loading screen removida do DOM - pulando');
            return;
        }
        
        // Verificar se já foi inicializada
        if (loadingScreen.classList && loadingScreen.classList.contains('hidden')) {
            console.log('ℹ️ Loading screen já foi inicializada - pulando');
            return;
        }
        
        // Simulate loading time
        setTimeout(() => {
            try {
                // Verificar novamente se o elemento ainda existe
                if (loadingScreen && document.body.contains(loadingScreen) && loadingScreen.classList) {
                    loadingScreen.classList.add('hidden');
                    
                    // Remove from DOM after animation
                    setTimeout(() => {
                        try {
                            if (loadingScreen && loadingScreen.parentNode && document.body.contains(loadingScreen)) {
                                loadingScreen.remove();
                            }
                        } catch (removeError) {
                            console.log('ℹ️ Loading screen já removida');
                        }
                    }, 500);
                }
            } catch (classListError) {
                console.log('ℹ️ Loading screen já processada');
            }
        }, 2000);
    } catch (error) {
        console.log('ℹ️ Loading screen não disponível');
    }
}

// ===== NAVBAR =====
function initNavbar() {
    try {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Se não há navbar, simplesmente retorna
        if (!navbar) {
            console.log('ℹ️ Navbar não encontrada - pulando inicialização');
            return;
        }
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            try {
                if (navbar && navbar.classList) {
                    if (window.scrollY > 100) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }
            } catch (scrollError) {
                console.log('ℹ️ Erro no scroll da navbar');
            }
        });
        
        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                try {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } catch (linkError) {
                    console.log('ℹ️ Erro no link de navegação');
                }
            });
        });
    
    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        try {
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
        } catch (highlightError) {
            console.log('ℹ️ Erro no highlight da navegação');
        }
    });
    } catch (error) {
        console.log('ℹ️ Erro ao inicializar navbar');
    }
}

// ===== CODE ANIMATIONS =====
/**
 * Inicializa as animações dos editores de código
 * Cria efeitos de entrada escalonada e interações de hover
 * @function initCodeAnimations
 * @returns {void}
 */
function initCodeAnimations() {
    const codeEditors = document.querySelectorAll('.code-editor');
    
    codeEditors.forEach((editor, editorIndex) => {
        const codeLines = editor.querySelectorAll('.code-line');
        
        // Anima cada linha com entrada escalonada (staggered entrance)
        codeLines.forEach((line, lineIndex) => {
            // Configura estado inicial (invisível e deslocado)
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
            
            // Agenda animação com delay baseado na posição
            setTimeout(() => {
                line.style.transition = 'all 0.5s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, editorIndex * 500 + lineIndex * 100); // Delay progressivo
        });
        
        // Adiciona efeitos de hover no editor de código
        editor.addEventListener('mouseenter', () => {
            editor.style.transform = 'scale(1.02)'; // Aumenta ligeiramente
            editor.style.transition = 'transform 0.3s ease';
        });
        
        editor.addEventListener('mouseleave', () => {
            editor.style.transform = 'scale(1)'; // Retorna ao tamanho normal
        });
    });
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
                
                // Add special effects for different elements
                if (entry.target.classList.contains('code-editor')) {
                    entry.target.style.boxShadow = '0 8px 32px rgba(0, 122, 204, 0.3)';
                    entry.target.style.animation = 'glow 2s ease-in-out infinite';
                }
                
                if (entry.target.classList.contains('nav-link')) {
                    entry.target.style.animation = 'bounce 0.6s ease-in-out';
                }
                
                if (entry.target.classList.contains('profile-photo')) {
                    entry.target.style.animation = 'float 6s ease-in-out infinite, pulse 4s ease-in-out infinite';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.code-editor, .nav-link, .profile-photo, .footer-content');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease, box-shadow 0.8s ease';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// ===== CURSOR EFFECT =====
function initCursorEffect() {
    // Create custom cursor for code editor feel
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 2px;
        height: 20px;
        background: var(--accent-blue);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Cursor effects on hover
    const hoverElements = document.querySelectorAll('.code-editor, .nav-link, .control');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '4px';
            cursor.style.height = '24px';
            cursor.style.background = 'var(--accent-green)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '2px';
            cursor.style.height = '20px';
            cursor.style.background = 'var(--accent-blue)';
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuIcon && navMenu) {
        mobileMenuIcon.addEventListener('click', () => {
            const isActive = mobileMenuIcon.classList.contains('active');
            
            if (isActive) {
                // Close menu
                mobileMenuIcon.classList.remove('active');
                navMenu.style.display = 'none';
            } else {
                // Open menu
                mobileMenuIcon.classList.add('active');
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'var(--bg-secondary)';
                navMenu.style.borderTop = '1px solid var(--border-color)';
                navMenu.style.padding = 'var(--space-4)';
                navMenu.style.zIndex = '1000';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuIcon.classList.remove('active');
                navMenu.style.display = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuIcon.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuIcon.classList.remove('active');
                navMenu.style.display = 'none';
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuIcon.classList.contains('active')) {
                mobileMenuIcon.classList.remove('active');
                navMenu.style.display = 'none';
            }
        });
    }
}



// ===== NAVBAR SCROLL =====
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling up - show navbar
            navbar.classList.remove('navbar-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
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
        background: ${type === 'success' ? 'var(--accent-green)' : 'var(--accent-blue)'};
        color: var(--text-primary);
        border-radius: 4px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: var(--font-mono);
        font-size: var(--font-size-sm);
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
// Variável para controlar se o event listener já foi registrado
let isTrackingInitialized = false;

function initTracking() {
    if (isTrackingInitialized) {
        console.log('ℹ️ Tracking já inicializado - pulando');
        return;
    }
    
    document.addEventListener('click', (e) => {
        if (e.target.matches('.nav-link') && e.target.hasAttribute('href')) {
            trackEvent('navigation_click', {
                section: e.target.getAttribute('href')
            });
        }
        
        if (e.target.matches('.control')) {
            trackEvent('editor_control_click', {
                control: e.target.classList.contains('close') ? 'close' : 
                        e.target.classList.contains('minimize') ? 'minimize' : 'maximize'
            });
        }
        
        // Tracking específico para o botão de layout
        if (e.target.matches('.layout-toggle')) {
            trackEvent('layout_toggle_click', {
                currentLayout: 'dev'
            });
        }
    });
    
    isTrackingInitialized = true;
    console.log('📊 Tracking inicializado');
}

// ===== EXPORT FUNCTIONS =====
window.portfolioApp = {
    scrollToSection,
    showNotification,
    trackEvent
};



// ===== PARTICLE EFFECT =====
/**
 * Inicializa o efeito de partículas no fundo da página
 * Cria um canvas com partículas animadas para dar movimento ao background
 * @function initParticleEffect
 * @returns {void}
 */
function initParticleEffect() {
    // Cria o elemento canvas para renderização das partículas
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);
    
    // Configura o contexto 2D e dimensões do canvas
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50; // Número de partículas no fundo
    
    /**
     * Classe que representa uma partícula individual
     * Controla posição, velocidade, tamanho e cor
     */
    class Particle {
        constructor() {
            // Posição inicial aleatória
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            
            // Velocidade aleatória (direção e magnitude)
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            
            // Tamanho aleatório entre 1 e 3 pixels
            this.size = Math.random() * 2 + 1;
            
            // Cor aleatória em tons de azul/ciano
            this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
        }
        
        /**
         * Atualiza a posição da partícula e verifica colisões com bordas
         */
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Inverte direção ao atingir as bordas do canvas
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        /**
         * Desenha a partícula no canvas
         */
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Cria e adiciona partículas ao array
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    /**
     * Função de animação principal
     * Limpa o canvas e atualiza/desenha todas as partículas
     */
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
        
        // Atualiza e desenha cada partícula
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate); // Agenda próximo frame
    }
    
    animate(); // Inicia a animação
    
    // Handler para redimensionamento da janela
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

console.log('🎨 Portfolio Code Editor carregado com todas as funcionalidades!');
