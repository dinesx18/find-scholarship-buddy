import { useState } from "react";
import { StudentProfile } from "@/lib/scholarshipMatcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Search } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

interface Props {
  onSearch: (profile: StudentProfile) => void;
}

export default function ManualForm({ onSearch }: Props) {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<StudentProfile>({});
  const [extra, setExtra] = useState({
    marks: "",
    cgpa: "",
    yearOfStudy: "",
    incomeCertificate: false,
    bplStatus: false,
    minorityStatus: "",
    disabilityStatus: false,
    preferredCountry: "",
    fieldOfInterest: "",
    careerGoal: "",
    sportsQuota: false,
    achievements: "",
    aadhaarAvailable: false,
    incomeCertAvailable: false,
    casteCertAvailable: false,
    marksheetAvailable: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(profile);
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-heading font-semibold text-foreground text-sm border-b border-border pb-2 mb-3 mt-6 first:mt-0">{children}</h3>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-2 animate-fade-in-up">
      {/* Section 1: Basic Info */}
      <SectionTitle>{t("basicInfo")}</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" placeholder={t("name")} value={profile.name || ""} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>{t("gender")}</Label>
          <Select value={profile.gender} onValueChange={(v) => setProfile({ ...profile, gender: v as StudentProfile["gender"] })}>
            <SelectTrigger><SelectValue placeholder={t("selectGender")} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("stateLocation")}</Label>
          <Select value={profile.state} onValueChange={(v) => setProfile({ ...profile, state: v })}>
            <SelectTrigger><SelectValue placeholder={t("selectState")} /></SelectTrigger>
            <SelectContent>
              {states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("category")}</Label>
          <Select value={profile.category} onValueChange={(v) => setProfile({ ...profile, category: v as StudentProfile["category"] })}>
            <SelectTrigger><SelectValue placeholder={t("selectCategory")} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="OBC">OBC</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="ST">ST</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Section 2: Academic Details */}
      <SectionTitle>{t("academicDetails")}</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t("educationLevel")}</Label>
          <Select value={profile.educationLevel} onValueChange={(v) => setProfile({ ...profile, educationLevel: v as StudentProfile["educationLevel"] })}>
            <SelectTrigger><SelectValue placeholder={t("selectLevel")} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="School">School (up to 12th)</SelectItem>
              <SelectItem value="UG">Undergraduate (UG)</SelectItem>
              <SelectItem value="PG">Postgraduate (PG)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("courseStream")}</Label>
          <Select value={profile.course} onValueChange={(v) => setProfile({ ...profile, course: v })}>
            <SelectTrigger><SelectValue placeholder={t("selectCourse")} /></SelectTrigger>
            <SelectContent>
              {["Engineering", "Science", "Commerce", "Arts", "Medical", "Management", "Law", "Technology"].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("marks")}</Label>
          <Input type="number" placeholder="0-100" min={0} max={100} value={extra.marks} onChange={(e) => setExtra({ ...extra, marks: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>{t("cgpa")}</Label>
          <Input type="number" placeholder="0-10" min={0} max={10} step={0.1} value={extra.cgpa} onChange={(e) => setExtra({ ...extra, cgpa: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>{t("yearOfStudy")}</Label>
          <Select value={extra.yearOfStudy} onValueChange={(v) => setExtra({ ...extra, yearOfStudy: v })}>
            <SelectTrigger><SelectValue placeholder={t("select")} /></SelectTrigger>
            <SelectContent>
              {["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"].map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Section 3: Financial & Category */}
      <SectionTitle>{t("financialCategory")}</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t("familyIncome")}</Label>
          <Select value={profile.income?.toString()} onValueChange={(v) => setProfile({ ...profile, income: parseFloat(v) })}>
            <SelectTrigger><SelectValue placeholder={t("selectRange")} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Below ₹1 Lakh</SelectItem>
              <SelectItem value="2">Below ₹2 Lakh</SelectItem>
              <SelectItem value="3">Below ₹3 Lakh</SelectItem>
              <SelectItem value="5">Below ₹5 Lakh</SelectItem>
              <SelectItem value="8">Below ₹8 Lakh</SelectItem>
              <SelectItem value="15">Above ₹8 Lakh</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("minorityStatus")}</Label>
          <Select value={extra.minorityStatus} onValueChange={(v) => setExtra({ ...extra, minorityStatus: v })}>
            <SelectTrigger><SelectValue placeholder={t("select")} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Muslim">Muslim</SelectItem>
              <SelectItem value="Christian">Christian</SelectItem>
              <SelectItem value="Sikh">Sikh</SelectItem>
              <SelectItem value="Buddhist">Buddhist</SelectItem>
              <SelectItem value="Jain">Jain</SelectItem>
              <SelectItem value="Parsi">Parsi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between p-3 rounded-md border border-input">
          <Label className="text-sm">{t("incomeCertificate")}</Label>
          <Switch checked={extra.incomeCertificate} onCheckedChange={(v) => setExtra({ ...extra, incomeCertificate: v })} />
        </div>
        <div className="flex items-center justify-between p-3 rounded-md border border-input">
          <Label className="text-sm">{t("bplStatus")}</Label>
          <Switch checked={extra.bplStatus} onCheckedChange={(v) => setExtra({ ...extra, bplStatus: v })} />
        </div>
        <div className="flex items-center justify-between p-3 rounded-md border border-input">
          <Label className="text-sm">{t("disabilityStatus")}</Label>
          <Switch checked={extra.disabilityStatus} onCheckedChange={(v) => setExtra({ ...extra, disabilityStatus: v })} />
        </div>
      </div>

      {/* Section 4: Preferences */}
      <SectionTitle>{t("preferences")}</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t("preferredCountry")}</Label>
          <Select value={extra.preferredCountry} onValueChange={(v) => setExtra({ ...extra, preferredCountry: v })}>
            <SelectTrigger><SelectValue placeholder={t("select")} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="India">{t("india")}</SelectItem>
              <SelectItem value="Abroad">{t("abroad")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("fieldOfInterest")}</Label>
          <Select value={extra.fieldOfInterest} onValueChange={(v) => setExtra({ ...extra, fieldOfInterest: v })}>
            <SelectTrigger><SelectValue placeholder={t("select")} /></SelectTrigger>
            <SelectContent>
              {["Engineering", "Medical", "Science", "Commerce", "Arts", "Law", "Management", "Technology", "Research"].map((f) => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>{t("careerGoal")}</Label>
          <Input placeholder={t("careerGoal")} value={extra.careerGoal} onChange={(e) => setExtra({ ...extra, careerGoal: e.target.value })} />
        </div>
      </div>

      {/* Section 5: Additional Info */}
      <SectionTitle>{t("additionalInfo")}</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-3 rounded-md border border-input">
          <Label className="text-sm">{t("sportsQuota")}</Label>
          <Switch checked={extra.sportsQuota} onCheckedChange={(v) => setExtra({ ...extra, sportsQuota: v })} />
        </div>
        <div className="space-y-2">
          <Label>{t("achievements")}</Label>
          <Input placeholder={t("achievements")} value={extra.achievements} onChange={(e) => setExtra({ ...extra, achievements: e.target.value })} />
        </div>
      </div>

      {/* Section 6: Documents */}
      <SectionTitle>{t("documents")}</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key: "aadhaarAvailable" as const, label: t("aadhaarAvailable") },
          { key: "incomeCertAvailable" as const, label: t("incomeCertAvailable") },
          { key: "casteCertAvailable" as const, label: t("casteCertAvailable") },
          { key: "marksheetAvailable" as const, label: t("marksheetAvailable") },
        ].map((doc) => (
          <div key={doc.key} className="flex items-center justify-between p-3 rounded-md border border-input">
            <Label className="text-xs leading-tight">{doc.label}</Label>
            <Switch checked={extra[doc.key]} onCheckedChange={(v) => setExtra({ ...extra, [doc.key]: v })} />
          </div>
        ))}
      </div>

      <Button type="submit" size="lg" className="w-full gradient-primary text-primary-foreground border-0 hover:opacity-90 font-semibold mt-6">
        <Search className="h-4 w-4 mr-2" /> {t("findScholarships")}
      </Button>
    </form>
  );
}
