import React, { useState, useEffect, useRef } from "react";

// Structure definitions
interface Experience {
  id: string;
  title: string;
  category: string;
  duration: string;
  highlights: string[];
  description: string;
  image: string;
  priceEstimate: string;
}

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  time: string;
}

const EXPERIENCES: Experience[] = [
  {
    id: "eiffel",
    title: "Eiffel Tower Experience",
    category: "Signature Tours",
    duration: "3 Hours",
    highlights: ["Priority Summit Access", "Private Sommelier Tasting", "Historical Storytelling"],
    description: "Enjoy breathtaking city views with priority access and expert-guided tours. Savor champagne at the summit while your private guide narrates the architectural marvel's history.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
    priceEstimate: "From €280 / person"
  },
  {
    id: "seine",
    title: "Seine River Cruise",
    category: "Cruises & Dining",
    duration: "2.5 Hours",
    highlights: ["Private Riva Boat", "Grand Cru Pairing", "Sunset Departure"],
    description: "Sail through the heart of Paris while admiring illuminated landmarks. Indulge in premium service with live classical melodies as Paris glows in the twilight.",
    image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&q=80&w=800",
    priceEstimate: "From €350 / person"
  },
  {
    id: "louvre",
    title: "Louvre Museum Tour",
    category: "Art & Culture",
    duration: "4 Hours",
    highlights: ["Skip-The-Line VIP Access", "Masterpiece Curation", "Art Historian Guide"],
    description: "Discover world-famous masterpieces with skip-the-line access. Avoid the crowds and gain profound insights into the Louvre's most majestic collections with a world-class curator.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
    priceEstimate: "From €240 / person"
  },
  {
    id: "montmartre",
    title: "Montmartre Walking Tour",
    category: "Signature Tours",
    duration: "2.5 Hours",
    highlights: ["Secret Artist Studios", "Sacre-Coeur Private Entry", "Local Artisanal Tasting"],
    description: "Stroll through charming streets, artist squares, and historic cafés. Revisit the Golden Age of modern art, finding the footsteps of Picasso, Van Gogh, and Monet.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800",
    priceEstimate: "From €120 / person"
  },
  {
    id: "versailles",
    title: "Versailles Day Trip",
    category: "Excursions",
    duration: "8 Hours",
    highlights: ["Private Luxury Transfer", "King's Private Apartments Access", "Fountains Musical Show"],
    description: "Visit the magnificent Palace of Versailles and its stunning gardens. Travel back to the grandeur of the Sun King with VIP entrance and private estate access.",
    image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&q=80&w=800",
    priceEstimate: "From €450 / person"
  },
  {
    id: "night",
    title: "Paris by Night",
    category: "Cruises & Dining",
    duration: "4 Hours",
    highlights: ["Vintage Car Tour", "Michelin-starred Dining", "Champs-Élysées Sparkling Show"],
    description: "Experience the city's sparkling lights, fine dining, and romantic atmosphere. Cruise through Paris in a retro vintage Cabriolet under the golden glow of historical landmarks.",
    image: "https://images.unsplash.com/photo-1509060464153-44667396260f?auto=format&fit=crop&q=80&w=800",
    priceEstimate: "From €390 / person"
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Everything was perfectly organized. From airport pickup to sightseeing, every detail exceeded our expectations. Paris has never felt more magical.",
    author: "Sarah & Michael",
    location: "USA",
    rating: 5
  },
  {
    quote: "The personalized itinerary helped us discover places we would have never found ourselves. Highly recommended for travelers seeking genuine refinement!",
    author: "Emily",
    location: "Australia",
    rating: 5
  },
  {
    quote: "Professional guides, luxury accommodations, and unforgettable memories. We'll definitely travel with them again for our next European summer.",
    author: "Daniel",
    location: "Canada",
    rating: 5
  }
];

const ITINERARY_PRESETS: Record<string, ItineraryDay[]> = {
  Romantic: [
    { day: 1, title: "Lumière Arrival & Sunset Cruise", time: "18:00", description: "Bespoke private transport to your suite, followed by a champagne voyage down the illuminated Seine." },
    { day: 2, title: "Artistry of Montmartre & Private Picnic", time: "11:00", description: "Wander past hidden artist studios with a personal local expert, culminating in a premium cheese & wine pairing." },
    { day: 3, title: "Grand Finale at Eiffel Summit", time: "20:00", description: "Exclusive priority elevator access to the highest summit with a tailor-made dinner curated by Michelin standards." }
  ],
  Culinary: [
    { day: 1, title: "The Art of Pastry & Boulangerie", time: "10:00", description: "Hands-on masterclass in Saint-Germain-des-Prés with an award-winning local French chef." },
    { day: 2, title: "Sommelier Cave Exploration", time: "16:00", description: "Private tasting of rare Grand Cru vintages in a historic 17th-century cellar hidden below the Latin Quarter." },
    { day: 3, title: "Michelin-Starred Degustation", time: "20:00", description: "An ultra-exclusive multi-course sensory dinner paired meticulously with high-end matching vintage champagnes." }
  ],
  Culture: [
    { day: 1, title: "VIP Louvre Curation Tour", time: "09:30", description: "Skip the crowd to stand face-to-face with legendary classics guided by a master historian." },
    { day: 2, title: "Opéra Garnier Backstage", time: "14:00", description: "Behind-the-scenes private exploration of Paris' majestic opera house and its legendary underground lakes." },
    { day: 3, title: "Versailles Royal Estate Retreat", time: "08:30", description: "An immersive all-day luxury transport tour of Versailles, including access to restricted private chambers." }
  ]
};

const CATEGORIES = ["All", "Signature Tours", "Cruises & Dining", "Art & Culture", "Excursions"];

const SECTIONS = [
  { id: "section-hero", label: "Home", start: 0.00, end: 0.22 },
  { id: "section-why-us", label: "Why Us", start: 0.20, end: 0.42 },
  { id: "section-experiences", label: "Experiences", start: 0.40, end: 0.62 },
  { id: "section-testimonials", label: "Testimonials", start: 0.60, end: 0.80 },
  { id: "section-cta", label: "Inquire", start: 0.78, end: 0.92 }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeBlueprint, setActiveBlueprint] = useState<"Romantic" | "Culinary" | "Culture">("Romantic");

  // Inquiry form states
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryExperience, setInquiryExperience] = useState("Eiffel Tower Experience");
  const [inquiryGuests, setInquiryGuests] = useState("2 Guests");
  const [inquiryMessage, setInquiryMessage] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Background frame loader states - keep these as state since they only change once on load
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const totalFrames = 300;
  
  // High-performance scroll tracking using refs to completely avoid React re-renders on scroll
  const scrollProgressRef = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const filteredExperiences = selectedCategory === "All"
    ? EXPERIENCES
    : EXPERIENCES.filter(exp => exp.category === selectedCategory);

  // Preload frame images on mount
  useEffect(() => {
    let loadedCount = 0;
    const tempImages: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / totalFrames) * 100);
        setLoadPercentage(pct);
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      tempImages.push(img);
    }
    imagesRef.current = tempImages;
  }, []);

  // Handle Scroll Progress (updates the ref and styles DOM directly)
  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const mx = document.documentElement.scrollHeight - window.innerHeight;
      const progress = mx <= 0 ? 0 : st / mx;
      scrollProgressRef.current = progress;

      // 1. Direct DOM updates for sections visibility to bypass React re-rendering overhead
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) {
          const active = progress >= s.start && progress <= s.end;
          if (active) {
            el.classList.add("visible");
          } else {
            el.classList.remove("visible");
          }
        }
      });

      // 2. Direct DOM update for footer scroll transition
      const footer = document.getElementById("section-footer");
      if (footer) {
        if (progress >= 0.92) {
          footer.classList.remove("pointer-events-none");
          footer.classList.add("opacity-100", "translate-y-0");
        } else {
          footer.classList.add("pointer-events-none");
          footer.classList.remove("opacity-100", "translate-y-0");
        }
      }

      // Hide progress dots at the bottom to prevent footer overlaps
      const dotsWrapper = document.getElementById("scroll-progress");
      if (dotsWrapper) {
        if (progress >= 0.92) {
          dotsWrapper.classList.add("opacity-0", "pointer-events-none");
          dotsWrapper.classList.remove("opacity-100");
        } else {
          dotsWrapper.classList.remove("opacity-0", "pointer-events-none");
          dotsWrapper.classList.add("opacity-100");
        }
      }

      // 3. Direct DOM update for top navigation pill states
      let activeNav = -1;
      SECTIONS.forEach((s, idx) => {
        const active = (progress >= s.start && progress <= s.end) || (idx === SECTIONS.length - 1 && progress > s.end);
        if (active) {
          activeNav = idx;
        }
      });

      if (activeNav >= 0) {
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link, i) => {
          if (i === activeNav) {
            link.className = "nav-link relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 text-black bg-white";
          } else {
            link.className = "nav-link relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 text-white/60 hover:text-white";
          }
        });

        // 4. Direct DOM update for scroll progress dots
        const dots = document.querySelectorAll(".progress-dot");
        dots.forEach((dot, i) => {
          if (i === activeNav) {
            dot.classList.add("bg-white", "scale-[1.5]");
            dot.classList.remove("bg-white/20");
          } else {
            dot.classList.remove("bg-white", "scale-[1.5]");
            dot.classList.add("bg-white/20");
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Sync initial state on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Canvas Image Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let localIdx = 0;

    const drawCover = (c2d: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) => {
      const iw = img.width, ih = img.height;
      let r = Math.min(w / iw, h / ih), nw = iw * r, nh = ih * r, ar = 1;
      if (nw < w) ar = w / nw;
      if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
      nw *= ar; nh *= ar;
      let cw = iw / (nw / w), ch = ih / (nh / h);
      let cx = Math.max(0, Math.min((iw - cw) * 0.5, iw - cw));
      let cy = Math.max(0, Math.min((ih - ch) * 0.5, ih - ch));
      c2d.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
    };

    const render = () => {
      const targetIdx = scrollProgressRef.current * (totalFrames - 1);
      localIdx += (targetIdx - localIdx) * 0.08;

      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      const frameIndex = Math.max(0, Math.min(totalFrames - 1, Math.round(localIdx)));
      const img = imagesRef.current[frameIndex];
      if (img && img.complete) {
        drawCover(ctx, img, width, height);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Testimonials auto scroll slider
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;
    setInquirySubmitted(true);
  };

  const resetInquiryForm = () => {
    setInquiryName("");
    setInquiryEmail("");
    setInquiryMessage("");
    setInquirySubmitted(false);
  };

  const scrollToSection = (navId: string) => {
    const map: Record<string, number> = { hero: 0, "why-us": 1, experiences: 2, testimonials: 3, cta: 4 };
    const i = map[navId];
    if (i === undefined) return;
    const s = SECTIONS[i];
    const mid = (s.start + s.end) / 2;
    const mx = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: mid * mx, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white font-sans overflow-x-hidden relative selection:bg-white selection:text-black">
      
      {/* Canvas backdrop renderer */}
      <canvas ref={canvasRef} id="animation-canvas"></canvas>
      <div id="canvas-overlay"></div>

      {/* Floating Capsule top navigation bar */}
      <header id="navbar" className="fixed top-0 left-0 right-0 z-40 w-full opacity-100 transition-opacity duration-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center justify-start cursor-pointer" onClick={() => scrollToSection("hero")}>
            <span className="text-lg md:text-xl font-bold tracking-[0.2em] text-white flex items-center gap-2">
              LUMIÈRE <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full tracking-widest text-neutral-300 font-medium">PARIS</span>
            </span>
          </div>

          {/* Links Capsule */}
          <div className="hidden md:flex justify-center">
            <nav className="flex items-center gap-1 bg-white/[0.02] border border-white/10 rounded-full p-1.5 backdrop-blur-xl">
              {SECTIONS.map((s, idx) => {
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id.replace("section-", ""))}
                    className={`nav-link relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                      idx === 0 ? "text-black bg-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* CTA actions */}
          <div className="flex items-center justify-end gap-4">
            <button onClick={() => scrollToSection("cta")} className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2 border border-white/10 hover:border-white/30 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all bg-white/[0.02] hover:bg-white/[0.06] active:scale-95 text-white">
              <span>Plan Your Journey</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>

            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer nav menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/98 z-50 backdrop-blur-2xl flex flex-col justify-between p-8">
          <div className="flex items-center justify-between">
            <span className="text-lg font-black tracking-widest text-white">LUMIÈRE</span>
            <button onClick={() => setMobileMenuOpen(false)} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto text-left pl-4">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  scrollToSection(s.id.replace("section-", ""));
                  setMobileMenuOpen(false);
                }}
                className="text-3xl font-medium tracking-tight text-left text-white/40 hover:text-white"
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
            <button onClick={() => { scrollToSection("cta"); setMobileMenuOpen(false); }} className="w-full py-3.5 bg-white text-black text-center rounded-xl text-xs font-semibold tracking-widest uppercase">
              Book Your Journey
            </button>
            <p className="text-[10px] text-white/30 text-center">&copy; 2026 Lumière Travel. All rights reserved.</p>
          </div>
        </div>
      )}

      {/* Main scroll spacing container */}
      <div className="scroll-container"></div>

      {/* SECTION 1: HERO */}
      <section id="section-hero" className="content-section">
        <div className="section-inner max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12 md:pt-24 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">Premium Curation Suite</span>
            </div>

            <h1 className="text-[38px] sm:text-5xl md:text-6xl lg:text-[70px] font-bold tracking-tight text-white leading-[1.05]">
              Experience the <span className="text-white/60 font-light italic block md:inline">Magic of Paris</span>
            </h1>

            <h3 className="text-base sm:text-lg md:text-xl text-white font-medium mt-6 leading-snug tracking-tight">
              Discover timeless beauty, iconic landmarks, hidden cafés, and unforgettable moments with expertly curated Paris travel experiences.
            </h3>

            <p className="text-xs sm:text-sm text-white/50 max-w-xl mt-4 leading-relaxed font-normal">
              Whether it's your first visit or your fifth, we create personalized journeys that let you experience Paris like never before. From the Eiffel Tower to charming streets and world-class cuisine, every trip is designed to become a lifelong memory.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button onClick={() => scrollToSection("experiences")} className="px-7 py-3.5 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-full hover:bg-neutral-100 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                Explore Tours
              </button>
              <button onClick={() => scrollToSection("cta")} className="px-7 py-3.5 bg-white/[0.02] border border-white/10 hover:border-white/20 text-white text-xs font-bold tracking-widest uppercase rounded-full hover:bg-white/[0.05] transition-all duration-300 active:scale-[0.98]">
                Plan Your Trip
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative w-full">
            <div className="w-full bg-white/[0.01] border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <h4 className="text-sm font-bold tracking-wide text-white text-left">Select Your Itinerary Style</h4>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/></svg>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {(["Romantic", "Culinary", "Culture"] as const).map(style => (
                  <button
                    key={style}
                    onClick={() => setActiveBlueprint(style)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                      activeBlueprint === style
                        ? "bg-white text-black border-white"
                        : "bg-white/[0.02] text-white/60 border-white/5 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>

              <div className="space-y-4 text-left">
                {ITINERARY_PRESETS[activeBlueprint].map((day, i) => (
                  <div key={day.day} className="flex gap-4 group/item">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-white group-hover/item:bg-white group-hover/item:text-black transition-colors">
                        {day.day}
                      </div>
                      {i < 2 ? <div className="w-[1px] flex-1 bg-white/15 my-1"></div> : null}
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-[12px] font-bold text-white tracking-wide">{day.title}</h5>
                        <span className="text-[10px] text-white/40 font-mono flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {day.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/50 leading-relaxed mt-1">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-white/40">Includes VIP fast-pass & transfers</span>
                <button
                  onClick={() => {
                    setInquiryMessage(`Hi, I'm interested in booking the bespoke ${activeBlueprint} itinerary.`);
                    scrollToSection("cta");
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white hover:underline uppercase tracking-wider"
                >
                  <span>Customize This</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY CHOOSE US */}
      <section id="section-why-us" className="content-section">
        <div className="section-inner max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-3 block">Pure Excellence</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Why Travelers Choose Us
              </h2>
              <p className="text-sm text-white/50 leading-relaxed mt-4 max-w-md">
                We believe every journey should feel effortless, inspiring, and unforgettable. Our local expertise and carefully planned experiences ensure you enjoy Paris without the stress of planning.
              </p>

              <div className="grid grid-cols-3 gap-6 mt-8 w-full border-t border-white/5 pt-8">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">100%</p>
                  <p className="text-[9px] uppercase tracking-widest text-white/40 font-semibold mt-1">Bespoke</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">12k+</p>
                  <p className="text-[9px] uppercase tracking-widest text-white/40 font-semibold mt-1">Stories Crafted</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">4.9★</p>
                  <p className="text-[9px] uppercase tracking-widest text-white/40 font-semibold mt-1">Guest Rating</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 transition-all duration-300 text-left flex flex-col justify-between min-h-[200px] hover:border-white/20 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-2">Expert Local Guides</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Experience Paris through passionate local guides who know every hidden gem. Learn history that you won't find in textbooks.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 transition-all duration-300 text-left flex flex-col justify-between min-h-[200px] hover:border-white/20 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/></svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-2">Personalized Itineraries</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Every trip is customized to match your interests, pace, and travel style. We adjust to you, not the other way around.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 transition-all duration-300 text-left flex flex-col justify-between min-h-[200px] hover:border-white/20 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-2">Luxury & Comfort</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Handpicked hotels, premium transportation, and seamless travel arrangements. We secure the best vistas and tables.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 transition-all duration-300 text-left flex flex-col justify-between min-h-[200px] hover:border-white/20 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-2">24/7 Travel Support</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Our team is always available to assist you before and during your journey. Changes, emergencies, or updates handled instantly.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: POPULAR EXPERIENCES */}
      <section id="section-experiences" className="content-section">
        <div className="section-inner max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="text-left max-w-xl">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-3 block">Curated Portfolios</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Discover Our Signature Experiences
              </h2>
              <p className="text-sm text-white/50 leading-relaxed mt-4">
                Explore the most iconic and unforgettable experiences Paris has to offer. Select a journey below to view inclusions, pricing, and schedules.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6 md:mt-0 max-w-full overflow-x-auto pb-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? "bg-white text-black border-white"
                      : "bg-white/[0.02] text-white/60 border-white/5 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map(exp => (
              <div
                key={exp.id}
                onClick={() => setSelectedExperience(exp)}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-950/40 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 hover:shadow-[0_20px_50px_rgba(255,255,255,0.03)] cursor-pointer transition-all duration-300 min-h-[360px]"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent z-10"></div>
                  <img src={exp.image} alt={exp.title} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-white/80">{exp.category}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between text-left relative z-20 bg-gradient-to-b from-neutral-950/0 via-neutral-950/80 to-neutral-950">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-white/40">Duration</p>
                      <p className="text-xs font-semibold text-white/80 flex items-center gap-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {exp.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-widest text-white/40">Inquire Cost</p>
                      <p className="text-xs font-semibold text-white/90 mt-0.5">{exp.priceEstimate}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: TESTIMONIALS */}
      <section id="section-testimonials" className="content-section">
        <div className="section-inner max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/[0.01] rounded-full blur-[80px] pointer-events-none"></div>

          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-3 block">Guest Journals</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Loved by Travelers Worldwide</h2>
          </div>

          <div className="relative">
            <div className="bg-white/[0.01] border border-white/10 rounded-[32px] p-8 md:p-14 text-center backdrop-blur-xl relative">
              <span className="absolute top-6 left-10 text-8xl font-serif text-white/5 pointer-events-none">&ldquo;</span>

              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: TESTIMONIALS[testimonialIndex].rating }).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              
              <p className="text-lg md:text-2xl font-light text-white leading-relaxed max-w-3xl mx-auto italic">
                "{TESTIMONIALS[testimonialIndex].quote}"
              </p>

              <div className="mt-8">
                <p className="text-sm font-bold text-white tracking-wide">— {TESTIMONIALS[testimonialIndex].author}</p>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">{TESTIMONIALS[testimonialIndex].location}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={() => setTestimonialIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white bg-black hover:bg-white/[0.04] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      testimonialIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/20"
                    }`}
                  ></button>
                ))}
              </div>

              <button onClick={() => setTestimonialIndex(prev => (prev + 1) % TESTIMONIALS.length)} className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white bg-black hover:bg-white/[0.04] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA / INQUIRE */}
      <section id="section-cta" className="content-section">
        <div className="section-inner max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 text-left flex flex-col items-start">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-3 block">Start Your Journey</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Your Paris Adventure Starts Today
              </h2>
              <p className="text-sm text-white/60 leading-relaxed mt-4 max-w-md">
                Let us handle every detail while you focus on creating unforgettable memories. Whether you're planning a romantic getaway, family vacation, or luxury holiday, we're here to make your dream trip a reality.
              </p>

              <div className="space-y-4 mt-8 w-full max-w-md">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Bespoke Curation Blueprint</p>
                    <p className="text-[11px] text-white/40">Free 30-minute tailored tour outline mapped around your exact desires.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">VIP Direct Fast-Pass Priority</p>
                    <p className="text-[11px] text-white/40">Exclusive skip-the-line privileges on major curated landmarks in Paris.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">24/7 Personal Concierge</p>
                    <p className="text-[11px] text-white/40">Dedicated support throughout your journey for anything you need.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/10 to-neutral-950/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/[0.01] border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-xl">
                
                {!inquirySubmitted ? (
                  <form onSubmit={handleInquirySubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 font-bold">Your Name</label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={e => setInquiryName(e.target.value)}
                        placeholder="e.g. Sarah Jennings"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 font-bold">Email Address</label>
                        <input
                          type="email"
                          required
                          value={inquiryEmail}
                          onChange={e => setInquiryEmail(e.target.value)}
                          placeholder="sarah@example.com"
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 font-bold">Guest Count</label>
                        <select
                          value={inquiryGuests}
                          onChange={e => setInquiryGuests(e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
                        >
                          <option value="1 Guest">1 Guest</option>
                          <option value="2 Guests">2 Guests</option>
                          <option value="3-4 Guests">3-4 Guests</option>
                          <option value="5+ Guests">5+ Guests</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 font-bold">Signature Experience Interest</label>
                      <select
                        value={inquiryExperience}
                        onChange={e => setInquiryExperience(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
                      >
                        {EXPERIENCES.map(exp => (
                          <option key={exp.id} value={exp.title} className="bg-neutral-950 text-white">{exp.title}</option>
                        ))}
                        <option value="Fully Customized Blueprint" className="bg-neutral-950 text-white">Fully Customized Blueprint</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 font-bold">Special Requests (Optional)</label>
                      <textarea
                        rows={3}
                        value={inquiryMessage}
                        onChange={e => setInquiryMessage(e.target.value)}
                        placeholder="Dietary preferences, special occasion, dates details..."
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      />
                    </div>

                    <button type="submit" className="w-full mt-4 bg-white hover:bg-neutral-100 text-black py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2">
                      <span>Inquire Now</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </button>
                  </form>
                ) : (
                  <div className="py-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Inquiry Successfully Received</h3>
                    <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Lumi&egrave;re Paris. Our luxury curators are crafting a personalized response. Expect a response in your inbox within 12 hours.
                    </p>

                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-2 w-full">
                      <button onClick={resetInquiryForm} className="text-xs text-white/60 hover:text-white underline">
                        Send another inquiry
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="section-footer" className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-7xl z-10 bg-white/[0.02] border border-white/10 rounded-[32px] pt-10 pb-8 px-6 md:px-12 opacity-0 translate-y-5 pointer-events-none transition-all duration-600 backdrop-blur-xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
          
          <div>
            <span className="text-base font-bold tracking-[0.2em] text-white">LUMIÈRE PARIS</span>
            <p className="text-xs text-white/40 mt-4 leading-relaxed">
              Curating luxury travel experiences that inspire. Experience Paris like a local with unmatched exclusivity.
            </p>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Navigations</h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => scrollToSection("hero")} className="text-white/60 hover:text-white">Home</button></li>
              <li><button onClick={() => scrollToSection("why-us")} className="text-white/60 hover:text-white">Why Us</button></li>
              <li><button onClick={() => scrollToSection("experiences")} className="text-white/60 hover:text-white">Experiences</button></li>
              <li><button onClick={() => scrollToSection("testimonials")} className="text-white/60 hover:text-white">Testimonials</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Paris Offices</h5>
            <p className="text-xs text-white/60 leading-relaxed">
              12 Rue de la Paix<br />75002 Paris, France
            </p>
            <p className="text-xs text-white/40 mt-2 font-mono">
              concierge@lumiere.paris
            </p>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Inquiries</h5>
            <p className="text-xs text-white/60 leading-relaxed">
              Interested in a bespoke custom itinerary?
            </p>
            <button onClick={() => scrollToSection("cta")} className="mt-4 px-4 py-2 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider hover:border-white/30 text-white block w-fit">
              Contact Curators
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>&copy; 2026 Lumi&egrave;re Travel. Crafted for memorable European adventures.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/50">Privacy Policy</a>
            <a href="#" className="hover:text-white/50">Terms & Service</a>
            <a href="#" className="hover:text-white/50">Cookie Policy</a>
          </div>
        </div>
      </footer>

      {/* EXPERIENCE POPUP DETAILS MODAL */}
      {selectedExperience && (
        <div id="exp-modal-backdrop" onClick={(e) => e.target === e.currentTarget && setSelectedExperience(null)} className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md flex items-center justify-center">
          <div className="relative w-full max-w-[650px] mx-4 bg-neutral-950 border border-white/10 rounded-[32px] overflow-hidden p-6 md:p-8 text-left shadow-2xl backdrop-blur-2xl">
            
            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-6">
              <img src={selectedExperience.image} alt={selectedExperience.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
              <button onClick={() => setSelectedExperience(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <span className="text-[9px] font-bold tracking-widest uppercase text-white/40 block mb-2">{selectedExperience.category}</span>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{selectedExperience.title}</h3>
            <p className="text-xs text-white/60 leading-relaxed mb-6">{selectedExperience.description}</p>

            <div className="mb-6">
              <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-3">Key Curated Inclusions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedExperience.highlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="text-xs text-white/80">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-5 flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-white/40">Exclusivity Cost</p>
                <p className="text-sm font-bold text-white">{selectedExperience.priceEstimate}</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setSelectedExperience(null)} className="px-4 py-2.5 border border-white/10 hover:border-white/20 rounded-xl text-xs font-semibold text-white/60 hover:text-white">
                  Close
                </button>
                <button
                  onClick={() => {
                    setInquiryExperience(selectedExperience.title);
                    setSelectedExperience(null);
                    scrollToSection("cta");
                  }}
                  className="px-5 py-2.5 bg-white text-black font-semibold text-xs rounded-xl hover:bg-neutral-100"
                >
                  Book Journey
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FLOATING SCROLL PROGRESS INDICATOR DOTS */}
      <div id="scroll-progress" className="fixed bottom-24 right-24 z-50 flex flex-col items-center gap-6 opacity-100 transition-opacity duration-500">
        {SECTIONS.map((s, idx) => {
          return (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id.replace("section-", ""))}
              className={`progress-dot w-1.5 h-1.5 rounded-full transition-all ${
                idx === 0 ? "bg-white scale-[1.5]" : "bg-white/20"
              }`}
              title={s.label}
            ></button>
          );
        })}
      </div>

      {/* FULL SCREEN PRELOADER */}
      {!imagesLoaded && (
        <div id="loader" className="fixed inset-0 bg-[#060606] flex flex-col justify-center items-center z-[200]">
          <div className="loader-card text-center">
            <div className="text-xl font-bold tracking-[0.28em] text-white/90 uppercase mb-4">Lumière</div>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-2 mx-auto">
              <div 
                className="h-full bg-gradient-to-r from-white/50 to-white/95 rounded-full transition-all duration-150"
                style={{ width: `${loadPercentage}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-white/40 font-medium tracking-wider font-mono">Loading Frames... {loadPercentage}%</div>
          </div>
        </div>
      )}

    </div>
  );
}
