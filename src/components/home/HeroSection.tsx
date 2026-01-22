import { Search, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden bg-pattern-dots">
      <div className="container section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-right">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium animate-fade-in">
                🍲 أكثر من ١٠٠٠ طباخ منزلي موثوق
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight animate-fade-in">
                أكل بيتك
                <br />
                <span className="text-gradient-warm">لحد باب بيتك</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-fade-in">
                اكتشف أشهى الأطباق المنزلية من طباخين موثوقين في منطقتك. 
                طعام حقيقي، بمذاق البيت، يوصلك طازج.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto lg:mx-0 animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-2xl shadow-medium">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
                  <MapPin className="h-5 w-5 text-secondary shrink-0" />
                  <input
                    type="text"
                    placeholder="أدخل عنوانك أو منطقتك..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button className="btn-hero py-6 sm:py-3">
                  <Search className="h-5 w-5" />
                  <span className="hidden sm:inline">ابحث</span>
                </Button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                أو <button className="text-secondary hover:underline">استخدم موقعي الحالي</button>
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4 animate-fade-in">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">+١٠٠٠</div>
                <div className="text-sm text-muted-foreground">طباخ موثوق</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">+٥٠٠٠</div>
                <div className="text-sm text-muted-foreground">وجبة يومياً</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">٤.٨⭐</div>
                <div className="text-sm text-muted-foreground">تقييم العملاء</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 animate-float">
              <img
                src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=600&fit=crop"
                alt="طعام منزلي شهي"
                className="w-full max-w-lg mx-auto rounded-3xl shadow-warm"
              />
              {/* Floating Cards */}
              <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-2xl shadow-medium animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-2xl">👨‍🍳</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">أم أحمد</div>
                    <div className="text-sm text-muted-foreground">⭐ ٤.٩ • +٢٠٠ طلب</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-8 -left-4 bg-card p-3 rounded-xl shadow-medium animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚴</span>
                  <span className="text-sm font-medium">توصيل خلال ٣٠ دقيقة</span>
                </div>
              </div>
            </div>
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
