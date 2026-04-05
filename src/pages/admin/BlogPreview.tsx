import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/ui/navbar";
import BlockRenderer from "@/components/blog/BlockRenderer";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";

const BlogPreview = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*, categories(name, slug)")
        .eq("id", id)
        .maybeSingle();
      setPost(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

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
          <h1 className="text-2xl font-bold text-foreground mb-4">Post não encontrado</h1>
          <Link to="/admin/posts" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Voltar ao admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Preview banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-accent text-accent-foreground text-center text-xs py-1 font-medium">
        Pré-visualização — Este post ainda não está publicado
      </div>
      <article className="pt-32 pb-20 px-6 md:px-10 max-w-3xl mx-auto">
        <Link
          to="/admin/posts"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Voltar ao admin
        </Link>

        <div className="flex items-center gap-3 mb-4">
          {post.categories && (
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
              {post.categories.name}
            </span>
          )}
          {post.published_at && (
            <span className="text-[10px] text-muted-foreground">
              {format(new Date(post.published_at), "dd MMMM yyyy", { locale: ptBR })}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.04em] text-foreground mb-6 leading-[1.1]">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>
        )}

        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full rounded-lg mb-10 max-h-[500px] object-cover"
          />
        )}

        <BlockRenderer blocks={post.content ?? []} />
      </article>
    </div>
  );
};

export default BlogPreview;
