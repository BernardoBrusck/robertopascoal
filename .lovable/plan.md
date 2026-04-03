

# Plano: Tela de Loading com barra de progresso minimalista

## O que será feito

Adicionar uma tela de loading que aparece ao abrir o site, com fundo branco, o nome "Roberto Pascoal" centralizado acima de uma barra de progresso fina e elegante. A barra preenche progressivamente e, ao completar, a tela faz um fade-out revelando o site.

## Layout

```text
┌──────────────────────────────────────────┐
│                                          │
│                                          │
│                                          │
│           Roberto Pascoal                │
│          ━━━━━━━━━━━░░░░░░░              │
│                                          │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

- Fundo branco puro, centralizado vertical e horizontal
- "Roberto Pascoal" em font-weight 500, tracking negativo, fonte Apple (SF Pro / system-ui)
- Barra de progresso fina (~2-3px de altura), cor escura (#1a1a1a), largura ~200px
- Progresso simulado: 0→100% em ~2.5s com easing suave
- Ao completar: fade-out da tela inteira (~0.5s), depois remove do DOM

## Detalhes técnicos

| Arquivo | Ação |
|---|---|
| `src/components/LoadingScreen.tsx` | Criar — componente com estado de progresso animado (useEffect + requestAnimationFrame), fade-out ao completar via estado + transition CSS |
| `src/App.tsx` | Envolver o conteúdo com `LoadingScreen` — renderiza o loading por cima, depois some |

- Progresso via `requestAnimationFrame` com incremento suave (não depende de GSAP/Framer Motion para manter o loading leve)
- A barra usa um `div` simples com `width` em % e `transition: width`
- Após 100%, espera 300ms, faz opacity 0 no container, depois `display: none`
- Tipografia: `font-family` system-ui (já global), `font-size: clamp(20px, 2.5vw, 32px)`, `font-weight: 500`, `letter-spacing: -0.02em`

