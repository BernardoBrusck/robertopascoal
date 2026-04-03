

# Bloco 3: Horizontal Scroll Section (GSAP ScrollTrigger)

## Conceito

Uma seção "pinned" onde o scroll vertical do usuário move o conteúdo horizontalmente. Técnica clássica do GSAP ScrollTrigger com `pin: true` e `scrub`. Perfeita para apresentar a trajetória/pilares do Roberto de forma cinematográfica.

## Estrutura Visual

```text
Scroll vertical ↓ controla movimento horizontal →

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  [Painel 1]         [Painel 2]         [Painel 3]         [Painel 4]   │
│                                                                         │
│  SOBRE              O LIVRO            PALESTRAS           A CAUSA      │
│  Foto grande +      Capa do livro +    Foto palco +        Foto campo + │
│  bio editorial      sinopse curta      temas/impacto       missão social│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

Cada painel ocupa 100vw. O container total tem `width: 400vw`. O ScrollTrigger pinea a seção e traduz o eixo X conforme o scroll.

## Conteúdo dos 4 Painéis

1. **Sobre Roberto** -- Foto grande à esquerda, texto editorial à direita (quem ele é, de onde vem, formação)
2. **O Livro** -- Visual do e-book/livro com título e frase de impacto
3. **Palestras** -- Foto em palco + lista de temas ou depoimento
4. **A Causa** -- Foto na Amazônia/comunidade + texto sobre a missão social

## Detalhes Técnicos

### Novo componente: `src/components/HorizontalScrollSection.tsx`

- Container wrapper com `height` suficiente para o pin (ex: `300vh` para dar espaço de scroll)
- Inner container com `display: flex`, `width: 400vw`, cada painel `w-screen h-screen`
- GSAP ScrollTrigger: `pin: true`, `scrub: 1`, anima `x` do inner container de `0` até `-300vw`
- Cada painel tem animações de entrada (fade + slide) com stagger conforme entra no viewport
- Reutiliza o mesmo padrão de carregamento de GSAP/ScrollTrigger do `TextRevealSection`

### Estilos em `src/index.css`

- `.horizontal-panel` -- layout flexbox, tipografia editorial (SF Pro stack)
- Textos com o mesmo tracking negativo e escala do hero
- Fundo alternando entre escuro (dark panels) e claro para variar ritmo visual

### `src/pages/Index.tsx`

- Adicionar `<HorizontalScrollSection />` logo após `<TextRevealSection />`

## Arquivos

| Arquivo | Ação |
|---------|------|
| `src/components/HorizontalScrollSection.tsx` | Criar |
| `src/index.css` | Adicionar estilos dos painéis |
| `src/pages/Index.tsx` | Importar e posicionar o componente |

## Considerações

- As imagens dos painéis usam os assets já existentes em `src/assets/hero/` + novas se necessário
- Mobile: em telas < 768px, os painéis empilham verticalmente (scroll normal) em vez de horizontal, para melhor UX touch
- O pin do ScrollTrigger requer `overflow: hidden` no container, não no body

