import { Scholarship, scholarships } from "@/data/scholarships";

export interface StudentProfile {
  name?: string;
  educationLevel?: "School" | "UG" | "PG";
  course?: string;
  state?: string;
  income?: number; // in lakhs
  category?: "General" | "OBC" | "SC" | "ST";
  gender?: "Male" | "Female";
}

export interface MatchedScholarship extends Scholarship {
  matchPercentage: number;
  matchReasons: string[];
}

export function matchScholarships(profile: StudentProfile): MatchedScholarship[] {
  return scholarships
    .map((s) => {
      let score = 0;
      let total = 0;
      const reasons: string[] = [];

      // Education level
      if (profile.educationLevel) {
        total += 30;
        if (s.eligibility.educationLevels.includes(profile.educationLevel)) {
          score += 30;
          reasons.push(`Matches your education level (${profile.educationLevel})`);
        }
      }

      // Course
      if (profile.course && s.eligibility.courses?.length) {
        total += 20;
        const courseLower = profile.course.toLowerCase();
        if (s.eligibility.courses.some((c) => c.toLowerCase().includes(courseLower) || courseLower.includes(c.toLowerCase()))) {
          score += 20;
          reasons.push(`Matches your course (${profile.course})`);
        }
      } else if (!s.eligibility.courses?.length && profile.course) {
        // Open to all courses
        total += 20;
        score += 15;
        reasons.push("Open to all courses");
      }

      // Income
      if (profile.income !== undefined && s.eligibility.maxIncome) {
        total += 20;
        if (profile.income <= s.eligibility.maxIncome) {
          score += 20;
          reasons.push(`Within income limit (≤ ₹${s.eligibility.maxIncome}L)`);
        }
      } else if (!s.eligibility.maxIncome && profile.income !== undefined) {
        total += 20;
        score += 15;
        reasons.push("No income restriction");
      }

      // Category
      if (profile.category && s.eligibility.categories?.length) {
        total += 15;
        if (s.eligibility.categories.includes(profile.category)) {
          score += 15;
          reasons.push(`Eligible for ${profile.category} category`);
        }
      } else if (!s.eligibility.categories?.length && profile.category) {
        total += 15;
        score += 10;
        reasons.push("Open to all categories");
      }

      // State
      if (profile.state && s.eligibility.states?.length) {
        total += 10;
        const stateLower = profile.state.toLowerCase();
        if (s.eligibility.states.some((st) => st.toLowerCase().includes(stateLower) || stateLower.includes(st.toLowerCase()))) {
          score += 10;
          reasons.push(`Available in ${profile.state}`);
        }
      } else if (!s.eligibility.states?.length && profile.state) {
        total += 10;
        score += 8;
        reasons.push("Available nationwide");
      }

      // Gender
      if (profile.gender && s.eligibility.gender) {
        total += 5;
        if (s.eligibility.gender === profile.gender) {
          score += 5;
          reasons.push(`For ${profile.gender} students`);
        }
      } else if (!s.eligibility.gender) {
        if (profile.gender) {
          total += 5;
          score += 4;
        }
      }

      const matchPercentage = total > 0 ? Math.round((score / total) * 100) : 0;
      return { ...s, matchPercentage, matchReasons: reasons };
    })
    .filter((s) => s.matchPercentage > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}
