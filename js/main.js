// Aguardar o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Inicializar o smooth scroll para todos os links internos
        initSmoothScroll();
        
        // Inicializar o formulário de contato
        initContactForm();
        
        // Inicializar o navbar dinâmico
        initDynamicNavbar();
        
        // Iniciar efeito typewriter
        initTypewriter();

        // Inicializar download do CV
        initCVDownload();
        
        console.log('Todas as funcionalidades foram inicializadas com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar as funcionalidades:', error);
    }
});

// Função para smooth scroll
function initSmoothScroll() {
    try {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (!href) return;
                
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Erro no smooth scroll:', error);
    }
}

// Função para manipular o formulário de contato
function initContactForm() {
    try {
        const form = document.getElementById('contactForm');
        if (!form) {
            console.warn('Formulário de contato não encontrado');
            return;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter os valores dos campos
            const name = document.getElementById('name')?.value?.trim();
            const email = document.getElementById('email')?.value?.trim();
            const message = document.getElementById('message')?.value?.trim();
            
            // Validação básica
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Validação de email
            if (!isValidEmail(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Aqui você pode adicionar sua lógica de envio do formulário
            console.log('Formulário enviado:', { name, email, message });
            
            // Limpar o formulário
            form.reset();
            alert('Mensagem enviada com sucesso!');
        });
    } catch (error) {
        console.error('Erro no formulário de contato:', error);
    }
}

// Função para validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para navbar dinâmica
function initDynamicNavbar() {
    try {
        const navbar = document.getElementById('navbar');
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navbar || !sections.length || !navLinks.length) {
            console.warn('Elementos necessários para a navbar não encontrados');
            return;
        }

        let lastScroll = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            // Mudar estilo do navbar ao scroll
            if (currentScroll > 100) {
                navbar.classList.add('bg-opacity-95', 'py-2');
                navbar.classList.remove('py-4');
            } else {
                navbar.classList.remove('bg-opacity-95', 'py-2');
                navbar.classList.add('py-4');
            }
            
            // Atualizar link ativo baseado na seção visível
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (currentScroll >= sectionTop - 150) {
                    current = section.getAttribute('id') || '';
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-gray-300');
                if (link.getAttribute('href')?.substring(1) === current) {
                    link.classList.remove('text-gray-300');
                    link.classList.add('text-white');
                }
            });
            
            lastScroll = currentScroll;
        });
    } catch (error) {
        console.error('Erro na navbar dinâmica:', error);
    }
}

// Função para typewriter effect
function initTypewriter() {
    try {
        const element = document.getElementById('typewriter');
        if (!element) {
            console.warn('Elemento typewriter não encontrado');
            return;
        }
        
        const texts = [
            'Desenvolvedor Full Stack',
            'Software Engineer',
            'Ciencia de Dados',
            'Machine Learning'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            try {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    element.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    typingSpeed = 50;
                } else {
                    element.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    typingSpeed = 100;
                }
                
                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    typingSpeed = 2000; // Espera 2s antes de começar a apagar
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    typingSpeed = 500; // Espera 0.5s antes de começar novo texto
                }
                
                setTimeout(type, typingSpeed);
            } catch (error) {
                console.error('Erro no loop de digitação:', error);
            }
        }
        
        // Iniciar o efeito de digitação
        type();
        
    } catch (error) {
        console.error('Erro no efeito typewriter:', error);
    }
}

// Função para download do currículo
function initCVDownload() {
    try {
        const cvButton = document.querySelector('.cv-download');
        if (!cvButton) {
            console.warn('Botão de download do CV não encontrado');
            return;
        }

        cvButton.addEventListener('click', function(e) {
            e.preventDefault();
            const cvPath = 'static/docs/Sidnei Atual.docx';
            
            // Criar um elemento de link temporário
            const link = document.createElement('a');
            link.href = cvPath;
            link.download = 'Sidnei_Junior_CV.docx'; // Nome do arquivo para download
            
            // Adicionar à página, clicar e remover
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    } catch (error) {
        console.error('Erro no download do CV:', error);
    }
}
