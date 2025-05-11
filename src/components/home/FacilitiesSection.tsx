
import {
  Book,
  Monitor,
  Users,
  Clock,
  GraduationCap,
  Home,
  Music,
  Waves,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Facility {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FacilitiesSection = () => {
  const facilities: Facility[] = [
    {
      icon: <Monitor className="h-10 w-10 text-school-primary" />,
      title: "Computer Labs",
      description: "State-of-the-art computer labs with the latest technology and software for hands-on learning.",
    },
    {
      icon: <Book className="h-10 w-10 text-school-primary" />,
      title: "Modern Library",
      description: "Extensive collection of books, digital resources, and comfortable study spaces.",
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-school-primary" />,
      title: "Specialized Classrooms",
      description: "Subject-specific classrooms equipped with interactive displays and learning materials.",
    },
    {
      icon: <Users className="h-10 w-10 text-school-primary" />,
      title: "Qualified Faculty",
      description: "Experienced educators dedicated to personalized student development and growth.",
    },
    {
      icon: <Waves className="h-10 w-10 text-school-primary" />,
      title: "Sports Complex",
      description: "Indoor and outdoor sports facilities including a swimming pool, courts, and playing fields.",
    },
    {
      icon: <Music className="h-10 w-10 text-school-primary" />,
      title: "Arts Center",
      description: "Dedicated spaces for music, dance, drama, and visual arts with professional equipment.",
    },
    {
      icon: <Clock className="h-10 w-10 text-school-primary" />,
      title: "Extended Hours",
      description: "Before and after-school programs for additional learning and extracurricular activities.",
    },
    {
      icon: <Home className="h-10 w-10 text-school-primary" />,
      title: "Campus Housing",
      description: "Comfortable and supervised boarding facilities for residential students.",
    },
  ];

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Our Facilities</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-school-primary/10 p-4 inline-flex justify-center items-center mb-4">
                  {facility.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;
