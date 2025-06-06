
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PhotoGallery = () => {
  const navigate = useNavigate();
  
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      alt: "School Building",
      category: "Campus"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      alt: "Students in Classroom",
      category: "Academics"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      alt: "Science Laboratory",
      category: "Facilities"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      alt: "Library",
      category: "Facilities"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      alt: "Computer Lab",
      category: "Technology"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      alt: "Sports Activities",
      category: "Sports"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Take a visual tour of our campus, facilities, and vibrant school life.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryImages.map((image) => (
            <Card key={image.id} className="group cursor-pointer overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg">{image.alt}</h3>
                  <p className="text-sm">{image.category}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            onClick={() => navigate("/gallery")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            View Complete Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
