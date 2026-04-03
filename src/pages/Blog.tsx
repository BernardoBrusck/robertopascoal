import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/ui/navbar";
import BlogCard from "@/components/blog/BlogCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  categories: { name: string; slug: string } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("categoria");

  useEffect(() => {
    const fetchData = async () => {
      const [postsRes, catsRes] = await Promise.all([
        supabase
          .from("posts")
          .select("id, title, slug, excerpt, cover_image, published_at, categories(name, slug)")
          .eq("status", "published")
          .order("published_at", { ascending: false }),
        supabase.from("categories").select("id, name, slug").order("name"),
      ]);
      setPosts((postsRes.data as any) ?? []);
      setCategories(catsRes.data ?? []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = posts.filter((post) => {
    const matchesSearch = !search || post.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || post.categories?.slug === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-10 max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] text-foreground mb-4">
          Blog
        </h1>
        <p className="text-muted-foreground mb-10 max-w-lg">
          Artigos sobre educação, impacto social e transformação.
        </p>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar artigos..."
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/blog"
              className={`text-xs uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border transition-colors ${
                !categoryFilter
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              Todos
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/blog?categoria=${cat.slug}`}
                className={`text-xs uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border transition-colors ${
                  categoryFilter === cat.slug
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                coverImage={post.cover_image}
                categoryName={post.categories?.name ?? null}
                publishedAt={post.published_at}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
