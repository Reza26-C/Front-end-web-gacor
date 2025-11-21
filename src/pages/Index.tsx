import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Prediction from "@/components/Prediction";
import Contact from "@/components/Contact";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Prediction />
      <Contact />
      <Feedback />
      <Footer />
    </div>
  );
};

export default Index;
