
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const NewsEvents = () => {
  const navigate = useNavigate();

  const newsEvents = [
    {
      id: 1,
      title: "Annual Science Fair 2024",
      date: "2024-03-15",
      time: "09:00 AM",
      category: "Event",
      description: "Students showcase their innovative science projects and experiments.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Spring Break Holiday Notice",
      date: "2024-03-20",
      time: "All Day",
      category: "Notice",
      description: "School will remain closed for spring break from March 20-28, 2024.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "Parent-Teacher Conference",
      date: "2024-04-05",
      time: "02:00 PM",
      category: "Meeting",
      description: "Quarterly parent-teacher meetings to discuss student progress.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const upcomingEvents = [
    {
      date: "15",
      month: "MAR",
      title: "Science Fair",
      time: "9:00 AM"
    },
    {
      date: "22",
      month: "MAR",
      title: "Sports Day",
      time: "8:00 AM"
    },
    {
      date: "05",
      month: "APR",
      title: "Parent Meeting",
      time: "2:00 PM"
    },
    {
      date: "12",
      month: "APR",
      title: "Cultural Program",
      time: "4:00 PM"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            News & Events
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, events, and announcements from our school community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* News & Events */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {newsEvents.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow border-none">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 md:h-full object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.time}
                          </div>
                        </div>
                        <CardTitle className="text-xl text-gray-900">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={() => navigate("/news")}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                View All News & Events
              </Button>
            </div>
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{event.date}</div>
                        <div className="text-xs text-gray-500 uppercase">{event.month}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => navigate("/calendar")}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View Full Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
