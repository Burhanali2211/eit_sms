
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import CalendarNotifications from "@/components/home/CalendarNotifications";
import AchievementsCarousel from "@/components/home/AchievementsCarousel";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import PrincipalNote from "@/components/home/PrincipalNote";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <CalendarNotifications />
      <AchievementsCarousel />
      <FacilitiesSection />
      <PrincipalNote />
      <Footer />
    </div>
  );
};

export default Index;
