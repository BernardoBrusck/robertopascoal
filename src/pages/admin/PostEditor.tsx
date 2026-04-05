import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { filterSuggestionItems, getDefaultSlashMenuItems } from "@blocknote/core";
import { SuggestionMenuController } from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import { customSchema, customSlashMenuItems } from "@/components/admin/editorBlocks";
import { Save, ArrowLeft, Eye } from "lucide-react";
import PostEditorSidebar from "@/components/admin/PostEditorSidebar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Category { id: string; name: string; }
interface Tag { id: string; name: string; slug: string; }

const generateSlug = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const PostEditor = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverAlt, setCoverAlt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("draft");
  const [publishedAt, setPublishedAt] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const [saving, setSaving] = useState(false);
  const [initialContent, setInitialContent] = useState<any>(undefined);
  const [loaded, setLoaded] = useState(!isEditing);

  // Autosave state
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaving, setAutoSaving] = useState(false);
  const savedPostId = useRef<string | undefined>(id);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dirty = useRef(false);

  const editor = useCreateBlockNote({ schema: customSchema, initialContent });

  useEffect(() => {
    supabase.from("categories").select("id, name").then(({ data }) => setCategories(data ?? []));
    supabase.from("tags").select("id, name, slug").then(({ data }) => setAllTags(data ?? []));
  }, []);

  useEffect(() => {
    if (!isEditing) return;
    const load = async () => {
      const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
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
        const { data: ptData } = await supabase.from("post_tags").select("tag_id").eq("post_id", data.id);
        setSelectedTagIds((ptData ?? []).map((pt) => pt.tag_id));
        savedPostId.current = data.id;
        setLoaded(true);
      }
    };
    load();
  }, [id, isEditing]);

  // Mark dirty on any field change & reset autosave timer
  const markDirty = useCallback(() => {
    dirty.current = true;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      if (dirty.current) performAutosave();
    }, 30000);
  }, []);

  // Trigger markDirty when fields change
  useEffect(() => {
    if (loaded) markDirty();
  }, [title, slug, excerpt, coverImage, categoryId, status, publishedAt, seoTitle, metaDescription, ogImage, canonicalUrl, selectedTagIds]);

  const buildPostData = useCallback((overrideStatus?: string) => {
    const content = editor.document;
    return {
      title,
      slug,
      excerpt,
      cover_image: coverImage || null,
      content: content as any,
      category_id: categoryId || null,
      status: overrideStatus || status,
      published_at: (overrideStatus === "published") ? new Date().toISOString() : (publishedAt || null),
      author_id: user?.id,
      seo_title: seoTitle || null,
      meta_description: metaDescription || null,
      og_image: ogImage || null,
      canonical_url: canonicalUrl || null,
    };
  }, [title, slug, excerpt, coverImage, categoryId, status, publishedAt, user, seoTitle, metaDescription, ogImage, canonicalUrl, editor]);

  const performAutosave = useCallback(async () => {
    if (!title || autoSaving) return;
    setAutoSaving(true);
    const postData = buildPostData();

    if (savedPostId.current) {
      await supabase.from("posts").update(postData as any).eq("id", savedPostId.current);
    } else {
      const { data } = await supabase.from("posts").insert(postData as any).select("id").single();
      if (data) savedPostId.current = data.id;
    }

    // Sync tags
    if (savedPostId.current) {
      await supabase.from("post_tags").delete().eq("post_id", savedPostId.current);
      if (selectedTagIds.length > 0) {
        await supabase.from("post_tags").insert(
          selectedTagIds.map((tagId) => ({ post_id: savedPostId.current!, tag_id: tagId }))
        );
      }
    }

    dirty.current = false;
    setLastSaved(new Date());
    setAutoSaving(false);
  }, [buildPostData, selectedTagIds, autoSaving, title]);

  // Cleanup timer
  useEffect(() => {
    return () => { if (autosaveTimer.current) clearTimeout(autosaveTimer.current); };
  }, []);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing && !savedPostId.current) setSlug(generateSlug(value));
  };

  const handleToggleTag = useCallback((tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  }, []);

  const handleSave = async (publishNow = false) => {
    setSaving(true);
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);

    const postData = buildPostData(publishNow ? "published" : undefined);

    if (savedPostId.current) {
      await supabase.from("posts").update(postData as any).eq("id", savedPostId.current);
    } else {
      const { data } = await supabase.from("posts").insert(postData as any).select("id").single();
      if (data) savedPostId.current = data.id;
    }

    if (savedPostId.current) {
      await supabase.from("post_tags").delete().eq("post_id", savedPostId.current);
      if (selectedTagIds.length > 0) {
        await supabase.from("post_tags").insert(
          selectedTagIds.map((tagId) => ({ post_id: savedPostId.current!, tag_id: tagId }))
        );
      }
    }

    dirty.current = false;
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

  const handlePreview = () => {
    const previewId = savedPostId.current || id;
    if (previewId) {
      window.open(`/blog/preview/${previewId}`, "_blank");
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
  const savedText = autoSaving ? "Salvando..." : lastSaved ? `Salvo às ${format(lastSaved, "HH:mm", { locale: ptBR })}` : null;

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-8">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/posts")}>
              <ArrowLeft size={18} />
            </Button>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{statusLabel}</span>
            {savedText && (
              <span className="text-[11px] text-muted-foreground">{savedText}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={handlePreview}>
              <Eye size={14} />
              Pré-visualizar
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => handleSave(false)} disabled={saving}>
              <Save size={14} />
              {saving ? "Salvando..." : "Salvar rascunho"}
            </Button>
            <Button size="sm" className="text-xs" onClick={() => handleSave(true)} disabled={saving}>
              {saving ? "Publicando..." : "Publicar"}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 max-w-3xl mx-auto w-full">
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Título do artigo"
            className="w-full text-3xl md:text-4xl font-bold tracking-[-0.04em] text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground/40 mb-6"
          />
          <div className="min-h-[400px]">
            <BlockNoteView editor={editor} theme="light" />
          </div>
        </div>
      </div>

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
