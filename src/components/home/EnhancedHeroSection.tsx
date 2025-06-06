
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Star, Users, Award, BookOpen, Sparkles, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const EnhancedHeroSection = () => {
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const dynamicTexts = [
    "Empowering minds, shaping futures",
    "Excellence in education since 1995", 
    "Where dreams take flight",
    "Building tomorrow's leaders today",
    "Innovation meets tradition"
  ];

  const heroImages = [
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  ];

  useEffect(() => {
    setIsVisible(true);
    
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
    { icon: Users, number: "2500+", label: "Students", color: "text-yellow-400", bgColor: "bg-yellow-400/20" },
    { icon: BookOpen, number: "150+", label: "Expert Faculty", color: "text-blue-400", bgColor: "bg-blue-400/20" },
    { icon: Award, number: "28+", label: "Years of Excellence", color: "text-green-400", bgColor: "bg-green-400/20" },
    { icon: Star, number: "98%", label: "Success Rate", color: "text-purple-400", bgColor: "bg-purple-400/20" }
  ];

  const floatingElements = [
    { size: "w-32 h-32", position: "top-1/4 left-1/4", color: "bg-white/10", delay: "0s" },
    { size: "w-24 h-24", position: "top-1/3 right-1/3", color: "bg-yellow-400/20", delay: "1s" },
    { size: "w-40 h-40", position: "bottom-1/4 left-1/3", color: "bg-blue-400/10", delay: "2s" },
    { size: "w-20 h-20", position: "top-1/2 right-1/4", color: "bg-purple-400/15", delay: "3s" },
    { size: "w-36 h-36", position: "bottom-1/3 right-1/2", color: "bg-green-400/10", delay: "4s" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Images with Parallax Effect */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-all duration-2000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{
            backgroundImage: `url("${image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/70 to-indigo-900/80"></div>
        </div>
      ))}

      {/* Enhanced Floating Animation Elements */}
      <div className="absolute inset-0 z-5">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.size} ${element.position} ${element.color} rounded-full blur-xl animate-float`}
            style={{
              animationDelay: element.delay,
              animationDuration: `${6 + index}s`
            }}
          ></div>
        ))}
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content with Advanced Animations */}
          <div className={`space-y-8 text-left lg:text-left transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="space-y-6">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-md rounded-full border border-white/30 animate-bounce-in shadow-lg">
                <Sparkles className="h-5 w-5 text-yellow-400 mr-3 animate-pulse" />
                <span className="text-sm font-semibold">Rated #1 School in Region</span>
                <TrendingUp className="h-4 w-4 text-green-400 ml-2" />
              </div>
              
              {/* Enhanced Title with Gradient Animation */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
                Welcome to
                <span className="block animated-gradient bg-clip-text text-transparent mt-4 relative">
                  EduSync School
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg blur opacity-25 animate-pulse"></div>
                </span>
              </h1>
              
              {/* Enhanced Dynamic Text */}
              <div className="h-20 md:h-24 relative overflow-hidden">
                <p className="text-xl md:text-3xl max-w-4xl leading-relaxed opacity-95 transition-all duration-700 transform hover:scale-105">
                  <span className="inline-block animate-fade-in">
                    {dynamicTexts[currentTextIndex]}
                  </span>
                </p>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-start">
              <Button 
                size="lg"
                onClick={() => navigate("/admission-process")}
                className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-10 py-5 rounded-full shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-110 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Apply for Admission
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/about")}
                className="group border-2 border-white/50 text-white hover:bg-white/10 hover:border-white px-10 py-5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Virtual Tour
              </Button>
            </div>
          </div>

          {/* Enhanced Achievement Cards */}
          <div className={`lg:block transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="grid grid-cols-2 gap-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:-rotate-2 animate-scale-in shadow-xl hover:shadow-2xl ${achievement.bgColor}`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="relative z-10">
                      <Icon className={`h-10 w-10 ${achievement.color} mb-4 group-hover:scale-125 transition-transform duration-300`} />
                      <div className={`text-3xl md:text-4xl font-black ${achievement.color} mb-2 group-hover:animate-pulse`}>
                        {achievement.number}
                      </div>
                      <div className="text-sm text-gray-200 font-medium">{achievement.label}</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Stats Section */}
        <div className={`mt-20 pt-12 border-t border-white/20 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15000+", label: "Alumni Network", delay: "0ms" },
              { number: "50+", label: "Courses Offered", delay: "200ms" },
              { number: "100+", label: "Awards Won", delay: "400ms" },
              { number: "24/7", label: "Support Available", delay: "600ms" }
            ].map((stat, index) => (
              <div key={index} className="text-center group animate-fade-in" style={{ animationDelay: stat.delay }}>
                <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-3 group-hover:scale-125 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base opacity-90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-1 h-20 bg-gradient-to-b from-white/50 to-transparent rounded-full relative">
          <div className="w-1 h-10 bg-white rounded-full animate-pulse absolute top-0"></div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
