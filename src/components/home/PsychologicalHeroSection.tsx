
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Star, Users, Award, BookOpen, Sparkles, Eye, Brain, Target } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const PsychologicalHeroSection = () => {
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Psychological triggers in text
  const psychologicalTexts = [
    "Transform Your Child's Future Today",
    "Join 98% of Parents Who Choose Excellence", 
    "Limited Seats - Secure Your Spot Now",
    "Where Success Stories Begin",
    "The School That Changes Everything"
  ];

  // Mouse tracking for interactive elements
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    setIsVisible(true);
    window.addEventListener('mousemove', handleMouseMove);
    
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % psychologicalTexts.length);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(textInterval);
    };
  }, [handleMouseMove]);

  // Psychological design elements with scarcity and social proof
  const psychologicalElements = [
    { 
      icon: Users, 
      number: "2,500+", 
      label: "Students Enrolled", 
      subtitle: "Join the majority",
      color: "from-blue-500 to-blue-600",
      glow: "shadow-blue-500/25"
    },
    { 
      icon: Award, 
      number: "28", 
      label: "Years of Excellence", 
      subtitle: "Proven track record",
      color: "from-amber-500 to-orange-500",
      glow: "shadow-amber-500/25"
    },
    { 
      icon: Target, 
      number: "98%", 
      label: "Success Rate", 
      subtitle: "Guaranteed results",
      color: "from-green-500 to-emerald-500",
      glow: "shadow-green-500/25"
    },
    { 
      icon: Brain, 
      number: "50+", 
      label: "Available Now", 
      subtitle: "Limited seats remaining",
      color: "from-purple-500 to-violet-500",
      glow: "shadow-purple-500/25",
      urgent: true
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Interactive background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Mouse follower effect */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none mix-blend-difference z-50 transition-transform duration-150"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isVisible ? 1 : 0})`
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content - Psychological Design */}
          <div className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Social Proof Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-full border border-green-400/30 animate-pulse">
              <Eye className="h-5 w-5 text-green-400 mr-3" />
              <span className="text-green-300 font-semibold">2,847 parents viewing this page</span>
              <div className="ml-3 flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
            
            {/* Main Headline - Psychological Impact */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight text-white">
                <span className="block">Don't Let Your</span>
                <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                  Child Miss Out
                </span>
              </h1>
              
              {/* Dynamic psychological text */}
              <div className="h-20 relative overflow-hidden">
                <p className="text-2xl md:text-3xl text-blue-100 font-semibold transition-all duration-700">
                  {psychologicalTexts[currentTextIndex]}
                </p>
              </div>
            </div>

            {/* Urgency and Social Proof */}
            <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Sparkles className="h-6 w-6 text-red-400 animate-spin" />
                <div>
                  <p className="text-red-300 font-bold">Only 12 seats left for 2024 admission!</p>
                  <p className="text-red-200 text-sm">847 applications received this month</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons with psychological triggers */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg"
                onClick={() => navigate("/admission-process")}
                className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-10 py-6 rounded-full shadow-2xl hover:shadow-orange-500/25 transform hover:scale-110 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center text-lg">
                  Secure Your Child's Future
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/about")}
                className="group border-2 border-blue-400 text-blue-300 hover:bg-blue-400 hover:text-blue-900 px-10 py-6 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-xl text-lg font-semibold"
              >
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                See Success Stories
              </Button>
            </div>
          </div>

          {/* Right Content - Psychological Stats */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="grid grid-cols-2 gap-6">
              {psychologicalElements.map((element, index) => {
                const Icon = element.icon;
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-110 hover:-rotate-1 ${element.glow} hover:shadow-2xl ${
                      element.urgent ? 'animate-pulse border-red-400/50' : ''
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {element.urgent && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce">
                        URGENT
                      </div>
                    )}
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${element.color} rounded-xl mb-4 group-hover:scale-125 transition-transform duration-300 shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className={`text-3xl md:text-4xl font-black text-transparent bg-gradient-to-br ${element.color} bg-clip-text mb-2 group-hover:animate-pulse`}>
                        {element.number}
                      </div>
                      
                      <div className="text-white font-semibold mb-1">{element.label}</div>
                      <div className="text-gray-300 text-sm">{element.subtitle}</div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })}
            </div>

            {/* Trust indicators */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
                <div className="text-sm text-gray-300">Money-back guarantee</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
                <div className="text-sm text-gray-300">Student support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PsychologicalHeroSection;
