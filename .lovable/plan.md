

## Plano: Corrigir sobreposição entre História e Zoom Parallax no mobile

### Problema

No mobile, a seção de História (vertical) termina e a seção ZoomParallax começa logo abaixo. O ZoomParallax usa `sticky top-0`, então suas imagens ficam "grudadas" no topo da viewport assim que o container de 300vh entra na tela — mesmo antes da História sair completamente. Isso causa as imagens do parallax aparecendo "por baixo" da História enquanto ela ainda está visível.

### Solução

**1. `src/components/ui/zoom-parallax.tsx`** — Começar com imagens invisíveis e fade-in ao atingir o topo

- Adicionar um `useTransform` de opacidade baseado no `scrollYProgress`: opacidade vai de 0 para 1 nos primeiros 5-10% do scroll (ou seja, só quando o container top chega no viewport top e o sticky "gruda")
- Isso garante que as imagens só aparecem depois que a História saiu da tela

**2. `src/components/ZoomParallaxSection.tsx`** — Z-index baixo

- Manter `z-0` na section wrapper para ficar abaixo da História

**3. `src/components/HorizontalScrollSection.tsx`** — Garantir z-index alto no mobile

- Já tem `relative z-10` no mobile — confirmar que está correto e adicionar `bg-background` se necessário para "cobrir" visualmente o sticky

### Detalhes Técnicos

O `scrollYProgress` do Framer Motion com offset `['start start', 'end end']` inicia em 0 quando o topo do container atinge o topo da viewport. Mas o sticky já está visível antes disso (quando o container entra pela parte de baixo da tela). A solução é usar uma `opacity` animada que começa em 0 e vai a 1 logo no início do progresso, criando um fade-in natural que "esconde" as imagens até a História ter saído completamente.

Alterações em 2 arquivos, apenas CSS/motion — sem mudança de estrutura.

