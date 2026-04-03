import { Navbar } from "@/components/ui/navbar";
import { Construction } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-10 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Construction size={48} className="text-muted-foreground mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] text-foreground mb-4">
          Blog em Construção
        </h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Estamos preparando conteúdos incríveis sobre educação, impacto social e transformação. Volte em breve!
        </p>
        <a
          href="/"
          className="mt-8 text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Voltar ao início
        </a>
      </div>
    </div>
  );
};

export default Blog;
