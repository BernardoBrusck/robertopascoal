

# Plano: Seções do Livro e Palestras — layout editorial premium

## Conceito criativo

Em vez de cards genéricos ou layouts de e-commerce, a ideia é tratar cada seção como uma **composição editorial** — como uma página de revista de luxo — usando a tipografia agressiva do site, fundo branco, e animações GSAP que revelam o conteúdo de forma cinematográfica.

## Seção 1: O Livro — "Split reveal"

Layout horizontal dividido ao meio. GSAP anima uma cortina que se abre ao scrollar, revelando a capa do livro de um lado e o texto do outro.

```text
Estado inicial (antes do scroll):
┌──────────────────────────────────────────┐
│                                          │
│          (tela em branco)                │
│                                          │
└──────────────────────────────────────────┘

Conforme scrolla, duas metades se abrem como cortina:
┌──────────────────────────────────────────┐
│                    │                     │
│   IMAGEM/CAPA      │    O CAMINHO       │
│   DO LIVRO         │    DEPOIS DA       │
│   (foto real,      │    PRESSA          │
│    grande,         │                     │
│    com sombra)     │    Parágrafo desc.  │
│                    │    com texto fino   │
│                    │                     │
│                    │    [ Comprar ]      │
│                    │    botão sutil      │
└──────────────────────────────────────────┘
```

- A capa entra da esquerda com `x: -100%` → `x: 0` via ScrollTrigger scrub
- O texto entra da direita com `x: 100%` → `x: 0` sincronizado
- Título do livro: tipografia gigante (clamp ~60-100px), tracking -0.05em, weight 300
- Subtítulo/descrição: weight 300, text-muted-foreground, leading relaxed
- Botão CTA: borda fina preta, texto preto, hover preenche preto com texto branco — transição suave
- A seção é pinned durante o efeito (ScrollTrigger pin)

## Seção 2: Palestras — "Texto cinematográfico com counter"

Uma seção full-width onde o scroll revela números/estatísticas animados e depois o conteúdo. Sem cards, sem ícones genéricos — puro texto editorial.

```text
┌──────────────────────────────────────────┐
│                                          │
│   PALESTRAS                              │  ← label xs, tracking 0.3em
│                                          │
│   +200              +15.000              │  ← números grandes animados
│   palestras         vidas impactadas     │    (counter GSAP, 80-120px)
│   realizadas                             │
│                                          │
│   ─────────────────────────────────────  │  ← linha fina separadora
│                                          │
│   "Educação é a arma mais poderosa       │  ← citação grande, itálico
│    que você pode usar para mudar         │    weight 300, 32-48px
│    o mundo." — Nelson Mandela            │
│                                          │
│   ─────────────────────────────────────  │
│                                          │
│   Temas:                                 │
│                                          │
│   01  Educação como transformação social │  ← lista numerada editorial
│   02  Empatia e liderança                │    sem ícones, só tipografia
│   03  Propósito e desaceleração          │    cada item revela com stagger
│   04  Empreendedorismo social            │
│                                          │
│          [ Contratar palestra ]           │  ← mesmo estilo botão do livro
│                                          │
└──────────────────────────────────────────┘
```

- Os números fazem **counter animation** GSAP (0 → 200, 0 → 15000) com ScrollTrigger
- Cada tema revela com `y: 30, opacity: 0` stagger 0.15s
- A citação faz um efeito parecido com o TextRevealBlock (palavras revelando uma a uma)
- Tudo fundo branco, sem cores de fundo, sem cards com borda — editorial puro

## Animações GSAP (ambas seções)

- ScrollTrigger com `start: 'top 70%'` para as animações de entrada
- Seção do livro: `pin: true` durante o split reveal (scrub)
- Counter: `snap` nos números finais
- Mobile: desabilitar pin, empilhar verticalmente, manter animações de fade simples

## Arquivos

| Arquivo | Ação |
|---|---|
| `src/components/BookSection.tsx` | Reescrever — layout split reveal com GSAP ScrollTrigger pin + cortina |
| `src/components/SpeakingSection.tsx` | Reescrever — layout editorial com counters animados, citação reveal, lista numerada |
| `src/pages/Index.tsx` | Adicionar BookSection e SpeakingSection após ImageGallery |

