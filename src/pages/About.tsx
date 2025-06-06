
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, BookOpen, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About EduSync School
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Shaping minds, building character, and creating leaders for tomorrow's world
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1999, EduSync School has been at the forefront of educational excellence 
                  for over two decades. What started as a small institution with a vision to provide 
                  quality education has grown into one of the most respected schools in the region.
                </p>
                <p>
                  Our commitment to holistic education, innovative teaching methods, and character 
                  development has helped thousands of students achieve their dreams and contribute 
                  meaningfully to society.
                </p>
                <p>
                  Today, we continue to uphold the values of excellence, integrity, and compassion 
                  that have defined our institution since its inception.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="School Building"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-none shadow-lg">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
                  <p className="text-gray-600">
                    We strive for excellence in all aspects of education and personal development
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-none shadow-lg">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
                  <p className="text-gray-600">
                    Building strong relationships and fostering a sense of belonging for all
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-none shadow-lg">
                <CardContent className="p-6">
                  <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    Embracing new ideas and technologies to enhance learning experiences
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-none shadow-lg">
                <CardContent className="p-6">
                  <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
                  <p className="text-gray-600">
                    Upholding the highest standards of honesty and ethical behavior
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Achievements</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">1500+</div>
                <div className="text-gray-600">Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">80+</div>
                <div className="text-gray-600">Faculty Members</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
