import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Music, FileText, Download, ChevronRight } from "lucide-react";

interface Block {
  id?: string;
  type: string;
  props?: Record<string, any>;
  content?: any;
  children?: Block[];
}

// ==================== INLINE CONTENT ====================

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
          <button key={i} onClick={() => setLightboxIndex(i)} className="aspect-square overflow-hidden rounded-lg cursor-pointer group">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          </button>
        ))}
      </div>
      <Lightbox open={lightboxIndex >= 0} close={() => setLightboxIndex(-1)} index={lightboxIndex} slides={images.map((img) => ({ src: img.src, alt: img.alt }))} />
    </>
  );
};

// ==================== VIDEO RENDERER ====================
// Handles both BlockNote's native "video" block (props.url) and our custom "video" block (props.mode)

const VideoRenderer = ({ props }: { props: Record<string, any> }) => {
  // Our custom block uses props.mode; BlockNote's native block uses props.url directly (mode is not set)
  const { mode, url, poster, caption, autoplay, loop, muted } = props;
  
  const getEmbedUrl = (rawUrl: string) => {
    if (!rawUrl) return null;
    const ytMatch = rawUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vimeoMatch = rawUrl.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return null;
  };

  if (!url) return null;

  // If mode is "embed" OR no mode is set but URL is a YouTube/Vimeo link → try embed
  const embedUrl = (mode === "embed" || !mode) ? getEmbedUrl(url) : null;

  return (
    <figure className="my-6">
      {embedUrl ? (
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe src={embedUrl} className="w-full h-full" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
        </div>
      ) : (
        <video
          src={url}
          controls
          poster={poster || undefined}
          autoPlay={autoplay === "true" || autoplay === true}
          loop={loop === "true" || loop === true}
          muted={muted === "true" || muted === true}
          className="w-full rounded-lg aspect-video object-cover"
        />
      )}
      {caption && <figcaption className="text-sm text-muted-foreground mt-2 text-center">{caption}</figcaption>}
    </figure>
  );
};

// ==================== AUDIO RENDERER ====================
// Handles BlockNote's native "audio" block (props.url + props.caption + props.name)

const AudioRenderer = ({ props }: { props: Record<string, any> }) => {
  const { url, caption, name } = props;
  if (!url) return null;
  return (
    <figure className="my-6">
      <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-muted/30">
        <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Music size={18} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          {name && <p className="text-sm font-medium text-foreground truncate mb-1">{name}</p>}
          <audio src={url} controls className="w-full h-8" />
        </div>
      </div>
      {caption && <figcaption className="text-sm text-muted-foreground mt-2 text-center">{caption}</figcaption>}
    </figure>
  );
};

// ==================== FILE RENDERER ====================

const FileRenderer = ({ props }: { props: Record<string, any> }) => {
  const { url, caption, name } = props;
  if (!url) return null;
  const fileName = name || url.split("/").pop() || "Arquivo";
  return (
    <figure className="my-4">
      <a href={url} target="_blank" rel="noopener noreferrer" download className="flex items-center gap-3 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors group">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText size={18} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{fileName}</p>
          {caption && <p className="text-xs text-muted-foreground truncate">{caption}</p>}
        </div>
        <Download size={16} className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
      </a>
    </figure>
  );
};

// ==================== TOGGLE RENDERER ====================
// BlockNote saves toggle headings with props.isToggleable = true
// and toggle list items as type "toggleListItem"

const ToggleBlock = ({ label, children, level }: { label: React.ReactNode; children: React.ReactNode; level?: number }) => {
  const [open, setOpen] = useState(false);
  const Tag = level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : "div";
  const headingClass = level === 1
    ? "text-3xl font-bold tracking-[-0.04em] text-foreground"
    : level === 2
    ? "text-2xl font-bold tracking-[-0.03em] text-foreground"
    : level === 3
    ? "text-xl font-bold text-foreground"
    : "text-foreground";

  return (
    <div className="my-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 w-full text-left group"
      >
        <ChevronRight
          size={16}
          className={`shrink-0 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
        />
        <Tag className={headingClass}>{label}</Tag>
      </button>
      {open && children && (
        <div className="ml-6 mt-2 border-l-2 border-border pl-4">
          {children}
        </div>
      )}
    </div>
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

const renderBlock = (block: Block, i: number): React.ReactNode => {
  const key = block.id ?? i;

  switch (block.type) {
    case "heading": {
      const text = renderInlineContent(block.content);
      const level = block.props?.level ?? 2;
      const isToggle = block.props?.isToggleable === true;
      const children = block.children?.length
        ? <BlockRenderer blocks={block.children} />
        : null;

      if (isToggle) {
        return <ToggleBlock key={key} label={text} level={level}>{children}</ToggleBlock>;
      }

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
    case "checkListItem": {
      const text = renderInlineContent(block.content);
      const checked = block.props?.checked === true || block.props?.checked === "true";
      return (
        <li key={key} className="flex items-start gap-2 text-foreground/80 leading-relaxed ml-2 mb-1 list-none">
          <span className={`mt-1 w-4 h-4 shrink-0 rounded border flex items-center justify-center text-[10px] ${checked ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}>
            {checked && "✓"}
          </span>
          <span className={checked ? "line-through text-muted-foreground" : ""}>{text}</span>
        </li>
      );
    }
    case "toggleListItem": {
      // BlockNote's toggle list item — has content (label) and children (nested blocks)
      const text = renderInlineContent(block.content);
      const children = block.children?.length ? <BlockRenderer blocks={block.children} /> : null;
      return (
        <ToggleBlock key={key} label={text}>
          {children}
        </ToggleBlock>
      );
    }
    case "quote": {
      const text = renderInlineContent(block.content);
      return (
        <blockquote key={key} className="border-l-4 border-border pl-4 py-1 my-4 text-foreground/70 italic">
          {text}
        </blockquote>
      );
    }
    case "image":
      return (
        <figure key={key} className="my-6">
          <img src={block.props?.url} alt={block.props?.caption ?? ""} className="w-full rounded-lg" />
          {block.props?.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">{block.props.caption}</figcaption>
          )}
        </figure>
      );
    case "audio":
      return <AudioRenderer key={key} props={block.props || {}} />;
    case "file":
      return <FileRenderer key={key} props={block.props || {}} />;
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
    case "codeBlock": {
      const code = renderInlineText(block.content);
      const lang = block.props?.language || "";
      return (
        <div key={key} className="my-6">
          {lang && (
            <div className="flex items-center px-4 py-2 bg-zinc-800 rounded-t-lg">
              <span className="text-xs text-zinc-400 font-mono">{lang}</span>
            </div>
          )}
          <pre className={`bg-zinc-900 text-zinc-100 p-4 overflow-x-auto text-sm font-mono leading-relaxed ${lang ? "rounded-b-lg" : "rounded-lg"}`}>
            <code>{code}</code>
          </pre>
        </div>
      );
    }
    case "table": {
      // BlockNote v0.47 stores table as { type: "tableContent", rows: [{cells:[...]}, ...] }
      const tableContent = block.content;
      const rows: any[] = tableContent?.rows ?? (Array.isArray(block.content) ? block.content : []);
      if (rows.length === 0) return null;
      const [headerRow, ...bodyRows] = rows;
      const headerCells: any[] = Array.isArray(headerRow?.cells) ? headerRow.cells : (Array.isArray(headerRow?.content) ? headerRow.content : []);
      return (
        <div key={key} className="my-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                {headerCells.map((cell: any, ci: number) => (
                  <th key={ci} className="px-4 py-2 text-left font-semibold text-foreground">
                    {typeof cell === "string" ? cell : renderInlineContent(cell?.content ?? cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row: any, ri: number) => {
                const cells: any[] = Array.isArray(row?.cells) ? row.cells : (Array.isArray(row?.content) ? row.content : []);
                return (
                  <tr key={ri} className="border-b border-border hover:bg-muted/30">
                    {cells.map((cell: any, ci: number) => (
                      <td key={ci} className="px-4 py-2 text-foreground/80">
                        {typeof cell === "string" ? cell : renderInlineContent(cell?.content ?? cell)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    case "divider":
    case "separator":
    case "horizontalRule":
      return <hr key={key} className="my-8 border-border" />;
    default: {
      const text = renderInlineContent(block.content);
      const plainText = renderInlineText(block.content);
      return plainText ? <p key={key} className="text-foreground/80 mb-4">{text}</p> : null;
    }
  }
};

const BlockRenderer = ({ blocks }: { blocks: Block[] }) => {
  if (!blocks || !Array.isArray(blocks)) return null;
  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
};

export default BlockRenderer;
