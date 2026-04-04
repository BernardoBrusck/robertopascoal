

# Plano: Otimização Completa de Performance, Acessibilidade e SEO

## Visão geral

12 itens do relatório Lighthouse serão implementados em 5 blocos de trabalho. O foco principal é eliminar Three.js/GSAP via CDN, migrar GSAP para npm, recomprimir imagens, e corrigir acessibilidade.

---

## Bloco 1 — Eliminar Three.js do desktop slider

**Problema**: Three.js (~600KB) é carregado via CDN apenas para um efeito de transição "glass" entre slides. Gera 4.6s de trabalho de thread principal.

**Solução**: Substituir o `DesktopSlider` por uma versão CSS pura com transição de fade + scale sutil (igual ao `MobileSlider` mas com animações mais ricas via CSS keyframes). Remover completamente a referência a Three.js.

**Arquivo**: `src/components/ui/lumina-interactive-list.tsx`
- Remover o componente `DesktopSlider` inteiro (que usa Three.js + canvas WebGL)
- Unificar desktop e mobile num único componente slider com transições CSS
- Manter auto-slide de 3.5s, navegação por dots, texto animado via CSS
- A primeira imagem terá `fetchPriority="high"` e `loading="eager"`

**Impacto**: -600KB JS, TBT reduzido drasticamente

---

## Bloco 2 — Migrar GSAP para npm + eliminar CDN

**Problema**: GSAP + ScrollTrigger carregados via CDN externo em `loadGsap.ts` e duplicados no slider. Sem tree-shaking, requests extras.

**Solução**:
- Instalar `gsap` via npm
- Reescrever `src/lib/loadGsap.ts` para exportar gsap/ScrollTrigger via import direto (sem script injection)
- Atualizar todos os componentes que usam `declare const gsap: any` + `waitForGsap`:
  - `src/components/BookSection.tsx`
  - `src/components/ServicesSection.tsx`
  - `src/components/SpeakingSection.tsx`
  - `src/components/TestimonialsSection.tsx`
  - `src/components/TextRevealSection.tsx`
  - `src/components/TextRevealBlock.tsx`
  - `src/components/FloatingPhotosSection.tsx`
  - `src/components/HorizontalScrollSection.tsx`

Cada componente passará de `waitForGsap` polling para import direto:
```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

**Impacto**: Elimina 3 requests CDN, habilita tree-shaking, code splitting automático pelo Vite

---

## Bloco 3 — Otimização de imagens

### 3a. Recomprimir imagens pesadas
Imagens acima de 150KB serão recomprimidas via ImageMagick (quality 75, max 1200px):
- `roberto-pascoal-retrato-2.webp` (349KB)
- `roberto-pascoal-leitura-indigena.webp` (188KB)
- `roberto-pascoal-retrato.webp` (178KB)
- `roberto-pascoal-criancas-indigenas.webp` (166KB)
- `img-3580.webp` (166KB)
- `gemini-1.webp` (163KB)
- `tatuagem-concha-caminho.webp` (143KB) — se usada
- Hero slides: `slide-01-caminho.webp` (257KB), `slide-04-roraima.webp` (171KB), `slide-06-omunga.webp` (164KB)
- Remover arquivos originais não-webp dos hero slides (.jpg, .png, .jpeg) — ~13MB de economia

### 3b. Adicionar `width` e `height` em todas as imagens
- Atualizar `LazyImage` para aceitar e passar `width`/`height`
- Adicionar dimensões em todos os `<img>` e `<Photo>` nos componentes

### 3c. Hero LCP
- Primeira imagem do slider com `fetchPriority="high"` + `loading="eager"`
- Preload no `index.html` já existe para `slide-06-omunga.webp` — manter

---

## Bloco 4 — Animações compostas + Lazy loading de seções

### 4a. Corrigir animações não compostas
Auditar todas as animações GSAP e verificar que usam `x`, `y`, `scale`, `opacity` em vez de `left`, `top`, `width`, `height`. Principais pontos:
- `ServicesSection.tsx` — `HoverModal` usa `gsap.quickTo` com `left` e `top` → mudar para `x` e `y`
- `BookSection.tsx` — usa `x` e `y` corretamente ✅
- `HorizontalScrollSection.tsx` — usa `x`, `y`, `scale`, `opacity` ✅
- `TestimonialsSection.tsx` — usa `x` ✅

### 4b. Lazy load de seções abaixo da dobra
No `Index.tsx`, lazy-load componentes pesados:
```tsx
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const BookSection = lazy(() => import('./components/BookSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
```

---

## Bloco 5 — Acessibilidade + CSS cleanup

### 5a. Contraste de cores
- Labels de categoria (`text-muted-foreground`) — verificar que `--muted-foreground: 220 10% 45%` atinge 4.5:1 sobre branco (HSL 220 10% 45% ≈ #6b7280 → contraste ~4.6:1, borderline)
- Ajustar para `--muted-foreground: 220 10% 40%` se necessário

### 5b. Áreas de toque mobile (44×44px)
- Dots do slider: atualmente 8×8px → adicionar padding para 44×44px área
- Ícones sociais no footer → `min-w-[44px] min-h-[44px] p-3`
- Botão Toggle menu → já tem `p-2` (32px), aumentar para `p-3`

### 5c. Tailwind content config
- Verificar que `tailwind.config.ts` content inclui `"./index.html"` — atualmente não inclui, adicionar

### 5d. Remover `src/App.css`
- Contém CSS padrão do Vite template (`.logo`, `.card`, etc.) que não é usado

---

## Arquivos afetados

| Arquivo | Ação |
|---------|------|
| `package.json` | Adicionar `gsap` como dependência |
| `src/lib/loadGsap.ts` | Reescrever com import npm |
| `src/components/ui/lumina-interactive-list.tsx` | Remover Three.js, unificar slider CSS |
| `src/components/BookSection.tsx` | Migrar para import gsap npm |
| `src/components/ServicesSection.tsx` | Migrar + corrigir `left/top` → `x/y` |
| `src/components/SpeakingSection.tsx` | Migrar para import gsap npm |
| `src/components/TestimonialsSection.tsx` | Migrar para import gsap npm |
| `src/components/TextRevealSection.tsx` | Já usa loadGsap, simplificar |
| `src/components/TextRevealBlock.tsx` | Já usa loadGsap, simplificar |
| `src/components/FloatingPhotosSection.tsx` | Já usa loadGsap, simplificar |
| `src/components/HorizontalScrollSection.tsx` | Já usa loadGsap, simplificar |
| `src/components/ContactFooter.tsx` | Touch targets nos sociais |
| `src/components/ui/navbar.tsx` | Touch target no menu button |
| `src/lib/LazyImage.tsx` | Suporte a width/height |
| `src/pages/Index.tsx` | Lazy load de seções |
| `src/index.css` | Ajustar slider-dot touch area, muted-foreground |
| `tailwind.config.ts` | Adicionar `"./index.html"` ao content |
| `src/App.css` | Deletar |
| `src/assets/hero/*.jpg,*.png,*.jpeg` | Deletar originais não-webp |
| `public/image/` | Recomprimir imagens >150KB |

## Resultado esperado
- Performance Desktop: 83 → 95+
- Performance Mobile: 88 → 92+
- TBT: Redução massiva com remoção de Three.js
- Payload: ~4.5MB → ~1.5MB
- Acessibilidade: 86 → 95+

