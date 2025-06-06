
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Target, Heart } from "lucide-react";

const VisionMission = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Vision & Mission
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our guiding principles that shape everything we do
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-xl">
              <CardContent className="p-8">
                <Eye className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To be a globally recognized institution that nurtures innovative, 
                  compassionate, and responsible global citizens who will lead positive 
                  change in the world.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-xl">
              <CardContent className="p-8">
                <Target className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional education that develops critical thinking, 
                  creativity, and character while fostering a love for learning 
                  and preparing students for future success.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-xl">
              <CardContent className="p-8">
                <Heart className="h-16 w-16 text-red-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
                <p className="text-gray-600 leading-relaxed">
                  Excellence, Integrity, Compassion, Innovation, Collaboration, 
                  and Respect form the foundation of our educational philosophy 
                  and daily practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisionMission;
