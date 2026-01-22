import { Search, ShoppingBag, Truck, Utensils } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "ابحث واختار",
    description: "اكتشف طباخين بالقرب منك وتصفح أطباقهم المميزة",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: ShoppingBag,
    title: "اطلب بسهولة",
    description: "أضف أطباقك المفضلة للسلة وأكمل الطلب بخطوات بسيطة",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Truck,
    title: "تابع التوصيل",
    description: "تابع طلبك لحظة بلحظة حتى يوصل لباب بيتك",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Utensils,
    title: "استمتع بالطعم",
    description: "استمتع بطعام منزلي طازج وشاركنا رأيك",
    color: "bg-secondary/10 text-secondary",
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            كيف يعمل بيتي؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            في ٤ خطوات بسيطة، اطلب أكل البيت وانت في بيتك
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-border -translate-x-1/2" />
              )}

              {/* Step Content */}
              <div className="relative z-10">
                <div
                  className={`w-24 h-24 mx-auto rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="h-10 w-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
