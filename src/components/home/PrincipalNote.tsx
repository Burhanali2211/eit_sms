
import { Card, CardContent } from "@/components/ui/card";

const PrincipalNote = () => {
  return (
    <div className="container-section">
      <h2 className="section-heading">From The Principal's Desk</h2>
      
      <Card className="max-w-4xl mx-auto shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <div className="h-full relative">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" 
                alt="Principal" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 md:hidden">
                <h3 className="text-white text-xl font-bold">Dr. Emily Johnson</h3>
                <p className="text-white/90 text-sm">Principal</p>
              </div>
            </div>
          </div>
          
          <CardContent className="md:w-2/3 p-6 md:p-8">
            <div className="hidden md:block mb-6">
              <h3 className="text-2xl font-bold text-school-primary">Dr. Emily Johnson</h3>
              <p className="text-gray-600">Principal</p>
            </div>
            
            <blockquote className="space-y-4 text-gray-700">
              <p>
                "Welcome to EduSync Academy, where we believe in nurturing not just academic excellence, but the holistic development of every student. Our commitment goes beyond textbooks and examinations – we strive to cultivate curious minds, compassionate hearts, and confident individuals ready to face the challenges of tomorrow."
              </p>
              <p>
                "At our institution, we combine rigorous academics with character development, ensuring that our students not only achieve their academic potential but also develop into responsible global citizens. Our dedicated faculty, state-of-the-art facilities, and innovative teaching methodologies create an environment where learning becomes a joyful journey of discovery."
              </p>
              <p>
                "I invite you to explore our school and experience the unique blend of tradition and innovation that defines us. Together, let's embark on a transformative educational journey that prepares our students not just for successful careers, but for meaningful lives."
              </p>
            </blockquote>
            
            <div className="mt-6">
              <img 
                src="/placeholder.svg" 
                alt="Signature" 
                className="h-16 w-auto opacity-80"
              />
              <p className="text-school-secondary font-medium mt-2">PhD, Education Leadership</p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default PrincipalNote;
