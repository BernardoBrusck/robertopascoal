

# Plano: Corrigir ZoomParallax no mobile

## Problema

A seção ZoomParallax usa posições em `vw/vh` projetadas para desktop. No viewport mobile (390px), as 7 imagens se sobrepõem de forma caótica, causando overflow e layout quebrado.

## Solução

Tornar o `ZoomParallax` responsivo: no mobile, esconder o efeito de zoom e exibir uma grade simples de imagens empilhadas. No desktop, manter o comportamento atual.

## Alterações

### `src/components/ui/zoom-parallax.tsx`

- Usar o hook `useIsMobile()` para detectar tela pequena
- **Mobile**: renderizar um grid simples (1 coluna, gap entre imagens, sem parallax/scale)
- **Desktop**: manter o comportamento atual com sticky + scale transforms

### `src/components/ZoomParallaxSection.tsx`

- Nenhuma alteração necessária (já passa as imagens corretamente)

## Resultado

No mobile, as imagens aparecem em uma coluna vertical limpa, sem sobreposição. No desktop, o efeito de zoom parallax continua funcionando normalmente.

