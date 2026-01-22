import { Shield, Award, Clock, Truck, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "موثوق وآمن",
    description: "كل الطباخين موثقين ومطابخهم مفحوصة",
  },
  {
    icon: Award,
    title: "جودة مضمونة",
    description: "مكونات طازجة وتحضير بأعلى معايير النظافة",
  },
  {
    icon: Clock,
    title: "توصيل سريع",
    description: "طلبك يوصلك طازج في أقل من ساعة",
  },
  {
    icon: Truck,
    title: "تتبع مباشر",
    description: "تابع طلبك لحظة بلحظة على الخريطة",
  },
  {
    icon: CreditCard,
    title: "دفع آمن",
    description: "ادفع كاش أو أونلاين بأمان تام",
  },
  {
    icon: Headphones,
    title: "دعم ٢٤/٧",
    description: "فريقنا جاهز لمساعدتك في أي وقت",
  },
];

export function FeaturesSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            ليه بيتي؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مميزات تخلي تجربتك مع بيتي استثنائية
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-2xl bg-background hover:shadow-soft transition-all duration-300"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
