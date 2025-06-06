
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Award, BookOpen, Globe, Target } from "lucide-react";

const CleanStatsSection = () => {
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
      description: 'Students from around the world'
    },
    {
      id: 'faculty',
      icon: BookOpen,
      number: animatedNumbers.faculty,
      suffix: '+',
      label: 'Expert Faculty',
      description: 'Qualified and experienced educators'
    },
    {
      id: 'years',
      icon: Award,
      number: animatedNumbers.years,
      suffix: '+',
      label: 'Years Excellence',
      description: 'Decades of educational leadership'
    },
    {
      id: 'success',
      icon: TrendingUp,
      number: animatedNumbers.success,
      suffix: '%',
      label: 'Success Rate',
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
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
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
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                    {stat.number}{stat.suffix}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
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

        {/* Additional Clean Cards */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Global Reach</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our students come from over 25 countries, creating a diverse and inclusive learning environment.
              </p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">25+</div>
                  <div className="text-sm text-gray-500">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">40+</div>
                  <div className="text-sm text-gray-500">Languages</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Future Ready</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                95% of our graduates are accepted into their first-choice universities worldwide.
              </p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">95%</div>
                  <div className="text-sm text-gray-500">University Acceptance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100+</div>
                  <div className="text-sm text-gray-500">Partner Universities</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CleanStatsSection;
