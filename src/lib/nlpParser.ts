import { StudentProfile } from "./scholarshipMatcher";

const educationPatterns: { pattern: RegExp; level: "School" | "UG" | "PG" }[] = [
  { pattern: /\b(school|class\s*\d|10th|12th|high school|secondary|matric)\b/i, level: "School" },
  { pattern: /\b(ug|undergraduate|under graduate|b\.?tech|b\.?e|b\.?sc|b\.?com|b\.?a|bachelor|1st year|2nd year|3rd year|4th year|college)\b/i, level: "UG" },
  { pattern: /\b(pg|postgraduate|post graduate|m\.?tech|m\.?e|m\.?sc|m\.?com|m\.?a|master|mba|m\.?phil|phd|ph\.d|doctorate)\b/i, level: "PG" },
];

const coursePatterns: { pattern: RegExp; course: string }[] = [
  { pattern: /\b(engineering|b\.?tech|m\.?tech|b\.?e|m\.?e|technical)\b/i, course: "Engineering" },
  { pattern: /\b(science|b\.?sc|m\.?sc|physics|chemistry|biology|mathematics|math)\b/i, course: "Science" },
  { pattern: /\b(commerce|b\.?com|m\.?com|accounting|finance)\b/i, course: "Commerce" },
  { pattern: /\b(arts|b\.?a|m\.?a|humanities|literature|history)\b/i, course: "Arts" },
  { pattern: /\b(management|mba|business)\b/i, course: "Management" },
  { pattern: /\b(medical|mbbs|medicine|doctor)\b/i, course: "Medical" },
  { pattern: /\b(law|llb|legal)\b/i, course: "Law" },
  { pattern: /\b(technology)\b/i, course: "Technology" },
];

const statePatterns: string[] = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir",
];

const categoryPatterns: { pattern: RegExp; category: "General" | "OBC" | "SC" | "ST" }[] = [
  { pattern: /\b(general|gen|unreserved)\b/i, category: "General" },
  { pattern: /\b(obc|other backward class)\b/i, category: "OBC" },
  { pattern: /\b(sc|scheduled caste)\b/i, category: "SC" },
  { pattern: /\b(st|scheduled tribe)\b/i, category: "ST" },
];

export function parseNaturalLanguage(input: string): StudentProfile {
  const profile: StudentProfile = {};

  // Education level
  for (const { pattern, level } of educationPatterns) {
    if (pattern.test(input)) {
      profile.educationLevel = level;
      break;
    }
  }

  // Course
  for (const { pattern, course } of coursePatterns) {
    if (pattern.test(input)) {
      profile.course = course;
      break;
    }
  }

  // State
  for (const state of statePatterns) {
    if (input.toLowerCase().includes(state.toLowerCase())) {
      profile.state = state;
      break;
    }
  }

  // Income - parse patterns like "2 lakh", "2L", "below 2 lakh", "200000"
  const incomeMatch = input.match(/(?:below|under|less than|income\s*(?:is|of)?\s*)?\s*(?:₹?\s*)?(\d+(?:\.\d+)?)\s*(?:lakh|lac|l\b|lakhs)/i);
  if (incomeMatch) {
    profile.income = parseFloat(incomeMatch[1]);
  } else {
    const incomeMatch2 = input.match(/(?:income|family income|annual income)\s*(?:is|of|around|about)?\s*(?:₹?\s*)?(\d+)/i);
    if (incomeMatch2) {
      const val = parseInt(incomeMatch2[1]);
      if (val > 10000) profile.income = val / 100000; // Convert to lakhs
    }
  }

  // Category
  for (const { pattern, category } of categoryPatterns) {
    if (pattern.test(input)) {
      profile.category = category;
      break;
    }
  }

  // Gender
  if (/\b(female|girl|woman|women)\b/i.test(input)) {
    profile.gender = "Female";
  } else if (/\b(male|boy|man|men)\b/i.test(input)) {
    profile.gender = "Male";
  }

  return profile;
}
