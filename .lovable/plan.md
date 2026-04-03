

# Plano: Bloco 1 - Hero com Carrossel WebGL (Lumina Slider)

## Resumo

Adaptar o componente "Lumina Interactive List" (carrossel WebGL com transições glass/shader via GSAP + Three.js) para o contexto do Roberto Pascoal. O hero ocupará 100vh com fotos de impacto em tela cheia, texto minimalista branco sobre as imagens, e navegação lateral.

## Adaptações necessárias ao contexto do Roberto

O componente original usa fundo escuro (#0a0a0a) com estética dark. Para o Roberto:

- **Textos do slider**: Substituir os títulos genéricos ("Ethereal Glow", etc.) por frases da narrativa do Roberto -- "Não é sobre se sentir pronto", "É sobre ser suficiente para continuar caminhando", "O caminho é o propósito", etc.
- **Imagens placeholder**: Manter as imagens do CodePen por enquanto (laranja/retratos) como placeholder até Roberto enviar as 50+ fotos. Serão facilmente substituíveis.
- **Tipografia**: Manter Inter (heading) e Pretendard (body) já configurados -- não usar as fontes do prompt original (PP Neue Montreal, Cormorant Garamond).
- **Cores do overlay**: Texto branco sobre as fotos (as fotos de expedição são naturalmente escuras/contrastantes). Não alterar o design system branco do site -- o hero é a exceção visual (fullscreen com foto).
- **NÃO aplicar as variáveis CSS do prompt** (--color-bg: #0a0a0a, etc.) ao site global. Essas cores ficam isoladas apenas no componente hero.

## Arquivos a criar/modificar

### 1. `src/components/ui/lumina-interactive-list.tsx` (novo)
- Componente adaptado do prompt
- Slides com conteúdo do Roberto (frases, descrições)
- Carrega GSAP e Three.js via CDN dinamicamente
- Shaders WebGL para transição glass entre slides
- Navegação lateral com progress bars

### 2. `src/components/HeroSection.tsx` (novo)
- Wrapper que importa o Lumina component
- Seção fullscreen (100vh) como Bloco 1 da Home

### 3. `src/pages/Index.tsx` (modificar)
- Importar e renderizar HeroSection como primeiro bloco
- Remover o conteúdo placeholder atual (nome centralizado)

### 4. `src/index.css` (modificar)
- Adicionar os estilos CSS específicos do slider (`.slider-wrapper`, `.slide-nav-item`, `.webgl-canvas`, etc.)
- **Não alterar** as variáveis globais do site (permanecem brancas)

## Conteúdo dos slides (6 slides narrativos)

| # | Título | Descrição |
|---|--------|-----------|
| 1 | Não é sobre se sentir pronto | É sobre ser suficiente para continuar caminhando. |
| 2 | O Caminho | Sentido, propósito e a jornada que nos transforma. |
| 3 | Multiculturalidade | Quando todas as culturas coexistem, a humanidade se revela. |
| 4 | Nunca prontos | Mas sempre suficientes para o próximo passo. |
| 5 | A Jornada | Da Amazônia ao Sertão, da África ao Monte Roraima. |
| 6 | Roberto Pascoal | Escritor. Palestrante. Fundador da Omunga. |

## Detalhes técnicos

- **GSAP** (v3.12.2) e **Three.js** (r128) carregados via CDN -- sem instalar pacotes npm
- Projeto usa **Tailwind CSS v3** -- os estilos do slider vão em `@layer components` no `index.css`
- Efeito glass (refração, aberração cromática) como transição padrão entre slides
- Auto-slide com barra de progresso na navegação lateral
- Responsivo: textos com `clamp()` para adaptar a diferentes viewports

## O que NÃO fazer

- Não instalar fontes novas (PP Neue Montreal, Cormorant Garamond, PPSupplyMono)
- Não alterar as variáveis CSS globais do site
- Não criar rotas novas -- tudo fica na Index por enquanto

