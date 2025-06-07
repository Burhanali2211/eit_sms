
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/dashboard";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, User, GraduationCap, Shield, BookOpen, Users } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [showPassword, setShowPassword] = useState(false);
  
  const demoAccounts = {
    student: { email: "student@edusync.com", password: "password123" },
    teacher: { email: "teacher@edusync.com", password: "password123" },
    principal: { email: "principal@edusync.com", password: "password123" },
    admin: { email: "admin@edusync.com", password: "password123" },
    financial: { email: "financial@edusync.com", password: "password123" },
    library: { email: "library@edusync.com", password: "password123" },
    labs: { email: "labs@edusync.com", password: "password123" },
  };

  const roleInfo = {
    student: { icon: BookOpen, title: "Student Portal", description: "Access courses, grades, and academic progress" },
    teacher: { icon: Users, title: "Teacher Dashboard", description: "Manage classes and student evaluations" },
    admin: { icon: Shield, title: "Admin Panel", description: "Complete school management system" },
    principal: { icon: GraduationCap, title: "Principal Dashboard", description: "School oversight and administration" },
    financial: { icon: Shield, title: "Finance Portal", description: "Financial management and reporting" },
    library: { icon: BookOpen, title: "Library System", description: "Library resource management" },
    labs: { icon: Shield, title: "Lab Management", description: "Laboratory equipment and scheduling" },
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

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

  const currentRoleInfo = roleInfo[role];
  const RoleIcon = currentRoleInfo.icon;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Left Side - School Information */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 bg-white dark:bg-gray-800">
        <div className="max-w-md w-full text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-600 p-4 rounded-2xl">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            EduSync School
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Advanced School Management System
          </p>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                  <RoleIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {currentRoleInfo.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                {currentRoleInfo.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-none">
            <CardHeader className="space-y-2 text-center pb-6">
              <div className="flex justify-center lg:hidden mb-4">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Portal Login
              </CardTitle>
              
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Access your personalized dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Quick Access Buttons */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  Quick Demo Access
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(demoAccounts).slice(0, 6).map(([roleKey, _]) => (
                    <Button
                      key={roleKey}
                      variant="outline"
                      size="sm"
                      onClick={() => setRole(roleKey as UserRole)}
                      className={`capitalize text-xs transition-all ${
                        role === roleKey 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {roleKey}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                    Or sign in manually
                  </span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Role
                  </label>
                  <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="financial">Financial Admin</SelectItem>
                      <SelectItem value="library">Library Admin</SelectItem>
                      <SelectItem value="labs">Labs Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="font-medium mb-1 text-gray-700 dark:text-gray-300">Demo Credentials</p>
                  <p>Email: [role]@edusync.com</p>
                  <p>Password: password123</p>
                </div>
                
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
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
