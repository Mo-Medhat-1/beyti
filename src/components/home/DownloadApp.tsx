import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadApp() {
  return (
    <section className="section-padding bg-gradient-to-br from-secondary/10 to-accent/10">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-right">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              حمل تطبيق بيتي
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              تجربة أسهل وأسرع على موبايلك. اطلب، تابع، واستمتع بأكل البيت في أي مكان.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="btn-hero gap-3 px-6">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 2.047c-.21-.187-.467-.281-.72-.281-.26 0-.517.097-.72.288L4.7 12.768c-.15.144-.236.344-.236.556s.086.412.236.556l11.383 10.714c.203.191.46.288.72.288.253 0 .51-.094.72-.281l1.72-1.616c.204-.191.32-.458.32-.738s-.116-.547-.32-.738L10.14 13.324l9.103-8.185c.204-.191.32-.458.32-.738s-.116-.547-.32-.738l-1.72-1.616z"/>
                </svg>
                <div className="text-right">
                  <div className="text-xs opacity-80">حمل من</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </Button>
              <Button className="btn-hero-outline gap-3 px-6">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.4 12l2.298-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="text-right">
                  <div className="text-xs opacity-80">احصل عليه من</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-64 h-auto bg-primary rounded-[3rem] p-3 shadow-warm">
                <div className="bg-background rounded-[2.5rem] aspect-[9/19] flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">📱</div>
                    <p className="text-sm text-muted-foreground">قريباً على متاجر التطبيقات</p>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
