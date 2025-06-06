
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";

const PrincipalMessage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Principal's Message
            </h1>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Principal"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-gray-900">Dr. Sarah Johnson</h3>
                <p className="text-gray-600">Principal</p>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">
                Dear Students, Parents, and Community Members,
              </p>
              <p className="leading-relaxed">
                Welcome to EduSync School, where we believe that every child has the potential to achieve greatness. 
                As the Principal of this esteemed institution, I am honored to lead a community dedicated to 
                excellence in education and character development.
              </p>
              <p className="leading-relaxed">
                Our mission is to provide a nurturing environment where students can grow academically, socially, 
                and emotionally. We are committed to preparing our students for the challenges of tomorrow while 
                instilling in them the values of integrity, compassion, and lifelong learning.
              </p>
              <p className="leading-relaxed">
                At EduSync, we embrace innovation in teaching and learning, ensuring that our students are equipped 
                with 21st-century skills. Our dedicated faculty and staff work tirelessly to create engaging and 
                meaningful learning experiences for every student.
              </p>
              <p className="leading-relaxed">
                I invite you to explore our website and discover the many opportunities available at EduSync School. 
                Together, we can help your child reach their full potential and become confident, compassionate leaders 
                of tomorrow.
              </p>
              <p className="leading-relaxed">
                Warm regards,<br />
                <span className="font-semibold">Dr. Sarah Johnson</span><br />
                Principal, EduSync School
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrincipalMessage;
