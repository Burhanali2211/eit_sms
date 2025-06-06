
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, DollarSign, Calendar, Users, CheckCircle } from "lucide-react";

const AdmissionProcess = () => {
  const navigate = useNavigate();

  const admissionSteps = [
    {
      step: "1",
      title: "Application Form",
      description: "Complete the online application form with accurate information about the student and family.",
      icon: FileText,
      details: [
        "Fill personal details",
        "Academic history",
        "Contact information",
        "Guardian details"
      ]
    },
    {
      step: "2",
      title: "Document Submission",
      description: "Submit all required documents in original and photocopies for verification.",
      icon: FileText,
      details: [
        "Birth certificate",
        "Previous academic records",
        "Medical certificates",
        "Passport size photographs"
      ]
    },
    {
      step: "3",
      title: "Entrance Assessment",
      description: "Appear for entrance examination and interview (applicable for certain grades).",
      icon: Users,
      details: [
        "Written examination",
        "Oral assessment",
        "Parent interaction",
        "Document verification"
      ]
    },
    {
      step: "4",
      title: "Fee Payment",
      description: "Complete admission by paying the required fees within the stipulated time.",
      icon: DollarSign,
      details: [
        "Admission fee",
        "First term fee",
        "Security deposit",
        "Activity fee"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Admission Process
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our school community through our simple and transparent admission process
            </p>
          </div>
        </div>
      </section>

      {/* Admission Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How to Apply
          </h2>
          
          <div className="space-y-8">
            {admissionSteps.map((step, index) => (
              <Card key={index} className="border-l-4 border-l-blue-600 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 mt-2">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="lg:ml-auto">
                      <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center">
                  <Calendar className="h-6 w-6 text-blue-600 mr-2" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-900">Application Start</span>
                    <span className="text-blue-600">March 1, 2024</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-900">Application Deadline</span>
                    <span className="text-blue-600">May 15, 2024</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-900">Entrance Test</span>
                    <span className="text-blue-600">May 20-25, 2024</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-900">Results Announcement</span>
                    <span className="text-blue-600">June 1, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-2" />
                  Age Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-semibold text-gray-900">Nursery</span>
                    <span className="text-green-600">3+ years</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-semibold text-gray-900">Kindergarten</span>
                    <span className="text-green-600">4+ years</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-semibold text-gray-900">Grade 1</span>
                    <span className="text-green-600">5+ years</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-semibold text-gray-900">Other Grades</span>
                    <span className="text-green-600">As per standard</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Begin your child's educational journey with us. Apply now for the upcoming academic year.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/online-application")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Apply Online Now
            </Button>
            <Button 
              onClick={() => navigate("/contact")}
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3"
            >
              Contact Admissions Office
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdmissionProcess;
