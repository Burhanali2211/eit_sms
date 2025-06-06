
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Star, Users, Award, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const dynamicTexts = [
    "Empowering minds, shaping futures",
    "Excellence in education since 1995",
    "Where dreams take flight",
    "Building tomorrow's leaders today"
  ];

  const heroImages = [
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      clearInterval(textInterval);
      clearInterval(imageInterval);
    };
  }, []);

  const achievements = [
    { icon: Users, number: "2500+", label: "Students", color: "text-yellow-400" },
    { icon: BookOpen, number: "150+", label: "Expert Faculty", color: "text-blue-400" },
    { icon: Award, number: "28+", label: "Years of Excellence", color: "text-green-400" },
    { icon: Star, number: "98%", label: "Success Rate", color: "text-purple-400" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url("${image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-purple-900/80"></div>
        </div>
      ))}

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-yellow-400/20 rounded-full blur-lg animate-float delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl animate-float delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-left lg:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-fade-in">
                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium">Rated #1 School in Region</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Welcome to
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
                  EduSync School
                </span>
              </h1>
              
              <div className="h-16 md:h-20">
                <p className="text-xl md:text-2xl max-w-3xl leading-relaxed opacity-90 transition-all duration-500">
                  {dynamicTexts[currentTextIndex]}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Button 
                size="lg"
                onClick={() => navigate("/admission-process")}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Apply for Admission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/about")}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Achievement Cards */}
          <div className="lg:block">
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <Icon className={`h-8 w-8 ${achievement.color} mb-3`} />
                    <div className={`text-2xl md:text-3xl font-bold ${achievement.color} mb-1`}>
                      {achievement.number}
                    </div>
                    <div className="text-sm text-gray-300">{achievement.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0ms' }}>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">15000+</div>
              <div className="text-sm md:text-base opacity-90">Alumni Network</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90">Courses Offered</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">100+</div>
              <div className="text-sm md:text-base opacity-90">Awards Won</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-sm md:text-base opacity-90">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-1 h-16 bg-white/30 rounded-full">
          <div className="w-1 h-8 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
