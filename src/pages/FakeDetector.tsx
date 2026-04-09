import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ShieldCheck, ShieldAlert, ShieldX, Clock, HelpCircle, Loader2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { scholarships } from "@/data/scholarships";

type Result = {
  status: "real" | "fake" | "scam" | "expired" | "unknown";
  explanation: string;
  warnings?: string[];
};

const knownFakePatterns = [
  "guaranteed admission",
  "processing fee",
  "pay to apply",
  "100% guaranteed",
  "no eligibility required",
  "wire transfer",
  "western union",
  "lottery scholarship",
  "you have been selected",
  "unclaimed funds",
];

function checkScholarship(name: string): Result {
  const lower = name.toLowerCase().trim();

  if (!lower) {
    return { status: "unknown", explanation: "Please enter a scholarship name to check." };
  }

  // Check against our known real scholarships
  const match = scholarships.find(
    (s) =>
      s.name.toLowerCase().includes(lower) ||
      lower.includes(s.name.toLowerCase()) ||
      s.name.toLowerCase().split(" ").filter((w) => w.length > 3).some((w) => lower.includes(w))
  );

  if (match) {
    const deadline = new Date(match.deadline);
    if (deadline < new Date()) {
      return {
        status: "expired",
        explanation: `"${match.name}" is a real scholarship but its deadline (${deadline.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}) has passed.`,
      };
    }
    return {
      status: "real",
      explanation: `"${match.name}" is a verified, real scholarship. Benefits: ${match.benefits}. Deadline: ${new Date(match.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}.`,
    };
  }

  // Check for fake/scam patterns
  const detectedWarnings: string[] = [];
  for (const pattern of knownFakePatterns) {
    if (lower.includes(pattern)) {
      detectedWarnings.push(`Contains suspicious phrase: "${pattern}"`);
    }
  }

  if (detectedWarnings.length > 0) {
    return {
      status: "scam",
      explanation: `This scholarship name contains common scam indicators. Be very cautious.`,
      warnings: detectedWarnings,
    };
  }

  // Check for known government/reputable keywords
  const realIndicators = ["national", "government", "ugc", "aicte", "inspire", "kvpy", "gate", "state merit"];
  const hasRealIndicator = realIndicators.some((ind) => lower.includes(ind));

  if (hasRealIndicator) {
    return {
      status: "unknown",
      explanation: `This appears to reference a government/institutional scheme but we couldn't find an exact match in our verified database. Please verify directly on official portals like scholarships.gov.in.`,
    };
  }

  return {
    status: "unknown",
    explanation: `Unable to verify this scholarship. It was not found in our verified database. We recommend checking official government scholarship portals before applying.`,
    warnings: [
      "Not found in verified scholarship databases",
      "Always verify on official portals (scholarships.gov.in)",
      "Never pay fees to apply for a scholarship",
    ],
  };
}

const statusConfig = {
  real: { icon: ShieldCheck, color: "text-green-500", bg: "bg-green-500/10 border-green-500/30", label: "This scholarship is REAL" },
  fake: { icon: ShieldX, color: "text-red-500", bg: "bg-red-500/10 border-red-500/30", label: "This scholarship is FAKE" },
  scam: { icon: ShieldAlert, color: "text-red-600", bg: "bg-red-600/10 border-red-600/30", label: "This scholarship is a SCAM" },
  expired: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/30", label: "This scholarship has EXPIRED" },
  unknown: { icon: HelpCircle, color: "text-muted-foreground", bg: "bg-muted border-border", label: "Unable to verify this scholarship" },
};

export default function FakeDetector() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleCheck = () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    // Simulate search delay
    setTimeout(() => {
      setResult(checkScholarship(query));
      setLoading(false);
    }, 1500);
  };

  const cfg = result ? statusConfig[result.status] : null;
  const Icon = cfg?.icon;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container max-w-2xl py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold text-lg text-foreground">Fake Scholarship Detector</span>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">Fake Scholarship Detector</h1>
          <p className="text-muted-foreground text-sm">Enter a scholarship name to check if it's real, fake, or a scam.</p>
        </div>

        <div className="flex gap-3 mb-8">
          <Input
            placeholder="Enter scholarship name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            className="flex-1"
          />
          <Button onClick={handleCheck} disabled={loading || !query.trim()} className="gradient-primary text-primary-foreground border-0">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check Scholarship"}
          </Button>
        </div>

        {loading && (
          <div className="flex flex-col items-center py-12 text-center animate-pulse">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-3" />
            <p className="text-muted-foreground text-sm">Analyzing scholarship information...</p>
          </div>
        )}

        {result && cfg && Icon && (
          <div className={`rounded-lg border p-6 ${cfg.bg} animate-fade-in-up`}>
            <div className="flex items-center gap-3 mb-3">
              <Icon className={`h-8 w-8 ${cfg.color}`} />
              <h2 className="font-heading text-xl font-bold text-foreground">{cfg.label}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{result.explanation}</p>

            {result.warnings && result.warnings.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" /> Warning Signs
                </h3>
                {result.warnings.map((w, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
