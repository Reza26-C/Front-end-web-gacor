import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-stunting.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20 -z-10" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-secondary rounded-full">
              <span className="text-sm font-semibold text-secondary-foreground">
                Platform Pencegahan Stunting
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Cegah Stunting,
              <span className="text-primary block mt-2">Wujudkan Generasi Sehat</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Sistem informasi dan prediksi stunting untuk membantu mencegah stunting sejak dini.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group"
                onClick={() => scrollToSection("prediksi")}
              >
                Cek Prediksi
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("tentang")}
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
            <img
              src={heroImage}
              alt="Cegah Stunting"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
