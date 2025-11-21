import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  // Data kontak tetap ada
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "not available",
      link: "",
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "not available",
      link: "",
    },
    {
      icon: MapPin,
      title: "Alamat",
      content: "Semarang, Jawa Tengah, Indonesia",
      link: "https://maps.app.goo.gl/ouNH5ir9Ao7o8vcM6",
    },
  ];

  return (
    <section id="kontak" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Bagian Judul */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Kontak Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut atau konsultasi
          </p>
        </div>

        {/* Bagian Grid Info Kontak (Email, HP, Alamat) */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((item, index) => (
            <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-muted-foreground hover:text-primary transition-colors block"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{item.content}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bagian Form DIHAPUS dari sini */}
        
      </div>
    </section>
  );
};

export default Contact;