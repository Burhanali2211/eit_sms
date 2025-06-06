
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/dashboard";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, User, GraduationCap, BookOpen, Users, Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Predefined demo accounts for easy access
  const demoAccounts = {
    student: { email: "student@edusync.com", password: "password123" },
    teacher: { email: "teacher@edusync.com", password: "password123" },
    principal: { email: "principal@edusync.com", password: "password123" },
    admin: { email: "admin@edusync.com", password: "password123" },
    financial: { email: "financial@edusync.com", password: "password123" },
    library: { email: "library@edusync.com", password: "password123" },
    labs: { email: "labs@edusync.com", password: "password123" },
  };

  const slides = [
    {
      title: "Student Portal",
      description: "Access your courses, grades, and academic progress",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Teacher Dashboard", 
      description: "Manage classes, assignments, and student evaluations",
      icon: Users,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Admin Panel",
      description: "Complete school management and administrative control",
      icon: Shield,
      color: "from-purple-500 to-purple-600"
    }
  ];
  
  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [slides.length]);
  
  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Auto-fill credentials when role changes
  useEffect(() => {
    if (demoAccounts[role]) {
      setEmail(demoAccounts[role].email);
      setPassword(demoAccounts[role].password);
    }
  }, [role]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please enter valid credentials",
      });
      return;
    }
    
    try {
      const success = await login(email, password);
      if (success) {
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleQuickLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    const account = demoAccounts[selectedRole];
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Left Side - Feature Showcase */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative z-10">
        <div className="max-w-md w-full">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <GraduationCap className="h-16 w-16 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Edu<span className="text-blue-400">Sync</span>
            </h1>
            <p className="text-gray-300 text-lg">Advanced School Management System</p>
          </div>

          {/* Rotating Feature Cards */}
          <div className="relative h-64 mb-8">
            {slides.map((slide, index) => {
              const SlideIcon = slide.icon;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentSlide 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-4'
                  }`}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${slide.color} flex items-center justify-center mb-4`}>
                        <SlideIcon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{slide.title}</h3>
                      <p className="text-gray-300">{slide.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-blue-400 w-8' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <Card className="glass-effect border-white/20 shadow-2xl">
            <CardHeader className="space-y-2 text-center pb-4">
              <div className="flex justify-center lg:hidden mb-4">
                <GraduationCap className="h-12 w-12 text-blue-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Portal Login
              </CardTitle>
              <CardDescription className="text-gray-300">
                Access your personalized dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Quick Login Buttons */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-300 text-center">Quick Demo Access</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(demoAccounts).slice(0, 6).map(([roleKey, _]) => (
                    <Button
                      key={roleKey}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickLogin(roleKey as UserRole)}
                      className="capitalize text-xs border-white/20 text-white hover:bg-white/10 hover:border-blue-400 transition-all"
                    >
                      {roleKey}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-gray-400">Or sign in manually</span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium text-gray-300">
                    Role
                  </label>
                  <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger className="w-full bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="student" className="text-white hover:bg-white/10">Student</SelectItem>
                      <SelectItem value="teacher" className="text-white hover:bg-white/10">Teacher</SelectItem>
                      <SelectItem value="principal" className="text-white hover:bg-white/10">Principal</SelectItem>
                      <SelectItem value="admin" className="text-white hover:bg-white/10">Administrator</SelectItem>
                      <SelectItem value="financial" className="text-white hover:bg-white/10">Financial Admin</SelectItem>
                      <SelectItem value="library" className="text-white hover:bg-white/10">Library Admin</SelectItem>
                      <SelectItem value="labs" className="text-white hover:bg-white/10">Labs Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                      required
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <div className="text-xs text-gray-400 bg-white/5 p-3 rounded-lg border border-white/10">
                  <p className="font-medium mb-2 text-white">Demo Credentials</p>
                  <p>Email: [role]@edusync.com</p>
                  <p>Password: password123</p>
                  <p className="italic mt-1">Use quick login buttons above for instant access</p>
                </div>
                
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  ← Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
