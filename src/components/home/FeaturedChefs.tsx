import { Link } from "react-router-dom";
import { Star, Clock, MapPin, ChevronLeft, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredChefs = [
  {
    id: "1",
    name: "أم أحمد",
    specialty: "أكل مصري تقليدي",
    rating: 4.9,
    reviewCount: 234,
    deliveryTime: "30-45",
    location: "المعادي",
    image: "https://images.unsplash.com/photo-1595257841889-eca2678454e2?w=300&h=300&fit=crop",
    verified: true,
    featured: ["كشري", "ملوخية", "محشي"],
  },
  {
    id: "2",
    name: "الشيف كريم",
    specialty: "مشويات وستيك",
    rating: 4.8,
    reviewCount: 189,
    deliveryTime: "40-55",
    location: "مدينة نصر",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&h=300&fit=crop",
    verified: true,
    featured: ["ريب آي", "كباب", "كفتة"],
  },
  {
    id: "3",
    name: "ماما فاطمة",
    specialty: "حلويات شرقية",
    rating: 5.0,
    reviewCount: 312,
    deliveryTime: "25-35",
    location: "الزمالك",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=300&fit=crop",
    verified: true,
    featured: ["بسبوسة", "كنافة", "أم علي"],
  },
  {
    id: "4",
    name: "أبو السعود",
    specialty: "مأكولات بحرية",
    rating: 4.7,
    reviewCount: 156,
    deliveryTime: "35-50",
    location: "الإسكندرية",
    image: "https://images.unsplash.com/photo-1622020457014-aed1cc44f25e?w=300&h=300&fit=crop",
    verified: false,
    featured: ["سمك مشوي", "جمبري", "كاليماري"],
  },
];

export function FeaturedChefs() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              طباخين مميزين
            </h2>
            <p className="text-muted-foreground">
              أفضل الطباخين المنزليين في منطقتك
            </p>
          </div>
          <Link to="/explore">
            <Button variant="outline" className="hidden md:flex gap-2">
              عرض الكل
              <ChevronLeft className="h-4 w-4 rtl-flip" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredChefs.map((chef, index) => (
            <Link
              key={chef.id}
              to={`/chef/${chef.id}`}
              className="card-meal group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Chef Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {chef.verified && (
                  <div className="absolute top-3 right-3 badge-verified">
                    <BadgeCheck className="h-3 w-3" />
                    موثق
                  </div>
                )}
              </div>

              {/* Chef Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-secondary transition-colors">
                    {chef.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{chef.specialty}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-foreground">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    <span className="font-medium">{chef.rating}</span>
                    <span className="text-muted-foreground">({chef.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{chef.deliveryTime} د</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{chef.location}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {chef.featured.map((dish) => (
                    <span
                      key={dish}
                      className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/explore">
            <Button variant="outline" className="gap-2">
              عرض كل الطباخين
              <ChevronLeft className="h-4 w-4 rtl-flip" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
