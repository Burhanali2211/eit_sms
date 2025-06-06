
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const ModernTestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Parent",
      grade: "Grade 10 Student Parent",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "EduSync School has transformed my daughter's approach to learning. The teachers are incredibly supportive and the curriculum is challenging yet engaging.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Alumni",
      grade: "Class of 2020, Now at MIT",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "The foundation I received at EduSync prepared me exceptionally well for university. The critical thinking skills set me apart from my peers.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Current Student",
      grade: "Grade 12",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "Teachers here encourage us to think outside the box and apply our knowledge to real-world problems. It's made learning so much more meaningful.",
      rating: 5,
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hear from parents, students, alumni, and educators about their experience
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-center items-center">
            <div className="max-w-4xl w-full">
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
                <CardContent className="p-0">
                  <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-1/3">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-64 md:h-full object-cover rounded-l-lg"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-2/3 p-8 md:p-12">
                      <div className="flex items-center mb-6">
                        <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                        <div className="flex space-x-1">
                          {renderStars(testimonials[currentIndex].rating)}
                        </div>
                      </div>

                      <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                        "{testimonials[currentIndex].content}"
                      </blockquote>

                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {testimonials[currentIndex].role}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonials[currentIndex].grade}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-6 mt-8">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernTestimonialsCarousel;
