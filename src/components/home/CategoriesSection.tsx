import { Link } from "react-router-dom";

const categories = [
  { id: "egyptian", name: "أكل مصري", emoji: "🍲", count: 245 },
  { id: "grilled", name: "مشويات", emoji: "🍖", count: 128 },
  { id: "oriental", name: "شرقي", emoji: "🥙", count: 186 },
  { id: "seafood", name: "مأكولات بحرية", emoji: "🦐", count: 94 },
  { id: "healthy", name: "أكل صحي", emoji: "🥗", count: 156 },
  { id: "desserts", name: "حلويات", emoji: "🍰", count: 112 },
  { id: "breakfast", name: "فطور", emoji: "🍳", count: 78 },
  { id: "drinks", name: "مشروبات", emoji: "🥤", count: 65 },
];

export function CategoriesSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            اكتشف حسب النوع
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            من الأكل المصري التقليدي للأكلات العالمية - اختار اللي يعجبك
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/explore?category=${category.id}`}
              className="group flex flex-col items-center p-6 rounded-2xl bg-background hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.emoji}
              </div>
              <h3 className="font-medium text-foreground text-center mb-1">
                {category.name}
              </h3>
              <span className="text-xs text-muted-foreground">
                {category.count} طبق
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
