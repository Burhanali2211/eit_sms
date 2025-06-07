
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";

const ProfessionalHeroSection = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const achievements = [
    {
      icon: Users,
      number: "2,500+",
      label: "Students Enrolled",
      description: "Active learners in our community"
    },
    {
      icon: BookOpen,
      number: "150+",
      label: "Expert Faculty",
      description: "Qualified and experienced educators"
    },
    {
      icon: Award,
      number: "28",
      label: "Years of Excellence",
      description: "Decades of educational leadership"
    },
    {
      icon: GraduationCap,
      number: "98%",
      label: "Success Rate",
      description: "Student achievement and satisfaction"
    }
  ];

  return (
    <section className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url("${image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            Excellence in
            <span className="block text-blue-600 dark:text-blue-400">
              Education
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Nurturing minds, building character, and preparing students for a successful future through innovative teaching and comprehensive development programs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg"
              onClick={() => navigate("/admission-process")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply for Admission
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/about")}
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Learn More About Us
            </Button>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 text-center group hover:transform hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                  <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {achievement.number}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {achievement.label}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalHeroSection;
