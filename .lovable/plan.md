

# Plano: Substituir contadores por seção de Serviços/Ações com hover modal animado

## O que muda

Remover a `ImpactNumbersSection` (contadores animados) e substituir por uma seção de serviços/ações do Roberto, usando o template fornecido (lista interativa com modal que segue o cursor no hover). O conteúdo será baseado no livro e na atuação dele.

## Layout

```text
┌──────────────────────────────────────────────────────┐
│                                                      │
│   O QUE FAZEMOS              Texto curto sobre       │
│                               a atuação do Roberto   │
│                                                      │
│   ─────────────────────────────────────────────────   │
│   Bibliotecas Comunitárias          Educação Social  │
│   ─────────────────────────────────────────────────   │
│   Doação de Livros                  Educação Social  │
│   ─────────────────────────────────────────────────   │
│   Palestras Transformadoras         Inspiração       │
│   ─────────────────────────────────────────────────   │
│   Expedições Educacionais           Ação Social      │
│   ─────────────────────────────────────────────────   │
│                                                      │
│   [ Modal com imagem segue o cursor no hover ]       │
│   [ Cursor personalizado "Ver" ]                     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

Cada item da lista, ao receber hover, exibe um modal flutuante com uma imagem placeholder (300x200) que acompanha o mouse, mais um cursor circular com "Ver".

## Conteúdo (placeholder, baseado no livro)

1. **Bibliotecas Comunitárias** - categoria: Educação Social
2. **Doação de Livros** - categoria: Acesso ao Conhecimento
3. **Palestras Transformadoras** - categoria: Inspiração
4. **Expedições Educacionais** - categoria: Ação Social

## Detalhes técnicos

| Arquivo | Ação |
|---|---|
| `src/components/ServicesSection.tsx` | Criar - adaptar o template demo.tsx (sem Next.js Image, usando `<img>` com placeholders; GSAP via `declare const gsap` como nas demais seções; framer-motion para animação do modal) |
| `src/components/ImpactNumbersSection.tsx` | Deletar |
| `src/pages/Index.tsx` | Trocar `ImpactNumbersSection` por `ServicesSection` |

### Adaptações do template para o projeto
- Remover `Image` do Next.js, usar `<img>` ou div placeholder
- Remover `"use client"` (Vite, não Next)
- GSAP via `declare const gsap` + `gsap.quickTo` (já no CDN do projeto)
- Framer-motion `motion` importado de `framer-motion` (já instalado)
- Fonte Apple (font-family já definida globalmente no CSS)
- Fundo branco (`bg-background`), cores do design system existente
- Texto do header e descrição em português

