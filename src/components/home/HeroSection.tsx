
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Welcome to
            <span className="block text-yellow-400">EduSync School</span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Empowering minds, shaping futures. Join us in our mission to provide world-class education 
            and nurture the leaders of tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => navigate("/admission-process")}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full"
            >
              Apply for Admission
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/about")}
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-full"
            >
              <Play className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">1500+</div>
              <div className="text-sm md:text-base opacity-90">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">80+</div>
              <div className="text-sm md:text-base opacity-90">Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">25+</div>
              <div className="text-sm md:text-base opacity-90">Years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">95%</div>
              <div className="text-sm md:text-base opacity-90">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-white/30 rounded-full">
          <div className="w-1 h-8 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
