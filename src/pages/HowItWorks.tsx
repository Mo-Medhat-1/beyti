import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search,
  ShoppingBag,
  Truck,
  Star,
  MessageCircle,
  CreditCard,
  ChevronLeft,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "ابحث واكتشف",
    description: "استخدم الفلاتر لإيجاد طباخين بالقرب منك. شوف التقييمات والأطباق المتاحة.",
    details: [
      "البحث بالموقع أو نوع الأكل",
      "فلترة حسب التقييم والسعر",
      "مشاهدة صور الأطباق الحقيقية",
    ],
  },
  {
    icon: ShoppingBag,
    title: "اختار واطلب",
    description: "أضف أطباقك المفضلة للسلة واختار وقت التوصيل المناسب.",
    details: [
      "اختيار الكمية والإضافات",
      "تحديد وقت التوصيل",
      "إضافة ملاحظات خاصة",
    ],
  },
  {
    icon: CreditCard,
    title: "ادفع بأمان",
    description: "ادفع كاش عند الاستلام أو ببطاقتك أو محفظتك الإلكترونية.",
    details: [
      "دفع نقدي عند الاستلام",
      "بطاقة ائتمان أو خصم",
      "محافظ إلكترونية (فودافون كاش)",
    ],
  },
  {
    icon: Truck,
    title: "تابع وستلم",
    description: "تابع طلبك على الخريطة لحظة بلحظة حتى يوصلك طازج.",
    details: [
      "تتبع مباشر على الخريطة",
      "إشعارات بحالة الطلب",
      "التواصل مع السائق",
    ],
  },
  {
    icon: Star,
    title: "قيم وشارك",
    description: "بعد ما تستمتع بوجبتك، شاركنا رأيك وساعد غيرك يختار.",
    details: [
      "تقييم الطباخ والسائق",
      "كتابة مراجعة تفصيلية",
      "مشاركة تجربتك مع أصحابك",
    ],
  },
];

const faqs = [
  {
    q: "ازاي أعرف إن الأكل نظيف وآمن؟",
    a: "كل طباخ على بيتي بيمر بعملية تحقق شاملة. بنفحص المطابخ ونتأكد من الالتزام بمعايير النظافة. كمان التقييمات والمراجعات بتساعدك تختار.",
  },
  {
    q: "لو الأكل وصل بارد أو فيه مشكلة؟",
    a: "رضاك أولوية. لو في أي مشكلة، تواصل معانا فوراً وهنحلها. ممكن نرجعلك فلوسك أو نبعتلك طلب جديد.",
  },
  {
    q: "أقدر ألغي الطلب؟",
    a: "أيوه، تقدر تلغي قبل ما الطباخ يبدأ التحضير. بعد البدء، ممكن يكون في رسوم إلغاء بسيطة.",
  },
  {
    q: "في حد أدنى للطلب؟",
    a: "الحد الأدنى بيختلف حسب الطباخ. هتلاقيه مكتوب في صفحة كل طباخ.",
  },
];

export default function HowItWorksPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-card">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            كيف يعمل بيتي؟
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            في خطوات بسيطة، اطلب أكل بيتي حقيقي من طباخين موثوقين في منطقتك
          </p>
          <Link to="/explore">
            <Button className="btn-hero">
              ابدأ الاستكشاف
              <ChevronLeft className="h-5 w-5 rtl-flip" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding">
        <div className="container">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground text-xl font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                    <step.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                          ✓
                        </div>
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="aspect-video rounded-2xl bg-card shadow-soft flex items-center justify-center">
                    <step.icon className="h-24 w-24 text-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              أسئلة شائعة
            </h2>
            <p className="text-lg text-muted-foreground">
              إجابات لأكتر الأسئلة اللي بتيجي لنا
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-background rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-secondary" />
                  {faq.q}
                </h3>
                <p className="text-muted-foreground pr-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            جاهز تجرب؟
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            اكتشف أشهى الأطباق المنزلية في منطقتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button className="btn-hero">استكشف الأطباق</Button>
            </Link>
            <Link to="/become-chef">
              <Button variant="outline" className="gap-2">
                انضم كطباخ
                <ChevronLeft className="h-4 w-4 rtl-flip" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
