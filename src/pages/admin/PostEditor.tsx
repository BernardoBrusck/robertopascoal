import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { Save, ArrowLeft } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

const PostEditor = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("draft");
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [initialContent, setInitialContent] = useState<any>(undefined);
  const [loaded, setLoaded] = useState(!isEditing);

  const editor = useCreateBlockNote({
    initialContent: initialContent,
  });

  useEffect(() => {
    supabase.from("categories").select("id, name").then(({ data }) => {
      setCategories(data ?? []);
    });
  }, []);

  useEffect(() => {
    if (!isEditing) return;
    const loadPost = async () => {
      const { data } = await supabase.from("posts").select("*").eq("id", id).single();
      if (data) {
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt ?? "");
        setCoverImage(data.cover_image ?? "");
        setCategoryId(data.category_id ?? "");
        setStatus(data.status);
        if (data.content && Array.isArray(data.content) && data.content.length > 0) {
          setInitialContent(data.content);
        }
        setLoaded(true);
      }
    };
    loadPost();
  }, [id, isEditing]);

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) setSlug(generateSlug(value));
  };

  const handleSave = async (publishNow = false) => {
    setSaving(true);
    const content = editor.document;
    const postData = {
      title,
      slug,
      excerpt,
      cover_image: coverImage || null,
      content: content as any,
      category_id: categoryId || null,
      status: publishNow ? "published" : status,
      published_at: publishNow ? new Date().toISOString() : null,
      author_id: user?.id,
    };

    if (isEditing) {
      await supabase.from("posts").update(postData).eq("id", id);
    } else {
      await supabase.from("posts").insert(postData);
    }
    setSaving(false);
    navigate("/admin/posts");
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop();
    const path = `covers/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      setCoverImage(data.publicUrl);
    }
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/posts")}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold tracking-[-0.04em] text-foreground">
          {isEditing ? "Editar Post" : "Novo Post"}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label>Título</Label>
          <Input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Título do artigo"
            className="text-lg"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label>Slug (URL)</Label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="titulo-do-artigo"
          />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <Label>Resumo</Label>
          <Input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Breve descrição do artigo..."
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Categoria</Label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Sem categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Cover image */}
        <div className="space-y-2">
          <Label>Imagem de capa</Label>
          <Input type="file" accept="image/*" onChange={handleCoverUpload} />
          {coverImage && (
            <img src={coverImage} alt="Capa" className="mt-2 rounded-lg max-h-48 object-cover" />
          )}
        </div>

        {/* Block Editor */}
        <div className="space-y-2">
          <Label>Conteúdo</Label>
          <div className="border border-border rounded-lg overflow-hidden min-h-[400px] bg-background">
            <BlockNoteView editor={editor} theme="light" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button onClick={() => handleSave(false)} disabled={saving} variant="outline" className="gap-2">
            <Save size={16} />
            {saving ? "Salvando..." : "Salvar rascunho"}
          </Button>
          <Button onClick={() => handleSave(true)} disabled={saving}>
            {saving ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
