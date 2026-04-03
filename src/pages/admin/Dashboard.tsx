import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Users, FolderOpen, Image } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({ posts: 0, leads: 0, categories: 0, media: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [posts, leads, categories, media] = await Promise.all([
        supabase.from("posts").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("media").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        posts: posts.count ?? 0,
        leads: leads.count ?? 0,
        categories: categories.count ?? 0,
        media: media.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Posts", value: stats.posts, icon: FileText },
    { label: "Leads", value: stats.leads, icon: Users },
    { label: "Categorias", value: stats.categories, icon: FolderOpen },
    { label: "Mídia", value: stats.media, icon: Image },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-[-0.04em] text-foreground mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <card.icon size={20} className="text-muted-foreground" />
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                {card.label}
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
