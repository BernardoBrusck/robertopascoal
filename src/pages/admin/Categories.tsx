import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").order("name");
    setCategories(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const generateSlug = (text: string) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const addCategory = async () => {
    if (!name.trim()) return;
    await supabase.from("categories").insert({
      name: name.trim(),
      slug: generateSlug(name),
      description: description.trim() || null,
    });
    setName("");
    setDescription("");
    fetchCategories();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Excluir esta categoria?")) return;
    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-[-0.04em] text-foreground mb-8">Categorias</h1>

      <div className="flex items-end gap-3 mb-8">
        <div className="flex-1 space-y-1">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da categoria" />
        </div>
        <div className="flex-1 space-y-1">
          <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição (opcional)" />
        </div>
        <Button onClick={addCategory} className="gap-2">
          <Plus size={16} /> Adicionar
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : categories.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma categoria criada.</p>
      ) : (
        <div className="bg-background border border-border rounded-lg divide-y divide-border">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium text-foreground">{cat.name}</p>
                {cat.description && <p className="text-sm text-muted-foreground">{cat.description}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteCategory(cat.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
