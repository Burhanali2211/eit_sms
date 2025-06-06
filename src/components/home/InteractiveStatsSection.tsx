
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Award, BookOpen, Globe, Target } from "lucide-react";

const InteractiveStatsSection = () => {
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
      label: 'Happy Students',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      description: 'Students from around the world'
    },
    {
      id: 'faculty',
      icon: BookOpen,
      number: animatedNumbers.faculty,
      suffix: '+',
      label: 'Expert Faculty',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      description: 'Qualified and experienced educators'
    },
    {
      id: 'years',
      icon: Award,
      number: animatedNumbers.years,
      suffix: '+',
      label: 'Years Excellence',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      description: 'Decades of educational leadership'
    },
    {
      id: 'success',
      icon: TrendingUp,
      number: animatedNumbers.success,
      suffix: '%',
      label: 'Success Rate',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      description: 'Student achievement rate'
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
      { threshold: 0.5 }
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how we're making a difference in education and student lives
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.id}
                className={`group relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`absolute inset-0 ${stat.bgColor} opacity-50`}></div>
                <div className="relative p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  
                  <div className={`text-4xl md:text-5xl font-black ${stat.color} mb-3 group-hover:animate-pulse`}>
                    {stat.number}{stat.suffix}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.label}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {stat.description}
                  </p>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Interactive Elements */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="p-8 border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4 mb-4">
              <Globe className="h-8 w-8 text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Global Reach</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our students come from over 25 countries, creating a diverse and inclusive learning environment.
            </p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">25+</div>
                <div className="text-sm text-gray-500">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">40+</div>
                <div className="text-sm text-gray-500">Languages</div>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4 mb-4">
              <Target className="h-8 w-8 text-purple-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Future Ready</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              95% of our graduates are accepted into their first-choice universities worldwide.
            </p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">95%</div>
                <div className="text-sm text-gray-500">University Acceptance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">100+</div>
                <div className="text-sm text-gray-500">Partner Universities</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveStatsSection;
