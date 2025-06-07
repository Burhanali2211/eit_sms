
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Users, Filter, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AcademicCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedFilter, setSelectedFilter] = useState("all");

  const academicEvents = [
    {
      id: 1,
      title: "First Day of School",
      date: "2024-08-26",
      type: "academic",
      description: "Welcome back! Classes begin for all grade levels.",
      time: "8:00 AM",
      location: "Campus-wide"
    },
    {
      id: 2,
      title: "Parent-Teacher Conferences",
      date: "2024-09-15",
      type: "meeting",
      description: "Individual meetings with teachers to discuss student progress.",
      time: "2:00 PM - 8:00 PM",
      location: "Individual Classrooms"
    },
    {
      id: 3,
      title: "Fall Break",
      date: "2024-10-14",
      type: "holiday",
      description: "No classes - Fall break begins.",
      time: "All Day",
      location: "N/A"
    },
    {
      id: 4,
      title: "Science Fair",
      date: "2024-11-08",
      type: "event",
      description: "Annual science fair showcasing student projects.",
      time: "9:00 AM - 3:00 PM",
      location: "Main Gymnasium"
    },
    {
      id: 5,
      title: "Thanksgiving Break",
      date: "2024-11-25",
      type: "holiday",
      description: "Thanksgiving holiday - No classes.",
      time: "All Day",
      location: "N/A"
    },
    {
      id: 6,
      title: "Winter Concert",
      date: "2024-12-12",
      type: "event",
      description: "Annual winter concert featuring school bands and choirs.",
      time: "7:00 PM",
      location: "School Auditorium"
    },
    {
      id: 7,
      title: "Winter Break Begins",
      date: "2024-12-20",
      type: "holiday",
      description: "Winter break begins - Classes resume January 8th.",
      time: "All Day",
      location: "N/A"
    },
    {
      id: 8,
      title: "Classes Resume",
      date: "2025-01-08",
      type: "academic",
      description: "Classes resume after winter break.",
      time: "8:00 AM",
      location: "Campus-wide"
    },
    {
      id: 9,
      title: "Mid-Year Exams",
      date: "2025-01-20",
      type: "exam",
      description: "Mid-year examinations for all grade levels.",
      time: "8:00 AM - 12:00 PM",
      location: "Various Classrooms"
    },
    {
      id: 10,
      title: "Spring Sport Tryouts",
      date: "2025-02-15",
      type: "sports",
      description: "Tryouts for spring sports teams begin.",
      time: "3:30 PM",
      location: "Athletic Facilities"
    }
  ];

  const eventTypes = [
    { value: "all", label: "All Events", color: "gray" },
    { value: "academic", label: "Academic", color: "blue" },
    { value: "event", label: "School Events", color: "green" },
    { value: "holiday", label: "Holidays", color: "red" },
    { value: "exam", label: "Examinations", color: "purple" },
    { value: "sports", label: "Sports", color: "orange" },
    { value: "meeting", label: "Meetings", color: "yellow" }
  ];

  const filteredEvents = selectedFilter === "all" 
    ? academicEvents 
    : academicEvents.filter(event => event.type === selectedFilter);

  const getEventTypeColor = (type: string) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType?.color || "gray";
  };

  const getEventTypeLabel = (type: string) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType?.label || type;
  };

  const importantDates = [
    { label: "First Day of School", date: "Aug 26, 2024" },
    { label: "Last Day of School", date: "Jun 6, 2025" },
    { label: "Graduation Ceremony", date: "Jun 8, 2025" },
    { label: "Summer Break Begins", date: "Jun 9, 2025" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Academic Calendar
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Stay informed about important dates, events, and academic milestones throughout the school year
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Download Calendar
              </Button>
              <Button size="lg" variant="outline">
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Calendar Widget */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Calendar View
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Important Dates */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Important Dates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {importantDates.map((date, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <span className="font-medium text-sm">{date.label}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{date.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Events List */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Upcoming Events
                </h2>
                <div className="flex items-center gap-4">
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter events" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {event.title}
                            </h3>
                            <Badge 
                              variant="secondary" 
                              className={`bg-${getEventTypeColor(event.type)}-100 text-${getEventTypeColor(event.type)}-800`}
                            >
                              {getEventTypeLabel(event.type)}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {event.description}
                          </p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
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
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {new Date(event.date).getDate()}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Event Categories
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {eventTypes.slice(1).map((type) => (
              <Card key={type.value} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-${type.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <CalendarIcon className={`h-6 w-6 text-${type.color}-600`} />
                  </div>
                  <h3 className="font-semibold">{type.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {academicEvents.filter(event => event.type === type.value).length} events
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AcademicCalendar;
