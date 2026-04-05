import { createReactBlockSpec } from "@blocknote/react";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, Film, Plus, X, Columns2, Columns3, Youtube, Upload, AlertCircle, FolderOpen } from "lucide-react";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

// ==================== GALLERY BLOCK ====================

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const GalleryBlock = createReactBlockSpec(
  {
    type: "gallery" as const,
    propSchema: {
      images: { default: "[]" as const },
      columns: { default: "3" as const },
    },
    content: "none" as const,
  },
  {
    render: ({ block, editor }) => {
      const images: GalleryImage[] = (() => {
        try { return JSON.parse(block.props.images); } catch { return []; }
      })();
      const columns = block.props.columns;
      const fileInputRef = useRef<HTMLInputElement>(null);

      const updateImages = (newImages: GalleryImage[]) => {
        editor.updateBlock(block, {
          props: { ...block.props, images: JSON.stringify(newImages) },
        });
      };

      const handleUpload = async (files: FileList) => {
        const newImages = [...images];
        for (const file of Array.from(files)) {
          const ext = file.name.split(".").pop();
          const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
          const { error } = await supabase.storage.from("blog-images").upload(path, file);
          if (!error) {
            const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
            newImages.push({ src: data.publicUrl, alt: file.name, caption: "" });
          }
        }
        updateImages(newImages);
      };

      const removeImage = (index: number) => {
        updateImages(images.filter((_, i) => i !== index));
      };

      const setColumns = (val: string) => {
        editor.updateBlock(block, {
          props: { ...block.props, columns: val },
        });
      };

      return (
        <div className="border border-border rounded-lg p-4 my-2 bg-muted/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ImagePlus size={14} />
              <span>Galeria ({images.length} imagens)</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setColumns("2")}
                className={`p-1.5 rounded ${columns === "2" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}
              >
                <Columns2 size={14} />
              </button>
              <button
                onClick={() => setColumns("3")}
                className={`p-1.5 rounded ${columns === "3" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}
              >
                <Columns3 size={14} />
              </button>
            </div>
          </div>

          {images.length > 0 && (
            <div className={`grid gap-2 mb-3 ${columns === "2" ? "grid-cols-2" : "grid-cols-3"}`}>
              {images.map((img, i) => (
                <div key={i} className="relative group aspect-square">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover rounded" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
          />
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus size={14} />
            Adicionar imagens
          </Button>
        </div>
      );
    },
  }
);

// ==================== VIDEO BLOCK ====================

const VideoBlock = createReactBlockSpec(
  {
    type: "video" as const,
    propSchema: {
      mode: { default: "embed" as const },
      url: { default: "" as const },
      poster: { default: "" as const },
      caption: { default: "" as const },
      autoplay: { default: "false" as const },
      loop: { default: "false" as const },
      muted: { default: "false" as const },
    },
    content: "none" as const,
  },
  {
    render: ({ block, editor }) => {
      const { mode, url, poster, caption } = block.props;
      const fileInputRef = useRef<HTMLInputElement>(null);

      const updateProp = (key: string, value: string) => {
        editor.updateBlock(block, {
          props: { ...block.props, [key]: value },
        });
      };

      const handleUpload = async (file: File) => {
        const ext = file.name.split(".").pop();
        const path = `videos/${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("blog-images").upload(path, file);
        if (!error) {
          const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
          updateProp("url", data.publicUrl);
          updateProp("mode", "upload");
        }
      };

      const getEmbedUrl = (rawUrl: string) => {
        const ytMatch = rawUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
        const vimeoMatch = rawUrl.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        return null;
      };

      return (
        <div className="border border-border rounded-lg p-4 my-2 bg-muted/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Film size={14} />
            <span>Vídeo</span>
          </div>

          {!url ? (
            <div className="space-y-3">
              <Input
                placeholder="Cole a URL do YouTube ou Vimeo..."
                className="h-9 text-sm"
                onBlur={(e) => {
                  if (e.target.value) {
                    updateProp("url", e.target.value);
                    updateProp("mode", "embed");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateProp("url", (e.target as HTMLInputElement).value);
                    updateProp("mode", "embed");
                  }
                }}
              />
              <div className="text-center text-xs text-muted-foreground">ou</div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/mov,video/webm"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              />
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={14} />
                Fazer upload de vídeo
              </Button>
            </div>
          ) : mode === "embed" ? (
            <div className="space-y-2">
              {getEmbedUrl(url) ? (
                <div className="aspect-video rounded overflow-hidden bg-muted">
                  <iframe
                    src={getEmbedUrl(url)!}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">URL não reconhecida: {url}</p>
              )}
              <Input
                value={caption}
                onChange={(e) => updateProp("caption", e.target.value)}
                placeholder="Legenda do vídeo..."
                className="h-8 text-xs"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <video
                src={url}
                controls
                poster={poster || undefined}
                className="w-full rounded aspect-video object-cover"
              />
              <Input
                value={caption}
                onChange={(e) => updateProp("caption", e.target.value)}
                placeholder="Legenda do vídeo..."
                className="h-8 text-xs"
              />
              <div className="flex gap-3 text-xs text-muted-foreground">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={block.props.autoplay === "true"}
                    onChange={(e) => updateProp("autoplay", String(e.target.checked))}
                    className="rounded"
                  />
                  Autoplay
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={block.props.loop === "true"}
                    onChange={(e) => updateProp("loop", String(e.target.checked))}
                    className="rounded"
                  />
                  Loop
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={block.props.muted === "true"}
                    onChange={(e) => updateProp("muted", String(e.target.checked))}
                    className="rounded"
                  />
                  Muted
                </label>
              </div>
            </div>
          )}
        </div>
      );
    },
  }
);

// ==================== CALLOUT BLOCK ====================

const calloutTypes = {
  info: { icon: "ℹ️", bg: "bg-blue-50 border-blue-200" },
  warning: { icon: "⚠️", bg: "bg-yellow-50 border-yellow-200" },
  danger: { icon: "🚨", bg: "bg-red-50 border-red-200" },
  success: { icon: "✅", bg: "bg-green-50 border-green-200" },
};

const CalloutBlock = createReactBlockSpec(
  {
    type: "callout" as const,
    propSchema: {
      calloutType: { default: "info" as const },
    },
    content: "inline" as const,
  },
  {
    render: ({ block, contentRef }) => {
      const cfg = calloutTypes[block.props.calloutType as keyof typeof calloutTypes] || calloutTypes.info;
      return (
        <div className={`flex gap-3 items-start p-4 rounded-lg border my-2 ${cfg.bg}`}>
          <span className="text-lg shrink-0">{cfg.icon}</span>
          <div className="flex-1 min-w-0" ref={contentRef} />
        </div>
      );
    },
  }
);

// ==================== SCHEMA ====================

export const customSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    gallery: GalleryBlock(),
    video: VideoBlock(),
    callout: CalloutBlock(),
  },
});

export type CustomSchema = typeof customSchema;

// Helper functions to insert custom blocks
export const insertGalleryBlock = (editor: any) => {
  editor.insertBlocks(
    [{ type: "gallery", props: { images: "[]", columns: "3" } }],
    editor.getTextCursorPosition().block,
    "after"
  );
};

export const insertVideoBlock = (editor: any) => {
  editor.insertBlocks(
    [{ type: "video", props: { mode: "embed", url: "", caption: "" } }],
    editor.getTextCursorPosition().block,
    "after"
  );
};

export const insertCalloutBlock = (editor: any) => {
  editor.insertBlocks(
    [{ type: "callout", props: { calloutType: "info" } }],
    editor.getTextCursorPosition().block,
    "after"
  );
};
