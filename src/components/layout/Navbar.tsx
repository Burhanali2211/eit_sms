
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Academics",
      path: "#",
      dropdown: true,
      subLinks: [
        { name: "Curriculum", path: "/academics/curriculum" },
        { name: "Faculty", path: "/academics/faculty" },
        { name: "Calendar", path: "/academics/calendar" },
      ]
    },
    { name: "Admissions", path: "/admissions" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled
        ? "bg-background dark:bg-background shadow-md py-2"
        : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-school-primary">
              EduSync
              <span className="text-school-secondary">Academy</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              link.dropdown ? (
                <div key={index} className="relative group">
                  <button className={cn(
                    "flex items-center font-medium",
                    "text-foreground hover:text-school-primary"
                  )}>
                    {link.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className={cn(
                    "absolute left-0 mt-2 w-48 rounded-md shadow-lg hidden group-hover:block",
                    "bg-background dark:bg-background border border-border"
                  )}>
                    <div className="py-1">
                      {link.subLinks?.map((subLink, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subLink.path}
                          className={cn(
                            "block px-4 py-2 text-sm",
                            "text-foreground hover:bg-muted"
                          )}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={link.path}
                  className={cn(
                    "font-medium",
                    "text-foreground hover:text-school-primary"
                  )}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          <div className="hidden md:block">
            <Link to="/login">
              <Button className="bg-school-primary hover:bg-school-primary/90 text-white">
                Log In
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "focus:outline-none",
                "text-foreground"
              )}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className={cn(
            "md:hidden mt-4 rounded-lg shadow-lg animate-fade-in",
            "bg-background dark:bg-background border border-border"
          )}>
            <div className="flex flex-col py-4">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.dropdown ? (
                    <>
                      <button
                        className={cn(
                          "flex items-center justify-between w-full px-4 py-2",
                          "text-foreground hover:bg-muted"
                        )}
                        onClick={(e) => {
                          e.currentTarget.nextElementSibling?.classList.toggle('hidden');
                        }}
                      >
                        {link.name}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <div className={cn(
                        "hidden pl-4 ml-4",
                        "border-l-2 border-school-primary/20"
                      )}>
                        {link.subLinks?.map((subLink, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subLink.path}
                            className={cn(
                              "block px-4 py-2 text-sm",
                              "text-foreground hover:bg-muted"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={cn(
                        "block px-4 py-2",
                        "text-foreground hover:bg-muted"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-4 px-4">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-school-primary hover:bg-school-primary/90 text-white">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
