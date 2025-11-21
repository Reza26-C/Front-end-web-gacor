import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => scrollToSection("home")} className="flex items-center">
            <img src={logo} alt="Cegah Stunting Logo" className="h-12 w-auto" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("tentang")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Tentang Kami
            </button>
            <button
              onClick={() => scrollToSection("prediksi")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Prediksi
            </button>
            <button
              onClick={() => scrollToSection("kontak")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Kontak Kami
            </button>
            <Button
              onClick={() => scrollToSection("kritik")}
              variant="default"
            >
              Kritik & Saran
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("tentang")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Tentang Kami
            </button>
            <button
              onClick={() => scrollToSection("prediksi")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Prediksi
            </button>
            <button
              onClick={() => scrollToSection("kontak")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Kontak Kami
            </button>
            <Button
              onClick={() => scrollToSection("kritik")}
              className="w-full"
            >
              Kritik & Saran
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
