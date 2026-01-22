import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Star,
  Clock,
  MapPin,
  Plus,
  Minus,
  Heart,
  Share2,
  AlertTriangle,
  BadgeCheck,
  ChevronLeft,
} from "lucide-react";

const mealData = {
  id: "1",
  name: "كشري مصري أصلي",
  description: "كشري على الطريقة المصرية الأصلية بالعدس والحمص والمكرونة والأرز، مع صلصة الطماطم الحارة والبصل المحمر. وجبة كاملة ومشبعة.",
  chef: {
    id: "1",
    name: "أم أحمد",
    avatar: "https://images.unsplash.com/photo-1595257841889-eca2678454e2?w=100&h=100&fit=crop",
    rating: 4.9,
    verified: true,
  },
  price: 45,
  originalPrice: 55,
  rating: 4.9,
  reviewCount: 89,
  orderCount: 567,
  prepTime: "25",
  servingSize: "وجبة واحدة (٤٠٠ جم)",
  calories: "450",
  images: [
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop",
  ],
  tags: ["مصري", "نباتي", "مشبع"],
  ingredients: [
    "أرز مصري",
    "عدس أسود",
    "حمص",
    "مكرونة",
    "صلصة طماطم",
    "بصل محمر",
    "ثوم",
    "توابل مصرية",
  ],
  allergens: ["جلوتين", "بقوليات"],
  nutritionFacts: {
    calories: 450,
    protein: 15,
    carbs: 75,
    fat: 8,
  },
};

const relatedMeals = [
  {
    id: "4",
    name: "ملوخية بالأرانب",
    price: 120,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=150&fit=crop",
  },
  {
    id: "10",
    name: "محشي كوسة",
    price: 80,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1615719413546-198b25453f85?w=200&h=150&fit=crop",
  },
];

export default function MealDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const totalPrice = mealData.price * quantity;

  return (
    <Layout>
      <div className="container section-padding">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">الرئيسية</Link>
          <ChevronLeft className="h-4 w-4 rtl-flip" />
          <Link to="/explore" className="hover:text-foreground">استكشف</Link>
          <ChevronLeft className="h-4 w-4 rtl-flip" />
          <span className="text-foreground">{mealData.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-card">
              <img
                src={mealData.images[selectedImage]}
                alt={mealData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {mealData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-secondary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {mealData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                {mealData.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-secondary">
                  {mealData.price} ج.م
                </span>
                {mealData.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {mealData.originalPrice} ج.م
                  </span>
                )}
                {mealData.originalPrice && (
                  <span className="badge-discount">
                    خصم {Math.round((1 - mealData.price / mealData.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-secondary text-secondary" />
                <strong className="text-lg">{mealData.rating}</strong>
                <span className="text-muted-foreground">({mealData.reviewCount} تقييم)</span>
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-5 w-5" />
                {mealData.prepTime} دقيقة
              </span>
              <span className="text-muted-foreground">
                {mealData.orderCount}+ طلب
              </span>
            </div>

            {/* Chef */}
            <Link
              to={`/chef/${mealData.chef.id}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-card hover:shadow-soft transition-all"
            >
              <img
                src={mealData.chef.avatar}
                alt={mealData.chef.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{mealData.chef.name}</span>
                  {mealData.chef.verified && (
                    <BadgeCheck className="h-5 w-5 text-secondary" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  {mealData.chef.rating}
                </div>
              </div>
              <ChevronLeft className="h-5 w-5 text-muted-foreground rtl-flip" />
            </Link>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">الوصف</h3>
              <p className="text-muted-foreground leading-relaxed">
                {mealData.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-card">
                <div className="text-sm text-muted-foreground mb-1">حجم الوجبة</div>
                <div className="font-medium">{mealData.servingSize}</div>
              </div>
              <div className="p-4 rounded-xl bg-card">
                <div className="text-sm text-muted-foreground mb-1">السعرات</div>
                <div className="font-medium">{mealData.calories} سعرة</div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">المكونات</h3>
              <div className="flex flex-wrap gap-2">
                {mealData.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-3 py-1.5 text-sm rounded-lg bg-card text-foreground"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Allergens */}
            {mealData.allergens.length > 0 && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
                <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-foreground mb-1">تحذير للحساسية</div>
                  <p className="text-sm text-muted-foreground">
                    يحتوي على: {mealData.allergens.join("، ")}
                  </p>
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">الكمية:</span>
                <div className="flex items-center gap-3 bg-card rounded-xl p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? "text-destructive" : ""}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button className="btn-hero flex-1">
                  <Plus className="h-5 w-5" />
                  أضف للسلة • {totalPrice} ج.م
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Meals */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">
            قد يعجبك أيضاً
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedMeals.map((meal) => (
              <Link
                key={meal.id}
                to={`/meal/${meal.id}`}
                className="card-meal group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">{meal.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-secondary">{meal.price} ج.م</span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      {meal.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
