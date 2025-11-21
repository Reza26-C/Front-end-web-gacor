import { Heart, Users, Target } from "lucide-react"; // Award dihapus karena tidak dipakai
import { Card, CardContent } from "@/components/ui/card";
import aboutImage from "@/assets/about-children.jpg";

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Peduli Kesehatan",
      description: "Komitmen untuk meningkatkan kesehatan anak Indonesia",
    },
    {
      icon: Users,
      title: "Berbasis Komunitas",
      description: "Melibatkan masyarakat dalam pencegahan stunting",
    },
    {
      icon: Target,
      title: "Deteksi Dini",
      description: "Sistem prediksi untuk identifikasi risiko stunting",
    },
  ];

  return (
    <section id="tentang" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tentang Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Platform digital yang didedikasikan untuk mencegah dan mengurangi angka stunting 
            di Indonesia melalui prediksi stunting dini pada anak.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Bersama Melawan Stunting
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Stunting adalah kondisi gagal tumbuh pada anak akibat kekurangan gizi kronis, 
              terutama pada 1.000 hari pertama kehidupan. Kondisi ini dapat berdampak jangka 
              panjang pada perkembangan fisik dan kognitif anak.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Melalui platform Cegah Stunting, kami menyediakan tools prediksi yang membantu mencegah stunting sejak dini. Sehingga mampu membantu mengurangi tingkat stunting.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl" />
            <img
              src={aboutImage}
              alt="Anak-anak sehat"
              className="relative rounded-3xl shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* --- BAGIAN INI DIPERBAIKI --- */}
        {/* Penjelasan Perubahan:
            1. 'md:grid-cols-3': Di layar tablet/laptop, langsung dibagi 3 kolom agar pas.
            2. 'lg:grid-cols-3': Di layar besar juga 3 kolom (sebelumnya 4, makanya ada sisa ruang).
            3. 'justify-center': Untuk memastikan konten berada di tengah.
        */}
        <div className="grid md:grid-cols-3 gap-6 justify-center">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;