import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Block {
  id?: string;
  type: string;
  props?: Record<string, any>;
  content?: any;
  children?: Block[];
}

const renderInlineContent = (content: any): React.ReactNode => {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((item: any, idx: number) => {
      if (typeof item === "string") return item;
      if (item.type === "text") {
        let node: React.ReactNode = item.text ?? "";
        if (item.styles?.bold) node = <strong key={idx}>{node}</strong>;
        if (item.styles?.italic) node = <em key={idx}>{node}</em>;
        if (item.styles?.underline) node = <u key={idx}>{node}</u>;
        if (item.styles?.strikethrough) node = <s key={idx}>{node}</s>;
        if (item.styles?.code) node = <code key={idx} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{node}</code>;
        return node;
      }
      if (item.type === "link") {
        const linkText = item.content?.map((c: any) => c.text ?? "").join("") ?? "";
        return (
          <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">
            {linkText}
          </a>
        );
      }
      return "";
    });
  }
  return "";
};

const renderInlineText = (content: any): string => {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((item: any) => {
      if (typeof item === "string") return item;
      if (item.type === "text") return item.text ?? "";
      if (item.type === "link") return item.content?.map((c: any) => c.text ?? "").join("") ?? "";
      return "";
    }).join("");
  }
  return "";
};

// ==================== GALLERY RENDERER ====================

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const GalleryRenderer = ({ images, columns }: { images: GalleryImage[]; columns: number }) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (!images || images.length === 0) return null;

  const gridCols = columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <>
      <div className={`grid gap-3 my-6 ${gridCols}`}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer group"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </>
  );
};

// ==================== VIDEO RENDERER ====================

const VideoRenderer = ({ props }: { props: Record<string, any> }) => {
  const { mode, url, poster, caption, autoplay, loop, muted } = props;

  const getEmbedUrl = (rawUrl: string) => {
    const ytMatch = rawUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vimeoMatch = rawUrl.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return null;
  };

  if (!url) return null;

  return (
    <figure className="my-6">
      {mode === "embed" ? (
        (() => {
          const embedUrl = getEmbedUrl(url);
          return embedUrl ? (
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Vídeo não disponível</p>
          );
        })()
      ) : (
        <video
          src={url}
          controls
          poster={poster || undefined}
          autoPlay={autoplay === "true"}
          loop={loop === "true"}
          muted={muted === "true"}
          className="w-full rounded-lg aspect-video object-cover"
        />
      )}
      {caption && (
        <figcaption className="text-sm text-muted-foreground mt-2 text-center">{caption}</figcaption>
      )}
    </figure>
  );
};

// ==================== CALLOUT RENDERER ====================

const calloutStyles: Record<string, { icon: string; classes: string }> = {
  info: { icon: "ℹ️", classes: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800" },
  warning: { icon: "⚠️", classes: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800" },
  danger: { icon: "🚨", classes: "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800" },
  success: { icon: "✅", classes: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800" },
};

// ==================== MAIN RENDERER ====================

const BlockRenderer = ({ blocks }: { blocks: Block[] }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, i) => {
        const key = block.id ?? i;

        switch (block.type) {
          case "heading": {
            const text = renderInlineContent(block.content);
            const level = block.props?.level ?? 2;
            if (level === 1) return <h1 key={key} className="text-3xl font-bold tracking-[-0.04em] text-foreground mt-8 mb-4">{text}</h1>;
            if (level === 2) return <h2 key={key} className="text-2xl font-bold tracking-[-0.03em] text-foreground mt-6 mb-3">{text}</h2>;
            return <h3 key={key} className="text-xl font-bold text-foreground mt-4 mb-2">{text}</h3>;
          }
          case "paragraph": {
            const text = renderInlineContent(block.content);
            const plainText = renderInlineText(block.content);
            return plainText ? <p key={key} className="text-foreground/80 leading-relaxed mb-4">{text}</p> : <br key={key} />;
          }
          case "bulletListItem": {
            const text = renderInlineContent(block.content);
            return <li key={key} className="text-foreground/80 leading-relaxed ml-6 list-disc">{text}</li>;
          }
          case "numberedListItem": {
            const text = renderInlineContent(block.content);
            return <li key={key} className="text-foreground/80 leading-relaxed ml-6 list-decimal">{text}</li>;
          }
          case "image":
            return (
              <figure key={key} className="my-6">
                <img
                  src={block.props?.url}
                  alt={block.props?.caption ?? ""}
                  className="w-full rounded-lg"
                />
                {block.props?.caption && (
                  <figcaption className="text-sm text-muted-foreground mt-2 text-center">
                    {block.props.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "gallery": {
            let images: GalleryImage[] = [];
            try { images = JSON.parse(block.props?.images || "[]"); } catch { /* empty */ }
            const cols = parseInt(block.props?.columns || "3", 10);
            return <GalleryRenderer key={key} images={images} columns={cols} />;
          }
          case "video":
            return <VideoRenderer key={key} props={block.props || {}} />;
          case "callout": {
            const text = renderInlineContent(block.content);
            const cfg = calloutStyles[block.props?.calloutType || "info"] || calloutStyles.info;
            return (
              <div key={key} className={`flex gap-3 items-start p-4 rounded-lg border my-4 ${cfg.classes}`}>
                <span className="text-lg shrink-0">{cfg.icon}</span>
                <div className="flex-1 text-foreground/80">{text}</div>
              </div>
            );
          }
          default: {
            const text = renderInlineContent(block.content);
            const plainText = renderInlineText(block.content);
            return plainText ? <p key={key} className="text-foreground/80 mb-4">{text}</p> : null;
          }
        }
      })}
    </div>
  );
};

export default BlockRenderer;
