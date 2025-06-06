
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";

const Curriculum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Curriculum
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Comprehensive educational programs for all grade levels
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Curriculum;
