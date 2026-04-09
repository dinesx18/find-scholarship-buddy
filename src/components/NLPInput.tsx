import { useState } from "react";
import { StudentProfile } from "@/lib/scholarshipMatcher";
import { parseNaturalLanguage } from "@/lib/nlpParser";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  onSearch: (profile: StudentProfile) => void;
}

export default function NLPInput({ onSearch }: Props) {
  const [text, setText] = useState("");
  const [parsedProfile, setParsedProfile] = useState<StudentProfile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const profile = parseNaturalLanguage(text);
      setParsedProfile(profile);
      setIsProcessing(false);
      setEditing(false);
    }, 1200);
  };

  const handleSearch = () => {
    if (parsedProfile) onSearch(parsedProfile);
  };

  const profileFields = parsedProfile ? [
    { label: "Education", value: parsedProfile.educationLevel },
    { label: "Course", value: parsedProfile.course },
    { label: "State", value: parsedProfile.state },
    { label: "Income", value: parsedProfile.income ? `≤ ₹${parsedProfile.income}L` : undefined },
    { label: "Category", value: parsedProfile.category },
    { label: "Gender", value: parsedProfile.gender },
  ].filter((f) => f.value) : [];

  return (
    <div className="space-y-5 animate-fade-in-up">
      <div className="space-y-2">
        <Textarea
          placeholder="Example: I am a 2nd year engineering student from Tamil Nadu, my family income is below 2 lakh, I belong to OBC category"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="resize-none text-base"
        />
        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || isProcessing}
          size="lg"
          className="w-full gradient-primary text-primary-foreground border-0 hover:opacity-90 font-semibold"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" /> Analyze & Find Scholarships
            </>
          )}
        </Button>
      </div>

      {parsedProfile && (
        <div className="rounded-lg border border-border bg-card p-5 space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-card-foreground">Detected Profile</h3>
            <Button variant="ghost" size="sm" onClick={() => setEditing(!editing)}>
              <Pencil className="h-3.5 w-3.5 mr-1" /> {editing ? "Done" : "Edit"}
            </Button>
          </div>

          {!editing ? (
            <div className="flex flex-wrap gap-2">
              {profileFields.map((f) => (
                <Badge key={f.label} variant="secondary" className="text-sm py-1 px-3">
                  {f.label}: {f.value}
                </Badge>
              ))}
              {profileFields.length === 0 && (
                <p className="text-sm text-muted-foreground">Could not detect details. Try adding more info or edit manually.</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Education Level</Label>
                <Select value={parsedProfile.educationLevel} onValueChange={(v) => setParsedProfile({ ...parsedProfile, educationLevel: v as StudentProfile["educationLevel"] })}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="School">School</SelectItem>
                    <SelectItem value="UG">UG</SelectItem>
                    <SelectItem value="PG">PG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Course</Label>
                <Input className="h-9" value={parsedProfile.course || ""} onChange={(e) => setParsedProfile({ ...parsedProfile, course: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">State</Label>
                <Input className="h-9" value={parsedProfile.state || ""} onChange={(e) => setParsedProfile({ ...parsedProfile, state: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Income (in Lakhs)</Label>
                <Input className="h-9" type="number" value={parsedProfile.income || ""} onChange={(e) => setParsedProfile({ ...parsedProfile, income: parseFloat(e.target.value) || undefined })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Category</Label>
                <Select value={parsedProfile.category} onValueChange={(v) => setParsedProfile({ ...parsedProfile, category: v as StudentProfile["category"] })}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="OBC">OBC</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="ST">ST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Gender</Label>
                <Select value={parsedProfile.gender} onValueChange={(v) => setParsedProfile({ ...parsedProfile, gender: v as StudentProfile["gender"] })}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <Button onClick={handleSearch} size="lg" className="w-full gradient-accent text-accent-foreground border-0 hover:opacity-90 font-semibold">
            Find Matching Scholarships
          </Button>
        </div>
      )}
    </div>
  );
}
