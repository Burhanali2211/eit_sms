
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";

const History = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            School History
          </h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Founded in 1999, EduSync School has a rich history of educational excellence...
            </p>
            {/* Add more content here */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default History;
