import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  TrendingUp,
  Heart,
  Briefcase,
  Brain,
  Zap,
  Users,
  Award,
  ChevronDown,
  Lock,
  Mail,
  Phone,
  Calendar,
  User,
  Quote,
  ArrowRight,
  IndianRupee,
  Flame,
} from "lucide-react";
import LifePathCalculator from "@/components/LifePathCalculator";
import VideoCarousel from "@/components/VideoCarousel";

// ============================================================
// DESIGN PHILOSOPHY: Celestial Saffron
// Vedic Cosmic Revival — deep midnight indigo + saffron gold
// Yantra geometry, diya glow, gold-foil typography
// ============================================================

const HERO_BG = "/images/hero-bg_f2529d5f.png";
const LOGO = "/images/logo_3c9d214b.webp";
const REPORT_MOCKUP = "/images/report-mockup_c52d9b33.png";
const CELEBRITY_SECTION = "/images/celebrity-section_5908310b.png";
const GURU_PORTRAIT = "/images/guru-portrait_6e0e8c98.png";

// Countdown target: August 15, 2026
const OFFER_DEADLINE = new Date("2026-08-15T23:59:59+05:30").getTime();

function useCountdown(target: number) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return timeLeft;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".animate-fade-up");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ============= HEADER =============
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-primary/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="NaamShakti" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="font-display font-bold text-lg text-gold-foil leading-none">NaamShakti</h1>
            <p className="font-hindi-display text-xs text-primary/70 leading-none mt-0.5">नामशक्ति</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-primary text-primary" />
            4.9/5 · 50,000+ Reports
          </span>
          <a
            href="#offer"
            className="text-sm font-semibold text-primary hover:text-gold-foil transition-colors"
          >
            ₹299 Offer →
          </a>
        </div>
      </div>
    </header>
  );
}

// ============= HERO =============
function Hero() {
  const timeLeft = useCountdown(OFFER_DEADLINE);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Headline + Trust */}
        <div className="space-y-6 animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">India's #1 Name Numerology Report</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h2 className="font-hindi-display text-2xl md:text-3xl text-primary/90 leading-tight">
              आपके नाम में छुपी है आपकी तकदीर
            </h2>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
              <span className="text-foreground">Your Name Holds the</span>
              <br />
              <span className="text-gold-foil animate-shimmer">Key to Your Destiny</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Discover the hidden numerological power of your name. Get a personalized 25+ page report
              revealing your lucky numbers, name corrections, wealth-attracting remedies, and the
              exact spelling changes that can transform your life.
            </p>
          </div>

          {/* Trust stats */}
          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm"><strong className="text-foreground">50,000+</strong> Reports Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="text-sm"><strong className="text-foreground">4.9/5</strong> Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm"><strong className="text-foreground">100%</strong> Private & Secure</span>
            </div>
          </div>

          {/* Price teaser */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-muted-foreground line-through text-lg">₹2,500</span>
              <span className="font-display font-bold text-4xl text-gold-foil">₹299</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm">
              <p className="text-destructive font-semibold animate-pulse-glow">Limited Time Offer</p>
              <p className="text-muted-foreground">Ends 15th August 2026</p>
            </div>
          </div>

          {/* CTA */}
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-8 py-6 glow-saffron-strong transition-transform active:scale-95"
          >
            <a href="#offer">
              अपनी रिपोर्ट पाएं — Get My Report ₹299
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>

        {/* Right: Countdown + Visual */}
        <div className="space-y-6 animate-fade-up">
          {/* Countdown card */}
          <div className="card-premium rounded-2xl p-6 glow-saffron">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-destructive" />
              <span className="text-sm font-semibold text-destructive">Offer Ends In</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Min", value: timeLeft.minutes },
                { label: "Sec", value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="bg-secondary/50 rounded-lg py-3 border border-primary/20">
                    <span className="font-display font-bold text-2xl md:text-3xl text-gold-foil">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Report preview */}
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
            <img
              src={REPORT_MOCKUP}
              alt="NaamShakti Numerology Report Preview"
              className="relative w-full max-w-sm mx-auto rounded-xl glow-saffron"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============= CELEBRITY STORIES =============
function CelebrityStories() {
  const stories = [
    {
      name: "Ajay Devgn",
      original: "Ajay Devgan",
      change: "Dropped 'a' → Devgn",
      result: "Entered Bollywood's ₹500 Crore Club",
      icon: "🎬",
    },
    {
      name: "Rajkummar Rao",
      original: "Rajkumar Rao",
      change: "Added extra 'm' → Rajkummar",
      result: "From character actor to National Award-winning leading man",
      icon: "🏆",
    },
    {
      name: "Riteish Deshmukh",
      original: "Ritesh Deshmukh",
      change: "Aligned name with Venus energy → Riteish",
      result: "Spoke publicly about the life-changing impact",
      icon: "✨",
    },
    {
      name: "Tusshar Kapoor",
      original: "Tusar Kapoor",
      change: "Added 's' and 'h' → Tusshar",
      result: "Career breakthrough after name alignment",
      icon: "🎭",
    },
    {
      name: "Suniel Shetty",
      original: "Sunil Shetty",
      change: "Added 'e' → Suniel",
      result: "Aligned with number 1 energy — sustained success",
      icon: "💪",
    },
    {
      name: "Ekta Kapoor",
      original: "—",
      change: "Started titles with 'K' — numerology-driven",
      result: "Built a ₹1000+ Crore entertainment empire",
      icon: "📺",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-yantra opacity-50" />
      <div className="container relative z-10">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Celebrity Secrets Revealed</span>
          </div>
          <h2 className="font-hindi-display text-2xl text-primary/90 mb-2">
            सितारों ने अपना नाम बदला, किस्मत बदल गई
          </h2>
          <h3 className="font-display font-bold text-3xl md:text-4xl">
            <span className="text-gold-foil">Stars Changed Their Names,</span>
            <br />
            <span className="text-foreground">Destiny Changed Forever</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Widely reported in media — these celebrities consulted numerologists and adjusted their
            name spellings. The results speak for themselves.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <div
              key={story.name}
              className="card-premium rounded-xl p-6 animate-fade-up hover:glow-saffron transition-all duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="text-3xl mb-3">{story.icon}</div>
              <h4 className="font-display font-bold text-xl text-gold-foil mb-1">{story.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Originally: <span className="text-foreground/80">{story.original}</span>
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground/90">{story.change}</p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground/90">{story.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 animate-fade-up">
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            These are publicly reported media stories. NaamShakti brings you the same numerological
            principles in a personalized report for your own name.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============= WHAT'S INSIDE =============
function WhatsInside() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Name Meaning Decoded",
      hindi: "नाम का गुप्त अर्थ",
      desc: "Decode the hidden power and vibration of every letter in your name.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Perfect Name Spelling",
      hindi: "सही नाम वर्तनी",
      desc: "Find the exact spelling that attracts wealth, success, and prosperity.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Lucky Numbers & Dates",
      hindi: "भाग्यशाली अंक और दिन",
      desc: "Discover numbers that enhance your fortune and open new opportunities.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Wealth & Career Remedies",
      hindi: "धन और करियर उपाय",
      desc: "Specific techniques to attract money, clients, and career growth.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Love & Relationship Guide",
      hindi: "प्रेम और रिश्ते गाइड",
      desc: "Improve love, family, and social connections through name alignment.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Lo Shu Grid Analysis",
      hindi: "लो शू ग्रिड विश्लेषण",
      desc: "Identify missing and strong numbers in your birth date grid.",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Business Name Compatibility",
      hindi: "व्यापार नाम अनुकूलता",
      desc: "Choose the right business names, partnerships, and ventures.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Powerful Remedies & Rituals",
      hindi: "शक्तिशाली उपाय और अनुष्ठान",
      desc: "Switch words, rituals, and remedies to activate your name's power.",
    },
  ];

  return (
    <section className="relative py-20 bg-diya-glow">
      <div className="container">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">25+ Page Personalized Report</span>
          </div>
          <h2 className="font-hindi-display text-2xl text-primary/90 mb-2">
            आपकी रिपोर्ट में क्या है
          </h2>
          <h3 className="font-display font-bold text-3xl md:text-4xl text-gold-foil">
            Inside Your NaamShakti Report
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            A comprehensive, personalized numerology analysis prepared exclusively for you based on
            your name and date of birth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="card-premium rounded-xl p-5 animate-fade-up hover:border-primary/40 transition-all duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h4 className="font-display font-semibold text-base text-foreground mb-1">
                {feature.title}
              </h4>
              <p className="font-hindi text-sm text-primary/70 mb-2">{feature.hindi}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= TRANSFORMATION SECTION =============
function Transformation() {
  const transformations = [
    "Use the right name spelling to bring in more money",
    "अधिक पैसे आकर्षित करने के लिए सही नाम वर्तनी का उपयोग करें",
    "Improve love, family & social connections",
    "प्रेम, परिवार और सामाजिक संबंधों में सुधार करें",
    "Feel more powerful & charismatic in every situation",
    "हर स्थिति में अधिक शक्तिशाली और आकर्षक महसूस करें",
    "Fix hidden name blocks stopping your progress",
    "अपनी प्रगति को रोकने वाले नाम दोषों को ठीक करें",
    "Enhance your public image & influence",
    "अपनी सार्वजनिक छवि और प्रभाव को बढ़ाएं",
    "Choose the right partnerships & business names",
    "सही साझेदारी और व्यापार नाम चुनें",
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={CELEBRITY_SECTION} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Life Transformation</span>
            </div>
            <h2 className="font-hindi-display text-2xl text-primary/90 mb-2">
              एक सरल नाम परिवर्तन, जीवन भर की तब्दीली
            </h2>
            <h3 className="font-display font-bold text-3xl md:text-4xl mb-6">
              <span className="text-foreground">Simple Name Changes Bring</span>
              <br />
              <span className="text-gold-foil">Massive Transformations</span>
            </h3>
            <div className="space-y-3">
              {transformations.map((text, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 animate-fade-up ${i % 2 === 1 ? "font-hindi" : ""}`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className={i % 2 === 1 ? "text-primary/80" : "text-foreground/90"}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
            <img
              src={GURU_PORTRAIT}
              alt="NaamShakti Numerology Expert"
              className="relative rounded-2xl glow-saffron w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============= TESTIMONIALS =============
function Testimonials() {
  const testimonials = [
    {
      name: "Deepak Sharma",
      location: "Delhi",
      text: "Sir, namaste 🙏 Got the report yesterday. Honestly... I am SHOCKED. Everything about my life path matches perfectly! Already feel lighter.",
      rating: 5,
      hindi: false,
    },
    {
      name: "Priya Verma",
      location: "Mumbai",
      text: "I changed my name spelling 2 months back as suggested. GOT MY PROMOTION TODAY!! After 3 years of being stuck. I have no words 🥹",
      rating: 5,
      hindi: false,
    },
    {
      name: "Amit Goyal",
      location: "Jaipur",
      text: "Sir aapne business name correct kiya tha — sales 40% up this quarter 📈 Staff bhi happy hai, environment positive ho gaya hai.",
      rating: 5,
      hindi: true,
    },
    {
      name: "Sneha Iyer",
      location: "Bengaluru",
      text: "The clarity this report gave me… I didn't know I needed it. Lucky color & number working like magic 🍀 Forever grateful!",
      rating: 5,
      hindi: false,
    },
    {
      name: "Rohan Mehta",
      location: "Pune",
      text: "Sir mere marriage ke liye jo name analysis aapne diya — life changing. Rishta finalize ho gaya last week 💍✨ Bahut bahut badhai!",
      rating: 5,
      hindi: true,
    },
    {
      name: "Kavita Joshi",
      location: "Ahmedabad",
      text: "Maine apna name correct karwaya 6 weeks pehle. Anxiety kam hui, sleep theek ho gayi, relationships better 🥺❤️ Naam ki vibration bahut shaktishali hoti hai.",
      rating: 5,
      hindi: true,
    },
  ];

  return (
    <section className="relative py-20 bg-diya-glow">
      <div className="container">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium text-primary">Real WhatsApp Reviews</span>
          </div>
          <h2 className="font-hindi-display text-2xl text-primary/90 mb-2">
            हमारे ग्राहक क्या कहते हैं
          </h2>
          <h3 className="font-display font-bold text-3xl md:text-4xl text-gold-foil">
            50,000+ Lives Transformed
          </h3>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-muted-foreground">4.9/5 · 12,400+ ratings</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="card-premium rounded-xl p-6 animate-fade-up hover:glow-saffron transition-all duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <Quote className="w-8 h-8 text-primary/30 mb-3" />
              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className={`text-sm text-foreground/90 leading-relaxed mb-4 ${t.hindi ? "font-hindi" : ""}`}>
                {t.text}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= STATS BAR =============
function StatsBar() {
  const stats = [
    { value: "50,000+", label: "Reports Delivered", hindi: "रिपोर्ट वितरित" },
    { value: "15+", label: "Years Experience", hindi: "वर्षों का अनुभव" },
    { value: "4.9/5", label: "Customer Rating", hindi: "ग्राहक रेटिंग" },
    { value: "10+", label: "Countries Served", hindi: "देशों में सेवा" },
  ];

  return (
    <section className="py-12 border-y border-primary/20 bg-secondary/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center animate-fade-up" style={{ transitionDelay: `${i * 50}ms` }}>
              <p className="font-display font-bold text-3xl md:text-4xl text-gold-foil mb-1">{stat.value}</p>
              <p className="text-sm text-foreground/80">{stat.label}</p>
              <p className="font-hindi text-xs text-primary/60 mt-0.5">{stat.hindi}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= OFFER + FORM =============
function OfferForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.dob && formData.email && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <section id="offer" className="relative py-20 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-yantra opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Offer banner */}
          <div className="text-center mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/15 border border-destructive/40 mb-4">
              <Flame className="w-4 h-4 text-destructive" />
              <span className="text-sm font-semibold text-destructive">88% OFF — Independence Day Special</span>
            </div>
            <h2 className="font-hindi-display text-2xl text-primary/90 mb-2">
              अपना नाम और जन्म तिथि दर्ज करें
            </h2>
            <h3 className="font-display font-bold text-3xl md:text-5xl mb-4">
              <span className="text-foreground">Get Your Personalized</span>
              <br />
              <span className="text-gold-foil">NaamShakti Numerology Report</span>
            </h3>
          </div>

          {/* Pricing card + Form */}
          <div className="card-premium rounded-2xl overflow-hidden glow-saffron-strong">
            <div className="grid lg:grid-cols-5">
              {/* Left: Pricing summary */}
              <div className="lg:col-span-2 p-8 bg-gradient-to-br from-primary/10 to-transparent border-r border-primary/20">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">NaamShakti Report</p>
                    <h4 className="font-display font-bold text-2xl text-foreground">
                      Complete Numerology Analysis
                    </h4>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display font-bold text-5xl text-gold-foil">₹299</span>
                      <span className="text-muted-foreground line-through text-xl">₹2,500</span>
                    </div>
                    <p className="text-sm text-destructive font-semibold">
                      Save ₹2,201 — 88% OFF Today Only
                    </p>
                  </div>

                  {/* What you get */}
                  <div className="space-y-2.5 pt-2">
                    {[
                      "25+ Page Personalized Report",
                      "Name Vibration Analysis (Chaldean method)",
                      "Corrected Name Suggestions for Success",
                      "Lucky Numbers, Days & Colours",
                      "Lo Shu Grid — Missing & Strong Numbers",
                      "Powerful Remedies to Activate Your Name",
                      "Delivered via Email & WhatsApp",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground/90">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Trust badges */}
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4 text-primary" />
                      100% Secure & Private Payment
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      Trusted by 50,000+ Customers
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      Report Delivered Within 24 Hours
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-3 p-8">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h4 className="font-display font-bold text-xl text-foreground mb-1">
                        Enter Your Details
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        अपनी जानकारी भरें और रिपोर्ट पाएं
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        Full Name <span className="font-hindi text-primary/60">(पूरा नाम)</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="bg-input border-border focus:border-primary focus:ring-primary/30 text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob" className="text-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Date of Birth <span className="font-hindi text-primary/60">(जन्म तिथि)</span>
                      </Label>
                      <Input
                        id="dob"
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="bg-input border-border focus:border-primary focus:ring-primary/30 text-foreground"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          Email <span className="font-hindi text-primary/60">(ईमेल)</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-input border-border focus:border-primary focus:ring-primary/30 text-foreground"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          WhatsApp Number <span className="font-hindi text-primary/60">(व्हाट्सएप)</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-input border-border focus:border-primary focus:ring-primary/30 text-foreground"
                        />
                      </div>
                    </div>

                    {/* Submit button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold py-6 glow-saffron-strong transition-transform active:scale-95"
                    >
                      <IndianRupee className="w-5 h-5 mr-1" />
                      Pay ₹299 & Get My Report
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      🔒 Your information is 100% private and secure. Report delivered to your email
                      and WhatsApp within 24 hours.
                    </p>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-display font-bold text-2xl text-gold-foil">
                      धन्यवाद! Thank You!
                    </h4>
                    <p className="text-muted-foreground max-w-sm">
                      Your details have been received. Proceed to payment to unlock your personalized
                      NaamShakti Numerology Report.
                    </p>
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold py-6 px-8 glow-saffron-strong"
                      onClick={() => alert("Payment integration will be activated here.")}
                    >
                      <Lock className="w-5 h-5 mr-2" />
                      Proceed to Payment — ₹299
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Urgency note */}
          <div className="text-center mt-6 animate-fade-up">
            <p className="text-sm text-destructive">
              ⚡ Offer valid till 15th August 2026 only. After that, price reverts to ₹2,500.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============= WHY NAAMSHAKTI =============
function WhyNaamShakti() {
  const reasons = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Vedic + Chaldean Method",
      hindi: "वैदिक + चाल्दीय पद्धति",
      desc: "We combine ancient Vedic numerology wisdom with the proven Chaldean name vibration system for maximum accuracy.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "50,000+ Happy Clients",
      hindi: "50,000+ संतुष्ट ग्राहक",
      desc: "Join thousands who have transformed their lives through name correction and numerological remedies.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Expert Analysis",
      hindi: "विशेषज्ञ विश्लेषण",
      desc: "Each report is manually analyzed and prepared — not auto-generated. Real expertise goes into every report.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Complete Privacy",
      hindi: "पूर्ण गोपनीयता",
      desc: "Your personal information is never shared. We use bank-grade encryption to protect your data.",
    },
  ];

  return (
    <section className="relative py-20">
      <div className="container">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Why Choose NaamShakti</span>
          </div>
          <h2 className="font-hindi-display text-2xl text-primary/90 mb-2">
            नामशक्ति क्यों चुनें
          </h2>
          <h3 className="font-display font-bold text-3xl md:text-4xl text-gold-foil">
            India's Most Trusted Name Numerology
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="card-premium rounded-xl p-6 flex gap-5 animate-fade-up hover:glow-saffron transition-all duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center text-primary shrink-0">
                {reason.icon}
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg text-foreground mb-1">
                  {reason.title}
                </h4>
                <p className="font-hindi text-sm text-primary/70 mb-2">{reason.hindi}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= FAQ =============
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "What if I don't see immediate changes?",
      qHindi: "अगर तुरंत बदलाव नहीं दिखे तो?",
      a: "Name vibrations work like energy shifts — some changes are instant, while others take time to manifest. Your report includes clear action steps and remedies for lasting impact. Most clients report feeling shifts within 3-6 weeks of implementing the suggestions.",
    },
    {
      q: "Is name numerology scientifically backed?",
      qHindi: "क्या नाम अंक ज्योतिष वैज्ञानिक रूप से समर्थित है?",
      a: "Name numerology is based on the ancient Chaldean and Vedic systems of vibration and frequency, which have been used for centuries to align individuals with success and prosperity. While not a hard science, millions of people — including celebrities — have experienced real results.",
    },
    {
      q: "How and when will I receive my report?",
      qHindi: "मुझे अपनी रिपोर्ट कैसे और कब मिलेगी?",
      a: "Your personalized report will be sent to your registered email and WhatsApp within 24 hours of payment confirmation. The report is a 25+ page PDF document prepared exclusively for you.",
    },
    {
      q: "What information do I need to provide?",
      qHindi: "मुझे क्या जानकारी देनी होगी?",
      a: "You need to provide your Full Name, Date of Birth, Email ID, and WhatsApp Number. This information is used to generate your personalized numerology report using the Chaldean and Vedic methods.",
    },
    {
      q: "Can I request a report for someone else?",
      qHindi: "क्या मैं किसी और के लिए रिपोर्ट मांग सकता हूं?",
      a: "Yes, you can generate a report for anyone — a family member, friend, or business partner — as long as the provided details (name and date of birth) are accurate.",
    },
    {
      q: "What if I don't receive my report?",
      qHindi: "अगर मुझे रिपोर्ट नहीं मिले तो?",
      a: "You can email us at support@naamshakti.in or WhatsApp us at +91 98765 43210. Our team will ensure your report is delivered promptly.",
    },
  ];

  return (
    <section className="relative py-20 bg-diya-glow">
      <div className="container max-w-3xl">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Questions & Answers</span>
          </div>
          <h2 className="font-hindi-display text-2xl text-primary/90 mb-2">
            आपके सवाल, हमारे जवाब
          </h2>
          <h3 className="font-display font-bold text-3xl md:text-4xl text-gold-foil">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card-premium rounded-xl overflow-hidden animate-fade-up"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-5 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-semibold text-foreground">{faq.q}</p>
                  <p className="font-hindi text-sm text-primary/60 mt-0.5">{faq.qHindi}</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= FINAL CTA =============
function FinalCTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>
      <div className="container relative z-10 text-center max-w-2xl mx-auto animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/15 border border-destructive/40 mb-6">
          <Clock className="w-4 h-4 text-destructive" />
          <span className="text-sm font-semibold text-destructive">Last Chance — 88% OFF</span>
        </div>

        <h2 className="font-hindi-display text-2xl text-primary/90 mb-3">
          आज ही अपनी तकदीर बदलें
        </h2>
        <h3 className="font-display font-bold text-3xl md:text-5xl mb-4">
          <span className="text-foreground">Don't Let Your Name</span>
          <br />
          <span className="text-gold-foil">Hold Back Your Destiny</span>
        </h3>
        <p className="text-muted-foreground text-lg mb-8">
          Join 50,000+ people who discovered the hidden power of their name. Your personalized
          numerology report is just one step away — for only ₹299.
        </p>

        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-muted-foreground line-through text-xl">₹2,500</span>
          <span className="font-display font-bold text-5xl text-gold-foil">₹299</span>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl font-bold px-10 py-7 glow-saffron-strong transition-transform active:scale-95"
        >
          <a href="#offer">
            अभी रिपोर्ट पाएं — Get My Report Now
            <ArrowRight className="w-6 h-6 ml-2" />
          </a>
        </Button>

        <p className="text-sm text-muted-foreground mt-4">
          ⚡ Offer ends 15th August 2026 · 100% Secure Payment · Report in 24 Hours
        </p>
      </div>
    </section>
  );
}

// ============= FOOTER =============
function Footer() {
  return (
    <footer className="border-t border-primary/20 py-12 bg-secondary/20">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={LOGO} alt="NaamShakti" className="w-10 h-10 object-contain" />
              <div>
                <h4 className="font-display font-bold text-lg text-gold-foil leading-none">NaamShakti</h4>
                <p className="font-hindi-display text-xs text-primary/70 leading-none mt-0.5">नामशक्ति</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              India's trusted name numerology service. Discover the hidden power of your name and
              unlock your true destiny.
            </p>
          </div>

          {/* Links */}
          <div>
            <h5 className="font-display font-semibold text-foreground mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#offer" className="text-muted-foreground hover:text-primary transition-colors">Get Your Report</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Refund & Cancellation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Disclaimer</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-display font-semibold text-foreground mb-3">Contact Us</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                support@naamshakti.in
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +91 98765 43210 (WhatsApp)
              </li>
            </ul>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9/5 Rating</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-border pt-6 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            NaamShakti is not a part of Facebook.com or Facebook Inc. or Google.com or Google Inc.
            Additionally, NaamShakti is not endorsed by Facebook.com or Facebook Inc. or Google.com
            or Google Inc. Results may vary from person to person. Numerology is a belief system and
            should be used as guidance, not as a guarantee of outcomes.
          </p>
          <p className="text-xs text-muted-foreground">
            © 2026 NaamShakti. All rights reserved. | GSTIN: 07XXXXX0222E1ZO
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============= STICKY MOBILE CTA =============
function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-background/95 backdrop-blur-xl border-t border-primary/30 p-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground line-through">₹2,500</p>
          <p className="font-display font-bold text-2xl text-gold-foil leading-none">₹299</p>
        </div>
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 py-4 glow-saffron"
        >
          <a href="#offer">
            Get Report
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}

// ============= MAIN PAGE =============
export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <LifePathCalculator />
        <CelebrityStories />
        <WhatsInside />
        <Transformation />
        <Testimonials />
        <VideoCarousel />
        <WhyNaamShakti />
        <OfferForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
