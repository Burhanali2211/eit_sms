
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "campus", name: "Campus" },
    { id: "academics", name: "Academics" },
    { id: "sports", name: "Sports" },
    { id: "events", name: "Events" },
    { id: "facilities", name: "Facilities" }
  ];

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "School Main Building",
      category: "campus"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Students in Classroom",
      category: "academics"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Science Laboratory",
      category: "facilities"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Library Reading Area",
      category: "facilities"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Computer Laboratory",
      category: "facilities"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Sports Complex",
      category: "sports"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "School Garden",
      category: "campus"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Annual Day Celebration",
      category: "events"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Mathematics Class",
      category: "academics"
    }
  ];

  const filteredImages = activeFilter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our vibrant campus life, facilities, and memorable moments
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                variant={activeFilter === category.id ? "default" : "outline"}
                className={`px-6 py-2 ${
                  activeFilter === category.id 
                    ? "bg-blue-600 text-white" 
                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="group cursor-pointer overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-lg">{image.alt}</h3>
                    <p className="text-sm capitalize">{image.category}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3"
            >
              Load More Photos
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
