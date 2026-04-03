import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/ui/navbar";
import BlockRenderer from "@/components/blog/BlockRenderer";
import ShareButtons from "@/components/blog/ShareButtons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: any;
  cover_image: string | null;
  published_at: string | null;
  categories: { name: string; slug: string } | null;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, content, cover_image, published_at, categories(name, slug)")
        .eq("slug", slug)
        .eq("status", "published")
        .single();
      setPost(data as any);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 px-6 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Artigo não encontrado</h1>
          <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Voltar ao blog
          </Link>
        </div>
      </div>
    );
  }

  const currentUrl = window.location.href;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="pt-28 pb-20 px-6 md:px-10 max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Voltar ao blog
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          {post.categories && (
            <Link
              to={`/blog?categoria=${post.categories.slug}`}
              className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {post.categories.name}
            </Link>
          )}
          {post.published_at && (
            <span className="text-[10px] text-muted-foreground">
              {format(new Date(post.published_at), "dd MMMM yyyy", { locale: ptBR })}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.04em] text-foreground mb-6 leading-[1.1]">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>
        )}

        {/* Cover */}
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full rounded-lg mb-10 max-h-[500px] object-cover"
          />
        )}

        {/* Content */}
        <BlockRenderer blocks={post.content ?? []} />

        {/* Share */}
        <div className="mt-12 pt-6 border-t border-border">
          <ShareButtons url={currentUrl} title={post.title} />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
