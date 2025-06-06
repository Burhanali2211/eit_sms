
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import AcademicsSection from "@/components/home/AcademicsSection";
import AdmissionsSection from "@/components/home/AdmissionsSection";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import NewsEvents from "@/components/home/NewsEvents";
import PhotoGallery from "@/components/home/PhotoGallery";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in', 'opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach(section => {
      section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      "bg-gradient-to-b from-white to-gray-50",
      "dark:from-gray-900 dark:to-gray-950",
      "transition-colors duration-300"
    )}>
      <Navbar />
      <HeroSection />
      
      <div className="reveal-section">
        <AboutSection />
      </div>
      
      <div className="reveal-section">
        <AcademicsSection />
      </div>
      
      <div className="reveal-section">
        <AdmissionsSection />
      </div>
      
      <div className="reveal-section">
        <FacilitiesSection />
      </div>
      
      <div className="reveal-section">
        <NewsEvents />
      </div>
      
      <div className="reveal-section">
        <PhotoGallery />
      </div>
      
      <div className="reveal-section">
        <ContactSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
