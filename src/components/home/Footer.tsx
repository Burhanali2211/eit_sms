
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-school-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Information */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              EduSync<span className="text-school-accent">Academy</span>
            </h3>
            <p className="mb-4 opacity-80">
              Providing quality education and nurturing tomorrow's leaders since 1995.
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-school-accent" />
                <span>123 Education Avenue, Learning City, LC 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-school-accent" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 text-school-accent" />
                <span>info@edusyncacademy.edu</span>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-school-accent" />
                <span>Monday-Friday: 8:00 AM - 4:00 PM<br />Saturday: 9:00 AM - 12:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="opacity-80 hover:opacity-100 hover:underline">About Us</Link>
              </li>
              <li>
                <Link to="/academics" className="opacity-80 hover:opacity-100 hover:underline">Academics</Link>
              </li>
              <li>
                <Link to="/admissions" className="opacity-80 hover:opacity-100 hover:underline">Admissions</Link>
              </li>
              <li>
                <Link to="/calendar" className="opacity-80 hover:opacity-100 hover:underline">School Calendar</Link>
              </li>
              <li>
                <Link to="/news" className="opacity-80 hover:opacity-100 hover:underline">News & Events</Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-80 hover:opacity-100 hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="mb-4 opacity-80">
              Stay updated with school news, events, and announcements.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button type="submit" className="ml-2 bg-school-accent hover:bg-school-accent/80">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-xl font-bold mb-4">Find Us</h3>
            <div className="rounded-md overflow-hidden h-[200px] bg-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1570805490218!5m2!1sen!2sus"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="School Location"
              ></iframe>
            </div>
          </div>
        </div>

        <hr className="my-8 opacity-20" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-70 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EduSync Academy. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-sm opacity-70 hover:opacity-100">Terms of Service</Link>
            <Link to="/privacy" className="text-sm opacity-70 hover:opacity-100">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
