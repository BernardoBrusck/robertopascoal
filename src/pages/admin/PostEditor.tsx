import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { Save, ArrowLeft, Eye } from "lucide-react";
import PostEditorSidebar from "@/components/admin/PostEditorSidebar";

interface Category { id: string; name: string; }
interface Tag { id: string; name: string; slug: string; }

const generateSlug = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const PostEditor = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  // Core fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverAlt, setCoverAlt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("draft");
  const [publishedAt, setPublishedAt] = useState("");

  // SEO
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  // Reference data
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  // UI
  const [saving, setSaving] = useState(false);
  const [initialContent, setInitialContent] = useState<any>(undefined);
  const [loaded, setLoaded] = useState(!isEditing);

  const editor = useCreateBlockNote({ initialContent });

  // Load reference data
  useEffect(() => {
    supabase.from("categories").select("id, name").then(({ data }) => setCategories(data ?? []));
    supabase.from("tags").select("id, name, slug").then(({ data }) => setAllTags(data ?? []));
  }, []);

  // Load post for editing
  useEffect(() => {
    if (!isEditing) return;
    const load = async () => {
      const { data } = await supabase.from("posts").select("*").eq("id", id).single();
      if (data) {
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt ?? "");
        setCoverImage(data.cover_image ?? "");
        setCategoryId(data.category_id ?? "");
        setStatus(data.status);
        setPublishedAt(data.published_at ?? "");
        setSeoTitle((data as any).seo_title ?? "");
        setMetaDescription((data as any).meta_description ?? "");
        setOgImage((data as any).og_image ?? "");
        setCanonicalUrl((data as any).canonical_url ?? "");
        if (data.content && Array.isArray(data.content) && data.content.length > 0) {
          setInitialContent(data.content);
        }
        // Load post tags
        const { data: ptData } = await supabase.from("post_tags").select("tag_id").eq("post_id", data.id);
        setSelectedTagIds((ptData ?? []).map((pt) => pt.tag_id));
        setLoaded(true);
      }
    };
    load();
  }, [id, isEditing]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) setSlug(generateSlug(value));
  };

  const handleToggleTag = useCallback((tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  }, []);

  const handleSave = async (publishNow = false) => {
    setSaving(true);
    const content = editor.document;
    const finalStatus = publishNow ? "published" : status;

    const postData: Record<string, any> = {
      title,
      slug,
      excerpt,
      cover_image: coverImage || null,
      content: content as any,
      category_id: categoryId || null,
      status: finalStatus,
      published_at: publishNow ? new Date().toISOString() : (publishedAt || null),
      author_id: user?.id,
      seo_title: seoTitle || null,
      meta_description: metaDescription || null,
      og_image: ogImage || null,
      canonical_url: canonicalUrl || null,
    };

    let postId = id;
    if (isEditing) {
      await supabase.from("posts").update(postData as any).eq("id", id);
    } else {
      const { data } = await supabase.from("posts").insert(postData as any).select("id").single();
      postId = data?.id;
    }

    // Sync tags
    if (postId) {
      await supabase.from("post_tags").delete().eq("post_id", postId);
      if (selectedTagIds.length > 0) {
        await supabase.from("post_tags").insert(
          selectedTagIds.map((tagId) => ({ post_id: postId!, tag_id: tagId }))
        );
      }
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

  const statusLabel = status === "published" ? "Publicado" : status === "review" ? "Em revisão" : status === "scheduled" ? "Agendado" : "Rascunho";

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-8">
      {/* Canvas (left) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/posts")}>
              <ArrowLeft size={18} />
            </Button>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{statusLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => handleSave(false)} disabled={saving}>
              <Save size={14} />
              {saving ? "Salvando..." : "Salvar rascunho"}
            </Button>
            <Button size="sm" className="text-xs" onClick={() => handleSave(true)} disabled={saving}>
              {saving ? "Publicando..." : "Publicar"}
            </Button>
          </div>
        </div>

        {/* Editor area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 max-w-3xl mx-auto w-full">
          {/* Title inline */}
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Título do artigo"
            className="w-full text-3xl md:text-4xl font-bold tracking-[-0.04em] text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground/40 mb-6"
          />

          {/* BlockNote */}
          <div className="min-h-[400px]">
            <BlockNoteView editor={editor} theme="light" />
          </div>
        </div>
      </div>

      {/* Sidebar (right) */}
      <PostEditorSidebar
        status={status}
        setStatus={setStatus}
        publishedAt={publishedAt}
        setPublishedAt={setPublishedAt}
        coverImage={coverImage}
        onCoverUpload={handleCoverUpload}
        onCoverRemove={() => setCoverImage("")}
        coverAlt={coverAlt}
        setCoverAlt={setCoverAlt}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
        selectedTagIds={selectedTagIds}
        onToggleTag={handleToggleTag}
        allTags={allTags}
        slug={slug}
        setSlug={setSlug}
        onRegenerateSlug={() => setSlug(generateSlug(title))}
        excerpt={excerpt}
        setExcerpt={setExcerpt}
        seoTitle={seoTitle}
        setSeoTitle={setSeoTitle}
        metaDescription={metaDescription}
        setMetaDescription={setMetaDescription}
        ogImage={ogImage}
        setOgImage={setOgImage}
        canonicalUrl={canonicalUrl}
        setCanonicalUrl={setCanonicalUrl}
      />
    </div>
  );
};

export default PostEditor;
