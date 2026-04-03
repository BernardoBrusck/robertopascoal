

# Plano: Corrigir seção timeline — remover labels duplicados + versão mobile vertical

## Problemas

1. **Labels duplicados no desktop**: cada painel tem o label (INFÂNCIA, FORMAÇÃO, etc.) tanto dentro do conteúdo do painel (`h-panel-label`) quanto na bolinha do timeline na parte inferior. Manter apenas o da bolinha, remover o de dentro do painel.

2. **Mobile totalmente bugado**: os painéis usam larguras fixas (w-[340px], w-[400px], w-[500px]) que estouram a tela do celular. O fallback mobile atual simplesmente empilha os mesmos painéis sem adaptá-los.

## Solução

### Desktop (>768px) — manter como está, só remover labels duplicados
- Remover as 4 `<span className="h-panel-label">` de dentro de cada painel (PanelInfancia, PanelFormacao, PanelOmunga, PanelHoje)
- O label na bolinha do timeline continua funcionando normalmente
- GSAP horizontal scroll inalterado

### Mobile (<768px) — nova versão vertical dedicada
- Criar componentes de painel mobile separados dentro do mesmo arquivo, com layout totalmente responsivo:
  - Fotos empilhadas verticalmente com tamanhos relativos (w-full, max-w-[280px], etc.)
  - Texto ocupa largura total com padding lateral
  - Sem larguras fixas em pixels grandes
- Cada seção mobile terá: foto(s) + título + texto, empilhados verticalmente
- Separadores visuais simples entre seções (linha fina ou espaçamento)
- Label de cada etapa aparece como subtítulo discreto acima do título
- Animações simples com CSS (fade-in ao scroll via IntersectionObserver ou framer-motion `useInView`), sem GSAP
- Hook `useIsMobile` já existente usado para alternar entre as duas versões

## Layout mobile (cada seção)

```text
┌──────────────────────┐
│     INFÂNCIA         │  ← label discreto
│                      │
│  ┌────────────────┐  │
│  │   foto(s)      │  │  ← largura responsiva
│  └────────────────┘  │
│                      │
│  Onde tudo começou   │  ← título
│  Texto descritivo... │  ← parágrafo
│                      │
├──────────────────────┤  ← separador
│     FORMAÇÃO         │
│  ...                 │
└──────────────────────┘
```

## Arquivo

| Arquivo | Ação |
|---|---|
| `src/components/HorizontalScrollSection.tsx` | Remover `h-panel-label` dos 4 painéis desktop; adicionar painéis mobile responsivos com layout vertical e animações CSS/framer-motion; usar `useIsMobile` para alternar |

