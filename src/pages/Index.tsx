
import { useEffect, useMemo } from "react";
import { lazy, Suspense } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// Lazy load components for better performance
const Navbar = lazy(() => import("@/components/layout/Navbar"));
const ProfessionalHeroSection = lazy(() => import("@/components/home/ProfessionalHeroSection"));
const AboutSection = lazy(() => import("@/components/home/AboutSection"));
const ProfessionalStatsSection = lazy(() => import("@/components/home/ProfessionalStatsSection"));
const AcademicsSection = lazy(() => import("@/components/home/AcademicsSection"));
const AdmissionsSection = lazy(() => import("@/components/home/AdmissionsSection"));
const FacilitiesSection = lazy(() => import("@/components/home/FacilitiesSection"));
const NewsEvents = lazy(() => import("@/components/home/NewsEvents"));
const PhotoGallery = lazy(() => import("@/components/home/PhotoGallery"));
const ModernTestimonialsCarousel = lazy(() => import("@/components/home/ModernTestimonialsCarousel"));
const ContactSection = lazy(() => import("@/components/home/ContactSection"));
const Footer = lazy(() => import("@/components/home/Footer"));

// Professional loading component
const SectionSkeleton = () => (
  <div className="animate-pulse py-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-6"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  const { isDarkMode } = useTheme();
  
  const observerOptions = useMemo(() => ({
    root: null,
    rootMargin: '-50px',
    threshold: 0.1
  }), []);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.add('animate-fade-in', 'opacity-100');
          target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(target);
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
  }, [observerOptions]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Suspense fallback={<div className="h-16 bg-white dark:bg-gray-900 animate-pulse"></div>}>
        <Navbar />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ProfessionalHeroSection />
      </Suspense>
      
      <div className="reveal-section">
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
      </div>
      
      <div className="reveal-section">
        <Suspense fallback={<SectionSkeleton />}>
          <ProfessionalStatsSection />
        </Suspense>
      </div>
      
      <div className="reveal-section">
        <Suspense fallback={<SectionSkeleton />}>
          <AcademicsSection />
        </Suspense>
      </div>
      
      <div className="reveal-section">
        <Suspense fallback={<SectionSkeleton />}>
          <AdmissionsSection />
        </Suspense>
      </div>
      
      <div className="reveal-section">
        <Suspense fallback={<SectionSkeleton />}>
          <FacilitiesSection />
        </Suspense>
      </div>
      
      <div className="reveal-section">
        <Suspense fallback={<SectionSkeleton />}>
          <ModernTestimonialsCarousel />
        </Suspense>
      </div>
      
      <div className="reveal-section">
        <Suspense fallback={<SectionSkeleton />}>
          <NewsEvents />
        </Suspense>
      </div>
      
      <div className="reveal-section">
        <Suspense fallback={<SectionSkeleton />}>
          <PhotoGallery />
        </Suspense>
      </div>
      
      <div className="reveal-section">
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </div>
      
      <Suspense fallback={<div className="h-32 bg-gray-100 dark:bg-gray-800 animate-pulse"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
