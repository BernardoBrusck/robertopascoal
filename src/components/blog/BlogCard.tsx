import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  categoryName: string | null;
  publishedAt: string | null;
}

const BlogCard = ({ title, slug, excerpt, coverImage, categoryName, publishedAt }: BlogCardProps) => {
  return (
    <Link to={`/blog/${slug}`} className="group block">
      <article className="bg-background border border-border rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
        {coverImage && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            {categoryName && (
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
                {categoryName}
              </span>
            )}
            {publishedAt && (
              <span className="text-[10px] text-muted-foreground">
                {format(new Date(publishedAt), "dd MMM yyyy", { locale: ptBR })}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold tracking-[-0.03em] text-foreground mb-2 group-hover:opacity-70 transition-opacity line-clamp-2">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
