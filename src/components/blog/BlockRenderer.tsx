interface Block {
  id?: string;
  type: string;
  props?: Record<string, any>;
  content?: any;
  children?: Block[];
}

const renderInlineContent = (content: any): string => {
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

const BlockRenderer = ({ blocks }: { blocks: Block[] }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, i) => {
        const text = renderInlineContent(block.content);
        const key = block.id ?? i;

        switch (block.type) {
          case "heading": {
            const level = block.props?.level ?? 2;
            if (level === 1) return <h1 key={key} className="text-3xl font-bold tracking-[-0.04em] text-foreground mt-8 mb-4">{text}</h1>;
            if (level === 2) return <h2 key={key} className="text-2xl font-bold tracking-[-0.03em] text-foreground mt-6 mb-3">{text}</h2>;
            return <h3 key={key} className="text-xl font-bold text-foreground mt-4 mb-2">{text}</h3>;
          }
          case "paragraph":
            return text ? <p key={key} className="text-foreground/80 leading-relaxed mb-4">{text}</p> : <br key={key} />;
          case "bulletListItem":
            return <li key={key} className="text-foreground/80 leading-relaxed ml-6 list-disc">{text}</li>;
          case "numberedListItem":
            return <li key={key} className="text-foreground/80 leading-relaxed ml-6 list-decimal">{text}</li>;
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
          default:
            return text ? <p key={key} className="text-foreground/80 mb-4">{text}</p> : null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;
