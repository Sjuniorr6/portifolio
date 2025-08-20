// ===== LAYOUT MANAGER SIMPLIFICADO =====
class LayoutManager {
    constructor() {
        this.currentLayout = 'dev';
        this.devLayoutContent = null;
        this.init();
    }

    init() {
        this.setupLayoutToggle();
        this.saveCurrentLayout();
    }

    setupLayoutToggle() {
        const layoutToggle = document.getElementById('layoutToggle');
        if (layoutToggle) {
            layoutToggle.addEventListener('click', () => {
                this.toggleLayout();
            });
        }
    }

    saveCurrentLayout() {
        this.devLayoutContent = {
            body: document.body.innerHTML,
            title: document.title
        };
    }

    async toggleLayout() {
        if (this.currentLayout === 'dev') {
            await this.switchToUserLayout();
        } else {
            await this.switchToDevLayout();
        }
    }

    async switchToUserLayout() {
        try {
            // Mostrar loading screen
            this.showLoadingScreen();
            
            this.saveCurrentLayout();
            await this.loadUserLayout();
            this.currentLayout = 'user';
            this.updateToggleButton();
            console.log('✅ Layout Usuário carregado');
            
            // Esconder loading screen após um tempo
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 1000);
        } catch (error) {
            console.error('❌ Erro:', error);
            // O fallback já é chamado dentro de loadUserLayout
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 1000);
        }
    }

    async switchToDevLayout() {
        try {
            console.log('🔄 Fazendo refresh da página...');
            
            // Fazer refresh da página
            window.location.reload();
            
        } catch (error) {
            console.error('❌ Erro:', error);
            // Se der erro, fazer refresh mesmo assim
            window.location.reload();
        }
    }

    async loadUserLayout() {
        try {
            // Tentar carregar o arquivo
            let html = null;
            
            try {
                const response = await fetch('layout2/index.html');
                if (response.ok) {
                    html = await response.text();
                    console.log('✅ HTML carregado com sucesso');
                }
            } catch (fetchError) {
                console.log('ℹ️ Fetch falhou, usando fallback');
            }
            
            // Se não conseguiu carregar, usar fallback
            if (!html) {
                console.log('ℹ️ Usando layout fallback');
                this.createFallbackUserLayout();
                return;
            }
            
            // Processar o HTML carregado
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                document.body.innerHTML = doc.body.innerHTML;
                document.title = doc.title;
                
                this.loadUserStyles();
                this.loadUserScripts();
                this.addBackToDevButton();
            } catch (parseError) {
                console.log('ℹ️ Erro ao processar HTML, usando fallback');
                this.createFallbackUserLayout();
            }
            
        } catch (error) {
            console.log('ℹ️ Erro ao carregar layout, usando fallback:', error);
            this.createFallbackUserLayout();
        }
    }

    loadUserStyles() {
        try {
            // Limpar estilos existentes
            const existingStyles = document.querySelectorAll('link[rel="stylesheet"]');
            existingStyles.forEach(link => link.remove());
            
            // Adicionar novos estilos de forma mais simples
            const styles = [
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css',
                'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Dancing+Script:wght@400;500;600;700&family=Pacifico:wght@400&family=Righteous:wght@400&display=swap',
                'https://unpkg.com/aos@2.3.1/dist/aos.css',
                'layout2/css/style.css'
            ];
            
            // Carregar estilos de forma mais robusta
            styles.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.onerror = () => {
                    console.log(`ℹ️ Estilo não carregado: ${href}`);
                };
                document.head.appendChild(link);
            });
            
            console.log('✅ Estilos do layout usuário carregados');
        } catch (error) {
            console.log('ℹ️ Erro ao carregar estilos:', error);
        }
    }

    loadUserScripts() {
        try {
            // Remover scripts existentes
            const existingScripts = document.querySelectorAll('script[src*="bootstrap"], script[src*="aos"], script[src*="layout2"]');
            existingScripts.forEach(script => script.remove());
            
            // Adicionar novos scripts de forma mais simples
            const scripts = [
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
                'https://unpkg.com/aos@2.3.1/dist/aos.js',
                'layout2/js/main.js'
            ];
            
            // Carregar scripts de forma mais robusta
            scripts.forEach(src => {
                const script = document.createElement('script');
                script.src = src;
                script.onerror = () => {
                    console.log(`ℹ️ Script não carregado: ${src}`);
                };
                document.body.appendChild(script);
            });
            
            // Inicializar AOS após um tempo
            setTimeout(() => {
                try {
                    if (typeof AOS !== 'undefined') {
                        AOS.init({
                            duration: 1000,
                            easing: 'ease-in-out',
                            once: true,
                            offset: 100
                        });
                        console.log('✅ AOS inicializado');
                    }
                } catch (aosError) {
                    console.log('ℹ️ AOS não disponível');
                }
            }, 500);
            
            console.log('✅ Scripts do layout usuário carregados');
        } catch (error) {
            console.log('ℹ️ Erro ao carregar scripts:', error);
        }
    }

    restoreDevStyles() {
        try {
            // Limpar estilos existentes
            const existingStyles = document.querySelectorAll('link[rel="stylesheet"]');
            existingStyles.forEach(link => link.remove());
            
            // Adicionar apenas o CSS do layout dev
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/style.css';
            document.head.appendChild(link);
            
            console.log('✅ Estilos do layout dev restaurados');
        } catch (error) {
            console.log('ℹ️ Erro ao restaurar estilos dev:', error);
        }
    }

    reinitializeDevScripts() {
        try {
            // Remover scripts do layout usuário
            const scripts = document.querySelectorAll('script[src*="bootstrap"], script[src*="aos"], script[src*="layout2"]');
            scripts.forEach(script => script.remove());
            
            // Remover botão flutuante
            const floatingButton = document.getElementById('layoutToggle');
            if (floatingButton && floatingButton.style.position === 'fixed') {
                floatingButton.remove();
            }
            
            // Fechar navbar se estiver aberta
            this.closeNavbar();
            
            // Garantir que o main.js do layout dev esteja carregado
            const devScript = document.querySelector('script[src="js/main.js"]');
            if (!devScript) {
                const script = document.createElement('script');
                script.src = 'js/main.js';
                script.onload = () => {
                    console.log('✅ Script dev carregado com sucesso');
                    this.initializeDevApp();
                };
                script.onerror = () => {
                    console.log('ℹ️ Script dev já carregado');
                    this.initializeDevApp();
                };
                document.body.appendChild(script);
            } else {
                // Se o script já existe, aguardar um pouco antes de inicializar
                setTimeout(() => {
                    this.initializeDevApp();
                }, 100);
            }
        } catch (error) {
            console.log('ℹ️ Erro ao reinitializar scripts dev:', error);
            this.initializeDevApp();
        }
    }
    
    initializeDevApp() {
        // Aguardar um pouco antes de reinicializar
        setTimeout(() => {
            try {
                // Resetar estado da aplicação se a função existir
                if (typeof resetAppState === 'function') {
                    resetAppState();
                }
                
                // Reinicializar apenas se a função existir
                if (typeof initializeApp === 'function') {
                    initializeApp();
                }
                
                // Garantir que o navbar esteja fechado
                this.closeNavbar();
                
                // Aguardar um pouco mais e fechar novamente para garantir
                setTimeout(() => {
                    this.closeNavbar();
                }, 100);
                
                this.init();
                console.log('✅ Layout Dev inicializado com sucesso');
            } catch (error) {
                console.log('ℹ️ Erro ao inicializar app dev:', error);
            }
        }, 200);
    }

    addBackToDevButton() {
        const navbarNav = document.querySelector('.navbar-nav');
        if (navbarNav) {
            // Remover botão existente
            const existingToggle = navbarNav.querySelector('#layoutToggle');
            if (existingToggle) {
                existingToggle.closest('.nav-item').remove();
            }
            
            // Adicionar novo botão
            const layoutToggle = document.createElement('li');
            layoutToggle.className = 'nav-item';
            layoutToggle.innerHTML = `
                <button id="layoutToggle" class="nav-link layout-toggle" style="background: #3b82f6; color: white; border: none; border-radius: 4px; padding: 8px 16px; margin-left: 10px; cursor: pointer; font-weight: 600;">
                    Layout Dev
                </button>
            `;
            navbarNav.appendChild(layoutToggle);
            
            // Adicionar evento
            const button = layoutToggle.querySelector('#layoutToggle');
            if (button) {
                button.addEventListener('click', () => {
                    this.switchToDevLayout();
                });
            }
        } else {
            this.createFloatingButton();
        }
    }

    createFloatingButton() {
        const floatingButton = document.createElement('button');
        floatingButton.id = 'layoutToggle';
        floatingButton.textContent = 'Layout Dev';
        floatingButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 20px;
            cursor: pointer;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        floatingButton.addEventListener('click', () => {
            this.switchToDevLayout();
        });
        
        document.body.appendChild(floatingButton);
    }

    updateToggleButton() {
        const layoutToggle = document.getElementById('layoutToggle');
        if (layoutToggle) {
            layoutToggle.textContent = this.currentLayout === 'dev' ? 'Layout Usuário' : 'Layout Dev';
        }
    }

    showLoadingScreen() {
        try {
            // Criar loading screen se não existir
            let loadingScreen = document.getElementById('loading-screen');
            if (!loadingScreen) {
                loadingScreen = document.createElement('div');
                loadingScreen.id = 'loading-screen';
                loadingScreen.className = 'loading-screen';
                loadingScreen.innerHTML = `
                    <div class="loading-content">
                        <div class="loading-spinner"></div>
                        <div class="loading-text">Carregando...</div>
                    </div>
                `;
                document.body.appendChild(loadingScreen);
            }
            
            // Mostrar loading screen
            loadingScreen.style.display = 'flex';
            loadingScreen.classList.remove('hidden');
            
            console.log('🔄 Loading screen mostrada');
        } catch (error) {
            console.log('ℹ️ Erro ao mostrar loading screen:', error);
        }
    }

    hideLoadingScreen() {
        try {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                
                // Remover após animação
                setTimeout(() => {
                    if (loadingScreen && loadingScreen.parentNode) {
                        loadingScreen.remove();
                    }
                }, 500);
                
                console.log('✅ Loading screen escondida');
            }
        } catch (error) {
            console.log('ℹ️ Erro ao esconder loading screen:', error);
        }
    }

    closeNavbar() {
        try {
            // Fechar navbar do Bootstrap se estiver aberta
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                // Remover classe 'show' para fechar
                navbarCollapse.classList.remove('show');
                
                // Remover classe 'collapsed' do botão
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler) {
                    navbarToggler.classList.add('collapsed');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
                
                console.log('✅ Navbar fechada');
            }
            
            // Também fechar qualquer dropdown que possa estar aberto
            const dropdowns = document.querySelectorAll('.dropdown-menu.show');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
            
            // Forçar fechamento usando Bootstrap se disponível
            if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                const navbarElement = document.querySelector('#navbarNav');
                if (navbarElement) {
                    const bsCollapse = new bootstrap.Collapse(navbarElement, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
            
        } catch (error) {
            console.log('ℹ️ Erro ao fechar navbar:', error);
        }
    }

    createFallbackUserLayout() {
        try {
            // Apenas o conteúdo do body, sem HTML completo
            const fallbackHTML = `
    <!-- Navigation -->
    <nav id="navbar" class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#home">
                <span class="brand-text">SJR</span>
                <span class="brand-subtitle">Portfolio</span>
            </a>
            
            <button class="mobile-menu-icon" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#sobre">Sobre</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#habilidades">Habilidades</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#projetos">Projetos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contato">Contato</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section">
        <div class="hero-background">
            <div class="hero-particles"></div>
            <div class="hero-grid"></div>
        </div>
        
        <div class="container">
            <div class="row align-items-center min-vh-100">
                <div class="col-lg-6" data-aos="fade-right" data-aos-duration="1000">
                    <div class="hero-content">
                        <div class="hero-badge">
                            <i class="bi bi-code-slash"></i>
                            <span>Desenvolvedor Full Stack</span>
                        </div>
                        
                        <h1 class="hero-title">
                            <span class="hero-greeting">Olá, meu nome é</span>
                            <span class="hero-name">Sidnei</span>
                        </h1>
                        
                        <p class="hero-subtitle">
                            Transformando ideias em <span class="typewriter" id="typewriter"></span>
                        </p>
                        
                        <p class="hero-description">
                            Desenvolvedor apaixonado por criar soluções inovadoras e experiências digitais excepcionais.
                        </p>
                        
                        <div class="hero-buttons">

                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6" data-aos="fade-left" data-aos-duration="1000">
                    <div class="hero-visual">
                        <div class="profile-container">
                            <div class="profile-image">
                                <img src="static/images/portifolio.jpg" alt="Sidnei Junior">
                            </div>
                            <div class="profile-glow"></div>
                            <div class="floating-elements">
                                <div class="floating-icon" style="--delay: 0s">
                                    <i class="bi bi-react"></i>
                                </div>
                                <div class="floating-icon" style="--delay: 1s">
                                    <i class="bi bi-braces"></i>
                                </div>
                                <div class="floating-icon" style="--delay: 2s">
                                    <i class="bi bi-database"></i>
                                </div>
                                <div class="floating-icon" style="--delay: 3s">
                                    <i class="bi bi-gear"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="scroll-indicator">
            <div class="scroll-arrow"></div>
            <span>Scroll</span>
        </div>
    </section>

    <!-- About Section -->
    <section id="sobre" class="about-section">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <h2 class="section-title">Sobre Mim</h2>
                <p class="section-subtitle">Conheça minha jornada e experiência</p>
            </div>
            
            <div class="row align-items-center">
                <div class="col-lg-6" data-aos="fade-right">
                    <div class="about-content">
                        <div class="about-text">
                            <p>Sou um desenvolvedor Full Stack apaixonado por tecnologia e inovação. Com experiência em desenvolvimento web, mobile e sistemas empresariais.</p>
                            
                            <div class="about-features">
                                <div class="feature-item">
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>Desenvolvimento Full Stack</span>
                                </div>
                                <div class="feature-item">
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>Arquitetura de Sistemas</span>
                                </div>
                                <div class="feature-item">
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>DevOps & Cloud</span>
                                </div>
                                <div class="feature-item">
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>Machine Learning</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6" data-aos="fade-left">
                    <div class="timeline-container">
                        <div class="timeline">
                            <div class="timeline-item" data-aos="fade-up" data-aos-delay="100">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h4>Jan 2025 - Presente</h4>
                                    <h5>Software Engineer Junior</h5>
                                    <p class="timeline-company">GRUPO GOLDEN SAT</p>
                                    <ul class="timeline-details">
                                        <li>Desenvolvimento e manutenção de aplicações em Django, Python, e React</li>
                                        <li>Implantação e manutenção de sistemas na AWS</li>
                                        <li>Desenvolvimento de soluções para rastreamento de veículos</li>
                                        <li>Aplicação de IA para reconhecimento de padrões em imagens</li>
                                        <li>Trabalho com metodologias ágeis (Scrum e Kanban)</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="timeline-item" data-aos="fade-up" data-aos-delay="200">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h4>Jul 2024 - Presente</h4>
                                    <h5>Desenvolvedor Full Stack</h5>
                                    <p class="timeline-company">GRUPO GOLDEN SAT</p>
                                    <ul class="timeline-details">
                                        <li>Criação de dashboards interativos e relatórios no Power BI</li>
                                        <li>Desenvolvimento de modelos de Machine Learning</li>
                                        <li>Gerenciamento de SQL Server e SQLite3</li>
                                        <li>Desenvolvimento web com Django e integração de APIs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="habilidades" class="skills-section">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <h2 class="section-title">Habilidades</h2>
                <p class="section-subtitle">Tecnologias e ferramentas que domino</p>
            </div>
            
            <div class="skills-grid">
                <div class="skill-category" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="category-title">Frontend</h3>
                    <div class="skills-list">
                        <div class="skill-item" data-skill="React" data-level="90">
                            <div class="skill-icon">
                                <i class="bi bi-braces"></i>
                            </div>
                            <div class="skill-info">
                                <span class="skill-name">React</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" data-width="90%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="skill-item" data-skill="Vue.js" data-level="85">
                            <div class="skill-icon">
                                <i class="bi bi-braces"></i>
                            </div>
                            <div class="skill-info">
                                <span class="skill-name">Vue.js</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" data-width="85%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="skill-item" data-skill="Angular" data-level="80">
                            <div class="skill-icon">
                                <i class="bi bi-braces"></i>
                            </div>
                            <div class="skill-info">
                                <span class="skill-name">Angular</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" data-width="80%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="skill-category" data-aos="fade-up" data-aos-delay="200">
                    <h3 class="category-title">Backend</h3>
                    <div class="skills-list">
                        <div class="skill-item" data-skill="Node.js" data-level="95">
                            <div class="skill-icon">
                                <i class="bi bi-server"></i>
                            </div>
                            <div class="skill-info">
                                <span class="skill-name">Node.js</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" data-width="95%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="skill-item" data-skill="Python" data-level="90">
                            <div class="skill-icon">
                                <i class="bi bi-code-slash"></i>
                            </div>
                            <div class="skill-info">
                                <span class="skill-name">Python</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" data-width="90%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="skill-item" data-skill="Laravel" data-level="85">
                            <div class="skill-icon">
                                <i class="bi bi-server"></i>
                            </div>
                            <div class="skill-info">
                                <span class="skill-name">Laravel</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" data-width="85%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="skill-category" data-aos="fade-up" data-aos-delay="300">
                    <h3 class="category-title">Database</h3>
                    <div class="skills-list">
                        <div class="skill-item" data-skill="PostgreSQL" data-level="90">
                            <div class="skill-icon">
                                <i class="bi bi-database"></i>
                            </div>
                            <div class="skill-info">
                                <span class="skill-name">PostgreSQL</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" data-width="90%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="skill-item" data-skill="MongoDB" data-level="85">
                            <div class="skill-icon">
                                <i class="bi bi-database"></i>
                            </div>
                            <div class="skill-info">
                                <span class="skill-name">MongoDB</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" data-width="85%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="skill-item" data-skill="Redis" data-level="80">
                            <div class="skill-icon">
                                <i class="bi bi-database"></i>
                            </div>
                            <div class="skill-info">
                                <span class="skill-name">Redis</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" data-width="80%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projetos" class="projects-section">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <h2 class="section-title">Projetos</h2>
                <p class="section-subtitle">Alguns dos meus trabalhos mais recentes</p>
            </div>
            
            <div class="projects-grid">
                <!-- Projeto 1 -->
                <div class="project-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="project-image">
                        <img src="static/images/goldensar001.png" alt="Sistema Integrado">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="#" class="project-link" target="_blank"><i class="bi bi-eye"></i></a>
                                <a href="https://github.com/Sjuniorr6" class="project-link" target="_blank"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Sistema Integrado</h3>
                        <p class="project-description">Sistema completo de gestão empresarial com integração de processos.</p>
                        <div class="project-tech">
                            <span class="tech-tag">Python</span>
                            <span class="tech-tag">Django</span>
                            <span class="tech-tag">PostgreSQL</span>
                            <span class="tech-tag">AWS</span>
                        </div>
                    </div>
                </div>

                <!-- Projeto 2 -->
                <div class="project-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="project-image">
                        <img src="static/images/voucher001.png" alt="GS Voucher">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="#" class="project-link" target="_blank"><i class="bi bi-eye"></i></a>
                                <a href="https://github.com/Sjuniorr6" class="project-link" target="_blank"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">GS Voucher</h3>
                        <p class="project-description">Sistema de gestão de vouchers e controle de rotas.</p>
                        <div class="project-tech">
                            <span class="tech-tag">React</span>
                            <span class="tech-tag">Node.js</span>
                            <span class="tech-tag">Express</span>
                            <span class="tech-tag">Redis</span>
                        </div>
                    </div>
                </div>

                <!-- Projeto 3 -->
                <div class="project-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="project-image">
                        <img src="static/images/acionamentos001.png" alt="Sistema Acionamentos">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="#" class="project-link" target="_blank"><i class="bi bi-eye"></i></a>
                                <a href="https://github.com/Sjuniorr6" class="project-link" target="_blank"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Sistema Acionamentos</h3>
                        <p class="project-description">Monitoramento em tempo real e acionamento remoto.</p>
                        <div class="project-tech">
                            <span class="tech-tag">Python</span>
                            <span class="tech-tag">Django</span>
                            <span class="tech-tag">WebSocket</span>
                            <span class="tech-tag">API</span>
                        </div>
                    </div>
                </div>

                <!-- Projeto 4 -->
                <div class="project-card" data-aos="fade-up" data-aos-delay="400">
                    <div class="project-image">
                        <img src="static/images/gs-controller.png" alt="GS Controller">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="#" class="project-link" target="_blank"><i class="bi bi-eye"></i></a>
                                <a href="https://github.com/Sjuniorr6" class="project-link" target="_blank"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">GS Controller</h3>
                        <p class="project-description">Sistema de controle e monitoramento de eventos.</p>
                        <div class="project-tech">
                            <span class="tech-tag">React</span>
                            <span class="tech-tag">Node.js</span>
                            <span class="tech-tag">MongoDB</span>
                            <span class="tech-tag">WebSocket</span>
                        </div>
                    </div>
                </div>

                <!-- Projeto 5 -->
                <div class="project-card" data-aos="fade-up" data-aos-delay="500">
                    <div class="project-image">
                        <img src="static/images/cass-cassinos.png" alt="Cass Cassinos">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="#" class="project-link" target="_blank"><i class="bi bi-eye"></i></a>
                                <a href="https://github.com/Sjuniorr6" class="project-link" target="_blank"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Cass Cassinos</h3>
                        <p class="project-description">Sistema de controle e gestão para cassinos.</p>
                        <div class="project-tech">
                            <span class="tech-tag">Vue.js</span>
                            <span class="tech-tag">Laravel</span>
                            <span class="tech-tag">MySQL</span>
                            <span class="tech-tag">API</span>
                        </div>
                    </div>
                </div>

                <!-- Projeto 6 -->
                <div class="project-card" data-aos="fade-up" data-aos-delay="600">
                    <div class="project-image">
                        <img src="static/images/gs-deskcontrol.png" alt="GS DeskControl">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="#" class="project-link" target="_blank"><i class="bi bi-eye"></i></a>
                                <a href="https://github.com/Sjuniorr6" class="project-link" target="_blank"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">GS DeskControl</h3>
                        <p class="project-description">Sistema de gestão de locais e responsáveis.</p>
                        <div class="project-tech">
                            <span class="tech-tag">Angular</span>
                            <span class="tech-tag">Spring Boot</span>
                            <span class="tech-tag">PostgreSQL</span>
                            <span class="tech-tag">Docker</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contato" class="contact-section">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <h2 class="section-title">Contato</h2>
                <p class="section-subtitle">Vamos trabalhar juntos!</p>
            </div>
            
            <div class="row">
                <div class="col-lg-6" data-aos="fade-right">
                    <div class="contact-info">
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="bi bi-envelope"></i>
                            </div>
                            <div class="contact-details">
                                <h4>Email</h4>
                                <p>sjuniorr6@gmail.com</p>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="bi bi-telephone"></i>
                            </div>
                            <div class="contact-details">
                                <h4>Telefone</h4>
                                <p>+55 (11) 987487342</p>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="bi bi-geo-alt"></i>
                            </div>
                            <div class="contact-details">
                                <h4>Localização</h4>
                                <p>São Paulo, SP - Brasil</p>
                            </div>
                        </div>
                        
                        <div class="social-links">
                            <a href="https://www.linkedin.com/in/sidnei-junior-115962207/" target="_blank" class="social-link"><i class="bi bi-linkedin"></i></a>
                            <a href="https://github.com/Sjuniorr6" target="_blank" class="social-link"><i class="bi bi-github"></i></a>
                            <a href="#" class="social-link"><i class="bi bi-twitter"></i></a>
                            <a href="#" class="social-link"><i class="bi bi-instagram"></i></a>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6" data-aos="fade-left">
                    <div class="contact-form">
                        <form id="contactForm">
                            <div class="form-group">
                                <input type="text" id="name" name="name" required>
                                <label for="name">Nome</label>
                                <div class="form-line"></div>
                            </div>
                            
                            <div class="form-group">
                                <input type="email" id="email" name="email" required>
                                <label for="email">Email</label>
                                <div class="form-line"></div>
                            </div>
                            
                            <div class="form-group">
                                <textarea id="message" name="message" rows="5" required></textarea>
                                <label for="message">Mensagem</label>
                                <div class="form-line"></div>
                            </div>
                            
                            <button type="submit" class="btn btn-primary btn-glow">
                                <span>Enviar Mensagem</span>
                                <i class="bi bi-send"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <span>SJR</span>
                    <p>Desenvolvedor Full Stack</p>
                </div>
                <div class="footer-links">
                    <a href="#home">Home</a>
                    <a href="#sobre">Sobre</a>
                    <a href="#habilidades">Habilidades</a>
                    <a href="#projetos">Projetos</a>
                    <a href="#contato">Contato</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Sidnei Junior. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
        `;
        
        document.body.innerHTML = fallbackHTML;
        document.title = 'Sidnei Junior - Portfolio (Layout Usuário)';
        
        console.log('✅ Fallback HTML aplicado com sucesso');
        
        // Aguardar um pouco para garantir que o DOM foi atualizado
        setTimeout(() => {
            this.loadUserStyles();
            this.loadUserScripts();
            this.addBackToDevButton();
        }, 50);
        } catch (error) {
            console.log('ℹ️ Erro ao criar fallback layout:', error);
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.layoutManager = new LayoutManager();
});
