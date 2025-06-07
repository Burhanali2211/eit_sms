
import { Trophy, Users, Calendar, Award, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Sports = () => {
  const sportsPrograms = [
    {
      name: "Basketball",
      level: "Varsity & JV",
      season: "Winter",
      coach: "Coach Johnson",
      achievements: "State Champions 2023",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400"
    },
    {
      name: "Soccer",
      level: "All Levels",
      season: "Fall",
      coach: "Coach Williams",
      achievements: "Regional Finalists",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400"
    },
    {
      name: "Swimming",
      level: "Competitive",
      season: "Year Round",
      coach: "Coach Davis",
      achievements: "Multiple Records",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400"
    },
    {
      name: "Track & Field",
      level: "All Levels",
      season: "Spring",
      coach: "Coach Brown",
      achievements: "District Champions",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
    }
  ];

  const facilities = [
    { name: "Main Gymnasium", capacity: "800 seats", features: ["Professional court", "Sound system", "Scoreboard"] },
    { name: "Swimming Pool", capacity: "Olympic size", features: ["8 lanes", "Diving board", "Heated water"] },
    { name: "Athletic Fields", capacity: "2 fields", features: ["Soccer field", "Track", "Field events"] },
    { name: "Fitness Center", capacity: "50 students", features: ["Modern equipment", "Free weights", "Cardio machines"] }
  ];

  const upcomingEvents = [
    { date: "Dec 15", event: "Basketball vs. Central High", time: "7:00 PM", location: "Home Gym" },
    { date: "Dec 18", event: "Swim Meet Championships", time: "4:00 PM", location: "Aquatic Center" },
    { date: "Dec 22", event: "Winter Sports Awards", time: "6:00 PM", location: "Auditorium" },
    { date: "Jan 5", event: "Track Team Tryouts", time: "3:30 PM", location: "Athletic Field" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Athletics & Sports
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Building champions through teamwork, dedication, and excellence in athletic programs
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Join a Team
              </Button>
              <Button size="lg" variant="outline">
                View Schedule
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Athletic Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sportsPrograms.map((sport, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${sport.image})` }}>
                  <div className="h-full bg-black bg-opacity-40 flex items-end p-4">
                    <Badge className="bg-white text-black">{sport.season}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    {sport.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div><strong>Level:</strong> {sport.level}</div>
                    <div><strong>Coach:</strong> {sport.coach}</div>
                    <div><strong>Achievement:</strong> {sport.achievements}</div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            World-Class Facilities
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <Card key={index} className="border-l-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    {facility.name}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">{facility.capacity}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {facility.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{event.date.split(' ')[1]}</div>
                      <div className="text-sm text-gray-600">{event.date.split(' ')[0]}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{event.event}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join Our Athletic Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Register for tryouts, view schedules, and become part of our winning tradition
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary">
              Register Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Contact Coach
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sports;
