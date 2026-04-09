export interface Scholarship {
  id: string;
  name: string;
  description: string;
  eligibility: {
    educationLevels: ("School" | "UG" | "PG")[];
    courses?: string[];
    maxIncome?: number; // in lakhs
    categories?: ("General" | "OBC" | "SC" | "ST")[];
    gender?: "Male" | "Female";
    states?: string[];
  };
  benefits: string;
  deadline: string;
  applyLink: string;
}

export const scholarships: Scholarship[] = [
  {
    id: "1",
    name: "National Merit Scholarship",
    description: "Merit-based scholarship for top-performing undergraduate students across India.",
    eligibility: { educationLevels: ["UG"], maxIncome: 8, categories: ["General", "OBC", "SC", "ST"] },
    benefits: "₹50,000 per year",
    deadline: "2026-08-31",
    applyLink: "https://scholarships.gov.in",
  },
  {
    id: "2",
    name: "Post-Matric Scholarship for SC/ST",
    description: "Government scholarship for SC/ST students pursuing post-matriculation studies.",
    eligibility: { educationLevels: ["UG", "PG"], maxIncome: 2.5, categories: ["SC", "ST"] },
    benefits: "Full tuition + ₹1,500/month stipend",
    deadline: "2026-10-15",
    applyLink: "https://scholarships.gov.in",
  },
  {
    id: "3",
    name: "INSPIRE Scholarship",
    description: "For students pursuing natural and basic sciences at the undergraduate level.",
    eligibility: { educationLevels: ["UG"], courses: ["Science", "Physics", "Chemistry", "Biology", "Mathematics"] },
    benefits: "₹80,000 per year",
    deadline: "2026-09-30",
    applyLink: "https://online-inspire.gov.in",
  },
  {
    id: "4",
    name: "Pragati Scholarship for Girls",
    description: "AICTE scholarship for girl students in technical education.",
    eligibility: { educationLevels: ["UG"], courses: ["Engineering", "Technology"], maxIncome: 8, gender: "Female" },
    benefits: "₹50,000 per year + ₹2,000/month",
    deadline: "2026-11-30",
    applyLink: "https://aicte-pragati.gov.in",
  },
  {
    id: "5",
    name: "Central Sector Scheme of Scholarships",
    description: "For college and university students based on 12th board exam performance.",
    eligibility: { educationLevels: ["UG", "PG"], maxIncome: 4.5, categories: ["General", "OBC", "SC", "ST"] },
    benefits: "₹20,000/year (UG), ₹36,000/year (PG)",
    deadline: "2026-12-31",
    applyLink: "https://scholarships.gov.in",
  },
  {
    id: "6",
    name: "Tamil Nadu Government Scholarship",
    description: "State scholarship for economically weaker students from Tamil Nadu.",
    eligibility: { educationLevels: ["UG", "PG"], maxIncome: 2, states: ["Tamil Nadu"], categories: ["General", "OBC", "SC", "ST"] },
    benefits: "₹10,000 – ₹20,000 per year",
    deadline: "2026-07-31",
    applyLink: "https://tn.gov.in/scholarships",
  },
  {
    id: "7",
    name: "Maharashtra Minority Scholarship",
    description: "For minority community students in Maharashtra pursuing higher education.",
    eligibility: { educationLevels: ["UG", "PG"], maxIncome: 2, states: ["Maharashtra"] },
    benefits: "Full tuition fees",
    deadline: "2026-09-15",
    applyLink: "https://mahadbt.maharashtra.gov.in",
  },
  {
    id: "8",
    name: "AICTE Saksham Scholarship",
    description: "For differently-abled students pursuing technical education.",
    eligibility: { educationLevels: ["UG", "PG"], courses: ["Engineering", "Technology", "Management"], maxIncome: 8 },
    benefits: "₹50,000 per year",
    deadline: "2026-10-31",
    applyLink: "https://aicte-india.org",
  },
  {
    id: "9",
    name: "Begum Hazrat Mahal National Scholarship",
    description: "For meritorious girls from minority communities studying in classes 9-12.",
    eligibility: { educationLevels: ["School"], maxIncome: 2, gender: "Female" },
    benefits: "₹5,000 – ₹6,000 per year",
    deadline: "2026-09-30",
    applyLink: "https://bhmnsmaef.org",
  },
  {
    id: "10",
    name: "Kishore Vaigyanik Protsahan Yojana (KVPY)",
    description: "Fellowship for students interested in pursuing research in basic sciences.",
    eligibility: { educationLevels: ["School", "UG"], courses: ["Science", "Physics", "Chemistry", "Biology", "Mathematics"] },
    benefits: "₹5,000 – ₹7,000/month + contingency grant",
    deadline: "2026-08-20",
    applyLink: "https://kvpy.iisc.ac.in",
  },
  {
    id: "11",
    name: "Rajasthan Ambedkar Scholarship",
    description: "For SC/ST students from Rajasthan pursuing postgraduate education.",
    eligibility: { educationLevels: ["PG"], categories: ["SC", "ST"], states: ["Rajasthan"], maxIncome: 3 },
    benefits: "₹15,000 per year",
    deadline: "2026-07-15",
    applyLink: "https://sje.rajasthan.gov.in",
  },
  {
    id: "12",
    name: "OBC Pre-Matric Scholarship",
    description: "Pre-matric scholarship for OBC students with low family income.",
    eligibility: { educationLevels: ["School"], categories: ["OBC"], maxIncome: 1.5 },
    benefits: "₹3,000 per year + book allowance",
    deadline: "2026-11-15",
    applyLink: "https://scholarships.gov.in",
  },
  {
    id: "13",
    name: "Tata Trusts Scholarship",
    description: "Need-based scholarship for students from economically weaker sections.",
    eligibility: { educationLevels: ["UG", "PG"], maxIncome: 4, categories: ["General", "OBC", "SC", "ST"] },
    benefits: "Up to ₹1,50,000 per year",
    deadline: "2026-03-31",
    applyLink: "https://tatatrusts.org",
  },
  {
    id: "14",
    name: "Karnataka State Engineering Scholarship",
    description: "For engineering students domiciled in Karnataka.",
    eligibility: { educationLevels: ["UG"], courses: ["Engineering"], states: ["Karnataka"], maxIncome: 5 },
    benefits: "₹30,000 per year",
    deadline: "2026-08-31",
    applyLink: "https://kea.kar.nic.in",
  },
  {
    id: "15",
    name: "UP State Scholarship",
    description: "For students from Uttar Pradesh in pre and post matric studies.",
    eligibility: { educationLevels: ["School", "UG", "PG"], states: ["Uttar Pradesh"], maxIncome: 3, categories: ["General", "OBC", "SC", "ST"] },
    benefits: "₹5,000 – ₹25,000 per year",
    deadline: "2026-09-30",
    applyLink: "https://scholarship.up.gov.in",
  },
  {
    id: "16",
    name: "GATE Scholarship for PG",
    description: "Stipend for GATE-qualified students pursuing M.Tech / M.E.",
    eligibility: { educationLevels: ["PG"], courses: ["Engineering", "Technology"] },
    benefits: "₹12,400/month",
    deadline: "2026-06-30",
    applyLink: "https://gate.iitb.ac.in",
  },
  {
    id: "17",
    name: "Maulana Azad National Fellowship",
    description: "Fellowship for minority students pursuing M.Phil / Ph.D.",
    eligibility: { educationLevels: ["PG"], maxIncome: 6 },
    benefits: "₹31,000/month (JRF) + contingency",
    deadline: "2026-04-30",
    applyLink: "https://ugc.ac.in",
  },
  {
    id: "18",
    name: "Kerala State Merit Scholarship",
    description: "For meritorious students from Kerala pursuing UG/PG education.",
    eligibility: { educationLevels: ["UG", "PG"], states: ["Kerala"], maxIncome: 4 },
    benefits: "₹10,000 – ₹15,000 per year",
    deadline: "2026-10-31",
    applyLink: "https://dcescholarship.kerala.gov.in",
  },
  {
    id: "19",
    name: "L'Oréal India Women in Science",
    description: "For young women scientists pursuing postdoctoral research in India.",
    eligibility: { educationLevels: ["PG"], gender: "Female", courses: ["Science", "Biology", "Chemistry", "Physics"] },
    benefits: "₹25,00,000 research grant",
    deadline: "2026-05-31",
    applyLink: "https://loreal.com/en/india",
  },
  {
    id: "20",
    name: "AP Jagananna Vidya Deevena",
    description: "Complete fee reimbursement for students from Andhra Pradesh.",
    eligibility: { educationLevels: ["UG", "PG"], states: ["Andhra Pradesh"], maxIncome: 2.5, categories: ["General", "OBC", "SC", "ST"] },
    benefits: "Full fee reimbursement",
    deadline: "2026-12-31",
    applyLink: "https://jnanabhumi.ap.gov.in",
  },
];
