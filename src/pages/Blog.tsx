import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import BlogCard from "@/components/blog/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { supabase } from "@/integrations/supabase/client";

const POSTS_PER_PAGE = 9;

interface Tag {
  name: string;
  slug: string;
}

interface PostWithCategory {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  categories: { name: string; slug: string } | null;
  post_tags?: { tags: Tag | null }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaSlug = searchParams.get("categoria");
  const tagSlug = searchParams.get("tag");
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostWithCategory[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<(Tag & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
      setPage(0);
    }, 300);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [categoriaSlug, tagSlug]);

  // Fetch categories and tags
  useEffect(() => {
    supabase.from("categories").select("id, name, slug").order("name").then(({ data }) => {
      if (data) setCategories(data);
    });
    supabase.from("tags").select("id, name, slug").order("name").then(({ data }) => {
      if (data) setAllTags(data);
    });
  }, []);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const from = page * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      // If filtering by tag, first get matching post IDs
      let tagPostIds: string[] | null = null;
      if (tagSlug) {
        const tag = allTags.find((t) => t.slug === tagSlug);
        const tagId = tag?.id;
        if (tagId) {
          const { data: ptData } = await supabase
            .from("post_tags")
            .select("post_id")
            .eq("tag_id", tagId);
          tagPostIds = ptData?.map((pt) => pt.post_id) || [];
        } else {
          // Tag not found — empty results
          tagPostIds = [];
        }
        if (tagPostIds.length === 0) {
          setPosts([]);
          setTotalCount(0);
          setLoading(false);
          return;
        }
      }

      let query = supabase
        .from("posts")
        .select("id, title, slug, excerpt, cover_image, published_at, category_id, categories(name, slug), post_tags(tags(name, slug))", { count: "exact" })
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (tagPostIds) {
        query = query.in("id", tagPostIds);
      }

      if (categoriaSlug) {
        const cat = categories.find((c) => c.slug === categoriaSlug);
        if (cat) {
          query = query.eq("category_id", cat.id);
        } else {
          const { data: catData } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", categoriaSlug)
            .single();
          if (catData) {
            query = query.eq("category_id", catData.id);
          }
        }
      }

      if (searchQuery.trim()) {
        const term = `%${searchQuery.trim()}%`;
        query = query.or(`title.ilike.${term},excerpt.ilike.${term}`);
      }

      const { data, count } = await query.range(from, to);
      setPosts((data as unknown as PostWithCategory[]) || []);
      setTotalCount(count || 0);
      setLoading(false);
    };

    fetchPosts();
  }, [page, categoriaSlug, tagSlug, categories, allTags, searchQuery]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  const updateFilters = (params: Record<string, string | null>) => {
    const current: Record<string, string> = {};
    searchParams.forEach((v, k) => { current[k] = v; });
    Object.entries(params).forEach(([k, v]) => {
      if (v) current[k] = v;
      else delete current[k];
    });
    setSearchParams(current);
  };

  const handleCategoryClick = (slug: string | null) => {
    updateFilters({ categoria: slug });
  };

  const handleTagClick = (slug: string | null) => {
    updateFilters({ tag: slug });
  };

  const getPostTags = (post: PostWithCategory): Tag[] => {
    return (post.post_tags || [])
      .map((pt) => pt.tags)
      .filter((t): t is Tag => t !== null);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    let start = Math.max(0, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages - 1, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(0, end - maxVisible + 1);
    }

    if (start > 0) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => setPage(0)} className="cursor-pointer">1</PaginationLink>
        </PaginationItem>
      );
      if (start > 1) items.push(<PaginationItem key="ell-start"><PaginationEllipsis /></PaginationItem>);
    }

    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={i === page} onClick={() => setPage(i)} className="cursor-pointer">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (end < totalPages - 1) {
      if (end < totalPages - 2) items.push(<PaginationItem key="ell-end"><PaginationEllipsis /></PaginationItem>);
      items.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => setPage(totalPages - 1)} className="cursor-pointer">{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-10 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] text-foreground mb-4">
          Blog
        </h1>
        <p className="text-muted-foreground mb-6 max-w-xl">
          Conteúdos sobre educação, impacto social e transformação.
        </p>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar posts..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow"
          />
        </div>

        {/* Category filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full border transition-colors ${
                !categoriaSlug
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full border transition-colors ${
                  categoriaSlug === cat.slug
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Tag filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {allTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagClick(tagSlug === tag.slug ? null : tag.slug)}
                className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
                  tagSlug === tag.slug
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                # {tag.name}
              </button>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[16/9] w-full rounded-lg" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nenhum post encontrado.</p>
            {(categoriaSlug || tagSlug) && (
              <button
                onClick={() => setSearchParams({})}
                className="mt-4 text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                coverImage={post.cover_image}
                categoryName={post.categories?.name || null}
                publishedAt={post.published_at}
                tags={getPostTags(post)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <Pagination className="mt-12">
            <PaginationContent>
              {page > 0 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage(page - 1)} className="cursor-pointer" />
                </PaginationItem>
              )}
              {renderPaginationItems()}
              {page < totalPages - 1 && (
                <PaginationItem>
                  <PaginationNext onClick={() => setPage(page + 1)} className="cursor-pointer" />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Blog;
