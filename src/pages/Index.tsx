import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentProfile, MatchedScholarship, matchScholarships } from "@/lib/scholarshipMatcher";
import ManualForm from "@/components/ManualForm";
import NLPInput from "@/components/NLPInput";
import ScholarshipCard from "@/components/ScholarshipCard";
import SkeletonCard from "@/components/SkeletonCard";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Chatbot from "@/components/Chatbot";
import { GraduationCap, FileText, Sparkles, ArrowLeft, SearchX, ShieldCheck, Bookmark, LayoutDashboard, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSavedScholarships } from "@/hooks/useSavedScholarships";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useLanguage } from "@/i18n/LanguageContext";
import { scholarships } from "@/data/scholarships";
import { Calendar, ExternalLink } from "lucide-react";

type Mode = "home" | "manual" | "nlp";

const trendingIds = ["1", "3", "4", "5"];

export default function Index() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>("home");
  const [results, setResults] = useState<MatchedScholarship[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { savedIds, toggleSave, isSaved } = useSavedScholarships();
  const { addViewed } = useRecentlyViewed();

  const handleSearch = (profile: StudentProfile) => {
    setLoading(true);
    setTimeout(() => {
      const matched = matchScholarships(profile);
      setResults(matched);
      setLoading(false);
      matched.forEach((m) => addViewed(m.id));
    }, 1000);
  };

  const resetToHome = () => {
    setMode("home");
    setResults(null);
  };

  const trending = scholarships.filter((s) => trendingIds.includes(s.id));

  // Results view
  if (results && !loading) {
    const highMatches = results.filter((r) => r.matchPercentage >= 60);
    const otherMatches = results.filter((r) => r.matchPercentage < 60);

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container max-w-5xl py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={resetToHome}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="font-heading font-bold text-lg text-foreground">{t("appName")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm" onClick={() => navigate("/saved")} className="flex items-center gap-1.5">
                <Bookmark className="h-4 w-4" />
                {t("saved")} {savedIds.length > 0 && <span className="text-xs bg-primary text-primary-foreground rounded-full px-1.5">{savedIds.length}</span>}
              </Button>
            </div>
          </div>
        </header>

        <main className="container max-w-5xl py-8 px-4">
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {results.length > 0 ? `${t("found")} ${results.length} ${t("scholarships")}` : t("noScholarships")}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {results.length > 0 ? t("sortedByMatch") : t("tryAdjusting")}
            </p>
          </div>

          {results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <SearchX className="h-16 w-16 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">{t("noScholarships")}</p>
              <Button className="mt-4" variant="outline" onClick={resetToHome}>{t("tryAgain")}</Button>
            </div>
          )}

          {highMatches.length > 0 && (
            <div className="space-y-4 mb-8">
              <h2 className="font-heading text-lg font-semibold text-foreground">{t("bestMatches")}</h2>
              <div className="grid gap-4">
                {highMatches.map((s, i) => (
                  <ScholarshipCard key={s.id} scholarship={s} index={i} isSaved={isSaved(s.id)} onToggleSave={() => toggleSave(s.id)} />
                ))}
              </div>
            </div>
          )}

          {otherMatches.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                {highMatches.length > 0 ? t("otherMatches") : t("closestMatches")}
              </h2>
              <div className="grid gap-4">
                {otherMatches.map((s, i) => (
                  <ScholarshipCard key={s.id} scholarship={s} index={i + highMatches.length} isSaved={isSaved(s.id)} onToggleSave={() => toggleSave(s.id)} />
                ))}
              </div>
            </div>
          )}
        </main>
        <Chatbot />
      </div>
    );
  }

  // Home view
  if (mode === "home") {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Nav */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <LanguageSwitcher className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10" />
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 flex items-center gap-1.5">
            <LayoutDashboard className="h-4 w-4" />
            {t("dashboard")}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/saved")} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 flex items-center gap-1.5">
            <Bookmark className="h-4 w-4" />
            {t("saved")} {savedIds.length > 0 && <span className="text-xs bg-primary-foreground/20 rounded-full px-1.5">{savedIds.length}</span>}
          </Button>
        </div>

        {/* Hero */}
        <div className="gradient-hero text-primary-foreground flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-2xl mx-auto space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-4 py-1.5 text-sm backdrop-blur-sm bg-primary-foreground/5">
              <GraduationCap className="h-4 w-4" />
              {t("appName")}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {t("tagline")}{" "}
              <span className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent">{t("ai")}</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-lg mx-auto">
              {t("heroDesc")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => setMode("manual")}
                className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-semibold text-base px-8"
              >
                <FileText className="h-5 w-5 mr-2" /> {t("scholarshipFinder")}
              </Button>
              <Button
                size="lg"
                onClick={() => navigate("/fake-detector")}
                className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-semibold text-base px-8"
              >
                <ShieldCheck className="h-5 w-5 mr-2" /> {t("fakeDetector")}
              </Button>
            </div>
          </div>
        </div>

        {/* Trending Section */}
        <div className="bg-card py-12 px-4">
          <div className="container max-w-4xl">
            <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-8 flex items-center justify-center gap-2">
              <Flame className="h-6 w-6 text-destructive" /> {t("trendingScholarships")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {trending.map((s) => (
                <div key={s.id} className="rounded-lg border border-border bg-background p-4 shadow-card hover:shadow-card-hover transition-all">
                  <Badge variant="destructive" className="text-[10px] mb-2">{t("trending")}</Badge>
                  <h3 className="font-heading text-sm font-semibold text-foreground leading-tight mb-1">{s.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(s.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                    <Button size="sm" asChild className="gradient-primary text-primary-foreground border-0 h-7 text-xs px-3">
                      <a href={s.applyLink} target="_blank" rel="noopener noreferrer">
                        {t("apply")} <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-background py-16 px-4">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: "🎯", title: t("smartMatching"), desc: t("smartMatchingDesc") },
                { icon: "🤖", title: t("nlpPowered"), desc: t("nlpPoweredDesc") },
                { icon: "🛡️", title: t("scamDetection"), desc: t("scamDetectionDesc") },
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
        <Chatbot />
      </div>
    );
  }

  // Manual or NLP mode
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container max-w-2xl py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={resetToHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-lg text-foreground">{t("appName")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" onClick={() => navigate("/saved")} className="flex items-center gap-1.5">
              <Bookmark className="h-4 w-4" />
              {t("saved")}
            </Button>
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
            <FileText className="h-4 w-4" /> {t("formMode")}
          </button>
          <button
            onClick={() => setMode("nlp")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${mode === "nlp" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Sparkles className="h-4 w-4" /> {t("nlpMode")}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && (mode === "manual" ? <ManualForm onSearch={handleSearch} /> : <NLPInput onSearch={handleSearch} />)}
      </main>
      <Chatbot />
    </div>
  );
}
