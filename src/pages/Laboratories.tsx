
import { Microscope, Beaker, Cpu, Wrench, Calendar, Users, Clock, BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Laboratories = () => {
  const labs = [
    {
      id: "biology",
      name: "Biology Laboratory",
      icon: Microscope,
      capacity: "30 students",
      equipment: ["Digital microscopes", "Specimen collection", "Cell culture equipment", "Safety equipment"],
      description: "State-of-the-art biology lab equipped for advanced research and experiments",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500",
      experiments: ["Cell biology", "Genetics", "Microbiology", "Plant physiology"]
    },
    {
      id: "chemistry",
      name: "Chemistry Laboratory",
      icon: Beaker,
      capacity: "25 students",
      equipment: ["Fume hoods", "Digital scales", "Spectrophotometer", "Reaction vessels"],
      description: "Fully equipped chemistry lab with modern safety systems and analytical instruments",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500",
      experiments: ["Organic synthesis", "Analytical chemistry", "Physical chemistry", "Quantitative analysis"]
    },
    {
      id: "physics",
      name: "Physics Laboratory",
      icon: Cpu,
      capacity: "35 students",
      equipment: ["Oscilloscopes", "Function generators", "Laser equipment", "Measurement tools"],
      description: "Advanced physics lab supporting mechanics, electronics, and modern physics experiments",
      image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=500",
      experiments: ["Mechanics", "Optics", "Electronics", "Quantum physics"]
    },
    {
      id: "computer",
      name: "Computer Science Lab",
      icon: Cpu,
      capacity: "40 students",
      equipment: ["High-end workstations", "Servers", "Networking equipment", "Development tools"],
      description: "Modern computer lab with latest hardware and software for programming and development",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500",
      experiments: ["Programming", "Web development", "Database design", "Network administration"]
    }
  ];

  const safetyGuidelines = [
    { title: "Personal Protective Equipment", items: ["Safety goggles required", "Lab coats mandatory", "Closed-toe shoes only", "Gloves when handling chemicals"] },
    { title: "Emergency Procedures", items: ["Know exit locations", "Fire extinguisher locations", "First aid kit access", "Emergency contact numbers"] },
    { title: "Equipment Usage", items: ["Read instructions carefully", "Report damaged equipment", "Clean after use", "Proper storage required"] },
    { title: "Chemical Safety", items: ["Label all containers", "Proper disposal methods", "No food or drinks", "Wash hands thoroughly"] }
  ];

  const labSchedule = [
    { time: "8:00 AM - 9:30 AM", monday: "Biology A", tuesday: "Chemistry A", wednesday: "Physics A", thursday: "Computer A", friday: "Biology B" },
    { time: "10:00 AM - 11:30 AM", monday: "Chemistry B", tuesday: "Physics B", wednesday: "Computer B", thursday: "Biology C", friday: "Chemistry C" },
    { time: "1:00 PM - 2:30 PM", monday: "Physics C", tuesday: "Computer C", wednesday: "Biology D", thursday: "Chemistry D", friday: "Physics D" },
    { time: "3:00 PM - 4:30 PM", monday: "Computer D", tuesday: "Biology E", wednesday: "Chemistry E", thursday: "Physics E", friday: "Open Lab" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Science Laboratories
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Hands-on learning in state-of-the-art laboratories equipped with modern instruments and safety systems
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Book Lab Time
              </Button>
              <Button size="lg" variant="outline">
                Safety Training
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratory Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Laboratory Facilities
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {labs.map((lab) => {
              const Icon = lab.icon;
              return (
                <Card key={lab.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${lab.image})` }}>
                    <div className="h-full bg-black bg-opacity-50 flex items-end p-4">
                      <Badge className="bg-white text-black flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {lab.name}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{lab.name}</span>
                      <Badge variant="outline">{lab.capacity}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{lab.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2">Key Equipment:</h4>
                        <div className="grid grid-cols-2 gap-1 text-sm">
                          {lab.equipment.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Experiments:</h4>
                        <div className="flex flex-wrap gap-1">
                          {lab.experiments.map((exp, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{exp}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      Reserve Lab Time
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="schedule">Lab Schedule</TabsTrigger>
              <TabsTrigger value="safety">Safety Guidelines</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schedule" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Weekly Lab Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Time</th>
                          <th className="text-left p-2">Monday</th>
                          <th className="text-left p-2">Tuesday</th>
                          <th className="text-left p-2">Wednesday</th>
                          <th className="text-left p-2">Thursday</th>
                          <th className="text-left p-2">Friday</th>
                        </tr>
                      </thead>
                      <tbody>
                        {labSchedule.map((slot, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="p-2 font-medium">{slot.time}</td>
                            <td className="p-2">{slot.monday}</td>
                            <td className="p-2">{slot.tuesday}</td>
                            <td className="p-2">{slot.wednesday}</td>
                            <td className="p-2">{slot.thursday}</td>
                            <td className="p-2">{slot.friday}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="safety" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {safetyGuidelines.map((guideline, index) => (
                  <Card key={index} className="border-l-4 border-red-500">
                    <CardHeader>
                      <CardTitle className="text-lg">{guideline.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {guideline.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Laboratory Coordination
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Lab Coordinator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dr. Sarah Johnson</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">ext. 2345</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Operating Hours</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mon-Fri: 8:00 AM - 5:00 PM</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sat: 9:00 AM - 1:00 PM</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Resources</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lab manuals & safety guides</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Equipment tutorials</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Laboratories;
