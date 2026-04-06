import { useSyncExternalStore, useState } from "react";
import { uploadStore } from "@/lib/uploadStore";
import { Loader2, Check, AlertCircle, X, ChevronDown, ChevronUp } from "lucide-react";

const UploadToast = () => {
  const uploads = useSyncExternalStore(uploadStore.subscribe, uploadStore.getSnapshot);
  const [collapsed, setCollapsed] = useState(false);

  if (uploads.length === 0) return null;

  const uploading = uploads.filter((u) => u.status === "uploading").length;
  const done = uploads.filter((u) => u.status === "done").length;
  const errors = uploads.filter((u) => u.status === "error").length;

  return (
    <div className="fixed bottom-4 right-4 z-[60] w-80 bg-background border border-border rounded-lg shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-muted/50 cursor-pointer select-none"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          {uploading > 0 ? (
            <>
              <Loader2 size={14} className="animate-spin text-primary" />
              <span>Enviando {uploading} arquivo{uploading > 1 ? "s" : ""}...</span>
            </>
          ) : errors > 0 ? (
            <>
              <AlertCircle size={14} className="text-destructive" />
              <span>{errors} erro{errors > 1 ? "s" : ""}, {done} concluído{done > 1 ? "s" : ""}</span>
            </>
          ) : (
            <>
              <Check size={14} className="text-green-500" />
              <span>{done} arquivo{done > 1 ? "s" : ""} enviado{done > 1 ? "s" : ""}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-muted rounded text-muted-foreground">
            {collapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {uploading === 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); uploadStore.clear(); }}
              className="p-1 hover:bg-muted rounded text-muted-foreground"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Items */}
      {!collapsed && (
        <div className="max-h-48 overflow-y-auto divide-y divide-border">
          {uploads.map((item) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-2.5 text-xs">
              {item.status === "uploading" && <Loader2 size={12} className="animate-spin text-muted-foreground shrink-0" />}
              {item.status === "done" && <Check size={12} className="text-green-500 shrink-0" />}
              {item.status === "error" && <AlertCircle size={12} className="text-destructive shrink-0" />}
              <span className="truncate flex-1 text-foreground">{item.name}</span>
              <span className="text-muted-foreground shrink-0">
                {item.status === "uploading" ? "Enviando" : item.status === "done" ? "Concluído" : "Erro"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadToast;
