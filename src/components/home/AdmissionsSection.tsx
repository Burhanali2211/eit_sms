
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, DollarSign, Calendar, Users } from "lucide-react";

const AdmissionsSection = () => {
  const navigate = useNavigate();

  const admissionSteps = [
    {
      step: "1",
      title: "Application Form",
      description: "Fill out the online application form with required details",
      icon: FileText
    },
    {
      step: "2",
      title: "Document Submission",
      description: "Submit all required documents and certificates",
      icon: FileText
    },
    {
      step: "3",
      title: "Entrance Test",
      description: "Appear for the entrance examination (if applicable)",
      icon: Users
    },
    {
      step: "4",
      title: "Fee Payment",
      description: "Complete the admission process with fee payment",
      icon: DollarSign
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Admissions Open
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our school community and give your child the best educational experience. 
            Our admission process is simple and transparent.
          </p>
        </div>

        {/* Admission Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {admissionSteps.map((step, index) => (
            <Card key={index} className="text-center border-2 border-gray-100 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{step.step}</span>
                </div>
                <CardTitle className="text-lg text-gray-900">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admission Info */}
        <div className="bg-blue-50 rounded-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Admission Period</h3>
              <p className="text-gray-600">March - May 2024</p>
            </div>
            <div>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Age Criteria</h3>
              <p className="text-gray-600">3-17 years</p>
            </div>
            <div>
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Required Docs</h3>
              <p className="text-gray-600">Birth Certificate, Photos, Previous Records</p>
            </div>
            <div>
              <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Fee</h3>
              <p className="text-gray-600">$50 (Non-refundable)</p>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/online-application")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Apply Online Now
          </Button>
          <Button 
            onClick={() => navigate("/admission-process")}
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsSection;
