import { Link } from "react-router-dom";
import { Star, Clock, Plus, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const popularMeals = [
  {
    id: "1",
    name: "كشري مصري أصلي",
    chef: "أم أحمد",
    chefId: "1",
    price: 45,
    originalPrice: 55,
    rating: 4.9,
    reviewCount: 89,
    prepTime: "25",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    tags: ["مصري", "نباتي"],
  },
  {
    id: "2",
    name: "محشي ورق عنب",
    chef: "ماما سميرة",
    chefId: "5",
    price: 75,
    rating: 4.8,
    reviewCount: 67,
    prepTime: "40",
    image: "https://images.unsplash.com/photo-1615719413546-198b25453f85?w=400&h=300&fit=crop",
    tags: ["مصري", "شرقي"],
  },
  {
    id: "3",
    name: "فتة شاورما",
    chef: "الشيف كريم",
    chefId: "2",
    price: 85,
    rating: 4.9,
    reviewCount: 124,
    prepTime: "30",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
    tags: ["شرقي", "لحوم"],
  },
  {
    id: "4",
    name: "ملوخية بالأرانب",
    chef: "أم أحمد",
    chefId: "1",
    price: 120,
    rating: 5.0,
    reviewCount: 156,
    prepTime: "45",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    tags: ["مصري", "تقليدي"],
  },
  {
    id: "5",
    name: "كنافة نابلسية",
    chef: "ماما فاطمة",
    chefId: "3",
    price: 60,
    rating: 4.9,
    reviewCount: 201,
    prepTime: "20",
    image: "https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=400&h=300&fit=crop",
    tags: ["حلويات", "شرقي"],
  },
  {
    id: "6",
    name: "سمك مشوي بالخضار",
    chef: "أبو السعود",
    chefId: "4",
    price: 150,
    rating: 4.7,
    reviewCount: 78,
    prepTime: "35",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&h=300&fit=crop",
    tags: ["بحري", "صحي"],
  },
];

export function PopularMeals() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              الأكثر طلباً
            </h2>
            <p className="text-muted-foreground">
              أطباق بتعجب الكل وبتتكرر كل يوم
            </p>
          </div>
          <Link to="/explore">
            <Button variant="outline" className="hidden md:flex gap-2">
              عرض الكل
              <ChevronLeft className="h-4 w-4 rtl-flip" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularMeals.map((meal, index) => (
            <div
              key={meal.id}
              className="card-meal group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Meal Image */}
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
                <Button
                  size="icon"
                  className="absolute bottom-3 left-3 h-10 w-10 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-warm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>

              {/* Meal Info */}
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

                <Link
                  to={`/chef/${meal.chefId}`}
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                >
                  بواسطة {meal.chef}
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

        <div className="mt-8 text-center md:hidden">
          <Link to="/explore">
            <Button variant="outline" className="gap-2">
              عرض كل الأطباق
              <ChevronLeft className="h-4 w-4 rtl-flip" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
