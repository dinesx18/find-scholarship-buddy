import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageContext";

const mockResponses: Record<string, string> = {
  "scholarship": "There are many scholarships available! Try our Scholarship Finder to get personalized results based on your profile.",
  "eligibility": "Eligibility depends on your education level, income, category, and state. Use our form to check which scholarships you qualify for.",
  "deadline": "Scholarship deadlines vary. Most government scholarships have deadlines between July-December. Check individual scholarship pages for exact dates.",
  "apply": "To apply, find a matching scholarship using our finder, then click the 'Apply' button on the scholarship card to visit the official application portal.",
  "fake": "Use our Fake Scholarship Detector to verify any scholarship before applying. Never pay fees to apply for a scholarship!",
  "income": "Many scholarships have income limits ranging from ₹1 Lakh to ₹8 Lakh per year. Enter your family income in our form for accurate results.",
  "sc": "There are several scholarships specifically for SC/ST students, including Post-Matric Scholarship and Ambedkar Fellowship. Use our finder with your category.",
  "st": "There are several scholarships specifically for SC/ST students, including Post-Matric Scholarship and Ambedkar Fellowship. Use our finder with your category.",
  "obc": "OBC students can access various scholarships including Pre-Matric and Post-Matric schemes. Set your category in the form to find matches.",
  "engineering": "Engineering students have many options! AICTE Pragati, GATE Scholarship, and state-specific schemes are available. Try our finder!",
  "default": "I can help with scholarship-related questions! Try asking about eligibility, deadlines, how to apply, or specific categories like SC/ST/OBC scholarships.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(mockResponses)) {
    if (key !== "default" && lower.includes(key)) return response;
  }
  return mockResponses.default;
}

export default function Chatbot() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "" }, // placeholder for welcome
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(userMsg) }]);
    }, 800);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full gradient-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-all hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up" style={{ height: "28rem" }}>
          <div className="gradient-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
            <span className="font-heading font-semibold text-sm">{t("chatbotTitle")} 🎓</span>
            <button onClick={() => setOpen(false)} className="hover:bg-primary-foreground/20 rounded p-1">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "gradient-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {i === 0 && msg.role === "bot" ? t("chatbotWelcome") : msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t("chatbotPlaceholder")}
              className="flex-1 h-9 text-sm"
            />
            <Button size="icon" onClick={handleSend} className="gradient-primary text-primary-foreground border-0 h-9 w-9">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
