
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const AdvancedTestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Parent",
      grade: "Grade 10 Student Parent",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "EduSync School has transformed my daughter's approach to learning. The teachers are incredibly supportive and the curriculum is challenging yet engaging. I couldn't be happier with our choice.",
      rating: 5,
      highlight: "Transformed learning approach"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Alumni",
      grade: "Class of 2020, Now at MIT",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "The foundation I received at EduSync prepared me exceptionally well for university. The critical thinking skills and collaborative learning environment set me apart from my peers.",
      rating: 5,
      highlight: "Exceptional university preparation"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Current Student",
      grade: "Grade 12",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "I love how teachers here don't just teach from textbooks. They encourage us to think outside the box and apply our knowledge to real-world problems. It's made learning so much more meaningful.",
      rating: 5,
      highlight: "Real-world application focus"
    },
    {
      id: 4,
      name: "Dr. Robert Williams",
      role: "Education Consultant",
      grade: "External Evaluator",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "Having evaluated hundreds of schools, EduSync stands out for its innovative teaching methods and genuine care for student development. Their holistic approach is truly commendable.",
      rating: 5,
      highlight: "Innovative teaching methods"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Teacher",
      grade: "Mathematics Department",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "Working at EduSync has been incredibly fulfilling. The administration supports innovation in teaching, and seeing students excel both academically and personally is deeply rewarding.",
      rating: 5,
      highlight: "Supportive work environment"
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

  const goToTestimonial = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
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
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hear from parents, students, alumni, and educators about their experience with EduSync School
          </p>
        </div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="flex justify-center items-center">
            <div className="max-w-4xl w-full">
              <Card className="border-none shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                <CardContent className="p-0">
                  <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-1/3 relative">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/30"></div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-2/3 p-8 md:p-12">
                      <div className="flex items-center mb-6">
                        <Quote className="h-8 w-8 text-indigo-500 mr-3" />
                        <div className="flex space-x-1">
                          {renderStars(testimonials[currentIndex].rating)}
                        </div>
                      </div>

                      <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
                        "{testimonials[currentIndex].content}"
                      </blockquote>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                              {testimonials[currentIndex].name}
                            </h4>
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                              {testimonials[currentIndex].role}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {testimonials[currentIndex].grade}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="inline-block bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">
                              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                                {testimonials[currentIndex].highlight}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-6 mt-8">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-indigo-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-4 mt-8 overflow-x-auto pb-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToTestimonial(index)}
                className={`flex-shrink-0 transition-all duration-300 ${
                  currentIndex === index
                    ? 'scale-110 opacity-100'
                    : 'opacity-60 hover:opacity-80'
                }`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedTestimonialsCarousel;
