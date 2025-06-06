
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Award, Calendar } from "lucide-react";

const AcademicsSection = () => {
  const navigate = useNavigate();

  const academicPrograms = [
    {
      title: "Primary School",
      description: "Foundation years focusing on core subjects and creative development",
      grades: "Grades 1-5",
      icon: BookOpen,
      color: "bg-green-500"
    },
    {
      title: "Middle School",
      description: "Comprehensive curriculum with emphasis on critical thinking",
      grades: "Grades 6-8",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "High School",
      description: "Advanced studies preparing students for higher education",
      grades: "Grades 9-12",
      icon: Award,
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Academic Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive academic programs are designed to provide students with 
            a strong foundation and prepare them for future success.
          </p>
        </div>

        {/* Academic Programs Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {academicPrograms.map((program, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow border-none">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${program.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <program.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">{program.title}</CardTitle>
                <p className="text-sm text-blue-600 font-semibold">{program.grades}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Curriculum</h3>
            <p className="text-gray-600">Updated curriculum aligned with global standards</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Faculty</h3>
            <p className="text-gray-600">Highly qualified and experienced teachers</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
            <p className="text-gray-600">Consistent academic achievements and recognition</p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Schedule</h3>
            <p className="text-gray-600">Balanced academic and extracurricular activities</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            onClick={() => navigate("/curriculum")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            View Detailed Curriculum
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
