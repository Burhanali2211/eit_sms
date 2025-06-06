
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Star, Users, Award, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

const ModernHeroSection = () => {
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const dynamicTexts = [
    "Empowering minds, shaping futures",
    "Excellence in education since 1995", 
    "Where dreams take flight",
    "Building tomorrow's leaders today"
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);

    return () => clearInterval(textInterval);
  }, []);

  const achievements = [
    { icon: Users, number: "2500+", label: "Students" },
    { icon: BookOpen, number: "150+", label: "Expert Faculty" },
    { icon: Award, number: "28+", label: "Years of Excellence" },
    { icon: Star, number: "98%", label: "Success Rate" }
  ];

  return (
    <section className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Clean Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
                <Star className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Rated #1 School in Region</span>
              </div>
              
              {/* Clean Title */}
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                  Welcome to
                </h1>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-600 dark:text-blue-400 leading-tight mt-2">
                  EduSync School
                </h1>
              </div>
              
              {/* Dynamic Text */}
              <div className="h-16">
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-500">
                  {dynamicTexts[currentTextIndex]}
                </p>
              </div>
            </div>

            {/* Clean Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => navigate("/admission-process")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Apply for Admission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/about")}
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-lg transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Clean Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{achievement.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;
