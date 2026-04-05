import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle } from "lucide-react";

interface CheckItem {
  label: string;
  ok: boolean;
}

interface PublishChecklistProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish: () => void;
  coverImage: string;
  categoryId: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
}

const PublishChecklist = ({
  open,
  onOpenChange,
  onPublish,
  coverImage,
  categoryId,
  excerpt,
  seoTitle,
  metaDescription,
}: PublishChecklistProps) => {
  const checks: CheckItem[] = [
    { label: "Imagem de capa definida", ok: !!coverImage },
    { label: "Categoria selecionada", ok: !!categoryId },
    { label: "Resumo preenchido", ok: !!excerpt.trim() },
    { label: "SEO Title preenchido", ok: !!seoTitle.trim() },
    { label: "Meta Description preenchida", ok: !!metaDescription.trim() },
  ];

  const allGood = checks.every((c) => c.ok);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Checklist de publicação</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          {checks.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {item.ok ? (
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-green-700" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                  <AlertTriangle size={12} className="text-yellow-700" />
                </div>
              )}
              <span className="text-sm text-foreground">{item.label}</span>
              {!item.ok && <span className="text-[10px] text-muted-foreground ml-auto">Recomendado</span>}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button size="sm" onClick={() => { onPublish(); onOpenChange(false); }}>
            {allGood ? "Publicar" : "Publicar assim mesmo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishChecklist;
