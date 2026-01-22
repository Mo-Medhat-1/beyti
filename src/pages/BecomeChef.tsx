import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ChefHat,
  DollarSign,
  Clock,
  Star,
  TrendingUp,
  Shield,
  Users,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "اكسب من مطبخك",
    description: "حول شغفك بالطبخ لمصدر دخل. حدد أسعارك وجدولك.",
  },
  {
    icon: Clock,
    title: "اشتغل بوقتك",
    description: "أنت اللي بتحدد ساعات العمل والكمية اللي تقدر تحضرها.",
  },
  {
    icon: Users,
    title: "وصول لعملاء جدد",
    description: "آلاف العملاء بيدوروا على أكل بيتي حقيقي في منطقتك.",
  },
  {
    icon: Shield,
    title: "دعم كامل",
    description: "فريقنا معاك من التسجيل للنجاح. تدريب ودعم مستمر.",
  },
];

const steps = [
  { number: "١", title: "سجل حسابك", description: "أنشئ حسابك كطباخ في دقائق" },
  { number: "٢", title: "أكمل ملفك", description: "أضف صورك وتخصصك ومطبخك" },
  { number: "٣", title: "أضف أطباقك", description: "صور أطباقك وحدد أسعارها" },
  { number: "٤", title: "ابدأ الاستقبال", description: "استقبل طلباتك واكسب!" },
];

const testimonials = [
  {
    name: "أم أحمد",
    role: "طباخة منزلية - المعادي",
    image: "https://images.unsplash.com/photo-1595257841889-eca2678454e2?w=100&h=100&fit=crop",
    text: "بيتي غيرت حياتي! بقيت أكسب من البيت وأنا بعمل اللي بحبه. العملاء بيحبوا أكلي والتقييمات رائعة.",
    earnings: "+15,000 ج.م/شهر",
  },
  {
    name: "الشيف كريم",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop",
    role: "شيف مشويات - مدينة نصر",
    text: "بعد ما سبت الشغل في المطعم، بيتي وفرتلي منصة أوصل بيها لعملاء كتير. الدخل أحسن والراحة النفسية مالهاش حدود.",
    earnings: "+25,000 ج.م/شهر",
  },
];

export default function BecomeChefPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-transparent" />
        </div>
        <div className="container section-padding relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 mb-6">
              <ChefHat className="h-5 w-5" />
              <span>انضم لأكثر من ١٠٠٠ طباخ ناجح</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              حول موهبتك في الطبخ
              <br />
              <span className="text-secondary">لمصدر دخل</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              انضم لمنصة بيتي واكسب من مطبخك. آلاف العملاء بيدوروا على أكل بيتي حقيقي زي بتاعك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup?role=chef">
                <Button className="btn-hero text-lg px-8 py-6">
                  ابدأ الآن - مجاناً
                  <ArrowLeft className="h-5 w-5 rtl-flip" />
                </Button>
              </Link>
              <Button className="btn-hero-outline text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                تعرف أكتر
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              ليه تنضم لبيتي؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مميزات تخليك تبدأ رحلتك كطباخ منزلي ناجح
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 text-center hover:shadow-medium transition-all"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              ازاي تبدأ؟
            </h2>
            <p className="text-lg text-muted-foreground">
              ٤ خطوات بسيطة تبدأ بيها رحلتك
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-border -translate-x-1/2" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary text-secondary-foreground text-2xl font-bold flex items-center justify-center mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">+١٠٠٠</div>
              <div className="text-secondary-foreground/80">طباخ نشط</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">+٥٠٠٠</div>
              <div className="text-secondary-foreground/80">طلب يومي</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">٤.٨⭐</div>
              <div className="text-secondary-foreground/80">متوسط التقييم</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">١٥ألف+</div>
              <div className="text-secondary-foreground/80">متوسط الدخل الشهري</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              قصص نجاح
            </h2>
            <p className="text-lg text-muted-foreground">
              اسمع من طباخين زيك نجحوا مع بيتي
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-foreground mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-2 text-secondary font-bold">
                  <TrendingUp className="h-5 w-5" />
                  {testimonial.earnings}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            جاهز تبدأ رحلتك؟
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            انضم لآلاف الطباخين الناجحين واكسب من موهبتك
          </p>
          <Link to="/signup?role=chef">
            <Button className="btn-hero text-lg px-8 py-6 bg-secondary hover:bg-secondary/90">
              سجل كطباخ الآن
              <ArrowLeft className="h-5 w-5 rtl-flip" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
