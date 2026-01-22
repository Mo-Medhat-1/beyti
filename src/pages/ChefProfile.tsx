import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Star,
  Clock,
  MapPin,
  BadgeCheck,
  Share2,
  Heart,
  MessageCircle,
  ChevronLeft,
  Plus,
} from "lucide-react";

// Mock data
const chefData = {
  id: "1",
  name: "أم أحمد",
  bio: "طباخة منزلية بخبرة أكثر من ٢٠ سنة. متخصصة في الأكل المصري التقليدي بوصفات عائلية موروثة. كل أكلة بتتعمل بحب وبأجود المكونات الطازجة.",
  specialty: "أكل مصري تقليدي",
  rating: 4.9,
  reviewCount: 234,
  orderCount: 1250,
  joinedDate: "٢٠٢٢",
  location: "المعادي، القاهرة",
  deliveryTime: "30-45",
  verified: true,
  avatar: "https://images.unsplash.com/photo-1595257841889-eca2678454e2?w=300&h=300&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop",
  workingHours: "٩ ص - ٩ م",
  badges: ["موثق", "أكثر من ١٠٠٠ طلب", "تقييم ممتاز"],
};

const chefMeals = [
  {
    id: "1",
    name: "كشري مصري أصلي",
    price: 45,
    originalPrice: 55,
    rating: 4.9,
    reviewCount: 89,
    prepTime: "25",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    tags: ["مصري", "نباتي"],
    available: true,
  },
  {
    id: "4",
    name: "ملوخية بالأرانب",
    price: 120,
    rating: 5.0,
    reviewCount: 156,
    prepTime: "45",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    tags: ["مصري", "تقليدي"],
    available: true,
  },
  {
    id: "10",
    name: "محشي كوسة",
    price: 80,
    rating: 4.8,
    reviewCount: 67,
    prepTime: "50",
    image: "https://images.unsplash.com/photo-1615719413546-198b25453f85?w=400&h=300&fit=crop",
    tags: ["مصري", "خضار"],
    available: true,
  },
  {
    id: "11",
    name: "فتة بالخل والثوم",
    price: 65,
    rating: 4.7,
    reviewCount: 45,
    prepTime: "30",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    tags: ["مصري"],
    available: false,
  },
];

const reviews = [
  {
    id: 1,
    user: "محمد عبدالله",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    date: "منذ يومين",
    text: "الكشري تحفة! طعم زي بالظبط أكل ماما. هطلب تاني أكيد.",
    meal: "كشري مصري",
  },
  {
    id: 2,
    user: "سارة أحمد",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    date: "منذ أسبوع",
    text: "الملوخية كانت رهيبة والأرانب طرية جداً. شكراً أم أحمد!",
    meal: "ملوخية بالأرانب",
  },
  {
    id: 3,
    user: "أحمد كريم",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 4,
    date: "منذ أسبوعين",
    text: "المحشي كان لذيذ بس التوصيل اتأخر شوية.",
    meal: "محشي كوسة",
  },
];

export default function ChefProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"meals" | "reviews">("meals");

  return (
    <Layout>
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={chefData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="container -mt-16 relative z-10">
        {/* Chef Header */}
        <div className="bg-card rounded-2xl p-6 shadow-medium mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={chefData.avatar}
                alt={chefData.name}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-card shadow-soft"
              />
              {chefData.verified && (
                <div className="absolute -bottom-2 -right-2 bg-secondary text-secondary-foreground p-2 rounded-full">
                  <BadgeCheck className="h-5 w-5" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {chefData.name}
                  </h1>
                  <p className="text-secondary font-medium mb-2">
                    {chefData.specialty}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <strong className="text-foreground">{chefData.rating}</strong>
                      ({chefData.reviewCount} تقييم)
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {chefData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {chefData.deliveryTime} دقيقة
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="h-5 w-5" />
                    تواصل
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                {chefData.bio}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{chefData.orderCount}+</div>
                  <div className="text-sm text-muted-foreground">طلب مكتمل</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{chefData.rating}</div>
                  <div className="text-sm text-muted-foreground">تقييم</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{chefMeals.length}</div>
                  <div className="text-sm text-muted-foreground">طبق متاح</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{chefData.joinedDate}</div>
                  <div className="text-sm text-muted-foreground">انضم في</div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {chefData.badges.map((badge) => (
                  <span key={badge} className="badge-verified">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border mb-8">
          <button
            onClick={() => setActiveTab("meals")}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === "meals"
                ? "text-secondary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            الأطباق ({chefMeals.length})
            {activeTab === "meals" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === "reviews"
                ? "text-secondary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            التقييمات ({reviews.length})
            {activeTab === "reviews" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
            )}
          </button>
        </div>

        {/* Content */}
        {activeTab === "meals" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {chefMeals.map((meal) => (
              <div
                key={meal.id}
                className={`card-meal group ${!meal.available ? "opacity-60" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {meal.originalPrice && (
                    <div className="absolute top-3 right-3 badge-discount">
                      خصم {Math.round((1 - meal.price / meal.originalPrice) * 100)}%
                    </div>
                  )}
                  {!meal.available && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-muted text-muted-foreground font-medium">
                        غير متاح حالياً
                      </span>
                    </div>
                  )}
                  {meal.available && (
                    <Button
                      size="icon"
                      className="absolute bottom-3 left-3 h-10 w-10 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-warm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {meal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link to={`/meal/${meal.id}`}>
                    <h3 className="font-semibold text-lg text-foreground hover:text-secondary transition-colors">
                      {meal.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-secondary">
                        {meal.price} ج.م
                      </span>
                      {meal.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {meal.originalPrice} ج.م
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        {meal.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meal.prepTime} د
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6 pb-16">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={review.avatar}
                    alt={review.user}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{review.user}</h4>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground mb-2">{review.text}</p>
                    <span className="text-sm text-muted-foreground">طلب: {review.meal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
