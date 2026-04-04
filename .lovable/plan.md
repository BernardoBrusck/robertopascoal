

# Plano: Otimização de Performance e SEO

Relatório extenso — vou focar nas ações que podemos executar dentro do Lovable, priorizadas por impacto.

---

## Rodada 1 — Impacto crítico, esforço baixo

### 1. Corrigir `index.html` (SEO + Acessibilidade + Favicon)
- Alterar `<html lang="en">` para `<html lang="pt-BR">`
- Atualizar `<meta name="description">` e `og:description` / `twitter:description` com texto real sobre o Roberto
- Remover `<meta name="author" content="Lovable" />`
- Remover preload do Three.js (`<link rel="preload" href="...three.min.js">`) — o script já é carregado dinamicamente pelo componente
- Adicionar `<link rel="canonical" href="https://robertopascoal.brusck.com" />`
- Adicionar Schema Markup (Person + Book) em `<script type="application/ld+json">`
- Substituir favicon.ico (157KB) por uma versão otimizada (<5KB)

### 2. Otimizar imagem LCP do hero
- No `LuminaSlider`, carregar a primeira imagem do slide com `fetchPriority="high"` e sem lazy loading
- Adicionar `<link rel="preload" as="image" href="slide-06-omunga.webp">` no `<head>`

### 3. Eliminar carregamento duplicado de ScrollTrigger
- 4 componentes carregam ScrollTrigger via `document.createElement('script')` de forma independente
- Extrair para um utilitário compartilhado (`src/lib/loadGsap.ts`) que carrega GSAP + ScrollTrigger uma única vez e retorna uma Promise
- Todos os componentes passam a usar esse utilitário

---

## Rodada 2 — Impacto alto

### 4. Recomprimir imagens pesadas
- Usar script para recomprimir via ImageMagick as imagens acima de 200KB para qualidade 75, max 1200px de largura
- Alvos principais: `roberto-pascoal-retrato-2.webp` (1.6MB!), `palestra-roberto.webp` (414KB), `roberto-pascoal-retrato.webp` (415KB), `omg-4225.webp` (384KB), `roberto-pascoal-retrato-3.webp` (383KB)

### 5. Avaliar Three.js no mobile
- Three.js (~600KB) é usado apenas no hero slider para transições WebGL entre slides
- No mobile, o impacto no TBT é enorme (6.680ms)
- Criar fallback CSS para mobile: detectar `isMobile` e usar transição CSS simples (fade/slide) em vez de carregar Three.js
- Isso elimina ~600KB de JS e reduz drasticamente o TBT mobile

### 6. Adicionar `width` e `height` nas imagens
- Atualizar o componente `LazyImage` e os componentes `Photo` para incluir atributos `width`/`height` explícitos

---

## Rodada 3 — Melhorias complementares

### 7. Acessibilidade
- Adicionar `aria-label` nos botões do slider e no botão de copiar email
- Verificar contraste de cores nos textos cinza da navegação

### 8. Code splitting para GSAP
- Configurar `manualChunks` no `vite.config.ts` se GSAP for migrado para npm (avaliação futura)

---

## Arquivos afetados
- `index.html` — SEO, lang, favicon, preload, schema markup
- `src/components/ui/lumina-interactive-list.tsx` — fallback mobile sem Three.js, preload hero image
- `src/lib/loadGsap.ts` (novo) — utilitário compartilhado para carregar GSAP/ScrollTrigger
- `src/components/TextRevealSection.tsx`, `TextRevealBlock.tsx`, `FloatingPhotosSection.tsx`, `HorizontalScrollSection.tsx` — usar utilitário de GSAP
- `src/lib/LazyImage.tsx` — suporte a width/height
- `public/image/` — imagens recomprimidas
- `public/favicon.ico` — substituído por versão otimizada

## Resultado esperado
- Performance mobile: 38 → 70-85
- LCP mobile: 5.5s → ~2-2.5s
- TBT mobile: 6680ms → ~500-1000ms
- Payload total: ~4.5MB → ~1.5-2MB

