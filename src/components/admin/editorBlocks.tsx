import { createReactBlockSpec } from "@blocknote/react";
import { BlockNoteSchema, defaultBlockSpecs, createHeadingBlockSpec } from "@blocknote/core";
import React, { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ImagePlus, Film, Plus, X, Columns2, Columns3, Upload,
  AlertCircle, FolderOpen, Image, Music, FileText, Loader2, FileUp
} from "lucide-react";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { compressImage, isCompressibleImage } from "@/lib/compressImage";
import { uploadStore } from "@/lib/uploadStore";

// ==================== SHARED UPLOAD HELPER ====================

const uploadToMedia = async (rawFile: File, folder: string): Promise<string> => {
  const trackId = uploadStore.add(rawFile.name);
  try {
    // Compress images to WebP
    const file = isCompressibleImage(rawFile) ? await compressImage(rawFile) : rawFile;
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    await supabase.from("media").insert({ url: data.publicUrl, alt_text: rawFile.name });
    uploadStore.done(trackId);
    return data.publicUrl;
  } catch (err) {
    uploadStore.error(trackId);
    throw err;
  }
};

// ==================== IMAGE BLOCK ====================

const ImageBlockRender: React.FC<{ block: any; editor: any }> = ({ block, editor }) => {
  const { url, caption } = block.props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const updateProps = (updates: Record<string, string>) => {
    editor.updateBlock(block, { props: { ...block.props, ...updates } });
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const publicUrl = await uploadToMedia(file, "images");
      updateProps({ url: publicUrl });
    } catch (e) {
      console.error("Upload failed:", e);
    }
    setUploading(false);
  };

  if (!url) {
    return (
      <div className="border border-dashed border-border rounded-lg p-6 my-2 bg-muted/10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Image size={14} />
          <span>Imagem</span>
        </div>

        {uploading ? (
          <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            Enviando imagem...
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            />
            <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" onClick={() => fileInputRef.current?.click()}>
              <Upload size={14} />
              Fazer upload de imagem
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" onClick={() => setPickerOpen(true)}>
              <FolderOpen size={14} />
              Escolher da biblioteca
            </Button>
          </div>
        )}

        <MediaPickerModal
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          multiple={false}
          onSelect={(items) => {
            if (items[0]) updateProps({ url: items[0].url });
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative group my-2">
      <img src={url} alt={caption || ""} className="w-full rounded-lg" />
      <button
        onClick={() => updateProps({ url: "", caption: "" })}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
        title="Remover imagem"
      >
        <X size={14} />
      </button>
      <Input
        value={caption || ""}
        onChange={(e) => updateProps({ caption: e.target.value })}
        placeholder="Legenda da imagem..."
        className="mt-2 h-8 text-xs"
      />
    </div>
  );
};

export const createImageBlock = createReactBlockSpec(
  {
    type: "image" as const,
    propSchema: {
      url: { default: "" as const },
      caption: { default: "" as const },
      previewWidth: { default: "100%" as const },
    },
    content: "none" as const,
  },
  {
    render: (props) => <ImageBlockRender block={props.block} editor={props.editor} />,
  }
);

// ==================== GALLERY BLOCK ====================

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const GalleryBlockRender: React.FC<{ block: any; editor: any }> = ({ block, editor }) => {
  const images: GalleryImage[] = (() => {
    try { return JSON.parse(block.props.images); } catch { return []; }
  })();
  const columns = block.props.columns;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const updateImages = (newImages: GalleryImage[]) => {
    editor.updateBlock(block, {
      props: { ...block.props, images: JSON.stringify(newImages) },
    });
  };

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    const newImages = [...images];
    for (const file of Array.from(files)) {
      try {
        const publicUrl = await uploadToMedia(file, "gallery");
        newImages.push({ src: publicUrl, alt: file.name, caption: "" });
      } catch (e) {
        console.error("Upload failed:", e);
      }
    }
    updateImages(newImages);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    updateImages(images.filter((_, i) => i !== index));
  };

  const setColumns = (val: string) => {
    editor.updateBlock(block, { props: { ...block.props, columns: val } });
  };

  return (
    <div className="border border-border rounded-lg p-4 my-2 bg-muted/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImagePlus size={14} />
          <span>Galeria ({images.length} imagens)</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setColumns("2")} className={`p-1.5 rounded ${columns === "2" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}>
            <Columns2 size={14} />
          </button>
          <button onClick={() => setColumns("3")} className={`p-1.5 rounded ${columns === "3" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}>
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

      {uploading ? (
        <div className="flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground">
          <Loader2 size={16} className="animate-spin" />
          Enviando imagens...
        </div>
      ) : (
        <>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleUpload(e.target.files)} />
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" onClick={() => fileInputRef.current?.click()}>
              <Plus size={14} />
              Adicionar imagens
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" onClick={() => setPickerOpen(true)}>
              <FolderOpen size={14} />
              Escolher da biblioteca
            </Button>
          </div>
        </>
      )}

      <MediaPickerModal
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        multiple
        onSelect={(items) => {
          const newImages = [...images];
          items.forEach((item) => {
            newImages.push({ src: item.url, alt: item.alt_text || "", caption: "" });
          });
          updateImages(newImages);
        }}
      />
    </div>
  );
};

export const createGalleryBlock = createReactBlockSpec(
  {
    type: "gallery" as const,
    propSchema: {
      images: { default: "[]" as const },
      columns: { default: "3" as const },
    },
    content: "none" as const,
  },
  {
    render: (props) => <GalleryBlockRender block={props.block} editor={props.editor} />,
  }
);

// ==================== VIDEO BLOCK ====================

const getEmbedUrl = (rawUrl: string): string | null => {
  if (!rawUrl) return null;
  const ytMatch = rawUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?#]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = rawUrl.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
};

const VideoBlockRender: React.FC<{ block: any; editor: any }> = ({ block, editor }) => {
  const { mode, url, poster, caption } = block.props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const updateProps = (updates: Record<string, string>) => {
    editor.updateBlock(block, { props: { ...block.props, ...updates } });
  };

  const clearVideo = () => {
    updateProps({ url: "", mode: "embed", caption: "", poster: "" });
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const publicUrl = await uploadToMedia(file, "videos");
      updateProps({ url: publicUrl, mode: "upload" });
    } catch (e) {
      console.error("Upload failed:", e);
    }
    setUploading(false);
  };

  // State: no video set yet
  if (!url) {
    return (
      <div className="border border-dashed border-border rounded-lg p-6 my-2 bg-muted/10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Film size={14} />
          <span>Vídeo</span>
        </div>

        {uploading ? (
          <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            Enviando vídeo...
          </div>
        ) : (
          <div className="space-y-3">
            <Input
              placeholder="Cole a URL do YouTube ou Vimeo..."
              className="h-9 text-sm"
              onBlur={(e) => {
                const val = e.target.value.trim();
                if (val) updateProps({ url: val, mode: "embed" });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val) updateProps({ url: val, mode: "embed" });
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
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" onClick={() => fileInputRef.current?.click()}>
                <Upload size={14} />
                Fazer upload de vídeo
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" onClick={() => setPickerOpen(true)}>
                <FolderOpen size={14} />
                Escolher da biblioteca
              </Button>
            </div>
          </div>
        )}

        <MediaPickerModal
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          multiple={false}
          onSelect={(items) => {
            if (items[0]) updateProps({ url: items[0].url, mode: "upload" });
          }}
        />
      </div>
    );
  }

  // State: video is set — show preview + controls
  const embedUrl = mode === "embed" ? getEmbedUrl(url) : null;

  return (
    <div className="border border-border rounded-lg p-4 my-2 bg-muted/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Film size={14} />
          <span>Vídeo</span>
        </div>
        <button
          onClick={clearVideo}
          className="p-1.5 rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title="Remover vídeo"
        >
          <X size={14} />
        </button>
      </div>

      {/* Preview */}
      {embedUrl ? (
        <div className="aspect-video rounded overflow-hidden bg-muted mb-3">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      ) : mode === "embed" ? (
        <p className="text-sm text-muted-foreground mb-3">URL não reconhecida: {url}</p>
      ) : (
        <video src={url} controls poster={poster || undefined} className="w-full rounded aspect-video object-cover mb-3" />
      )}

      <Input
        value={caption || ""}
        onChange={(e) => updateProps({ caption: e.target.value })}
        placeholder="Legenda do vídeo..."
        className="h-8 text-xs mb-2"
      />

      {mode !== "embed" && (
        <div className="flex gap-3 text-xs text-muted-foreground">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={block.props.autoplay === "true"} onChange={(e) => updateProps({ autoplay: String(e.target.checked) })} className="rounded" />
            Autoplay
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={block.props.loop === "true"} onChange={(e) => updateProps({ loop: String(e.target.checked) })} className="rounded" />
            Loop
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={block.props.muted === "true"} onChange={(e) => updateProps({ muted: String(e.target.checked) })} className="rounded" />
            Muted
          </label>
        </div>
      )}
    </div>
  );
};

export const createVideoBlock = createReactBlockSpec(
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
    render: (props) => <VideoBlockRender block={props.block} editor={props.editor} />,
  }
);

// ==================== AUDIO BLOCK ====================

const AudioBlockRender: React.FC<{ block: any; editor: any }> = ({ block, editor }) => {
  const { url, caption, name } = block.props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const updateProps = (updates: Record<string, string>) => {
    editor.updateBlock(block, { props: { ...block.props, ...updates } });
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const publicUrl = await uploadToMedia(file, "audios");
      updateProps({ url: publicUrl, name: file.name });
    } catch (e) {
      console.error("Upload failed:", e);
    }
    setUploading(false);
  };

  if (!url) {
    return (
      <div className="border border-dashed border-border rounded-lg p-6 my-2 bg-muted/10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Music size={14} />
          <span>Áudio</span>
        </div>

        {uploading ? (
          <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            Enviando áudio...
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            />
            <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" onClick={() => fileInputRef.current?.click()}>
              <Upload size={14} />
              Fazer upload de áudio
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" onClick={() => setPickerOpen(true)}>
              <FolderOpen size={14} />
              Escolher da biblioteca
            </Button>
          </div>
        )}

        <MediaPickerModal
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          multiple={false}
          onSelect={(items) => {
            if (items[0]) updateProps({ url: items[0].url, name: items[0].alt_text || "" });
          }}
        />
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg p-4 my-2 bg-muted/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Music size={14} />
          <span>Áudio</span>
        </div>
        <button
          onClick={() => updateProps({ url: "", name: "", caption: "" })}
          className="p-1.5 rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title="Remover áudio"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 mb-2">
        <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Music size={18} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          {name && <p className="text-sm font-medium text-foreground truncate mb-1">{name}</p>}
          <audio src={url} controls className="w-full h-8" />
        </div>
      </div>

      <Input
        value={caption || ""}
        onChange={(e) => updateProps({ caption: e.target.value })}
        placeholder="Legenda do áudio..."
        className="h-8 text-xs"
      />
    </div>
  );
};

export const createAudioBlock = createReactBlockSpec(
  {
    type: "audio" as const,
    propSchema: {
      url: { default: "" as const },
      caption: { default: "" as const },
      name: { default: "" as const },
    },
    content: "none" as const,
  },
  {
    render: (props) => <AudioBlockRender block={props.block} editor={props.editor} />,
  }
);

// ==================== FILE BLOCK ====================

const FileBlockRender: React.FC<{ block: any; editor: any }> = ({ block, editor }) => {
  const { url, caption, name } = block.props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const updateProps = (updates: Record<string, string>) => {
    editor.updateBlock(block, { props: { ...block.props, ...updates } });
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const publicUrl = await uploadToMedia(file, "files");
      updateProps({ url: publicUrl, name: file.name });
    } catch (e) {
      console.error("Upload failed:", e);
    }
    setUploading(false);
  };

  if (!url) {
    return (
      <div className="border border-dashed border-border rounded-lg p-6 my-2 bg-muted/10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <FileUp size={14} />
          <span>Arquivo</span>
        </div>

        {uploading ? (
          <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            Enviando arquivo...
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            />
            <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" onClick={() => fileInputRef.current?.click()}>
              <Upload size={14} />
              Fazer upload de arquivo
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" onClick={() => setPickerOpen(true)}>
              <FolderOpen size={14} />
              Escolher da biblioteca
            </Button>
          </div>
        )}

        <MediaPickerModal
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          multiple={false}
          onSelect={(items) => {
            if (items[0]) updateProps({ url: items[0].url, name: items[0].alt_text || "" });
          }}
        />
      </div>
    );
  }

  const fileName = name || url.split("/").pop() || "Arquivo";
  const ext = fileName.split(".").pop()?.toUpperCase() || "FILE";

  return (
    <div className="border border-border rounded-lg p-4 my-2 bg-muted/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileUp size={14} />
          <span>Arquivo</span>
        </div>
        <button
          onClick={() => updateProps({ url: "", name: "", caption: "" })}
          className="p-1.5 rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title="Remover arquivo"
        >
          <X size={14} />
        </button>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group mb-2"
      >
        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="text-[10px] font-bold text-primary">{ext}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{fileName}</p>
          <p className="text-[10px] text-muted-foreground">Clique para baixar</p>
        </div>
      </a>

      <Input
        value={caption || ""}
        onChange={(e) => updateProps({ caption: e.target.value })}
        placeholder="Descrição do arquivo..."
        className="h-8 text-xs"
      />
    </div>
  );
};

export const createFileBlock = createReactBlockSpec(
  {
    type: "file" as const,
    propSchema: {
      url: { default: "" as const },
      caption: { default: "" as const },
      name: { default: "" as const },
    },
    content: "none" as const,
  },
  {
    render: (props) => <FileBlockRender block={props.block} editor={props.editor} />,
  }
);

// ==================== CALLOUT BLOCK ====================

const calloutTypes = {
  info: { icon: "ℹ️", bg: "bg-blue-50 border-blue-200" },
  warning: { icon: "⚠️", bg: "bg-yellow-50 border-yellow-200" },
  danger: { icon: "🚨", bg: "bg-red-50 border-red-200" },
  success: { icon: "✅", bg: "bg-green-50 border-green-200" },
};

export const createCalloutBlock = createReactBlockSpec(
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

// Remove native image/audio/file blocks and replace with our custom ones
const {
  image: _nativeImage,
  audio: _nativeAudio,
  file: _nativeFile,
  ...restBlockSpecs
} = defaultBlockSpecs;

export const customSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...restBlockSpecs,
    // Restrict headings to H1, H2, H3 only
    heading: createHeadingBlockSpec({ levels: [1, 2, 3] }),
    // Custom media blocks with upload + media picker
    image: createImageBlock(),
    audio: createAudioBlock(),
    file: createFileBlock(),
    gallery: createGalleryBlock(),
    video: createVideoBlock(),
    callout: createCalloutBlock(),
  },
});

export type CustomSchema = typeof customSchema;

// ==================== INSERT HELPERS ====================

export const insertImageBlock = (editor: any) => {
  editor.insertBlocks(
    [{ type: "image", props: { url: "", caption: "" } }],
    editor.getTextCursorPosition().block,
    "after"
  );
};

export const insertAudioBlock = (editor: any) => {
  editor.insertBlocks(
    [{ type: "audio", props: { url: "", caption: "", name: "" } }],
    editor.getTextCursorPosition().block,
    "after"
  );
};

export const insertFileBlock = (editor: any) => {
  editor.insertBlocks(
    [{ type: "file", props: { url: "", caption: "", name: "" } }],
    editor.getTextCursorPosition().block,
    "after"
  );
};

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
