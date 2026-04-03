

# Plano: ServicesSection minimalista com hover modal e detail modal

## Mudancas

### 1. Reduzir tipografia e alinhar a esquerda
- Titulo dos itens: `clamp(20px, 2.5vw, 36px)`, font-weight 500, tracking -0.03em (mesma escala do text-reveal-text--sm)
- Categorias: text-xs uppercase, tracking wide
- Header "O que fazemos.": `clamp(24px, 3.5vw, 48px)`, font-weight 500
- Tudo alinhado a esquerda, sem justify-between no header
- Padding vertical dos itens reduzido (py-8 em vez de py-12)

### 2. Manter hover com imagem flutuante (GSAP + Framer Motion)
- Cursor "Ver" continua seguindo o mouse no hover
- Modal flutuante com imagem placeholder (wireframe cinza com icone) em vez de fotos reais
- Tamanho reduzido (300x200)

### 3. Adicionar detail modal ao clicar
- Ao clicar em um item, abre um modal fullscreen/overlay minimalista (Framer Motion AnimatePresence)
- Layout do modal: fundo branco, botao X no canto, titulo do servico, descricao curta, galeria de fotos placeholder (grid 2x2 com wireframes cinza)
- Tipografia do modal segue a mesma stack SF Pro, font-weight 500, tracking negativo
- Scroll interno se necessario
- Fecha com click no X ou click fora

## Arquivos

| Arquivo | Acao |
|---|---|
| `src/components/ServicesSection.tsx` | Reescrever: fontes menores, alinhamento esquerda, hover image mantido, adicionar onClick que abre detail modal com galeria placeholder |

