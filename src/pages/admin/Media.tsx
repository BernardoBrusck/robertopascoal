import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Trash2, Copy, Check, Search, Download, X, Image, Film, FileText } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  url: string;
  alt_text: string | null;
  created_at: string;
}

type FileFilter = "all" | "images" | "videos" | "documents";

const fileFilterConfig: { value: FileFilter; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "Todos", icon: null },
  { value: "images", label: "Imagens", icon: <Image size={14} /> },
  { value: "videos", label: "Vídeos", icon: <Film size={14} /> },
  { value: "documents", label: "Documentos", icon: <FileText size={14} /> },
];

const getFileType = (url: string): "image" | "video" | "document" => {
  const ext = url.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg", "jpeg", "png", "gif", "webp", "svg", "avif"].includes(ext)) return "image";
  if (["mp4", "mov", "webm", "avi"].includes(ext)) return "video";
  return "document";
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface MediaProps {
  mode?: "page" | "modal";
  multiple?: boolean;
  onSelect?: (items: MediaItem[]) => void;
}

const Media = ({ mode = "page", multiple = false, onSelect }: MediaProps) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FileFilter>("all");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingAlt, setEditingAlt] = useState("");
  const { user } = useAuth();

  const isModal = mode === "modal";

  const fetchMedia = useCallback(async () => {
    const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  }, []);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);

  const filteredItems = items.filter((item) => {
    if (search && !item.alt_text?.toLowerCase().includes(search.toLowerCase()) && !item.url.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "all") return true;
    const type = getFileType(item.url);
    if (filter === "images") return type === "image";
    if (filter === "videos") return type === "video";
    return type === "document";
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("media").getPublicUrl(path);
        await supabase.from("media").insert({
          url: data.publicUrl,
          alt_text: file.name,
          uploaded_by: user?.id,
        });
      }
    }
    setUploading(false);
    toast.success("Upload concluído");
    fetchMedia();
    e.target.value = "";
  };

  const deleteItem = async (item: MediaItem) => {
    if (!confirm("Excluir esta mídia?")) return;
    await supabase.from("media").delete().eq("id", item.id);
    if (selectedItem?.id === item.id) setSelectedItem(null);
    toast.success("Mídia excluída");
    fetchMedia();
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const updateAlt = async (item: MediaItem, alt: string) => {
    await supabase.from("media").update({ alt_text: alt } as any).eq("id", item.id);
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, alt_text: alt } : i));
    toast.success("Alt text atualizado");
  };

  const toggleModalSelect = (item: MediaItem) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (multiple) {
        next.has(item.id) ? next.delete(item.id) : next.add(item.id);
      } else {
        next.clear();
        next.add(item.id);
      }
      return next;
    });
  };

  const handleInsertSelected = () => {
    const selected = items.filter((i) => selectedIds.has(i.id));
    onSelect?.(selected);
  };

  return (
    <div className={cn("flex", isModal ? "h-[60vh]" : "")}>
      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className={cn("flex items-center justify-between gap-4", isModal ? "mb-3" : "mb-6")}>
          {!isModal && <h1 className="text-2xl font-bold tracking-[-0.04em] text-foreground">Biblioteca de Mídia</h1>}
          <label className="shrink-0">
            <Button className="gap-2 cursor-pointer" size={isModal ? "sm" : "default"} asChild>
              <span>
                <Upload size={16} />
                {uploading ? "Enviando..." : "Upload"}
              </span>
            </Button>
            <Input type="file" accept="image/*,video/*,.pdf,.zip,.docx" multiple className="hidden" onChange={handleUpload} />
          </label>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="pl-9 h-8 text-sm"
            />
          </div>
          <div className="flex items-center gap-1">
            {fileFilterConfig.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-colors",
                  filter === f.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className={cn("flex-1 overflow-y-auto", isModal ? "" : "")}>
          {filteredItems.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nenhuma mídia encontrada.</p>
          ) : (
            <div className={cn("grid gap-3", isModal ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5")}>
              {filteredItems.map((item) => {
                const type = getFileType(item.url);
                const isSelected = isModal && selectedIds.has(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => isModal ? toggleModalSelect(item) : setSelectedItem(selectedItem?.id === item.id ? null : item)}
                    className={cn(
                      "relative bg-background border rounded-lg overflow-hidden text-left transition-all group",
                      isSelected ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-foreground/30",
                      !isModal && selectedItem?.id === item.id && "ring-2 ring-primary/30 border-primary"
                    )}
                  >
                    {type === "image" ? (
                      <img src={item.url} alt={item.alt_text ?? ""} className="w-full aspect-square object-cover" />
                    ) : type === "video" ? (
                      <div className="w-full aspect-square bg-muted flex items-center justify-center">
                        <Film size={24} className="text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-muted flex items-center justify-center">
                        <FileText size={24} className="text-muted-foreground" />
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check size={12} className="text-primary-foreground" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal footer */}
        {isModal && (
          <div className="flex items-center justify-end gap-3 pt-3 mt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">{selectedIds.size} selecionado(s)</span>
            <Button size="sm" disabled={selectedIds.size === 0} onClick={handleInsertSelected}>
              Inserir selecionados ({selectedIds.size})
            </Button>
          </div>
        )}
      </div>

      {/* Detail sidebar (page mode only) */}
      {!isModal && selectedItem && (
        <div className="w-72 border-l border-border ml-4 pl-4 overflow-y-auto shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Detalhes</span>
            <button onClick={() => setSelectedItem(null)} className="text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          </div>

          {getFileType(selectedItem.url) === "image" ? (
            <img src={selectedItem.url} alt={selectedItem.alt_text ?? ""} className="w-full rounded-lg" />
          ) : getFileType(selectedItem.url) === "video" ? (
            <video src={selectedItem.url} controls className="w-full rounded-lg" />
          ) : (
            <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
              <FileText size={32} className="text-muted-foreground" />
            </div>
          )}

          <div className="space-y-3 text-sm">
            <div>
              <Label className="text-xs">Nome</Label>
              <p className="text-foreground truncate">{selectedItem.alt_text || "Sem nome"}</p>
            </div>
            <div>
              <Label className="text-xs">Data de upload</Label>
              <p className="text-muted-foreground">{format(new Date(selectedItem.created_at), "dd MMM yyyy 'às' HH:mm", { locale: ptBR })}</p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">URL pública</Label>
              <div className="flex gap-1.5">
                <Input value={selectedItem.url} readOnly className="h-8 text-xs flex-1" />
                <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={() => copyUrl(selectedItem.url, selectedItem.id)}>
                  {copiedId === selectedItem.id ? <Check size={12} /> : <Copy size={12} />}
                </Button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Alt text</Label>
              <Input
                value={editingAlt}
                onChange={(e) => setEditingAlt(e.target.value)}
                onFocus={() => setEditingAlt(selectedItem.alt_text ?? "")}
                onBlur={() => updateAlt(selectedItem, editingAlt)}
                placeholder="Descrição da imagem"
                className="h-8 text-xs"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs" asChild>
                <a href={selectedItem.url} download target="_blank" rel="noopener noreferrer">
                  <Download size={12} />
                  Baixar
                </a>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs text-destructive" onClick={() => deleteItem(selectedItem)}>
                <Trash2 size={12} />
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
