
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      title: "About",
      items: [
        { title: "About School", href: "/about" },
        { title: "Principal's Message", href: "/principal-message" },
        { title: "Vision & Mission", href: "/vision-mission" },
        { title: "School History", href: "/history" },
        { title: "Management Committee", href: "/management" },
      ]
    },
    {
      title: "Academics",
      items: [
        { title: "Curriculum", href: "/curriculum" },
        { title: "Academic Calendar", href: "/academic-calendar" },
        { title: "Class Schedule", href: "/class-schedule" },
        { title: "Examination", href: "/examination" },
        { title: "Results", href: "/results" },
      ]
    },
    {
      title: "Admissions",
      items: [
        { title: "Admission Process", href: "/admission-process" },
        { title: "Fee Structure", href: "/fee-structure" },
        { title: "Required Documents", href: "/documents" },
        { title: "Online Application", href: "/online-application" },
      ]
    },
    {
      title: "Facilities",
      items: [
        { title: "Library", href: "/library" },
        { title: "Laboratories", href: "/laboratories" },
        { title: "Sports", href: "/sports" },
        { title: "Transportation", href: "/transportation" },
        { title: "Hostel", href: "/hostel" },
      ]
    },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">EduSync</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((menu) => (
                  <NavigationMenuItem key={menu.title}>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600">
                      {menu.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-48 gap-3 p-4">
                        {menu.items.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {item.title}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/gallery" className="text-gray-700 hover:text-blue-600 transition-colors">
              Gallery
            </Link>
            <Link to="/news" className="text-gray-700 hover:text-blue-600 transition-colors">
              News & Events
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Login Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Portal Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {menuItems.map((menu) => (
                <div key={menu.title} className="space-y-1">
                  <div className="px-3 py-2 font-medium text-gray-900">{menu.title}</div>
                  {menu.items.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block px-6 py-2 text-sm text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                to="/gallery"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/news"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                News & Events
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-3 py-2">
                <Button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Portal Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
