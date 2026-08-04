import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  Calculator,
  ArrowRight,
  RefreshCw,
  Star,
  TrendingUp,
  Heart,
  Brain,
  Briefcase,
  Zap,
  Shield,
  Flame,
} from "lucide-react";

// ============================================================
// Life Path Number Calculator
// Interactive mini-tool: user enters DOB → instant result
// ============================================================

interface LifePathInfo {
  number: number;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  traits: string[];
  icon: React.ReactNode;
  color: string;
}

const LIFE_PATH_DATA: Record<number, LifePathInfo> = {
  1: {
    number: 1,
    title: "The Leader",
    hindiTitle: "नेता",
    description:
      "You are a born leader with strong willpower and ambition. Independence and originality are your greatest strengths. You naturally inspire others and are meant to pioneer new paths.",
    hindiDescription:
      "आप एक जन्मजात नेता हैं, जिनमें दृढ़ इच्छाशक्ति और महत्वाकांक्षा है। स्वतंत्रता और मौलिकता आपकी सबसे बड़ी ताकत है।",
    traits: ["Leadership", "Independence", "Ambition", "Originality"],
    icon: <Flame className="w-8 h-8" />,
    color: "oklch(0.72 0.18 65)",
  },
  2: {
    number: 2,
    title: "The Diplomat",
    hindiTitle: "राजनयिक",
    description:
      "You are a natural peacemaker with deep intuition and sensitivity. Harmony, cooperation, and partnership define your path. You excel in relationships and bringing people together.",
    hindiDescription:
      "आप एक प्राकृतिक शांति स्थापक हैं, गहरी अंतर्ज्ञान और संवेदनशीलता के साथ। सामंजस्य, सहयोग और साझेदारी आपका मार्ग है।",
    traits: ["Harmony", "Intuition", "Cooperation", "Sensitivity"],
    icon: <Heart className="w-8 h-8" />,
    color: "oklch(0.68 0.14 55)",
  },
  3: {
    number: 3,
    title: "The Creative",
    hindiTitle: "रचनाकार",
    description:
      "You are a creative soul with natural charisma and communication skills. Self-expression, joy, and artistic talent are your gifts. You bring color and inspiration to the world.",
    hindiDescription:
      "आप एक रचनात्मक आत्मा हैं, प्राकृतिक करिश्मा और संचार कौशल के साथ। आत्म-अभिव्यक्ति और कलात्मक प्रतिभा आपके उपहार हैं।",
    traits: ["Creativity", "Communication", "Joy", "Charisma"],
    icon: <Sparkles className="w-8 h-8" />,
    color: "oklch(0.78 0.12 75)",
  },
  4: {
    number: 4,
    title: "The Builder",
    hindiTitle: "निर्माता",
    description:
      "You are the foundation-builder — practical, disciplined, and hardworking. Stability, order, and dedication are your hallmarks. You create lasting structures and value integrity.",
    hindiDescription:
      "आप आधार के निर्माता हैं — व्यावहारिक, अनुशासित और मेहनती। स्थिरता और समर्पण आपकी पहचान है।",
    traits: ["Stability", "Discipline", "Hard Work", "Reliability"],
    icon: <Shield className="w-8 h-8" />,
    color: "oklch(0.62 0.10 45)",
  },
  5: {
    number: 5,
    title: "The Freedom Seeker",
    hindiTitle: "स्वतंत्रता प्रेमी",
    description:
      "You are an adventurer who craves freedom and change. Versatility, curiosity, and adaptability define you. You thrive on new experiences and breaking boundaries.",
    hindiDescription:
      "आप एक रोमांचक हैं जो स्वतंत्रता और परिवर्तन चाहते हैं। बहुमुखी प्रतिभा और जिज्ञासा आपकी परिभाषा है।",
    traits: ["Freedom", "Adventure", "Versatility", "Curiosity"],
    icon: <Zap className="w-8 h-8" />,
    color: "oklch(0.72 0.18 65)",
  },
  6: {
    number: 6,
    title: "The Nurturer",
    hindiTitle: "पालन-पोषक",
    description:
      "You are the caretaker — loving, responsible, and compassionate. Family, harmony, and service to others are central to your life. You naturally heal and nurture those around you.",
    hindiDescription:
      "आप देखभाल करने वाले हैं — प्रेमपूर्ण, जिम्मेदार और दयालु। परिवार और सेवा आपके जीवन का केंद्र है।",
    traits: ["Love", "Responsibility", "Compassion", "Healing"],
    icon: <Heart className="w-8 h-8" />,
    color: "oklch(0.68 0.14 55)",
  },
  7: {
    number: 7,
    title: "The Seeker",
    hindiTitle: "ज्ञान आत्मा",
    description:
      "You are the mystic and truth-seeker. Analytical, spiritual, and introspective, you are drawn to the deeper mysteries of life. Wisdom and inner knowledge are your path.",
    hindiDescription:
      "आप रहस्यमय और सत्य की खोजी हैं। विश्लेषणात्मक, आध्यात्मिक और चिंतनशील — ज्ञान आपका मार्ग है।",
    traits: ["Wisdom", "Spirituality", "Analysis", "Introspection"],
    icon: <Brain className="w-8 h-8" />,
    color: "oklch(0.55 0.22 25)",
  },
  8: {
    number: 8,
    title: "The Powerhouse",
    hindiTitle: "सत्ता संपन्न",
    description:
      "You are destined for material success and authority. Ambition, business acumen, and financial mastery define you. You are meant to build empires and lead with power.",
    hindiDescription:
      "आप सामग्री सफलता और अधिकार के लिए भाग्यशाली हैं। महत्वाकांक्षा और व्यापार कौशल आपकी परिभाषा है।",
    traits: ["Power", "Success", "Ambition", "Wealth"],
    icon: <TrendingUp className="w-8 h-8" />,
    color: "oklch(0.72 0.18 65)",
  },
  9: {
    number: 9,
    title: "The Humanitarian",
    hindiTitle: "मानवतावादी",
    description:
      "You are the old soul — compassionate, wise, and globally minded. Service to humanity, idealism, and universal love are your calling. You are meant to make the world better.",
    hindiDescription:
      "आप एक पुरानी आत्मा हैं — दयालु, ज्ञानी और वैश्विक सोच के साथ। मानवता की सेवा आपका आह्वान है।",
    traits: ["Compassion", "Wisdom", "Idealism", "Universal Love"],
    icon: <Star className="w-8 h-8" />,
    color: "oklch(0.78 0.12 75)",
  },
  11: {
    number: 11,
    title: "The Illuminator (Master)",
    hindiTitle: "प्रकाशक (मास्टर)",
    description:
      "You carry a Master Number — heightened intuition, spiritual insight, and inspirational power. You are meant to awaken and illuminate others. A rare and powerful life path.",
    hindiDescription:
      "आप एक मास्टर नंबर रखते हैं — उच्च अंतर्ज्ञान, आध्यात्मिक अंतर्दृष्टि और प्रेरणादायक शक्ति।",
    traits: ["Intuition", "Inspiration", "Spiritual Power", "Vision"],
    icon: <Sparkles className="w-8 h-8" />,
    color: "oklch(0.72 0.18 65)",
  },
  22: {
    number: 22,
    title: "The Master Builder",
    hindiTitle: "मास्टर निर्माता",
    description:
      "You carry the Master Builder Number — the power to turn dreams into reality on a massive scale. Visionary practicality and world-changing potential define your extraordinary path.",
    hindiDescription:
      "आप मास्टर बिल्डर नंबर रखते हैं — सपनों को वास्तविकता में बदलने की शक्ति। दुनिया बदलने की क्षमता।",
    traits: ["Master Vision", "Manifestation", "Global Impact", "Practical Genius"],
    icon: <Briefcase className="w-8 h-8" />,
    color: "oklch(0.55 0.22 25)",
  },
  33: {
    number: 33,
    title: "The Master Teacher",
    hindiTitle: "मास्टर गुरु",
    description:
      "You carry the Master Teacher Number — selfless love, healing, and spiritual guidance. You are meant to uplift humanity through compassion and higher consciousness.",
    hindiDescription:
      "आप मास्टर टीचर नंबर रखते हैं — निस्वार्थ प्रेम, चिकित्सा और आध्यात्मिक मार्गदर्शन।",
    traits: ["Unconditional Love", "Healing", "Teaching", "Higher Consciousness"],
    icon: <Heart className="w-8 h-8" />,
    color: "oklch(0.68 0.14 55)",
  },
};

function reduceToLifePath(num: number): number {
  // Keep master numbers 11, 22, 33
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num
      .toString()
      .split("")
      .reduce((sum, d) => sum + parseInt(d), 0);
  }
  return num;
}

function calculateLifePath(dob: string): number | null {
  if (!dob) return null;
  const digits = dob.replace(/\D/g, "");
  if (digits.length < 8) return null;
  const sum = digits.split("").reduce((acc, d) => acc + parseInt(d), 0);
  return reduceToLifePath(sum);
}

export default function LifePathCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const lifePathInfo = useMemo(() => {
    if (result === null) return null;
    return LIFE_PATH_DATA[result] || null;
  }, [result]);

  const handleCalculate = () => {
    const lp = calculateLifePath(dob);
    setResult(lp);
    setHasCalculated(true);
  };

  const handleReset = () => {
    setDob("");
    setResult(null);
    setHasCalculated(false);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-yantra opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Calculator className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Free Interactive Tool</span>
            </div>
            <h2 className="font-hindi-display text-2xl text-primary/90 mb-2">
              अपना लाइफ पाथ नंबर जानें — मुफ्त!
            </h2>
            <h3 className="font-display font-bold text-3xl md:text-4xl">
              <span className="text-foreground">Calculate Your</span>{" "}
              <span className="text-gold-foil">Life Path Number</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mt-4">
              Your Life Path Number reveals your core personality, destiny, and life purpose. Enter
              your date of birth and discover yours instantly — completely free.
            </p>
          </div>

          {/* Calculator card */}
          <div className="card-premium rounded-2xl p-6 md:p-8 glow-saffron">
            {!hasCalculated || result === null ? (
              /* Input state */
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="lp-dob" className="text-foreground flex items-center gap-2 text-base">
                    <Calculator className="w-5 h-5 text-primary" />
                    Enter Your Date of Birth
                    <span className="font-hindi text-primary/60 text-sm">(जन्म तिथि दर्ज करें)</span>
                  </Label>
                  <Input
                    id="lp-dob"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="bg-input border-border focus:border-primary focus:ring-primary/30 text-foreground text-lg py-3"
                  />
                </div>

                <Button
                  onClick={handleCalculate}
                  disabled={!dob}
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold py-6 glow-saffron-strong transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Reveal My Life Path Number
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  🔒 Your date of birth is processed instantly in your browser. Nothing is stored or shared.
                </p>
              </div>
            ) : (
              /* Result state */
              <div className="space-y-6">
                {/* Big number reveal */}
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">
                    Your Life Path Number
                  </p>
                  <p className="font-hindi text-sm text-primary/60">आपका लाइफ पाथ नंबर</p>
                  <div className="relative inline-block">
                    <div
                      className="absolute inset-0 blur-3xl rounded-full opacity-50"
                      style={{ background: lifePathInfo?.color }}
                    />
                    <div
                      className="relative font-display font-bold text-7xl md:text-8xl text-gold-foil animate-shimmer"
                      style={{ textShadow: "0 0 40px oklch(0.72 0.18 65 / 0.4)" }}
                    >
                      {result}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {lifePathInfo?.icon}
                    <h4 className="font-display font-bold text-2xl text-foreground">
                      {lifePathInfo?.title}
                    </h4>
                  </div>
                  <p className="font-hindi-display text-lg text-primary/80">
                    {lifePathInfo?.hindiTitle}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <p className="text-foreground/90 leading-relaxed text-center">
                    {lifePathInfo?.description}
                  </p>
                  <p className="font-hindi text-primary/80 leading-relaxed text-center">
                    {lifePathInfo?.hindiDescription}
                  </p>
                </div>

                {/* Traits */}
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {lifePathInfo?.traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                {/* Upsell to full report */}
                <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-primary/15 to-transparent border border-primary/30">
                  <div className="flex items-start gap-3 mb-3">
                    <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        यह तो बस शुरुआत है! This is just the beginning!
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your Life Path Number is only one piece of the puzzle. Your full NaamShakti
                        Report includes name vibration analysis, lucky numbers, name corrections,
                        remedies, and much more — all personalized to your name and birth date.
                      </p>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-5 glow-saffron transition-transform active:scale-95"
                  >
                    <a href="#offer">
                      Get My Full Report — ₹399
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>

                {/* Recalculate */}
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Calculate again / फिर से गणना करें
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
