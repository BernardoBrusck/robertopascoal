

# Plano: Layouts únicos por fase na Timeline + Texto de transição + Próximas seções

## Parte 1: Timeline Horizontal — 4 layouts distintos

Cada painel (100vw) terá fundo branco, a timeline/progress bar na parte inferior, mas um layout interno completamente diferente. Todos os elementos terão animações de entrada (GSAP `from` com `scrollTrigger` containerAnimation).

### Painel 1 — INFÂNCIA (layout "Editorial Assimétrico")
```text
┌─────────────────────────────────────────────┐
│                                             │
│   ┌─────────┐                               │
│   │ FOTO    │    Onde tudo                  │
│   │ polaroid│    começou                    │
│   │ rotação │                               │
│   └─────────┘    Texto curto sobre          │
│          ┌──────┐ Joinville, anos 80...     │
│          │ FOTO │                           │
│          │ menor│                           │
│          └──────┘                           │
│ ●────────────────────────────────────────── │
│  INFÂNCIA                                   │
└─────────────────────────────────────────────┘
```
- Fotos estilo polaroid com rotação leve (-3° e 2°), sombra suave
- Título grande à direita, texto abaixo
- Animação: fotos deslizam de baixo com fade; texto aparece letra a letra

### Painel 2 — FORMAÇÃO (layout "Split Vertical")
```text
┌─────────────────────────────────────────────┐
│                                             │
│        O poder           ┌────────────────┐ │
│        da palavra        │                │ │
│                          │  FOTO GRANDE   │ │
│   Texto sobre teatro,    │  (teatro/palco)│ │
│   descoberta da voz...   │                │ │
│                          └────────────────┘ │
│   ┌─────┐  ┌─────┐                         │
│   │foto │  │foto │                         │
│   └─────┘  └─────┘                         │
│ ────────────●──────────────────────────── │
│             FORMAÇÃO                        │
└─────────────────────────────────────────────┘
```
- Texto à esquerda, foto principal grande à direita
- Duas fotos menores embaixo do texto
- Animação: foto grande escala de 0.8→1; texto slide-in da esquerda; fotos menores stagger fade-up

### Painel 3 — OMUNGA (layout "Grid de Impacto")
```text
┌─────────────────────────────────────────────┐
│                                             │
│   Criar para        ┌──────┐  ┌──────┐     │
│   transformar        │ FOTO │  │ FOTO │     │
│                      └──────┘  └──────┘     │
│   ┌──────────────┐                          │
│   │  FOTO GRANDE │   +50 bibliotecas        │
│   │  (amazônia)  │   Texto sobre a missão   │
│   └──────────────┘                          │
│                                             │
│ ──────────────────────●──────────────────── │
│                       OMUNGA                │
└─────────────────────────────────────────────┘
```
- Título top-left, grid de 3 fotos (1 grande + 2 menores)
- Número de destaque "+50 bibliotecas" com counter animation
- Animação: fotos entram com stagger e scale; número faz count-up; texto fade-in

### Painel 4 — HOJE (layout "Statement Central")
```text
┌─────────────────────────────────────────────┐
│                                             │
│            ┌──────┐                         │
│            │ FOTO │   ┌──────┐              │
│            │centro│   │ FOTO │              │
│            └──────┘   │ palco│              │
│                       └──────┘              │
│          Inspirar para agir                 │
│                                             │
│   ┌─────┐   Empreendedor social,    ┌─────┐│
│   │foto │   palestrante, escritor   │foto ││
│   └─────┘                           └─────┘│
│ ──────────────────────────────────────●──── │
│                                    HOJE     │
└─────────────────────────────────────────────┘
```
- Composição centralizada com fotos dispersas ao redor
- Título grande centralizado, texto curto abaixo
- Animação: fotos aparecem uma a uma de posições diferentes; título typewriter effect

### Implementação técnica
- Cada painel renderizado por um sub-componente dedicado (`PanelInfancia`, `PanelFormacao`, `PanelOmunga`, `PanelHoje`)
- Placeholders de imagem por enquanto (boxes cinza com label) — o usuário vai enviar as fotos depois
- Animações via GSAP `scrollTrigger` com `containerAnimation` vinculado ao tween horizontal principal
- Fundo branco em todos os painéis (já está assim)

---

## Parte 2: Texto pós-Zoom Parallax

Trocar o parágrafo longo atual por uma frase curta e de transição, sobre o propósito/missão de vida:

> "Minha missão é simples: provar que a educação transforma qualquer realidade — e que nunca é tarde para começar."

Mantém o efeito text-reveal word-by-word, mas com texto mais curto e fonte um pouco maior (volta ao `--sm` mas com menos palavras fica mais impactante).

---

## Parte 3: O que vem depois (próximas seções)

Após o text-reveal de propósito, a narrativa muda de "quem ele é" para "o que ele faz". Estrutura sugerida:

1. **Seção do Livro** — "O Caminho depois da pressa" — hero visual do livro com CTA de compra
2. **Seção de Palestras** — vídeos/fotos de palco + temas + CTA para contratar
3. **Footer/CTA final** — contato, redes sociais

Essas seções serão implementadas em iterações futuras.

---

## Arquivos modificados

| Arquivo | Ação |
|---|---|
| `src/components/HorizontalScrollSection.tsx` | Reescrever — 4 layouts distintos com placeholders de foto e animações GSAP por painel |
| `src/index.css` | Adicionar estilos para polaroid, grid de fotos, counter |
| `src/pages/Index.tsx` | Atualizar texto do TextRevealBlock |

