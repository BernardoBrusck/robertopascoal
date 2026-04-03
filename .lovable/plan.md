

# Plano: Redesign do Livro + Palestras como banner editorial com modal

## Resumo

1. **BookSection** — Aplicar a tipografia `h-panel-title` (font-weight 700, clamp 36-96px, tracking -0.05em, line-height 0.95) no titulo "O Caminho depois da Pressa"
2. **SpeakingSection** — Transformar numa seção tipo "outdoor/banner" com imagem de fundo (placeholder dele palestrando), tipografia bold editorial, e botão "Saiba mais" que abre um **modal** com galeria de vídeos/fotos e informações detalhadas
3. **TestimonialsSection** — Mover para depois da SpeakingSection no Index.tsx (depoimentos logo após palestras)

## Alterações detalhadas

### 1. BookSection — Tipografia editorial

- Trocar o `font-light` + inline styles do h2 pela classe `h-panel-title` que já existe no CSS global
- Manter o layout split e animações GSAP atuais (sem pin)
- Resultado: o título fica bold, grande, com o mesmo estilo de "Onde tudo começou"

### 2. SpeakingSection — Banner outdoor + Modal

Redesign completo. Em vez da seção editorial com stats/temas/citação, criar:

**Banner (seção principal):**
```text
┌──────────────────────────────────────────┐
│                                          │
│   (imagem placeholder de fundo,          │
│    escurecida com overlay gradiente)     │
│                                          │
│         ROBERTO PASCOAL                  │  ← label pequeno
│                                          │
│         Palestras que                    │  ← h-panel-title style
│         transformam                      │    bold, grande
│                                          │
│         [ Saiba mais ]                   │  ← botão branco/borda
│                                          │
└──────────────────────────────────────────┘
```

- Imagem de fundo: placeholder cinza com texto "Foto palestrando" (substituível depois)
- Overlay: gradiente preto 40-60% de opacidade sobre a imagem
- Texto branco sobre fundo escuro
- Animação GSAP: fade-in simples ao entrar no viewport
- Altura: `min-h-[80vh]`

**Modal (ao clicar "Saiba mais"):**
- Usar o componente `Dialog` do shadcn já existente
- Conteúdo do modal:
  - Stats animados (+200 palestras, +15.000 vidas) — reutilizar lógica dos counters
  - Galeria de vídeos/fotos: grid de placeholders (iframes para YouTube + fotos)
  - Lista de temas de palestra
  - Citação do Nelson Mandela
  - Botão "Contratar palestra" no final
- Modal fullscreen no mobile, `max-w-4xl` no desktop

### 3. TestimonialsSection — Reposicionar

- Adicionar `TestimonialsSection` no Index.tsx logo após `SpeakingSection`
- Já existe e funciona — só precisa importar e posicionar

## Arquivos

| Arquivo | Ação |
|---|---|
| `src/components/BookSection.tsx` | Trocar tipografia do título para `h-panel-title` |
| `src/components/SpeakingSection.tsx` | Reescrever — banner outdoor com imagem + modal com galeria |
| `src/pages/Index.tsx` | Adicionar TestimonialsSection após SpeakingSection |

