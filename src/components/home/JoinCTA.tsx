import { Link } from "react-router-dom";
import { ChefHat, Truck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  {
    icon: ChefHat,
    title: "انضم كطباخ",
    description: "شارك موهبتك واكسب من مطبخك. انضم لأكثر من ١٠٠٠ طباخ منزلي ناجح.",
    cta: "ابدأ الآن",
    href: "/become-chef",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Truck,
    title: "كن سائق توصيل",
    description: "اشتغل بوقتك واكسب مع كل توصيلة. سجل الآن وابدأ فوراً.",
    cta: "سجل كسائق",
    href: "/become-driver",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Package,
    title: "كن مورد",
    description: "وفر مكونات طازجة للطباخين. شريك نجاحهم ونجاحك.",
    cta: "انضم كمورد",
    href: "/become-supplier",
    color: "bg-accent/10 text-accent",
  },
];

export function JoinCTA() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            انضم لعائلة بيتي
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            سواء كنت طباخ موهوب، سائق نشيط، أو مورد موثوق - عندنا مكان ليك
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 text-center hover:shadow-medium transition-all duration-300 group"
            >
              <div
                className={`w-20 h-20 mx-auto rounded-2xl ${role.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <role.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {role.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {role.description}
              </p>
              <Link to={role.href}>
                <Button className="btn-hero w-full">{role.cta}</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
