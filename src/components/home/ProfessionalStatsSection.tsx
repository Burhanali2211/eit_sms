
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Award, BookOpen, Star, Target } from "lucide-react";

const ProfessionalStatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    students: 0,
    faculty: 0,
    years: 0,
    success: 0
  });
  
  const sectionRef = useRef(null);

  const finalNumbers = {
    students: 2500,
    faculty: 150,
    years: 28,
    success: 98
  };

  const stats = [
    {
      id: 'students',
      icon: Users,
      number: animatedNumbers.students,
      suffix: '+',
      label: 'Active Students',
      description: 'Enrolled across all programs',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 'faculty',
      icon: BookOpen,
      number: animatedNumbers.faculty,
      suffix: '+',
      label: 'Expert Faculty',
      description: 'Qualified and experienced educators',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 'years',
      icon: Award,
      number: animatedNumbers.years,
      suffix: '',
      label: 'Years of Excellence',
      description: 'Serving the educational community',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 'success',
      icon: TrendingUp,
      number: animatedNumbers.success,
      suffix: '%',
      label: 'Success Rate',
      description: 'Student achievement and satisfaction',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateNumbers = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(finalNumbers).forEach((key) => {
      let currentStep = 0;
      const increment = finalNumbers[key] / steps;
      
      const timer = setInterval(() => {
        currentStep++;
        setAnimatedNumbers(prev => ({
          ...prev,
          [key]: Math.min(Math.floor(increment * currentStep), finalNumbers[key])
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Building a legacy of educational excellence through dedicated commitment to student success and institutional growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.id}
                className={`border-none shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-xl mb-6`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  
                  <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3`}>
                    {stat.number}{stat.suffix}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {stat.label}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-xl mb-6">
              <Star className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Accredited Institution
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Recognized by national education boards and international bodies
            </p>
          </Card>

          <Card className="p-8 text-center border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-6">
              <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Modern Facilities
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              State-of-the-art infrastructure and learning resources
            </p>
          </Card>

          <Card className="p-8 text-center border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-xl mb-6">
              <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Alumni Success
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Graduates excelling in top universities and careers worldwide
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalStatsSection;
