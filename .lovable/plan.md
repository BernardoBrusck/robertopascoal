

# Plano: Sistema de Blog Completo com Painel Admin

## Resumo

Criar um sistema de blog completo com: backend no Supabase (Lovable Cloud), painel administrativo com autenticação, editor de blocos tipo Notion, e páginas públicas de blog com filtros, busca e compartilhamento.

## Pré-requisito: Ativar Lovable Cloud

Antes de tudo, precisamos ativar o Lovable Cloud para ter Supabase (banco de dados, auth, storage). Sem isso, nada do blog funciona.

## Estrutura do Banco de Dados

### Tabelas

1. **posts** — id, title, slug, excerpt, content (JSONB para blocos), cover_image, status (draft/published), author_id (FK auth.users), category_id, published_at, created_at, updated_at
2. **categories** — id, name, slug, description, created_at
3. **tags** — id, name, slug
4. **post_tags** — post_id, tag_id (junção N:N)
5. **media** — id, url, alt_text, uploaded_by, created_at (referencia arquivos no Supabase Storage)
6. **leads** — id, name, email, phone, message, source (palestra/contato), created_at (interesse em palestras)
7. **user_roles** — id, user_id, role (admin) — segurança RLS

### Storage Buckets
- `blog-images` — imagens dos artigos
- `media` — biblioteca de mídia geral

## Editor de Blocos (tipo Notion)

Usar **BlockNote** (`@blocknote/react` + `@blocknote/core`) — editor open-source estilo Notion, com:
- Blocos de texto, heading, lista, citação, imagem, separador
- Drag & drop para reordenar blocos
- Upload de imagens integrado ao Supabase Storage
- Salva como JSON no campo `content` do post

## Páginas Públicas (Frontend)

| Rota | Descrição |
|---|---|
| `/blog` | Listagem com grid de cards, barra de busca, filtro por categoria/tag, paginação |
| `/blog/:slug` | Artigo individual — cover, título, conteúdo renderizado, tags, compartilhamento (WhatsApp, LinkedIn, Twitter) |
| `/blog/categoria/:slug` | Posts filtrados por categoria |

### Estilo das páginas públicas
- Fundo branco, tipografia editorial (mesma do site)
- Cards com imagem cover, título bold, excerpt, data, categoria
- Barra de busca minimalista no topo
- Botões de compartilhar: WhatsApp, LinkedIn, Twitter (ícones lucide)

## Painel Administrativo

| Rota | Descrição |
|---|---|
| `/admin/login` | Tela de login (email + senha) |
| `/admin` | Dashboard — contagem de posts, leads recentes |
| `/admin/posts` | Lista de posts (draft/publicado), criar/editar/excluir |
| `/admin/posts/new` | Editor de blocos + metadados (título, slug, categoria, tags, cover) |
| `/admin/posts/:id/edit` | Editar post existente |
| `/admin/categories` | CRUD de categorias |
| `/admin/media` | Biblioteca de mídia — upload, listar, deletar |
| `/admin/leads` | Lista de leads (interesse em palestras/contato) |

### Proteção
- Rota `/admin/*` protegida por auth + verificação de role `admin`
- RLS em todas as tabelas: posts publicados são públicos, drafts só admin vê

## Integração com o Site Atual

- Adicionar "Blog" no navbar (`navItems`)
- No ContactFooter, o formulário de interesse em palestra salva na tabela `leads`
- Link do blog no footer

## Arquivos Principais

| Arquivo | Ação |
|---|---|
| Lovable Cloud | Ativar (Supabase + Auth + Storage) |
| Migrations | Criar tabelas: posts, categories, tags, post_tags, media, leads, user_roles |
| `src/integrations/supabase/` | Client + types (auto-gerado) |
| `src/pages/Blog.tsx` | Listagem pública do blog |
| `src/pages/BlogPost.tsx` | Artigo individual |
| `src/pages/BlogCategory.tsx` | Posts por categoria |
| `src/pages/admin/Login.tsx` | Login do admin |
| `src/pages/admin/Dashboard.tsx` | Dashboard admin |
| `src/pages/admin/Posts.tsx` | Lista de posts |
| `src/pages/admin/PostEditor.tsx` | Editor de blocos (BlockNote) |
| `src/pages/admin/Categories.tsx` | CRUD categorias |
| `src/pages/admin/Media.tsx` | Biblioteca de mídia |
| `src/pages/admin/Leads.tsx` | Lista de leads |
| `src/components/blog/BlogCard.tsx` | Card de post |
| `src/components/blog/ShareButtons.tsx` | Botões de compartilhar |
| `src/components/blog/BlockRenderer.tsx` | Renderizador de blocos no front |
| `src/components/admin/AdminLayout.tsx` | Layout com sidebar do admin |
| `src/components/admin/ProtectedRoute.tsx` | Guard de autenticação |
| `src/App.tsx` | Adicionar todas as rotas |
| `src/components/ui/navbar.tsx` | Adicionar link "Blog" |

## Ordem de Implementação

1. Ativar Lovable Cloud + criar migrations
2. Auth + user_roles + ProtectedRoute
3. AdminLayout + Dashboard
4. CRUD de categorias e tags
5. Biblioteca de mídia (upload Supabase Storage)
6. Editor de posts (BlockNote) + listagem admin
7. Páginas públicas do blog (listagem, individual, categoria)
8. Compartilhamento + busca + filtros
9. Leads (integrar formulário do ContactFooter/SpeakingSection)
10. Adicionar "Blog" no navbar

