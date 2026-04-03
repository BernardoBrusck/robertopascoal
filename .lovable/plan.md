

# Plano: Seções de Impacto, Depoimentos, Livro e Palestras

## Fluxo narrativo completo (após o TextRevealBlock da missão)

```text
[...seções atuais...]
↓ TextRevealBlock (missão)
↓ 1. NÚMEROS DE IMPACTO — contadores animados
↓ 2. DEPOIMENTOS — carrossel com quotes
↓ 3. LIVRO — hero visual + CTA Hotmart
↓ 4. PALESTRAS — temas + fotos + CTA contratar
↓ 5. FOOTER/CTA FINAL (iteração futura)
```

---

## 1. Seção: Números de Impacto (`ImpactNumbersSection.tsx`)

Layout com fundo escuro (#111) para contraste. Quatro números grandes animados com count-up via GSAP ScrollTrigger.

```text
┌──────────────────────────────────────────────────┐
│           EDUCAÇÃO QUE TRANSFORMA                │
│                                                  │
│   +50          +10.000       +XX         +XX     │
│ bibliotecas    livros      cidades      anos     │
│ comunitárias  doados      alcançadas   de missão │
│                                                  │
│        [ linha decorativa accent ]               │
└──────────────────────────────────────────────────┘
```

- Números fazem count-up de 0 ao valor final quando entram na viewport (GSAP `ScrollTrigger` + `gsap.to` no `innerText`)
- Cada número tem um ícone Lucide sutil acima (BookOpen, Users, MapPin, Clock)
- Stagger de 0.2s entre cada contador
- Dados placeholder por enquanto (o Roberto confirma os números reais depois)

---

## 2. Seção: Depoimentos (`TestimonialsSection.tsx`)

Fundo branco, carrossel horizontal automático estilo "marquee infinito" com GSAP.

```text
┌──────────────────────────────────────────────────┐
│          O QUE DIZEM SOBRE O ROBERTO             │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  →    │
│  │ "Quote"  │  │ "Quote"  │  │ "Quote"  │       │
│  │  Nome    │  │  Nome    │  │  Nome    │       │
│  │  Cargo   │  │  Cargo   │  │  Cargo   │       │
│  └──────────┘  └──────────┘  └──────────┘       │
│                                                  │
└──────────────────────────────────────────────────┘
```

- Cards com borda sutil, aspas decorativas grandes, nome e cargo/cidade
- Marquee infinito horizontal (GSAP timeline com `repeat: -1` e clones)
- Pausa no hover
- 5-6 depoimentos placeholder (textos genéricos mas realistas sobre palestras/educação)

---

## 3. Seção: Livro (`BookSection.tsx`)

Layout split: imagem do livro à esquerda, texto + CTA à direita. Fundo com gradiente suave.

```text
┌──────────────────────────────────────────────────┐
│                                                  │
│   ┌──────────┐     O CAMINHO DEPOIS              │
│   │          │     DA PRESSA                     │
│   │  CAPA    │                                   │
│   │  LIVRO   │     Texto curto sobre o livro,    │
│   │          │     o que o leitor vai encontrar.  │
│   │          │                                   │
│   └──────────┘     [ COMPRAR AGORA ]  (Hotmart)  │
│                                                  │
└──────────────────────────────────────────────────┘
```

- Capa do livro com sombra e leve rotação 3D no hover (CSS perspective)
- Animação de entrada: livro slide-in da esquerda, texto fade-in da direita (GSAP ScrollTrigger)
- Botão CTA com cor accent (dourado) e link para Hotmart (placeholder URL)
- Placeholder para capa do livro

---

## 4. Seção: Palestras (`SpeakingSection.tsx`)

Grid com temas de palestra + foto de palco + CTA.

```text
┌──────────────────────────────────────────────────┐
│         PALESTRAS QUE TRANSFORMAM                │
│                                                  │
│   ┌────────────────────┐   ┌─────────┐          │
│   │  Tema 1            │   │         │          │
│   │  Tema 2            │   │  FOTO   │          │
│   │  Tema 3            │   │  PALCO  │          │
│   │  Tema 4            │   │         │          │
│   └────────────────────┘   └─────────┘          │
│                                                  │
│         [ CONTRATAR PALESTRA ]                   │
└──────────────────────────────────────────────────┘
```

- Lista de temas com ícones, cada um aparece com stagger (GSAP)
- Foto de palco placeholder com parallax sutil no scroll
- CTA para contato (link mailto ou WhatsApp placeholder)
- Fundo escuro para contraste com a seção do livro

---

## Dados placeholder (Roberto confirma depois)

Os números, depoimentos, temas de palestra e textos serão placeholders realistas. O Roberto fornece os dados reais depois.

---

## Detalhes técnicos

| Arquivo | Ação |
|---|---|
| `src/components/ImpactNumbersSection.tsx` | Criar - contadores animados GSAP |
| `src/components/TestimonialsSection.tsx` | Criar - marquee infinito GSAP |
| `src/components/BookSection.tsx` | Criar - split layout livro + CTA |
| `src/components/SpeakingSection.tsx` | Criar - grid palestras + CTA |
| `src/pages/Index.tsx` | Adicionar as 4 seções após TextRevealBlock |

Todas as animações usam GSAP (já carregado via CDN no projeto) com ScrollTrigger. Framer Motion disponível mas GSAP mantém consistência com o restante do site.

