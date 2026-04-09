import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, ExternalLink, Calendar, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { scholarships } from "@/data/scholarships";
import { useSavedScholarships } from "@/hooks/useSavedScholarships";
import { Badge } from "@/components/ui/badge";

export default function SavedScholarships() {
  const navigate = useNavigate();
  const { savedIds, toggleSave } = useSavedScholarships();
  const saved = scholarships.filter((s) => savedIds.includes(s.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container max-w-3xl py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold text-lg text-foreground">Saved Scholarships</span>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl py-8 px-4">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bookmark className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg font-medium">No saved scholarships yet</p>
            <p className="text-muted-foreground text-sm mt-1">Bookmark scholarships from search results to see them here.</p>
            <Button className="mt-4" variant="outline" onClick={() => navigate("/")}>Find Scholarships</Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {saved.map((s) => (
              <div key={s.id} className="rounded-lg border border-border bg-card p-5 shadow-card relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 text-primary"
                  onClick={() => toggleSave(s.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <h3 className="font-heading text-lg font-semibold text-card-foreground pr-10">{s.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-3">{s.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {s.eligibility.educationLevels.map((e) => (
                    <Badge key={e} variant="secondary" className="text-xs">{e}</Badge>
                  ))}
                  {s.eligibility.categories?.map((c) => (
                    <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-medium text-card-foreground">{s.benefits}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(s.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <Button size="sm" asChild className="gradient-primary text-primary-foreground border-0">
                    <a href={s.applyLink} target="_blank" rel="noopener noreferrer">
                      Apply <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
