import { Heart } from "lucide-react";
// 1. Import gambar logo dari folder assets
import logoStunting from "../assets/logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* 2. Bagian ini diganti: dari kotak teks CS menjadi Gambar Logo */}
              <img 
                src={logoStunting} 
                alt="Logo Cegah Stunting" 
                className="h-12 w-auto object-contain rounded-lg bg-white p-1" 
              />
              <span className="text-xl font-bold">Cegah Stunting</span>
            </div>
            <p className="text-background/80 text-sm">
              Platform digital untuk pencegahan stunting melalui prediksi dini pada anak.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Menu</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-primary transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#prediksi" className="hover:text-primary transition-colors">
                  Prediksi
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-primary transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>Email: not available</li>
              <li>Telepon: not available</li>
              <li>Semarang, Jawa Tengah, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-sm text-background/80 flex items-center justify-center gap-2">
            Dibuat dengan <Heart className="w-4 h-4 text-primary fill-primary" /> untuk generasi Indonesia yang lebih sehat
          </p>
          <p className="text-sm text-background/60 mt-2">
            © 2025 Cegah Stunting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;