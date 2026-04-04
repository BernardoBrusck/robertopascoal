

# Plano: Otimização de imagens para carregamento rápido

## Problema

A pasta `/public/image/` tem **99MB** de imagens, com arquivos individuais de até **7.2MB**. Isso causa carregamento extremamente lento — o navegador precisa baixar dezenas de megabytes antes de exibir o conteúdo.

## Solução

Converter todas as imagens para **WebP** com redimensionamento para resolução máxima adequada (1920px de largura), reduzindo o peso total de ~99MB para ~5-10MB.

## Etapas

### 1. Converter todas as imagens para WebP otimizado
- Usar `cwebp` (via nix) para converter cada PNG/JPG/JPEG para WebP
- Qualidade: 80 (ótimo equilíbrio entre peso e visual)
- Largura máxima: 1920px (suficiente para telas grandes)
- Manter os originais temporariamente, depois remover

### 2. Atualizar referências em todos os componentes
Trocar todas as extensões `.png`, `.jpg`, `.JPG`, `.JPEG` por `.webp` nos arquivos:

| Arquivo | Qtd referências |
|---|---|
| `HorizontalScrollSection.tsx` | ~15 |
| `ZoomParallaxSection.tsx` | 7 |
| `FloatingPhotosSection.tsx` | 6 |
| `ServicesSection.tsx` | ~12 |
| `BookSection.tsx` | 1 |
| `SpeakingSection.tsx` | 1 |
| `ContactFooter.tsx` | logo |
| `image-gallery.tsx` | 16 |

### 3. Adicionar preload para imagem crítica (above the fold)
- O hero já usa WebP otimizado em `src/assets/hero/` — ok
- Adicionar `fetchpriority="high"` nas imagens visíveis sem scroll

## Resultado esperado
- Redução de ~99MB → ~5-10MB (90%+ menor)
- Carregamento visivelmente mais rápido em todas as seções
- Qualidade visual mantida

