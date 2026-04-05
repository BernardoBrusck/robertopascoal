import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";

interface TagWithCount {
  id: string;
  name: string;
  slug: string;
  count: number;
}

const generateSlug = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Tags = () => {
  const [tags, setTags] = useState<TagWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTag, setNewTag] = useState("");

  const fetchTags = useCallback(async () => {
    const { data: tagsData } = await supabase.from("tags").select("id, name, slug").order("name");
    if (!tagsData) { setLoading(false); return; }

    // Get usage counts
    const { data: ptData } = await supabase.from("post_tags").select("tag_id");
    const countMap = new Map<string, number>();
    (ptData ?? []).forEach((pt) => {
      countMap.set(pt.tag_id, (countMap.get(pt.tag_id) || 0) + 1);
    });

    setTags(tagsData.map((t) => ({ ...t, count: countMap.get(t.id) || 0 })));
    setLoading(false);
  }, []);

  useEffect(() => { fetchTags(); }, [fetchTags]);

  const createTag = async () => {
    const name = newTag.trim();
    if (!name) return;
    const slug = generateSlug(name);
    const { error } = await supabase.from("tags").insert({ name, slug });
    if (error) {
      toast.error("Erro ao criar tag");
      return;
    }
    toast.success("Tag criada");
    setNewTag("");
    fetchTags();
  };

  const deleteTag = async (id: string, name: string) => {
    if (!confirm(`Excluir a tag "${name}"?`)) return;
    await supabase.from("post_tags").delete().eq("tag_id", id);
    await supabase.from("tags").delete().eq("id", id);
    toast.success("Tag excluída");
    fetchTags();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-[-0.04em] text-foreground">Tags</h1>
      </div>

      {/* Quick create */}
      <div className="flex items-center gap-3 mb-6 max-w-md">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Nome da nova tag..."
          className="h-9 text-sm"
          onKeyDown={(e) => e.key === "Enter" && createTag()}
        />
        <Button size="sm" className="gap-1.5 shrink-0" onClick={createTag}>
          <Plus size={14} />
          Criar
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : tags.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma tag criada ainda.</p>
      ) : (
        <>
          {/* Tag cloud */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  tag.count === 0
                    ? "border-border text-muted-foreground/50 bg-muted/30"
                    : "border-border text-foreground bg-background"
                }`}
              >
                <Tag size={10} className="inline mr-1.5" />
                {tag.name}
                <span className="ml-1.5 text-muted-foreground">({tag.count})</span>
              </span>
            ))}
          </div>

          {/* Table */}
          <div className="bg-background border border-border rounded-lg overflow-hidden max-w-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Nome</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Slug</th>
                  <th className="text-center px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Posts</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag) => (
                  <tr key={tag.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{tag.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{tag.slug}</td>
                    <td className="px-4 py-3 text-sm text-center text-muted-foreground">{tag.count}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteTag(tag.id, tag.name)}>
                        <Trash2 size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Tags;
