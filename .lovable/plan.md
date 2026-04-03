

# Plano: Galeria colapsável com altura máxima e botão "Veja mais"

## O que será feito

Adicionar um estado colapsado/expandido à `ImageGallery`. Por padrão, a galeria terá uma altura máxima (~600px) com `overflow: hidden`, um gradiente branco de baixo para cima cobrindo as imagens cortadas, e um botão "Veja mais" centralizado. Ao clicar, a galeria expande suavemente para mostrar tudo, e o botão muda para "Ver menos".

## Layout

```text
Estado colapsado (padrão):
┌──────────────────────────────┐
│  foto  │  foto  │  foto      │
│  foto  │  foto  │  foto      │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░  │ ← fade branco (gradient)
│        [ Veja mais ]         │ ← botão preto
└──────────────────────────────┘

Estado expandido:
┌──────────────────────────────┐
│  foto  │  foto  │  foto      │
│  foto  │  foto  │  foto      │
│  foto  │  foto  │  foto      │
│  foto  │  foto  │  foto      │
│        [ Ver menos ]         │
└──────────────────────────────┘
```

## Implementação

- `useState(false)` para `expanded`
- Container do grid: `max-h-[600px] overflow-hidden` quando colapsado, `max-h-none` quando expandido, com `transition: max-height 0.6s ease`
- Overlay gradient: `absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent`, visível apenas quando colapsado
- Botão: fundo preto, texto branco, centralizado abaixo do gradient, tipografia system-ui weight 500
- Ao expandir: animação suave via CSS transition no `max-height` (usar valor alto como `max-h-[5000px]` para transição fluida)

## Arquivo

| Arquivo | Ação |
|---|---|
| `src/components/ui/image-gallery.tsx` | Adicionar estado expanded, gradient overlay e botão toggle |

