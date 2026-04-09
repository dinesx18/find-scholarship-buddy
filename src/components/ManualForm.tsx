import { useState } from "react";
import { StudentProfile } from "@/lib/scholarshipMatcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

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
  const [profile, setProfile] = useState<StudentProfile>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name (optional)</Label>
          <Input id="name" placeholder="Your name" value={profile.name || ""} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Education Level</Label>
          <Select value={profile.educationLevel} onValueChange={(v) => setProfile({ ...profile, educationLevel: v as StudentProfile["educationLevel"] })}>
            <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="School">School (up to 12th)</SelectItem>
              <SelectItem value="UG">Undergraduate (UG)</SelectItem>
              <SelectItem value="PG">Postgraduate (PG)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="course">Course / Stream</Label>
          <Select value={profile.course} onValueChange={(v) => setProfile({ ...profile, course: v })}>
            <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
            <SelectContent>
              {["Engineering", "Science", "Commerce", "Arts", "Medical", "Management", "Law", "Technology"].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>State / Location</Label>
          <Select value={profile.state} onValueChange={(v) => setProfile({ ...profile, state: v })}>
            <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
            <SelectContent>
              {states.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Family Income (per year)</Label>
          <Select value={profile.income?.toString()} onValueChange={(v) => setProfile({ ...profile, income: parseFloat(v) })}>
            <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
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
          <Label>Category</Label>
          <Select value={profile.category} onValueChange={(v) => setProfile({ ...profile, category: v as StudentProfile["category"] })}>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="OBC">OBC</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="ST">ST</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Gender (optional)</Label>
          <Select value={profile.gender} onValueChange={(v) => setProfile({ ...profile, gender: v as StudentProfile["gender"] })}>
            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full gradient-primary text-primary-foreground border-0 hover:opacity-90 font-semibold">
        <Search className="h-4 w-4 mr-2" /> Find Scholarships
      </Button>
    </form>
  );
}
