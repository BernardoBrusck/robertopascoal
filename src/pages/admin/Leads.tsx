import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Lead {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setLeads(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-[-0.04em] text-foreground mb-8">Leads</h1>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : leads.length === 0 ? (
        <p className="text-muted-foreground">Nenhum lead recebido ainda.</p>
      ) : (
        <div className="bg-background border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Nome</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">E-mail</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Telefone</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Origem</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{lead.name ?? "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{lead.email ?? "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{lead.phone ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                      {lead.source ?? "contato"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {format(new Date(lead.created_at), "dd MMM yyyy", { locale: ptBR })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leads;
