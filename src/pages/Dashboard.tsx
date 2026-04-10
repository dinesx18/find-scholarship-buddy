import { useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap, Bookmark, Clock, Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { scholarships } from "@/data/scholarships";
import { useSavedScholarships } from "@/hooks/useSavedScholarships";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ExternalLink, Calendar } from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";
import { useState, useEffect } from "react";

const trendingIds = ["1", "3", "4", "5", "6"];
const recommendedIds = ["2", "8", "10", "13", "14"];

function MiniCard({ s, tag }: { s: typeof scholarships[0]; tag?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-card hover:shadow-card-hover transition-all">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-heading text-sm font-semibold text-card-foreground leading-tight pr-2">{s.name}</h3>
        {tag && <Badge className="shrink-0 text-[10px] bg-accent text-accent-foreground">{tag}</Badge>}
      </div>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{s.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {new Date(s.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
        </span>
        <Button size="sm" asChild className="gradient-primary text-primary-foreground border-0 hover:opacity-90 h-7 text-xs px-3">
          <a href={s.applyLink} target="_blank" rel="noopener noreferrer">
            Apply <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { savedIds } = useSavedScholarships();
  const { recentIds } = useRecentlyViewed();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const savedScholarships = scholarships.filter((s) => savedIds.includes(s.id));
  const recentScholarships = scholarships.filter((s) => recentIds.includes(s.id));
  const trending = scholarships.filter((s) => trendingIds.includes(s.id));
  const recommended = scholarships.filter((s) => recommendedIds.includes(s.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container max-w-5xl py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-lg text-foreground">{t("dashboard")}</span>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container max-w-5xl py-8 px-4 space-y-10">
        {/* Recommended */}
        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> {t("recommendedForYou")}
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommended.map((s) => <MiniCard key={s.id} s={s} tag="✨ Recommended" />)}
            </div>
          )}
        </section>

        {/* Trending */}
        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-destructive" /> {t("trendingScholarships")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.map((s) => <MiniCard key={s.id} s={s} tag="🔥 Trending" />)}
          </div>
        </section>

        {/* Saved */}
        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-primary" /> {t("savedScholarships")}
          </h2>
          {savedScholarships.length === 0 ? (
            <p className="text-muted-foreground text-sm">{t("noSavedYet")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedScholarships.map((s) => <MiniCard key={s.id} s={s} />)}
            </div>
          )}
        </section>

        {/* Recently Viewed */}
        <section>
          <h2 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" /> {t("recentlyViewed")}
          </h2>
          {recentScholarships.length === 0 ? (
            <p className="text-muted-foreground text-sm">No recently viewed scholarships.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentScholarships.map((s) => <MiniCard key={s.id} s={s} />)}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
