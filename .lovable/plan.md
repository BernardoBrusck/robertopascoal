

# Plano: Otimização de Performance do Site

## Problema identificado

1. **Imagens do hero: 13MB total** — 5 das 6 imagens pesam entre 2.2MB e 2.9MB cada. São carregadas TODAS de uma vez via Three.js TextureLoader antes do site aparecer
2. **7 imagens Unsplash no ZoomParallax** — carregadas imediatamente mesmo estando abaixo da dobra
3. **3 scripts CDN carregados sequencialmente** — GSAP, Three.js e ScrollTrigger, cada um aguardando o anterior

## Solução

### 1. Comprimir imagens do hero para WebP (~80-90% menor)
- Converter as 6 imagens para WebP com qualidade 80, resolução max 1920px
- De ~13MB para ~1-2MB total estimado
- Atualizar imports no `lumina-interactive-list.tsx`

### 2. Lazy loading inteligente de imagens
- Criar um componente utilitário `LazyImage` que usa `IntersectionObserver` para carregar imagens apenas quando estão próximas do viewport
- Aplicar no `ZoomParallaxSection` — as 7 imagens Unsplash só carregam quando o usuário se aproxima da seção
- Adicionar parâmetros de tamanho menores nas URLs do Unsplash (reduzir `w=1280` para `w=960`)

### 3. Carregar scripts CDN em paralelo e com prioridade
- No `index.html`, adicionar `<link rel="preload">` para GSAP e Three.js
- Carregar GSAP e Three.js em paralelo (não sequencial) no `lumina-interactive-list.tsx`
- ScrollTrigger pode continuar carregando sob demanda (só é usado mais abaixo)

### 4. Preload da primeira imagem do hero
- A primeira imagem do slider (slide-06-omunga) recebe `<link rel="preload">` no HTML para começar a carregar imediatamente

## Arquivos

| Arquivo | Ação |
|---|---|
| `src/assets/hero/*.jpg/png/jpeg` | Comprimir para WebP via script |
| `src/components/ui/lumina-interactive-list.tsx` | Atualizar imports para .webp, carregar scripts em paralelo |
| `src/components/ui/zoom-parallax.tsx` | Adicionar lazy loading nas imagens |
| `src/components/ZoomParallaxSection.tsx` | Reduzir tamanho das URLs Unsplash |
| `index.html` | Adicionar preload para scripts CDN e primeira imagem |
| `src/lib/LazyImage.tsx` | Criar componente de lazy loading com IntersectionObserver |

## Impacto esperado
- Tempo de carregamento inicial: de ~15s para ~3-4s
- Payload inicial: de ~16MB para ~2-3MB

