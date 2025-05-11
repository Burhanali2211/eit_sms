
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");

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
      await login(email, password, role);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              EduSync<span className="text-school-secondary">Academy</span>
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">
                      Select Role
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full p-2 border rounded-md bg-white"
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
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
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
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-school-primary hover:bg-school-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log in"}
                  </Button>
                  
                  <div className="text-sm text-gray-500 text-center mt-2">
                    <p>For demo purposes, use these credentials:</p>
                    <p className="font-medium">Email: [role]@edusync.com</p>
                    <p className="font-medium">Password: password123</p>
                    <p className="text-xs">Example: student@edusync.com</p>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <div className="space-y-4 mt-4 text-center p-4">
                  <p>
                    Registration for new accounts is managed by the school administration.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please contact the school office for assistance with creating a new account.
                  </p>
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
              variant="outline"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
