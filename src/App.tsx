
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/dashboard/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/dashboard/Profile";
import Notifications from "./pages/dashboard/Notifications";
import Calendar from "./pages/dashboard/Calendar";
import Unauthorized from "./pages/dashboard/Unauthorized";

// Student pages
import Courses from "./pages/dashboard/student/Courses";

// Teacher pages
import Classes from "./pages/dashboard/teacher/Classes";

// Admin pages
import Finance from "./pages/dashboard/finance/Finance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/calendar" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/unauthorized" element={
              <ProtectedRoute>
                <Unauthorized />
              </ProtectedRoute>
            } />
            
            {/* Student specific routes */}
            <Route path="/dashboard/courses" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Courses />
              </ProtectedRoute>
            } />
            
            {/* Teacher specific routes */}
            <Route path="/dashboard/classes" element={
              <ProtectedRoute allowedRoles={['teacher', 'principal', 'school-admin']}>
                <Classes />
              </ProtectedRoute>
            } />
            
            {/* Financial admin routes */}
            <Route path="/dashboard/finance" element={
              <ProtectedRoute allowedRoles={['financial', 'principal', 'super-admin']}>
                <Finance />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
