import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  Plus,
  ChevronDown,
  Grid,
  List,
  SlidersHorizontal,
  BadgeCheck,
} from "lucide-react";

const categories = [
  { id: "all", name: "الكل", emoji: "🍽️" },
  { id: "egyptian", name: "مصري", emoji: "🍲" },
  { id: "grilled", name: "مشويات", emoji: "🍖" },
  { id: "oriental", name: "شرقي", emoji: "🥙" },
  { id: "seafood", name: "بحري", emoji: "🦐" },
  { id: "healthy", name: "صحي", emoji: "🥗" },
  { id: "desserts", name: "حلويات", emoji: "🍰" },
];

const sortOptions = [
  { id: "recommended", name: "الأكثر ملاءمة" },
  { id: "rating", name: "الأعلى تقييماً" },
  { id: "price-low", name: "السعر: الأقل للأعلى" },
  { id: "price-high", name: "السعر: الأعلى للأقل" },
  { id: "time", name: "الأسرع توصيل" },
];

const meals = [
  {
    id: "1",
    name: "كشري مصري أصلي",
    chef: "أم أحمد",
    chefId: "1",
    chefVerified: true,
    price: 45,
    originalPrice: 55,
    rating: 4.9,
    reviewCount: 89,
    prepTime: "25",
    location: "المعادي",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    tags: ["مصري", "نباتي"],
  },
  {
    id: "2",
    name: "محشي ورق عنب",
    chef: "ماما سميرة",
    chefId: "5",
    chefVerified: true,
    price: 75,
    rating: 4.8,
    reviewCount: 67,
    prepTime: "40",
    location: "مدينة نصر",
    image: "https://images.unsplash.com/photo-1615719413546-198b25453f85?w=400&h=300&fit=crop",
    tags: ["مصري", "شرقي"],
  },
  {
    id: "3",
    name: "فتة شاورما",
    chef: "الشيف كريم",
    chefId: "2",
    chefVerified: true,
    price: 85,
    rating: 4.9,
    reviewCount: 124,
    prepTime: "30",
    location: "الزمالك",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
    tags: ["شرقي", "لحوم"],
  },
  {
    id: "4",
    name: "ملوخية بالأرانب",
    chef: "أم أحمد",
    chefId: "1",
    chefVerified: true,
    price: 120,
    rating: 5.0,
    reviewCount: 156,
    prepTime: "45",
    location: "المعادي",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    tags: ["مصري", "تقليدي"],
  },
  {
    id: "5",
    name: "كنافة نابلسية",
    chef: "ماما فاطمة",
    chefId: "3",
    chefVerified: true,
    price: 60,
    rating: 4.9,
    reviewCount: 201,
    prepTime: "20",
    location: "الزمالك",
    image: "https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=400&h=300&fit=crop",
    tags: ["حلويات", "شرقي"],
  },
  {
    id: "6",
    name: "سمك مشوي بالخضار",
    chef: "أبو السعود",
    chefId: "4",
    chefVerified: false,
    price: 150,
    rating: 4.7,
    reviewCount: 78,
    prepTime: "35",
    location: "الإسكندرية",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&h=300&fit=crop",
    tags: ["بحري", "صحي"],
  },
  {
    id: "7",
    name: "طاجن لحم بالبامية",
    chef: "ست الحسن",
    chefId: "6",
    chefVerified: true,
    price: 95,
    rating: 4.8,
    reviewCount: 145,
    prepTime: "50",
    location: "المعادي",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    tags: ["مصري", "لحوم"],
  },
  {
    id: "8",
    name: "فول وطعمية",
    chef: "عم حسن",
    chefId: "7",
    chefVerified: false,
    price: 35,
    rating: 4.6,
    reviewCount: 234,
    prepTime: "15",
    location: "وسط البلد",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
    tags: ["مصري", "فطور"],
  },
  {
    id: "9",
    name: "كباب وكفتة مشوية",
    chef: "الشيف كريم",
    chefId: "2",
    chefVerified: true,
    price: 180,
    rating: 4.9,
    reviewCount: 167,
    prepTime: "40",
    location: "مدينة نصر",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop",
    tags: ["مشويات", "لحوم"],
  },
];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredMeals = meals.filter((meal) => {
    const matchesCategory = selectedCategory === "all" || meal.tags.some(tag => 
      tag.toLowerCase().includes(selectedCategory)
    );
    const matchesSearch = meal.name.includes(searchQuery) || 
      meal.chef.includes(searchQuery) ||
      meal.tags.some(tag => tag.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="bg-card border-b border-border sticky top-16 md:top-20 z-40">
        <div className="container py-4">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث عن طبق أو طباخ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-beyti pr-12"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">القاهرة</span>
              </Button>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">فلترة</span>
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-background hover:bg-muted text-foreground"
                }`}
              >
                <span>{category.emoji}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container section-padding">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-1">
              استكشف الأطباق
            </h1>
            <p className="text-muted-foreground">
              {filteredMeals.length} طبق متاح في منطقتك
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="input-beyti py-2 pl-10 pr-4 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="hidden sm:flex border border-border rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-muted" : ""}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-muted" : ""}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Meals Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredMeals.map((meal, index) => (
            <div
              key={meal.id}
              className={`card-meal group ${
                viewMode === "list" ? "flex flex-row" : ""
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Meal Image */}
              <div className={`relative overflow-hidden ${
                viewMode === "list" ? "w-48 shrink-0" : "aspect-[4/3]"
              }`}>
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
              <div className="p-4 flex-1 space-y-3">
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
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-secondary transition-colors"
                >
                  {meal.chef}
                  {meal.chefVerified && (
                    <BadgeCheck className="h-4 w-4 text-secondary" />
                  )}
                </Link>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{meal.location}</span>
                </div>

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

        {filteredMeals.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              لا توجد نتائج
            </h3>
            <p className="text-muted-foreground">
              جرب تغيير الفلتر أو البحث بكلمات مختلفة
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
