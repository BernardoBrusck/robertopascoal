import { useState } from "react";
import { Button } from "@/components/ui/button";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown, RefreshCw, X, CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface PostEditorSidebarProps {
  status: string;
  setStatus: (s: string) => void;
  publishedAt: string;
  setPublishedAt: (s: string) => void;
  coverImage: string;
  setCoverImage: (s: string) => void;
  onCoverUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCoverRemove: () => void;
  coverAlt: string;
  setCoverAlt: (s: string) => void;
  categoryId: string;
  setCategoryId: (s: string) => void;
  categories: Category[];
  selectedTagIds: string[];
  onToggleTag: (id: string) => void;
  allTags: Tag[];
  slug: string;
  setSlug: (s: string) => void;
  onRegenerateSlug: () => void;
  excerpt: string;
  setExcerpt: (s: string) => void;
  seoTitle: string;
  setSeoTitle: (s: string) => void;
  metaDescription: string;
  setMetaDescription: (s: string) => void;
  ogImage: string;
  setOgImage: (s: string) => void;
  canonicalUrl: string;
  setCanonicalUrl: (s: string) => void;
}

const SectionHeader = ({ children, open }: { children: React.ReactNode; open?: boolean }) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground hover:text-foreground transition-colors">
    {children}
    <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
  </CollapsibleTrigger>
);

const CharCounter = ({ current, max }: { current: number; max: number }) => {
  const color = current > max ? "text-destructive" : current > max * 0.9 ? "text-yellow-600" : "text-muted-foreground";
  return <span className={cn("text-[10px] tabular-nums", color)}>{current}/{max}</span>;
};

const statusLabels: Record<string, string> = {
  draft: "Rascunho",
  review: "Em revisão",
  scheduled: "Agendado",
  published: "Publicado",
};

const PostEditorSidebar = (props: PostEditorSidebarProps) => {
  const [pubOpen, setPubOpen] = useState(true);
  const [coverOpen, setCoverOpen] = useState(true);
  const [orgOpen, setOrgOpen] = useState(true);
  const [slugOpen, setSlugOpen] = useState(false);
  const [excerptOpen, setExcerptOpen] = useState(true);
  const [seoOpen, setSeoOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const filteredTags = props.allTags.filter((t) =>
    t.name.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const scheduledDate = props.publishedAt ? new Date(props.publishedAt) : undefined;

  return (
    <div className="w-80 border-l border-border bg-background overflow-y-auto h-full p-4 space-y-1">
      {/* Publication */}
      <Collapsible open={pubOpen} onOpenChange={setPubOpen}>
        <SectionHeader open={pubOpen}>Publicação</SectionHeader>
        <CollapsibleContent className="space-y-3 pb-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Status</Label>
            <select
              value={props.status}
              onChange={(e) => props.setStatus(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              {Object.entries(statusLabels).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {props.status === "scheduled" && (
            <div className="space-y-1.5">
              <Label className="text-xs">Data de publicação</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left text-sm font-normal", !scheduledDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={(d) => d && props.setPublishedAt(d.toISOString())}
                    disabled={(d) => d < new Date()}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                value={scheduledDate ? format(scheduledDate, "HH:mm") : ""}
                onChange={(e) => {
                  const [h, m] = e.target.value.split(":");
                  const d = scheduledDate ? new Date(scheduledDate) : new Date();
                  d.setHours(Number(h), Number(m));
                  props.setPublishedAt(d.toISOString());
                }}
                className="h-9 text-sm"
              />
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Cover Image */}
      <Collapsible open={coverOpen} onOpenChange={setCoverOpen}>
        <SectionHeader open={coverOpen}>Imagem de capa</SectionHeader>
        <CollapsibleContent className="space-y-3 pb-4">
          {props.coverImage ? (
            <div className="relative group">
              <img src={props.coverImage} alt={props.coverAlt || "Capa"} className="w-full rounded-md object-cover max-h-40" />
              <button
                onClick={props.onCoverRemove}
                className="absolute top-2 right-2 p-1 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-md p-6 cursor-pointer hover:border-muted-foreground/50 transition-colors">
                <Upload size={20} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Clique ou arraste</span>
                <input type="file" accept="image/*" onChange={props.onCoverUpload} className="hidden" />
              </label>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => setMediaPickerOpen(true)}
              >
                Escolher da biblioteca
              </Button>
            </div>
          )}
          <div className="space-y-1.5">
            <Label className="text-xs">Alt text</Label>
            <Input
              value={props.coverAlt}
              onChange={(e) => props.setCoverAlt(e.target.value)}
              placeholder="Descrição da imagem"
              className="h-9 text-sm"
            />
          </div>
          <MediaPickerModal
            open={mediaPickerOpen}
            onOpenChange={setMediaPickerOpen}
            onSelect={(items) => {
              if (items.length > 0) {
                props.setCoverImage(items[0].url);
                if (items[0].alt_text) props.setCoverAlt(items[0].alt_text);
              }
            }}
          />
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Organization */}
      <Collapsible open={orgOpen} onOpenChange={setOrgOpen}>
        <SectionHeader open={orgOpen}>Organização</SectionHeader>
        <CollapsibleContent className="space-y-3 pb-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Categoria</Label>
            <select
              value={props.categoryId}
              onChange={(e) => props.setCategoryId(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="">Sem categoria</option>
              {props.categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Tags</Label>
            <Input
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              placeholder="Buscar tags..."
              className="h-9 text-sm"
            />
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
              {filteredTags.map((tag) => {
                const selected = props.selectedTagIds.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => props.onToggleTag(tag.id)}
                    className={cn(
                      "text-[11px] px-2.5 py-1 rounded-full border transition-colors",
                      selected
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-muted-foreground border-border hover:border-foreground/30"
                    )}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Slug */}
      <Collapsible open={slugOpen} onOpenChange={setSlugOpen}>
        <SectionHeader open={slugOpen}>Slug</SectionHeader>
        <CollapsibleContent className="space-y-2 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">/blog/</span>
            <Input
              value={props.slug}
              onChange={(e) => props.setSlug(e.target.value)}
              className="h-9 text-sm flex-1"
            />
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={props.onRegenerateSlug}>
              <RefreshCw size={14} />
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Excerpt */}
      <Collapsible open={excerptOpen} onOpenChange={setExcerptOpen}>
        <SectionHeader open={excerptOpen}>Resumo</SectionHeader>
        <CollapsibleContent className="space-y-2 pb-4">
          <Textarea
            value={props.excerpt}
            onChange={(e) => props.setExcerpt(e.target.value.slice(0, 160))}
            placeholder="Breve descrição do artigo..."
            className="text-sm min-h-[80px] resize-none"
            maxLength={160}
          />
          <div className="flex justify-end">
            <CharCounter current={props.excerpt.length} max={160} />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* SEO */}
      <Collapsible open={seoOpen} onOpenChange={setSeoOpen}>
        <SectionHeader open={seoOpen}>SEO</SectionHeader>
        <CollapsibleContent className="space-y-3 pb-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs">SEO Title</Label>
              <CharCounter current={props.seoTitle.length} max={60} />
            </div>
            <Input
              value={props.seoTitle}
              onChange={(e) => props.setSeoTitle(e.target.value)}
              placeholder="Título para buscadores"
              className="h-9 text-sm"
              maxLength={70}
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Meta Description</Label>
              <CharCounter current={props.metaDescription.length} max={160} />
            </div>
            <Textarea
              value={props.metaDescription}
              onChange={(e) => props.setMetaDescription(e.target.value)}
              placeholder="Descrição para buscadores"
              className="text-sm min-h-[60px] resize-none"
              maxLength={170}
            />
          </div>

          {/* Google preview */}
          <div className="rounded-md border border-border p-3 space-y-1 bg-muted/30">
            <p className="text-[11px] text-muted-foreground truncate">robertopascoal.lovable.app › blog › {props.slug || "..."}</p>
            <p className="text-sm font-medium text-primary truncate">{props.seoTitle || props.slug || "Título do artigo"}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{props.metaDescription || props.excerpt || "Descrição do artigo aparece aqui..."}</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">OG Image (URL)</Label>
            <Input
              value={props.ogImage}
              onChange={(e) => props.setOgImage(e.target.value)}
              placeholder="Usar imagem de capa se vazio"
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Canonical URL</Label>
            <Input
              value={props.canonicalUrl}
              onChange={(e) => props.setCanonicalUrl(e.target.value)}
              placeholder="Deixe em branco na maioria dos casos"
              className="h-9 text-sm"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default PostEditorSidebar;
