
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ModernHeroSection from "@/components/home/ModernHeroSection";
import AboutSection from "@/components/home/AboutSection";
import CleanStatsSection from "@/components/home/CleanStatsSection";
import AcademicsSection from "@/components/home/AcademicsSection";
import AdmissionsSection from "@/components/home/AdmissionsSection";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import NewsEvents from "@/components/home/NewsEvents";
import PhotoGallery from "@/components/home/PhotoGallery";
import ModernTestimonialsCarousel from "@/components/home/ModernTestimonialsCarousel";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import AchievementsCarousel from "@/components/home/AchievementsCarousel";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px',
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
      section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000');
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <ModernHeroSection />
      
      <div className="reveal-section">
        <AboutSection />
      </div>
      
      <div className="reveal-section">
        <CleanStatsSection />
      </div>
      
      <div className="reveal-section">
        <AchievementsCarousel />
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
        <ModernTestimonialsCarousel />
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
