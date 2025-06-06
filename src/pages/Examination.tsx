
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";

const Examination = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Examination</h1>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Examination;
