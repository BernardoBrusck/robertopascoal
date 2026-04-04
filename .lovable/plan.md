

## Implementar Página Pública do Blog

### O que será feito

Substituir o placeholder estático em `/blog` por uma página funcional que lista posts publicados do banco de dados, com filtro por categoria e paginação.

### Arquivo modificado

**`src/pages/Blog.tsx`** — reescrita completa:

1. **Query de posts**: `supabase.from("posts").select("*, categories(name, slug)").eq("status", "published").order("published_at", { ascending: false })` com `.range(from, to)` para paginação de 9 posts por página.

2. **Query de categorias**: `supabase.from("categories").select("*")` para renderizar chips de filtro no topo.

3. **Filtro por categoria**: Ler `?categoria=slug` via `useSearchParams`. Quando presente, fazer join com `categories` e filtrar pelo `slug` da categoria (resolver `category_id` a partir do slug, depois `.eq("category_id", id)`).

4. **Paginação**: Usar `count: "exact"` na query para obter total de posts. Calcular número de páginas (`Math.ceil(count / 9)`). Renderizar componentes `Pagination*` já existentes em `src/components/ui/pagination.tsx`. Controlar página via state local, recalculando `.range()`.

5. **Renderização**: Grid responsivo (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) usando o `BlogCard` existente, passando `categoryName` do join.

6. **Estados de loading/empty**: Skeleton cards durante carregamento; mensagem "Nenhum post encontrado" quando vazio.

### Detalhes técnicos

- A relação `posts.category_id → categories.id` já existe (FK `posts_category_id_fkey`), permitindo `select("*, categories(name, slug)")`.
- RLS já permite `SELECT` público em posts com `status = 'published'` e `SELECT` público em `categories`.
- Nenhuma migração de banco necessária.
- Nenhum arquivo novo — apenas reescrita de `Blog.tsx` e uso dos componentes existentes (`BlogCard`, `Navbar`, `Pagination*`).

