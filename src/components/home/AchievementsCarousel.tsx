
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Achievement {
  id: number;
  title: string;
  description: string;
  image: string;
}

const AchievementsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "National Science Competition Winners",
      description: "Our students won first place in the National Science Competition with their innovative project on sustainable energy.",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Regional Debate Champions",
      description: "The school debate team earned the regional championship title for the third consecutive year.",
      image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f669?auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "International Arts Recognition",
      description: "Our students' artwork was selected for display at the International Youth Arts Exhibition in Paris.",
      image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      title: "Sports Excellence Award",
      description: "The school received the Sports Excellence Award for outstanding performance in multiple sporting events.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80",
    },
    {
      id: 5,
      title: "100% University Placement",
      description: "All graduating students secured admissions to prestigious universities, including Ivy League institutions.",
      image: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&q=80",
    },
  ];

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === achievements.length - 1 ? 0 : prevIndex + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, achievements.length]);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? achievements.length - 1 : prevIndex - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getIndexPosition = (index: number) => {
    const position = (index - currentIndex) % achievements.length;
    if (position < 0) {
      return position + achievements.length;
    }
    return position;
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, nextSlide]);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Achievements
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Celebrating excellence and recognizing the outstanding accomplishments of our school community
          </p>
        </div>
        
        <div className="relative flex flex-col items-center py-10">
          <div className="w-full flex justify-center items-center relative h-[400px] md:h-[500px]">
            {achievements.map((achievement, index) => {
              const position = getIndexPosition(index);
              
              let className = "absolute transition-all duration-700 ease-in-out rounded-lg overflow-hidden shadow-lg";
              let width = "w-full md:w-2/3";
              let zIndex = "z-0";
              let opacity = "opacity-0";
              let scale = "scale-90";
              let transform = "";
              
              if (position === 0) {
                // Current slide (center)
                className += " md:left-1/2 md:-translate-x-1/2";
                width = "w-full md:w-2/3";
                zIndex = "z-30";
                opacity = "opacity-100";
                scale = "scale-100";
              } else if (position === 1) {
                // Next slide (right)
                className += " right-0 md:right-4";
                width = "hidden md:block md:w-1/3";
                zIndex = "z-20";
                opacity = "opacity-60";
                transform = "translate-x-1/4";
              } else if (position === achievements.length - 1) {
                // Previous slide (left)
                className += " left-0 md:left-4";
                width = "hidden md:block md:w-1/3";
                zIndex = "z-20";
                opacity = "opacity-60";
                transform = "-translate-x-1/4";
              } else {
                // Hidden slides
                width = "hidden";
              }
              
              return (
                <div
                  key={achievement.id}
                  className={`${className} ${width} ${zIndex} ${opacity} ${scale} ${transform} h-full cursor-pointer hover:scale-105 transition-transform`}
                  onClick={() => goToSlide(index)}
                >
                  <div className="h-full w-full bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-xl">
                    <div className="relative h-3/5 overflow-hidden">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 right-4 text-white text-xl md:text-2xl font-bold">
                        {achievement.title}
                      </h3>
                    </div>
                    <div className="p-6 h-2/5 overflow-auto">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg hover:shadow-xl transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-2">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 w-2 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg hover:shadow-xl transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsCarousel;
