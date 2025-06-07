
import { DollarSign, CreditCard, Calendar, Download, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FeeStructure = () => {
  const gradeStructure = [
    {
      grade: "Kindergarten - Grade 2",
      tuition: "$8,500",
      registration: "$500",
      materials: "$300",
      activities: "$400",
      total: "$9,700"
    },
    {
      grade: "Grade 3 - Grade 5",
      tuition: "$9,200",
      registration: "$500",
      materials: "$400",
      activities: "$500",
      total: "$10,600"
    },
    {
      grade: "Grade 6 - Grade 8",
      tuition: "$10,500",
      registration: "$600",
      materials: "$500",
      activities: "$600",
      total: "$12,200"
    },
    {
      grade: "Grade 9 - Grade 12",
      tuition: "$12,800",
      registration: "$700",
      materials: "$600",
      activities: "$800",
      total: "$14,900"
    }
  ];

  const additionalFees = [
    { service: "School Bus Transportation", amount: "$1,200", frequency: "Annual", optional: true },
    { service: "Lunch Program", amount: "$800", frequency: "Annual", optional: true },
    { service: "Extended Care (Before/After School)", amount: "$150", frequency: "Monthly", optional: true },
    { service: "Field Trip Fund", amount: "$200", frequency: "Annual", optional: true },
    { service: "Technology Fee", amount: "$300", frequency: "Annual", optional: false },
    { service: "Library Fee", amount: "$100", frequency: "Annual", optional: false }
  ];

  const paymentPlans = [
    {
      name: "Annual Payment",
      description: "Pay full amount upfront",
      discount: "5% discount applied",
      schedule: "Due: August 1st",
      benefits: ["5% tuition discount", "No processing fees", "Priority enrollment"]
    },
    {
      name: "Semester Payment",
      description: "Two payments per year",
      discount: "2% discount applied",
      schedule: "Due: August 1st & January 1st",
      benefits: ["2% tuition discount", "Flexible scheduling", "Mid-year adjustment"]
    },
    {
      name: "Monthly Payment",
      description: "10 monthly payments",
      discount: "No discount",
      schedule: "Due: 1st of each month (Aug-May)",
      benefits: ["Budget-friendly", "Auto-pay available", "No large upfront cost"]
    }
  ];

  const scholarships = [
    { name: "Academic Excellence", criteria: "GPA 3.8+", coverage: "Up to 50%", deadline: "March 1st" },
    { name: "Need-Based Aid", criteria: "Financial need", coverage: "Up to 75%", deadline: "April 15th" },
    { name: "Sibling Discount", criteria: "Multiple children", coverage: "10% per additional child", deadline: "Ongoing" },
    { name: "Alumni Family", criteria: "Alumni parent/guardian", coverage: "15% tuition", deadline: "May 1st" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Fee Structure
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Transparent pricing for quality education with flexible payment options and financial assistance
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Apply for Aid
              </Button>
              <Button size="lg" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Fee Schedule
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition by Grade */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Annual Tuition by Grade Level
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gradeStructure.map((grade, index) => (
              <Card key={index} className="border-2 hover:border-blue-500 transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{grade.grade}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">{grade.total}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">per year</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Tuition</span>
                      <span className="font-medium">{grade.tuition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Registration</span>
                      <span className="font-medium">{grade.registration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Materials</span>
                      <span className="font-medium">{grade.materials}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Activities</span>
                      <span className="font-medium">{grade.activities}</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{grade.total}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="additional" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="additional">Additional Fees</TabsTrigger>
              <TabsTrigger value="payment">Payment Plans</TabsTrigger>
              <TabsTrigger value="aid">Financial Aid</TabsTrigger>
            </TabsList>
            
            <TabsContent value="additional" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {additionalFees.map((fee, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{fee.service}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{fee.frequency}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{fee.amount}</div>
                          <Badge variant={fee.optional ? "secondary" : "default"}>
                            {fee.optional ? "Optional" : "Required"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="payment" className="mt-8">
              <div className="grid md:grid-cols-3 gap-6">
                {paymentPlans.map((plan, index) => (
                  <Card key={index} className={index === 0 ? "border-2 border-green-500" : ""}>
                    {index === 0 && (
                      <div className="bg-green-500 text-white text-center py-2 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        {plan.name}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                      {plan.discount !== "No discount" && (
                        <Badge className="w-fit">{plan.discount}</Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Payment Schedule:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{plan.schedule}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Benefits:</h4>
                          <ul className="space-y-1">
                            {plan.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Button className="w-full mt-4">
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="aid" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {scholarships.map((scholarship, index) => (
                  <Card key={index} className="border-l-4 border-yellow-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{scholarship.name}</span>
                        <Badge variant="outline">{scholarship.coverage}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Criteria: </span>
                          <span className="text-gray-600 dark:text-gray-400">{scholarship.criteria}</span>
                        </div>
                        <div>
                          <span className="font-medium">Coverage: </span>
                          <span className="text-green-600 font-semibold">{scholarship.coverage}</span>
                        </div>
                        <div>
                          <span className="font-medium">Deadline: </span>
                          <span className="text-red-600">{scholarship.deadline}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Accepted Payment Methods
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold">Credit/Debit Cards</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Visa, MasterCard, Amex</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold">Bank Transfer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">ACH & Wire transfers</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold">Auto-Pay</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automatic monthly payments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold">Check/Money Order</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Traditional payment methods</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeeStructure;
