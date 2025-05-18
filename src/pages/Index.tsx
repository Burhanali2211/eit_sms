
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import CalendarNotifications from "@/components/home/CalendarNotifications";
import AchievementsCarousel from "@/components/home/AchievementsCarousel";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import PrincipalNote from "@/components/home/PrincipalNote";
import Footer from "@/components/home/Footer";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const { isDarkMode } = useTheme();
  
  // Add scroll reveal effect
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
      
      {/* Hero with floating effect */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-school-primary/20 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-school-secondary/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <HeroSection />
      </div>
      
      {/* Main content with reveal animations */}
      <div className="reveal-section">
        <CalendarNotifications />
      </div>
      
      <div className="reveal-section">
        <AchievementsCarousel />
      </div>
      
      <div className="reveal-section">
        <FacilitiesSection />
      </div>
      
      <div className="reveal-section">
        <PrincipalNote />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
