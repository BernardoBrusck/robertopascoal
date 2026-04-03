import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, Copy, Check } from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  alt_text: string | null;
  created_at: string;
}

const Media = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchMedia = async () => {
    const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  };

  useEffect(() => { fetchMedia(); }, []);

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
    fetchMedia();
    e.target.value = "";
  };

  const deleteItem = async (item: MediaItem) => {
    if (!confirm("Excluir esta mídia?")) return;
    await supabase.from("media").delete().eq("id", item.id);
    fetchMedia();
  };

  const copyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-[-0.04em] text-foreground">Biblioteca de Mídia</h1>
        <label>
          <Button className="gap-2 cursor-pointer" asChild>
            <span>
              <Upload size={16} />
              {uploading ? "Enviando..." : "Upload"}
            </span>
          </Button>
          <Input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
        </label>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma mídia enviada ainda.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-background border border-border rounded-lg overflow-hidden">
              <img
                src={item.url}
                alt={item.alt_text ?? ""}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => copyUrl(item)}>
                  {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => deleteItem(item)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Media;
