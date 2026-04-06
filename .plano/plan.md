

## Plano: Evolução Completa do Painel Administrativo do Blog

### Diagnóstico do Estado Atual

O que **já existe**:
- Editor com BlockNote (básico, sem blocos custom)
- Campos: título, slug, excerpt, categoria, capa, conteúdo
- Status binário: `draft` / `published` (sem `review` / `scheduled`)
- Listagem de posts simples (sem filtros, sem ações em massa)
- Central de Mídia básica (upload, copiar URL, excluir — sem painel lateral, sem filtro por tipo, sem modo modal)
- Categorias simples (criar/excluir — sem cor, sem contagem)
- Sem gestão de Tags no admin
- Sem campos SEO no banco (`seo_title`, `meta_description`, `og_image`, `canonical_url`)
- Sem autossave, sem pré-visualização, sem checklist de publicação
- BlockRenderer público não suporta galeria, vídeo, callout, embed, tabela, arquivo

### Abordagem

Dado o volume (8 prompts interdependentes), o plano será executado em **4 fases**, cada uma entregando valor funcional completo. As fases agrupam prompts que compartilham dependências.

---

### Fase 1 — Fundação: Schema, Estados e Sidebar do Editor
*Prompts 1 + 7 (parcial)*

**Migration SQL:**
- Adicionar colunas à tabela `posts`: `seo_title text`, `meta_description text`, `og_image text`, `canonical_url text`
- O status já é `text` e aceita qualquer valor — não precisa de migration para suportar `review`/`scheduled`

**`src/pages/admin/PostEditor.tsx`** — Reescrita para layout de dois painéis:
- **Painel esquerdo (canvas)**: título inline + editor BlockNote (largura ~65%)
- **Painel direito (sidebar)**: seções colapsáveis usando `Collapsible`:
  1. **Publicação**: dropdown de status (`draft`/`review`/`scheduled`/`published`), date-time picker para `published_at` (visível apenas em `scheduled`), botão primário contextual
  2. **Imagem de capa**: upload drag-and-drop + preview + alt text + botão remover
  3. **Organização**: select de categoria + input de tags com autocomplete
  4. **Slug**: campo com prefixo `/blog/` + botão regenerar
  5. **Excerpt**: textarea com contador 0/160
  6. **SEO**: campos `seo_title` (60 chars), `meta_description` (160 chars), preview Google mock, `og_image`, `canonical_url`

**`src/pages/BlogPost.tsx`** — Usar `seo_title` e `meta_description` no `SeoHead` quando preenchidos (fallback para `title` e `excerpt`)

---

### Fase 2 — Autossave, Preview, Listagem Avançada e Tags
*Prompts 2 + 5 + rota de Tags*

**`src/pages/admin/PostEditor.tsx`**:
- Autossave com debounce de 30s — indicador "Salvo às HH:MM" no header
- Botão "Pré-visualizar" abre `/blog/preview/:post_id` em nova aba

**`src/App.tsx`** — Nova rota `/blog/preview/:id` que renderiza o post independente do status (protegida por checagem de admin via localStorage flag)

**`src/pages/admin/Posts.tsx`** — Reescrita:
- Tabs de filtro: Todos / Publicados / Rascunhos / Em revisão / Agendados
- Badges coloridos de status
- Miniatura da capa na tabela
- Busca por título
- Ação "Duplicar" por post
- Seleção em massa com checkbox + ações bulk (publicar/rascunho/excluir)

**`src/pages/admin/Tags.tsx`** — Nova página:
- Criação rápida (campo + Enter)
- Lista com contagem de uso (join com `post_tags`)
- Exclusão de tags

**`src/components/admin/AdminLayout.tsx`** — Adicionar link "Tags" na sidebar

**`src/App.tsx`** — Registrar rota `/admin/tags`

---

### Fase 3 — Blocos Custom no Editor (Galeria, Vídeo, Embed, Callout)
*Prompts 3 + 4*

**Dependência**: instalar `yet-another-react-lightbox`

**`src/pages/admin/PostEditor.tsx`** — Configurar blocos custom no BlockNote:
- Bloco `gallery`: grid de miniaturas reordenáveis, upload múltiplo, seletor de colunas (2/3)
- Bloco `video`: modo embed (YouTube/Vimeo) + modo upload (.mp4 para bucket `blog-images`), campos autoplay/loop/muted/caption

**`src/components/blog/BlockRenderer.tsx`** — Adicionar renderização pública:
- `gallery` → grid responsivo + lightbox (yet-another-react-lightbox)
- `video` → embed iframe 16:9 ou player HTML5 nativo
- `callout` → box colorido com ícone
- `embed` → detecção automática de domínio + iframe

---

### Fase 4 — Central de Mídia Avançada e Checklist de Publicação
*Prompts 6 + 8*

**`src/pages/admin/Media.tsx`** — Reescrita:
- Filtro por tipo (Imagens/Vídeos/Documentos)
- Painel lateral ao clicar: preview, nome editável, dimensões, tamanho, URL copiável, alt text, botões baixar/excluir
- Dropzone com progress bar
- Exportar como componente reutilizável com prop `mode` (`page` | `modal`) e callbacks `onSelect`/`multiple`

**`src/components/admin/MediaPickerModal.tsx`** — Novo componente:
- Wrapper modal da Central de Mídia em `mode='modal'`
- Seleção única ou múltipla
- Botão "Inserir selecionados (N)"
- Integrado nos blocos de galeria e imagem de capa do editor

**`src/pages/admin/PostEditor.tsx`** — Modal de checklist pré-publicação:
- Verifica: capa, categoria, excerpt, seo_title, meta_description
- Itens com ✅ (preenchido) ou ⚠️ (recomendado)
- Botão "Publicar assim mesmo" sempre habilitado
- Se tudo verde, publica direto sem modal

**Edge Function (cron)** — `publish-scheduled-posts`:
- Roda a cada 5 minutos via `pg_cron`
- Query: `UPDATE posts SET status = 'published' WHERE status = 'scheduled' AND published_at <= now()`

---

### Detalhes Técnicos

- **Banco**: única migration necessária é adicionar 4 colunas SEO à tabela `posts`. O campo `status` já é `text` e aceita novos valores sem alteração.
- **Pacotes**: `yet-another-react-lightbox` (Fase 3). BlockNote já está instalado.
- **Autossave**: usa `useRef` + `setTimeout` de 30s após última edição. Salva via `supabase.from("posts").upsert()`.
- **Preview**: rota pública que busca por `id` sem filtro de status. Proteção leve via flag no localStorage setada pelo admin login.
- **Cron**: usa `pg_cron` + `pg_net` para chamar edge function que faz o UPDATE de posts agendados.
- **Nenhuma alteração em**: `client.ts`, `types.ts`, `.env`, `config.toml`.

