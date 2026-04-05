import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, Copy, Search } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
  categories: { name: string } | null;
}

const statusTabs = [
  { value: "all", label: "Todos" },
  { value: "published", label: "Publicados" },
  { value: "draft", label: "Rascunhos" },
  { value: "review", label: "Em revisão" },
  { value: "scheduled", label: "Agendados" },
];

const statusConfig: Record<string, { label: string; classes: string }> = {
  published: { label: "Publicado", classes: "bg-green-100 text-green-700" },
  draft: { label: "Rascunho", classes: "bg-muted text-muted-foreground" },
  review: { label: "Em revisão", classes: "bg-yellow-100 text-yellow-700" },
  scheduled: { label: "Agendado", classes: "bg-blue-100 text-blue-700" },
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const fetchPosts = useCallback(async () => {
    let query = supabase
      .from("posts")
      .select("id, title, slug, status, cover_image, published_at, created_at, categories(name)")
      .order("created_at", { ascending: false });

    if (activeTab !== "all") {
      query = query.eq("status", activeTab);
    }
    if (search.trim()) {
      query = query.ilike("title", `%${search.trim()}%`);
    }

    const { data } = await query;
    setPosts((data as any) ?? []);
    setLoading(false);
    setSelected(new Set());
  }, [activeTab, search]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const deletePost = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    toast.success("Post excluído");
    fetchPosts();
  };

  const duplicatePost = async (post: Post) => {
    const { data: original } = await supabase.from("posts").select("*").eq("id", post.id).maybeSingle();
    if (!original) return;
    const { id: _, created_at, updated_at, published_at, ...rest } = original;
    await supabase.from("posts").insert({
      ...rest,
      title: `(cópia) ${rest.title}`,
      slug: `${rest.slug}-copia-${Date.now()}`,
      status: "draft",
      published_at: null,
    } as any);
    toast.success("Post duplicado");
    fetchPosts();
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === posts.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(posts.map((p) => p.id)));
    }
  };

  const bulkAction = async (action: "publish" | "draft" | "delete") => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;

    if (action === "delete") {
      if (!confirm(`Excluir ${ids.length} post(s)?`)) return;
      for (const id of ids) await supabase.from("posts").delete().eq("id", id);
      toast.success(`${ids.length} post(s) excluído(s)`);
    } else {
      const newStatus = action === "publish" ? "published" : "draft";
      for (const id of ids) {
        await supabase.from("posts").update({
          status: newStatus,
          published_at: newStatus === "published" ? new Date().toISOString() : null,
        } as any).eq("id", id);
      }
      toast.success(`${ids.length} post(s) atualizado(s)`);
    }
    fetchPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-[-0.04em] text-foreground">Posts</h1>
        <Link to="/admin/posts/new">
          <Button className="gap-2">
            <Plus size={16} />
            Novo Post
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-border">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm transition-colors border-b-2 -mb-px ${
              activeTab === tab.value
                ? "border-foreground text-foreground font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search + Bulk */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título..."
            className="pl-9 h-9 text-sm"
          />
        </div>
        {selected.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{selected.size} selecionado(s)</span>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => bulkAction("publish")}>Publicar</Button>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => bulkAction("draft")}>Rascunho</Button>
            <Button variant="outline" size="sm" className="text-xs text-destructive" onClick={() => bulkAction("delete")}>Excluir</Button>
          </div>
        )}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">Nenhum post encontrado.</p>
      ) : (
        <div className="bg-background border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 w-10">
                  <Checkbox
                    checked={selected.size === posts.length && posts.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium w-12"></th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Título</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Categoria</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Status</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Data</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const cfg = statusConfig[post.status] || statusConfig.draft;
                return (
                  <tr key={post.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selected.has(post.id)}
                        onCheckedChange={() => toggleSelect(post.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      {post.cover_image ? (
                        <img src={post.cover_image} alt="" className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-muted" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/posts/${post.id}/edit`} className="font-medium text-foreground hover:underline">
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{post.categories?.name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${cfg.classes}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {format(new Date(post.published_at || post.created_at), "dd MMM yyyy", { locale: ptBR })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <Link to={`/admin/posts/${post.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit size={14} /></Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => duplicatePost(post)}>
                          <Copy size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deletePost(post.id)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Posts;
