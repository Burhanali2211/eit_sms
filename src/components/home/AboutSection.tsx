
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Award, Users, BookOpen, Target } from "lucide-react";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                About Our School
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                EduSync School has been a beacon of educational excellence for over two decades. 
                We are committed to providing a nurturing environment where students can grow 
                academically, socially, and personally.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our comprehensive curriculum, experienced faculty, and state-of-the-art facilities 
                ensure that every student receives the best possible education and is well-prepared 
                for their future endeavors.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">25+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1500+</div>
                <div className="text-gray-600">Happy Students</div>
              </div>
            </div>

            <Button 
              onClick={() => navigate("/about")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Learn More About Us
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="School Building"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-blue-900/20 to-transparent"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Committed to academic excellence and holistic development
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                Building strong relationships and fostering community spirit
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learning</h3>
              <p className="text-gray-600">
                Innovative teaching methods and personalized learning experiences
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Future Ready</h3>
              <p className="text-gray-600">
                Preparing students for success in the modern world
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
