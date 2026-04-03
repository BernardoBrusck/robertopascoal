

# Plano: Fotos parallax flutuantes, correções na ServicesSection e remoção das seções finais

## Resumo

1. Remover TestimonialsSection, BookSection e SpeakingSection (não seguem a identidade visual)
2. Criar fotos flutuantes em parallax nas laterais do TextRevealBlock (estilo fotos reveladas/polaroid, levemente inclinadas, com sombra)
3. Corrigir o hover modal da ServicesSection (imagem não aparece)
4. Alinhar padding dos itens da lista com o titulo "O que fazemos"
5. Redesenhar o DetailModal com layout horizontal, galeria clicavel com lightbox fullscreen

---

## 1. Remover seções que quebram a identidade

Remover os imports e componentes `TestimonialsSection`, `BookSection` e `SpeakingSection` do `Index.tsx`. Os arquivos podem ser mantidos mas não serão renderizados.

## 2. Fotos flutuantes em parallax no TextRevealBlock

Criar um novo componente `FloatingPhotos` que envolve o TextRevealBlock. Nas laterais esquerda e direita da seção, posicionar 4-6 fotos (placeholder) com:

```text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   📷 -3°        "Minha missão é simples:          📷 5° │
│                  provar que a educação                   │
│        📷 4°     transforma qualquer         📷 -2°     │
│                  realidade..."                          │
│   📷 -5°                                      📷 3°    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- Cada foto: borda branca grossa (estilo polaroid), `box-shadow` suave, `rotate` entre -6deg e 6deg
- Parallax via GSAP ScrollTrigger: cada foto move em Y a velocidades diferentes conforme o scroll
- Posicionamento absoluto nas laterais (left: 2-8%, right: 2-8%), distribuidas verticalmente
- Em mobile: escondidas ou menores para não interferir com o texto
- Imagens placeholder (wireframe cinza) por enquanto

## 3. Corrigir hover modal na ServicesSection

O problema e que o `HoverModal` usa `position: fixed` e o `mousemove` listener esta vinculado a `pageX/pageY`. Possivel causa: o listener nao esta sendo inicializado porque o GSAP check falha. Vou garantir que o `init()` funcione corretamente verificando o pattern de espera do GSAP (igual as outras secoes do projeto).

## 4. Alinhar padding dos itens com o titulo

Os itens da lista tem `px-4 md:px-8` adicional ao padding da secao. Remover esse padding dos itens para que fiquem alinhados com o titulo "O que fazemos" que esta no container `max-w-6xl`.

## 5. Redesenhar DetailModal - layout horizontal com lightbox

Novo layout do modal:

```text
┌──────────────────────────────────────────────────────────┐
│                                                     [X]  │
│                                                          │
│   EDUCAÇÃO SOCIAL                                        │
│   Bibliotecas                    ┌─────┐ ┌─────┐        │
│   Comunitárias                   │foto1│ │foto2│        │
│                                  └─────┘ └─────┘        │
│   Descrição do serviço           ┌─────┐ ┌─────┐        │
│   em texto corrido...            │foto3│ │foto4│        │
│                                  └─────┘ └─────┘        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

- Layout split: texto a esquerda (40%), galeria a direita (60%)
- Max-width maior (~5xl) para aproveitar a horizontalidade
- Ao clicar numa foto da galeria: abre lightbox fullscreen (fundo escuro, imagem grande, click/ESC para fechar)
- Animacoes Framer Motion para entrada/saida do lightbox

## Arquivos

| Arquivo | Acao |
|---|---|
| `src/components/FloatingPhotosSection.tsx` | Criar - wrapper com TextRevealBlock + fotos parallax nas laterais |
| `src/components/ServicesSection.tsx` | Editar - remover px dos itens, redesenhar DetailModal horizontal com lightbox |
| `src/pages/Index.tsx` | Editar - substituir TextRevealBlock por FloatingPhotosSection, remover 3 secoes finais |

