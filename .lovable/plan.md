

# Plano: Adicionar galeria de fotos após ServicesSection

## O que será feito

Criar o componente `ImageGallery` (3 colunas masonry com imagens animadas ao entrar no viewport) e adicioná-lo no `Index.tsx` logo após a `ServicesSection`.

## Arquivos

| Arquivo | Ação |
|---|---|
| `src/components/ui/image-gallery.tsx` | Criar — componente de galeria masonry com `useInView` do framer-motion e `AspectRatio` |
| `src/pages/Index.tsx` | Adicionar `ImageGallery` após `ServicesSection` |

## Adaptações do template
- Remover `"use client"` (projeto Vite)
- Usar imagens placeholder Unsplash (já no padrão do projeto)
- `framer-motion` já instalado; `@radix-ui/react-aspect-ratio` já existe em `src/components/ui/aspect-ratio.tsx`
- Manter fundo branco, fontes Apple (system-ui já global)

