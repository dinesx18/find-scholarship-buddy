import { MatchedScholarship } from "@/lib/scholarshipMatcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Calendar, CheckCircle2, Bookmark } from "lucide-react";

function getMatchLabel(percentage: number) {
  if (percentage >= 85) return { text: "Highly Matched", class: "bg-accent text-accent-foreground" };
  if (percentage >= 60) return { text: "Good Match", class: "gradient-primary text-primary-foreground" };
  return { text: "Partial Match", class: "bg-muted text-muted-foreground" };
}

interface Props {
  scholarship: MatchedScholarship;
  index: number;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export default function ScholarshipCard({ scholarship, index, isSaved, onToggleSave }: Props) {
  const label = getMatchLabel(scholarship.matchPercentage);

  return (
    <div
      className="group rounded-lg border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 relative"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {onToggleSave && (
        <button
          onClick={onToggleSave}
          className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-muted transition-colors"
          title={isSaved ? "Remove from saved" : "Save scholarship"}
        >
          <Bookmark className={`h-5 w-5 transition-colors ${isSaved ? "fill-primary text-primary" : "text-muted-foreground"}`} />
        </button>
      )}

      <div className="flex items-start justify-between gap-3 mb-3 pr-8">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-heading text-lg font-semibold text-card-foreground leading-tight">{scholarship.name}</h3>
        </div>
        <Badge className={`${label.class} shrink-0 text-xs font-medium`}>{label.text}</Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{scholarship.description}</p>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Match Score</span>
          <span className="font-semibold text-card-foreground">{scholarship.matchPercentage}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full gradient-primary transition-all duration-700"
            style={{ width: `${scholarship.matchPercentage}%` }}
          />
        </div>
      </div>

      {scholarship.matchReasons.length > 0 && (
        <div className="mb-4 space-y-1">
          {scholarship.matchReasons.slice(0, 3).map((reason, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="font-medium text-card-foreground">{scholarship.benefits}</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(scholarship.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>
        <Button size="sm" asChild className="gradient-primary text-primary-foreground border-0 hover:opacity-90">
          <a href={scholarship.applyLink} target="_blank" rel="noopener noreferrer">
            Apply <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}
