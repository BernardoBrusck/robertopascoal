

# Plano: Restaurar efeito Zoom Parallax no mobile

## Problema

O efeito de zoom parallax foi removido no mobile e substituído por imagens empilhadas simples. O usuário quer o efeito de volta — só a timeline (HorizontalScrollSection) deveria ter sido ajustada, não o ZoomParallax.

## Solução

Remover o early return mobile do `zoom-parallax.tsx` e manter o efeito parallax em todas as telas. Ajustar os tamanhos das imagens para mobile para que caibam sem overflow.

## Alterações

### `src/components/ui/zoom-parallax.tsx`

- Remover o bloco `if (isMobile) { return ... }` (linhas 33-47)
- Remover import do `useIsMobile`
- Ajustar os tamanhos das imagens com classes responsivas para que no mobile usem proporções maiores (ex: `h-[40vh] w-[60vw]` para a imagem central, e proporções ajustadas para as demais) evitando overflow
- Manter `overflow-hidden` no container sticky para prevenir overflow-x

### Resultado

O efeito de zoom parallax volta a funcionar no mobile como antes, com as imagens escalando conforme o scroll.

