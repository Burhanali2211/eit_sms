import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/dashboard";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Lock, User } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password123");
  const [role, setRole] = useState<UserRole>("student");
  const [showPassword, setShowPassword] = useState(false);
  
  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

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
      await login(email, password);
      // No need for toast here as the login function handles it
    } catch (error) {
      // Error is handled in the login function
      console.error("Login error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value as UserRole;
    setRole(selectedRole);
    
    // Auto-fill email based on role for demo purposes
    setEmail(`${selectedRole}@edusync.com`);
    // Set default password
    setPassword("password123");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-t-4 border-t-school-primary">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold">
              EduSync<span className="text-school-secondary">Academy</span>
            </CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login" className="text-sm">Login</TabsTrigger>
                <TabsTrigger value="register" className="text-sm">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium block">
                      Select Role
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={handleRoleChange}
                      className="w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-school-primary focus:border-transparent transition-all"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="principal">Principal</option>
                      <option value="admin">Admin</option>
                      <option value="financial">Financial Admin</option>
                      <option value="admission">Admission Admin</option>
                      <option value="school-admin">School Admin</option>
                      <option value="labs">Labs Admin</option>
                      <option value="club">Club Admin</option>
                      <option value="library">Library Admin</option>
                      <option value="super-admin">Super Admin</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium block">
                      Email
                    </label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-xs text-school-secondary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-school-primary to-school-secondary text-white hover:opacity-90 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log in"}
                  </Button>
                  
                  <div className="text-sm text-gray-500 text-center mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="font-medium mb-1">Demo Credentials</p>
                    <p className="text-xs mb-1">Email: [role]@edusync.com</p>
                    <p className="text-xs mb-1">Password: password123</p>
                    <p className="text-xs italic">Example: student@edusync.com</p>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <div className="space-y-6 mt-4 text-center p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-school-primary/10 rounded-full">
                    <User className="h-6 w-6 text-school-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Registration Information</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Registration for new accounts is managed by the school administration.
                      Please contact the school office for assistance with creating a new account.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = "mailto:admin@edusyncacademy.edu"}
                    className="mt-2"
                  >
                    Contact Administration
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 hover:bg-gray-100"
              onClick={() => navigate("/")}
            >
              <span>Back to Home</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
