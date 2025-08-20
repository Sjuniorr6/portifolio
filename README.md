# Portfolio Sidnei Junior - Sistema de Layouts Duplos

## 🎨 Sobre o Projeto

Este portfolio possui **dois layouts diferentes** que podem ser alternados dinamicamente:

### 📱 Layout Dev (Atual)
- **Estilo**: Code Editor / Terminal
- **Características**: 
  - Interface inspirada em editores de código
  - Sintaxe highlighting
  - Scroll horizontal
  - Design minimalista e técnico
  - Foco em desenvolvedores

### 🎯 Layout Usuário (Alternativo)
- **Estilo**: Moderno / Profissional
- **Características**:
  - Design moderno com Bootstrap
  - Animações AOS
  - Layout responsivo
  - Gradientes e efeitos visuais
  - Foco em usuários finais

## 🚀 Como Usar

### Alternância de Layouts
1. **No Layout Dev**: Clique no botão "Layout Usuário" no navbar
2. **No Layout Usuário**: Clique no botão "Layout Dev" no navbar

### Funcionalidades
- ✅ **Alternância instantânea** entre layouts
- ✅ **Preservação do estado** do layout atual
- ✅ **Carregamento dinâmico** de estilos e scripts
- ✅ **Responsividade** em ambos os layouts
- ✅ **Notificações** de status

## 📁 Estrutura de Arquivos

```
Portfolio/
├── index.html              # Layout Dev (principal)
├── css/
│   └── style.css           # Estilos do Layout Dev
├── js/
│   ├── main.js             # Scripts do Layout Dev
│   └── layoutManager.js    # Gerenciador de layouts
├── layout2/
│   ├── index.html          # Layout Usuário
│   ├── css/
│   │   └── style.css       # Estilos do Layout Usuário
│   └── main.js             # Scripts do Layout Usuário
└── static/
    └── images/             # Imagens do portfolio
```

## 🔧 Tecnologias Utilizadas

### Layout Dev
- HTML5
- CSS3 (Custom)
- JavaScript (Vanilla)
- Fira Code Font
- JetBrains Mono Font

### Layout Usuário
- HTML5
- CSS3 (Custom)
- JavaScript (Vanilla)
- Bootstrap 5.3.0
- AOS (Animate On Scroll)
- Google Fonts (Inter, Pacifico, Righteous)

## 🎯 Características dos Layouts

### Layout Dev
- **Tema**: Dark com cores de editor
- **Tipografia**: Monospace (Fira Code)
- **Layout**: Code editor com line numbers
- **Interação**: Scroll horizontal
- **Público**: Desenvolvedores

### Layout Usuário
- **Tema**: Light com gradientes
- **Tipografia**: Sans-serif (Inter)
- **Layout**: Cards e seções modernas
- **Interação**: Animações e transições
- **Público**: Usuários finais

## 🛠️ Implementação Técnica

### LayoutManager Class
```javascript
class LayoutManager {
    constructor() {
        this.currentLayout = 'dev';
        this.devLayoutContent = null;
    }
    
    async toggleLayout() {
        // Lógica de alternância
    }
}
```

### Funcionalidades
- **Salvamento de estado**: Preserva o layout atual
- **Carregamento dinâmico**: Carrega estilos e scripts conforme necessário
- **Gerenciamento de dependências**: Adiciona/remove Bootstrap, AOS, etc.
- **Reinicialização**: Reinicializa scripts após alternância

## 📱 Responsividade

Ambos os layouts são totalmente responsivos:
- **Desktop**: Layout completo
- **Tablet**: Ajustes de tamanho
- **Mobile**: Layout otimizado

## 🎨 Personalização

### Cores e Temas
- Layout Dev: Variáveis CSS para cores de editor
- Layout Usuário: Sistema de cores Bootstrap + custom

### Animações
- Layout Dev: Animações CSS simples
- Layout Usuário: AOS + animações customizadas

## 🚀 Como Executar

1. Clone o repositório
2. Abra `index.html` no navegador
3. Use o botão "Layout Usuário" para alternar
4. Explore ambos os layouts

## 📝 Notas

- O sistema salva automaticamente o estado do layout atual
- A alternância é instantânea e preserva a posição de scroll
- Ambos os layouts compartilham as mesmas imagens e conteúdo
- O sistema é extensível para adicionar mais layouts no futuro

---

**Desenvolvido por Sidnei Junior** 🚀
