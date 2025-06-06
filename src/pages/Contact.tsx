
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with us for admissions, inquiries, or any other information
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Address</h3>
                    <p className="text-gray-600 mt-1">
                      123 Education Street<br />
                      Learning City, LC 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Phone Numbers</h3>
                    <p className="text-gray-600 mt-1">
                      Main Office: +1 (555) 123-4567<br />
                      Admissions: +1 (555) 987-6543<br />
                      Emergency: +1 (555) 111-2222
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Email Addresses</h3>
                    <p className="text-gray-600 mt-1">
                      General: info@edusync.edu<br />
                      Admissions: admissions@edusync.edu<br />
                      Principal: principal@edusync.edu
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Office Hours</h3>
                    <p className="text-gray-600 mt-1">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Interactive Map Would Be Here</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="Enter your first name" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Enter your last name" required />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter your phone number" />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <select 
                        id="subject" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="admissions">Admissions Inquiry</option>
                        <option value="general">General Information</option>
                        <option value="academic">Academic Programs</option>
                        <option value="facilities">Facilities</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <textarea
                        id="message"
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Please provide details about your inquiry..."
                        required
                      ></textarea>
                    </div>
                    
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Quick Contact
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Speak directly with our admissions team
                </p>
                <Button variant="outline" className="w-full">
                  +1 (555) 123-4567
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Send us an email and we'll respond promptly
                </p>
                <Button variant="outline" className="w-full">
                  info@edusync.edu
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Schedule a campus tour
                </p>
                <Button variant="outline" className="w-full">
                  Schedule Visit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
