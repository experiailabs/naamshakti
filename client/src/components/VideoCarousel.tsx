import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Video,
  Upload,
  Star,
} from "lucide-react";

// ============================================================
// Video Carousel — 5 slots for reference videos
// User will upload actual videos later.
// Each slot supports a video URL or shows a placeholder.
// ============================================================

interface VideoSlot {
  id: number;
  title: string;
  hindiTitle: string;
  description: string;
  videoUrl: string | null;
  posterUrl: string | null;
}

const VIDEO_SLOTS: VideoSlot[] = [
  {
    id: 1,
    title: "Client Success Story — Deepak",
    hindiTitle: "ग्राहक सफलता की कहानी — दीपक",
    description: "How name correction changed Deepak's career trajectory within 3 months.",
    videoUrl: null,
    posterUrl: null,
  },
  {
    id: 2,
    title: "Celebrity Name Analysis",
    hindiTitle: "सेलिब्रिटी नाम विश्लेषण",
    description: "Breaking down the numerology behind famous Bollywood name changes.",
    videoUrl: null,
    posterUrl: null,
  },
  {
    id: 3,
    title: "How Numerology Works",
    hindiTitle: "अंक ज्योतिष कैसे काम करता है",
    description: "Understanding the Chaldean method and name vibration science.",
    videoUrl: null,
    posterUrl: null,
  },
  {
    id: 4,
    title: "Priya's Transformation",
    hindiTitle: "प्रिया का बदलाव",
    description: "From stuck in career to promotion in 60 days — Priya shares her journey.",
    videoUrl: null,
    posterUrl: null,
  },
  {
    id: 5,
    title: "Business Name Correction",
    hindiTitle: "व्यापार नाम सुधार",
    description: "How Amit increased business sales by 40% after a name spelling correction.",
    videoUrl: null,
    posterUrl: null,
  },
];

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    const clamped = ((index % VIDEO_SLOTS.length) + VIDEO_SLOTS.length) % VIDEO_SLOTS.length;
    setCurrentIndex(clamped);
  };

  const goPrev = () => goToSlide(currentIndex - 1);
  const goNext = () => goToSlide(currentIndex + 1);

  const currentVideo = VIDEO_SLOTS[currentIndex];

  return (
    <section className="relative py-20 bg-diya-glow">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Video className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Watch & Decide</span>
          </div>
          <h2 className="font-hindi-display text-2xl text-primary/90 mb-2">
            वीडियो देखें और सत्यापित करें
          </h2>
          <h3 className="font-display font-bold text-3xl md:text-4xl text-gold-foil">
            Real Stories, Real Transformations
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">
            Watch these reference videos to see how NaamShakti has transformed lives across India.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto animate-fade-up">
          {/* Main video display */}
          <div className="card-premium rounded-2xl overflow-hidden glow-saffron">
            <div className="relative aspect-video bg-secondary/30 flex items-center justify-center group">
              {currentVideo.videoUrl ? (
                <video
                  key={currentVideo.id}
                  src={currentVideo.videoUrl}
                  poster={currentVideo.posterUrl || undefined}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Placeholder for video not yet uploaded */
                <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center border-2 border-primary/30">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-display font-semibold text-lg text-foreground">
                      Video Coming Soon
                    </p>
                    <p className="font-hindi text-sm text-primary/60">वीडियो जल्द आ रहा है</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Upload className="w-4 h-4" />
                    <span>Reference video will be uploaded here</span>
                  </div>
                </div>
              )}

              {/* Navigation arrows */}
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-90"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-90"
                aria-label="Next video"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Video info bar */}
            <div className="p-5 border-t border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {currentIndex + 1} / {VIDEO_SLOTS.length}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-display font-semibold text-lg text-foreground">
                    {currentVideo.title}
                  </h4>
                  <p className="font-hindi text-sm text-primary/70 mt-0.5">
                    {currentVideo.hindiTitle}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {currentVideo.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail strip / dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {VIDEO_SLOTS.map((slot, i) => (
              <button
                key={slot.id}
                onClick={() => goToSlide(i)}
                className={`group relative transition-all duration-200 ${
                  i === currentIndex
                    ? "w-16 h-16 md:w-20 md:h-20"
                    : "w-10 h-10 md:w-12 md:h-12 opacity-60 hover:opacity-100"
                }`}
                aria-label={`Go to video ${i + 1}: ${slot.title}`}
              >
                <div
                  className={`w-full h-full rounded-lg border-2 flex items-center justify-center overflow-hidden ${
                    i === currentIndex
                      ? "border-primary glow-saffron"
                      : "border-border group-hover:border-primary/50"
                  }`}
                  style={{
                    background: i === currentIndex
                      ? "linear-gradient(135deg, oklch(0.72 0.18 65 / 0.2), oklch(0.55 0.22 25 / 0.15))"
                      : "oklch(0.18 0.03 270)",
                  }}
                >
                  {slot.videoUrl ? (
                    <video
                      src={slot.videoUrl}
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Play className="w-4 h-4 text-primary opacity-70" />
                  )}
                </div>
                {/* Number badge */}
                <span
                  className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                    i === currentIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
              </button>
            ))}
          </div>

          {/* CTA below carousel */}
          <div className="text-center mt-8">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-5 glow-saffron transition-transform active:scale-95"
            >
              <a href="#offer">
                अपनी कहानी बनाएं — Start Your Transformation ₹299
                <ChevronRight className="w-5 h-5 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
