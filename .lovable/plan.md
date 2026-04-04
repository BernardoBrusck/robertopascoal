

# Plano: Otimização Completa de Performance e Acessibilidade (Lighthouse 13)

## Estado atual

Muitas otimizações já foram aplicadas: Three.js removido, GSAP migrado para npm, lazy loading de seções, touch targets nos dots/sociais, `lang="pt-BR"`, favicon SVG. O que resta:

---

## Problema 1 — Preload aponta para imagem errada

O slides array começa com `slide06` (index 0), mas o preload no `index.html` aponta para `slide-06-omunga.webp`. Como index 0 já tem `fetchPriority="high"`, o preload está correto para a imagem exibida primeiro. **Porém**, o preload path usa `/src/assets/hero/slide-06-omunga.webp` que é um path de source, não de build — em produção o Vite faz hash do asset.

### Correção
- **`index.html`**: Remover o `<link rel="preload">` com path de source (não funciona em produção). O Vite transforma imports de assets automaticamente — o `fetchPriority="high"` no `<img>` do componente já é suficiente.
- **`lumina-interactive-list.tsx`**: Confirmar que o slide index 0 (que é `slide06`) tem `fetchPriority="high"` e `loading="eager"` — já está correto. Atualizar `width`/`height` para `1920`/`1080`.

---

## Problema 2 — 37 imagens sem width/height

### Arquivos e mudanças

**`src/components/HorizontalScrollSection.tsx`** — Componente `Photo`:
- Adicionar props `width` e `height` ao componente `Photo`
- Adicionar atributos em cada uso: Infância, Formação, Omunga, Hoje (desktop e mobile)
- ~25 imagens neste componente

**`src/components/ui/image-gallery.tsx`** — `AnimatedImage`:
- Adicionar `width`/`height` ao `<img>` dentro de `AnimatedImage` (ex: `width={800} height={600}` para landscape, `width={600} height={1067}` para portrait baseado no ratio)

**`src/components/ui/zoom-parallax.tsx`** — `LazyImage`:
- O `LazyImage` já aceita width/height via spread props — adicionar em cada uso no `ZoomParallaxSection.tsx` ou diretamente no componente

**`src/components/ui/lumina-interactive-list.tsx`**: Atualizar para `width={1920} height={1080}`

---

## Problema 3 — Imagens ainda pesadas

### Recomprimir imagens >100KB
Script bash com ImageMagick para recomprimir para quality 70, max 1200px:
- `roberto-pascoal-retrato-2.webp` (333KB)
- `roberto-pascoal-retrato.webp` (170KB)
- `roberto-pascoal-projetos-africa.webp` (144KB)
- `roberto-pascoal-professor-africa.webp` (144KB)
- `palestra-roberto.webp` (143KB)
- `tatuagem-concha-caminho.webp` (142KB)
- `capa-do-livro.webp` (140KB)
- `africa-max-schwoelk.webp` (135KB)
- `roberto-pascoal-explorador.webp` (133KB)
- `gemini-2.webp` (132KB)
- `roberto-pascoal-hero-montanha.webp` (131KB)
- `roberto-pascoal-retrato-1.webp` (130KB)
- `insta-3.webp` (129KB)
- `roberto-pascoal-comunidade-isolada.webp` (119KB)
- `post-documentario.webp` (114KB)
- `gemini-3.webp` (111KB)
- Hero slides: `slide-02-concha.webp` (146KB), `slide-05-indigena.webp` (153KB), `slide-03-amazonia.webp` (132KB)

Target: <100KB cada

---

## Problema 4 — JavaScript não usado (144KB)

### Ações
- **`src/pages/Index.tsx`**: Adicionar lazy loading para `ImageGallery`, `ZoomParallaxSection`, `TextRevealBlock`, `HorizontalScrollSection` e `ContactFooter` — estes ainda estão no bundle principal
- **`vite.config.ts`**: Adicionar `manualChunks` para separar `gsap` e `framer-motion` em vendor chunks

---

## Problema 5 — CSS não usado (10KB)

O `tailwind.config.ts` content já inclui `"./index.html"`. Verificar se algum CSS extra está importado desnecessariamente. Remover a classe `.webgl-canvas` do `index.css` (Three.js removido).

---

## Problema 6 — Render blocking (300ms)

- **`vite.config.ts`**: Adicionar `modulePreload: { polyfill: true }` e `manualChunks` para vendor splitting

---

## Problema 7 — Animações não compostas (23-26 elementos)

### Correções
- **`ServicesSection.tsx` L105**: `transition-[top]` com `style={{ top: ... }}` → substituir por `transform: translateY()` com `transition-transform`
- **`image-gallery.tsx` L44**: `transition-[max-height]` — manter, pois é necessário para o expand/collapse
- **`LoadingScreen.tsx` L75**: `transition: "width"` na barra de progresso → manter (progresso visual)
- **`ServicesSection.tsx` L53,55**: `transition-all` nos Project items — restringir para `transition-[opacity,transform]`
- **`index.css`**: Verificar keyframes — `slideFadeIn` já usa `transform` ✅

---

## Problema 8 — Google Analytics

Adicionar placeholder GA4 no `index.html` com ID `G-XXXXXXXXXX` e instruir o usuário a substituir pelo ID real. Adicionar event tracking nos CTAs do `BookSection` e `SpeakingSection`.

---

## Problema 9 — Contraste de cores

- `--muted-foreground: 220 10% 38%` → verificar contraste. HSL(220, 10%, 38%) ≈ #575d65, contraste ~5.2:1 sobre branco — OK
- Verificar textos sobre imagens no slider: já usa `rgba(255,255,255,0.55)` sobre gradiente escuro — OK
- Labels uppercase nas seções: usam `text-muted-foreground` — OK com o valor ajustado

---

## Problema 10 — Áreas de toque

- Slider dots: já têm `min-width: 44px; min-height: 44px` ✅
- Social icons no footer: já têm `p-3 min-w-[44px] min-h-[44px]` ✅
- Verificar WhatsApp link no `SpeakingSection`: já tem `min-h-[44px]` ✅
- Botão close do `DetailModal` em `ServicesSection`: é um `<button>` pequeno sem padding — adicionar `p-2 min-w-[44px] min-h-[44px]`

---

## Arquivos afetados

| Arquivo | Mudanças |
|---------|----------|
| `index.html` | Remover preload errado, adicionar GA4 placeholder |
| `src/components/ui/lumina-interactive-list.tsx` | width/height 1920x1080 |
| `src/components/HorizontalScrollSection.tsx` | width/height em todas as Photos |
| `src/components/ui/image-gallery.tsx` | width/height no AnimatedImage |
| `src/components/ui/zoom-parallax.tsx` | width/height no LazyImage |
| `src/components/ZoomParallaxSection.tsx` | Adicionar width/height nos image objects |
| `src/components/ServicesSection.tsx` | Corrigir animações não compostas (top→translateY), touch target no close button |
| `src/pages/Index.tsx` | Lazy load de mais componentes |
| `src/index.css` | Remover `.webgl-canvas` |
| `vite.config.ts` | manualChunks para vendor splitting |
| `public/image/` | Recomprimir ~19 imagens >100KB |
| `src/assets/hero/` | Recomprimir 3 slides >100KB |

