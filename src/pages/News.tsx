
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Trophy, BookOpen, Users, Star } from "lucide-react";

const News = () => {
  const featuredNews = {
    id: 1,
    title: "EduSync Students Win National Science Olympiad",
    excerpt: "Our brilliant students secured first place in the National Science Olympiad, showcasing exceptional talent in physics, chemistry, and biology competitions.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "March 15, 2024",
    author: "Dr. Sarah Johnson",
    category: "Achievement",
    featured: true
  };

  const newsArticles = [
    {
      id: 2,
      title: "New State-of-the-Art Computer Lab Inaugurated",
      excerpt: "The latest addition to our campus features cutting-edge technology and equipment to enhance digital learning experiences for all students.",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 10, 2024",
      author: "Principal Michael Brown",
      category: "Infrastructure"
    },
    {
      id: 3,
      title: "Annual Sports Day Celebrations",
      excerpt: "A day filled with athletic excellence, team spirit, and healthy competition as students showcased their sporting talents across various disciplines.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 8, 2024",
      author: "Coach David Wilson",
      category: "Sports"
    },
    {
      id: 4,
      title: "Student Art Exhibition Opens",
      excerpt: "Showcasing creativity and artistic talent, our student art exhibition features remarkable works across various mediums and styles.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 5, 2024",
      author: "Ms. Emma Davis",
      category: "Arts"
    },
    {
      id: 5,
      title: "International Exchange Program Launch",
      excerpt: "Exciting new partnership with schools worldwide opens doors for cultural exchange and global learning opportunities for our students.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 1, 2024",
      author: "Dr. Lisa Chen",
      category: "Global"
    },
    {
      id: 6,
      title: "Green Campus Initiative Success",
      excerpt: "Our sustainability efforts bear fruit as the school achieves carbon neutrality and implements innovative eco-friendly practices.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "February 28, 2024",
      author: "Environmental Club",
      category: "Environment"
    },
    {
      id: 7,
      title: "Career Guidance Workshop Series",
      excerpt: "Industry professionals share insights and career advice with senior students in comprehensive workshops covering various fields and opportunities.",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "February 25, 2024",
      author: "Career Counselor",
      category: "Education"
    }
  ];

  const upcomingEvents = [
    {
      title: "Parent-Teacher Conference",
      date: "March 20, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Main Auditorium"
    },
    {
      title: "Science Fair 2024",
      date: "March 25, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "Science Block"
    },
    {
      title: "Cultural Festival",
      date: "April 5, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "School Grounds"
    },
    {
      title: "Inter-School Debate Competition",
      date: "April 12, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Conference Hall"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Achievement":
        return <Trophy className="h-4 w-4" />;
      case "Education":
        return <BookOpen className="h-4 w-4" />;
      case "Sports":
        return <Star className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            News & <span className="text-blue-600">Events</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest happenings at EduSync School. From academic achievements to exciting events, discover what makes our school community special.
          </p>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Featured Story</h2>
          
          <Card className="border-none shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative">
                <img 
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover min-h-[400px]"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white flex items-center gap-1">
                    {getCategoryIcon(featuredNews.category)}
                    {featuredNews.category}
                  </Badge>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredNews.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredNews.date}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {featuredNews.author}
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-fit">
                  Read Full Story
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Latest News</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Card key={article.id} className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="relative">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white flex items-center gap-1">
                      {getCategoryIcon(article.category)}
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              View All News
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Upcoming Events</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="text-blue-600 mr-2">🕒</span>
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="text-blue-600 mr-2">📍</span>
                      {event.location}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Connected
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter to receive the latest news, events, and important updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
