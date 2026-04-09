import { useState } from "react";
import { StudentProfile, MatchedScholarship, matchScholarships } from "@/lib/scholarshipMatcher";
import ManualForm from "@/components/ManualForm";
import NLPInput from "@/components/NLPInput";
import ScholarshipCard from "@/components/ScholarshipCard";
import { GraduationCap, FileText, Sparkles, ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

type Mode = "home" | "manual" | "nlp";

export default function Index() {
  const [mode, setMode] = useState<Mode>("home");
  const [results, setResults] = useState<MatchedScholarship[] | null>(null);

  const handleSearch = (profile: StudentProfile) => {
    const matched = matchScholarships(profile);
    setResults(matched);
  };

  const resetToHome = () => {
    setMode("home");
    setResults(null);
  };

  if (results) {
    const highMatches = results.filter((r) => r.matchPercentage >= 60);
    const otherMatches = results.filter((r) => r.matchPercentage < 60);

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container max-w-5xl py-4 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={resetToHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-lg text-foreground">Smart Scholarship Finder</span>
            </div>
          </div>
        </header>

        <main className="container max-w-5xl py-8 px-4">
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {results.length > 0 ? `Found ${results.length} Scholarship${results.length > 1 ? "s" : ""}` : "No Scholarships Found"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {results.length > 0 ? "Sorted by match percentage" : "Try adjusting your criteria for better results."}
            </p>
          </div>

          {results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <SearchX className="h-16 w-16 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">No scholarships matched your profile.</p>
              <Button className="mt-4" variant="outline" onClick={resetToHome}>Try Again</Button>
            </div>
          )}

          {highMatches.length > 0 && (
            <div className="space-y-4 mb-8">
              <h2 className="font-heading text-lg font-semibold text-foreground">🎯 Best Matches</h2>
              <div className="grid gap-4">
                {highMatches.map((s, i) => (
                  <ScholarshipCard key={s.id} scholarship={s} index={i} />
                ))}
              </div>
            </div>
          )}

          {otherMatches.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                {highMatches.length > 0 ? "📋 Other Matches" : "📋 Closest Matches"}
              </h2>
              <div className="grid gap-4">
                {otherMatches.map((s, i) => (
                  <ScholarshipCard key={s.id} scholarship={s} index={i + highMatches.length} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  if (mode === "home") {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Hero */}
        <div className="gradient-hero text-primary-foreground flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-2xl mx-auto space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-4 py-1.5 text-sm backdrop-blur-sm bg-primary-foreground/5">
              <GraduationCap className="h-4 w-4" />
              Smart Scholarship Finder
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Find Scholarships Easily with{" "}
              <span className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent">AI</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-lg mx-auto">
              Discover scholarships that match your profile. Use our structured form or simply describe yourself in plain English.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => setMode("manual")}
                className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-semibold text-base px-8"
              >
                <FileText className="h-5 w-5 mr-2" /> Start with Form
              </Button>
              <Button
                size="lg"
                onClick={() => setMode("nlp")}
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8"
              >
                <Sparkles className="h-5 w-5 mr-2" /> Try AI Search
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-card py-16 px-4">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: "🎯", title: "Smart Matching", desc: "Get a match percentage for every scholarship based on your profile." },
                { icon: "🤖", title: "AI-Powered Input", desc: "Just type your situation in plain English — we'll understand." },
                { icon: "📊", title: "20+ Scholarships", desc: "Comprehensive database covering national and state-level schemes." },
              ].map((f) => (
                <div key={f.title} className="space-y-2">
                  <div className="text-3xl">{f.icon}</div>
                  <h3 className="font-heading font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Manual or NLP mode
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container max-w-2xl py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={resetToHome}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold text-lg text-foreground">Smart Scholarship Finder</span>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl py-8 px-4">
        {/* Toggle */}
        <div className="flex rounded-lg bg-muted p-1 mb-6">
          <button
            onClick={() => setMode("manual")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${mode === "manual" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            <FileText className="h-4 w-4" /> Form Mode
          </button>
          <button
            onClick={() => setMode("nlp")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${mode === "nlp" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Sparkles className="h-4 w-4" /> AI Mode
          </button>
        </div>

        {mode === "manual" ? <ManualForm onSearch={handleSearch} /> : <NLPInput onSearch={handleSearch} />}
      </main>
    </div>
  );
}
