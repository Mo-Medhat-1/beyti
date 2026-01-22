import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "محمد عبدالله",
    role: "عميل منتظم",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    text: "بيتي غير حياتي! بقيت آكل أكل بيتي حقيقي من غير ما أطبخ. أم أحمد بتعمل محشي زي بالظبط ماما بتعمله.",
  },
  {
    id: 2,
    name: "سارة أحمد",
    role: "أم عاملة",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "كأم شغالة، بيتي وفرلي وقت ومجهود كبير. الأكل طازج وصحي وعيالي بيحبوه. أنصح كل أم بالتجربة!",
  },
  {
    id: 3,
    name: "أحمد كريم",
    role: "طالب جامعي",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    text: "أسعار مناسبة للطلبة وأكل حقيقي مش زي المطاعم. الكشري من أم أحمد أحسن من أي محل!",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            آراء عملائنا
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            اسمع من ناس زيك جربوا بيتي
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="absolute top-4 left-4 h-8 w-8 text-secondary/30" />
              
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-primary-foreground/70">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-primary-foreground/90 leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
