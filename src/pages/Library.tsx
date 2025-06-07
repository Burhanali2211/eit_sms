
import { useState } from "react";
import { Search, BookOpen, Download, Calendar, Users, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const libraryStats = [
    { icon: BookOpen, label: "Total Books", value: "25,000+", color: "text-blue-600" },
    { icon: Users, label: "Active Members", value: "2,100", color: "text-green-600" },
    { icon: Download, label: "Digital Resources", value: "5,000+", color: "text-purple-600" },
    { icon: Clock, label: "Study Hours", value: "12hrs/day", color: "text-orange-600" }
  ];

  const featuredBooks = [
    { title: "Advanced Mathematics", author: "Dr. Smith", category: "Academic", available: true },
    { title: "Physics Fundamentals", author: "Prof. Johnson", category: "Science", available: false },
    { title: "World History", author: "Dr. Williams", category: "History", available: true },
    { title: "Computer Science Basics", author: "Tech Institute", category: "Technology", available: true }
  ];

  const digitalResources = [
    { name: "Online Journals", description: "Access to 500+ academic journals", type: "Subscription" },
    { name: "E-books Collection", description: "Digital library with 2000+ titles", type: "Digital" },
    { name: "Research Databases", description: "Academic research and citations", type: "Database" },
    { name: "Language Learning", description: "Interactive language courses", type: "Interactive" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              School Library
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Your gateway to knowledge with extensive collections, digital resources, and collaborative study spaces
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search books, authors, subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {libraryStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4`}>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Featured Collections
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant={book.available ? "default" : "secondary"}>
                      {book.available ? "Available" : "Checked Out"}
                    </Badge>
                    <BookOpen className="h-5 w-5 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">By {book.author}</p>
                  <p className="text-sm text-blue-600 mb-4">{book.category}</p>
                  <Button 
                    size="sm" 
                    className="w-full" 
                    disabled={!book.available}
                  >
                    {book.available ? "Reserve Book" : "Join Waitlist"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Digital Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {digitalResources.map((resource, index) => (
              <Card key={index} className="border-l-4 border-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{resource.name}</CardTitle>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>
                  <Button variant="outline" className="w-full">
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Library Hours */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Library Hours
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Regular Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>7:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Phone</span>
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex justify-between">
                  <span>Email</span>
                  <span>library@edusync.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Location</span>
                  <span>Building A, Floor 2</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Library;
