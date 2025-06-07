
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Award, BookOpen, Star, CheckCircle, AlertTriangle, Timer } from "lucide-react";

const AdvancedStatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    students: 0,
    faculty: 0,
    years: 0,
    success: 0
  });
  
  const sectionRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds

  const finalNumbers = {
    students: 2500,
    faculty: 150,
    years: 28,
    success: 98
  };

  // Psychological stats with urgency and social proof
  const psychologicalStats = [
    {
      id: 'students',
      icon: Users,
      number: animatedNumbers.students,
      suffix: '+',
      label: 'Happy Students',
      description: 'Join the growing community',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      shadowColor: 'shadow-blue-500/25',
      socialProof: 'Most popular choice'
    },
    {
      id: 'faculty',
      icon: BookOpen,
      number: animatedNumbers.faculty,
      suffix: '+',
      label: 'Expert Faculty',
      description: 'World-class educators',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-500/10',
      shadowColor: 'shadow-emerald-500/25',
      socialProof: 'Top-rated teachers'
    },
    {
      id: 'years',
      icon: Award,
      number: animatedNumbers.years,
      suffix: '+',
      label: 'Years Excellence',
      description: 'Trusted by generations',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
      shadowColor: 'shadow-amber-500/25',
      socialProof: 'Legacy of success'
    },
    {
      id: 'success',
      icon: TrendingUp,
      number: animatedNumbers.success,
      suffix: '%',
      label: 'Success Rate',
      description: 'Guaranteed results',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-500/10',
      shadowColor: 'shadow-purple-500/25',
      socialProof: 'Proven results',
      urgent: true
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

    // Countdown timer for urgency
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 86400);
    }, 1000);

    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [isVisible]);

  const animateNumbers = () => {
    const duration = 2500;
    const steps = 80;
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

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Urgency Banner */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-200 dark:border-red-800 rounded-full px-6 py-3 mb-6">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-3 animate-pulse" />
            <span className="text-red-600 dark:text-red-400 font-semibold">
              Limited Time Offer Ends In: {formatTime(timeLeft)}
            </span>
            <Timer className="h-5 w-5 text-red-500 ml-3" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Join Thousands of Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
            See why parents trust us with their children's future
          </p>
          
          {/* Social proof indicator */}
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white dark:border-gray-800" />
              ))}
            </div>
            <span>+2,847 parents viewed this in the last 24 hours</span>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {psychologicalStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.id}
                className={`group relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-rotate-1 ${stat.shadowColor} ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                } ${stat.urgent ? 'ring-2 ring-red-400 ring-opacity-50 animate-pulse' : ''}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Urgency indicator */}
                {stat.urgent && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold z-20 animate-bounce">
                    HOT
                  </div>
                )}

                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative p-8 text-center">
                  {/* Icon with enhanced styling */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg relative`}>
                    <Icon className="h-8 w-8 text-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Number with psychological emphasis */}
                  <div className={`text-5xl md:text-6xl font-black mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}{stat.suffix}
                  </div>
                  
                  {/* Label and description */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {stat.label}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {stat.description}
                  </p>

                  {/* Social proof badge */}
                  <div className={`inline-flex items-center ${stat.bgColor} rounded-full px-3 py-1 text-xs font-semibold`}>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.socialProof}
                    </span>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              100% Satisfaction
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Money-back guarantee if not completely satisfied
            </p>
            <div className="text-sm text-green-600 dark:text-green-400 font-semibold">
              Risk-free enrollment
            </div>
          </Card>

          <Card className="p-8 text-center border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mb-6 shadow-lg">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              5-Star Rating
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Rated by 10,000+ parents across the region
            </p>
            <div className="flex justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
              Verified reviews
            </div>
          </Card>

          <Card className="p-8 text-center border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mb-6 shadow-lg">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Award Winning
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Recognized as the Best School by Education Board
            </p>
            <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
              Certified excellence
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdvancedStatsSection;
