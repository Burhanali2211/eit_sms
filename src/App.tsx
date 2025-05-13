
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
import SchoolOverview from "./pages/dashboard/SchoolOverview";
import Staff from "./pages/dashboard/Staff";

// Student pages
import Courses from "./pages/dashboard/student/Courses";

// Teacher pages
import Classes from "./pages/dashboard/teacher/Classes";

// Admin pages
import Finance from "./pages/dashboard/finance/Finance";
import UserManagement from "./pages/dashboard/admin/UserManagement";
import SystemSettings from "./pages/dashboard/admin/SystemSettings";
import SystemDatabase from "./pages/dashboard/admin/SystemDatabase";
import SchoolManagement from "./pages/dashboard/admin/SchoolManagement";
import LabResources from "./pages/dashboard/admin/LabResources";
import ClubActivities from "./pages/dashboard/admin/ClubActivities";
import Library from "./pages/dashboard/admin/Library";
import Admissions from "./pages/dashboard/admin/Admissions";

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
            
            {/* School Overview page for principal and super admin */}
            <Route path="/dashboard/school-overview" element={
              <ProtectedRoute allowedRoles={['principal', 'super-admin']}>
                <SchoolOverview />
              </ProtectedRoute>
            } />
            
            {/* Staff management for principal, school-admin and super-admin */}
            <Route path="/dashboard/staff" element={
              <ProtectedRoute allowedRoles={['principal', 'school-admin', 'super-admin']}>
                <Staff />
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
            
            {/* Admin & Super Admin routes */}
            <Route path="/dashboard/users" element={
              <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
                <UserManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/system" element={
              <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
                <SystemSettings />
              </ProtectedRoute>
            } />
            
            {/* School admin routes */}
            <Route path="/dashboard/school-management" element={
              <ProtectedRoute allowedRoles={['school-admin', 'principal', 'super-admin']}>
                <SchoolManagement />
              </ProtectedRoute>
            } />
            
            {/* Super Admin only route */}
            <Route path="/dashboard/database" element={
              <ProtectedRoute allowedRoles={['super-admin']}>
                <SystemDatabase />
              </ProtectedRoute>
            } />
            
            {/* Lab Resources route */}
            <Route path="/dashboard/labs" element={
              <ProtectedRoute allowedRoles={['labs', 'principal', 'super-admin']}>
                <LabResources />
              </ProtectedRoute>
            } />
            
            {/* Clubs & Activities route */}
            <Route path="/dashboard/clubs" element={
              <ProtectedRoute allowedRoles={['club', 'principal', 'super-admin']}>
                <ClubActivities />
              </ProtectedRoute>
            } />
            
            {/* Library route */}
            <Route path="/dashboard/library" element={
              <ProtectedRoute allowedRoles={['library', 'principal', 'super-admin']}>
                <Library />
              </ProtectedRoute>
            } />
            
            {/* Admissions route */}
            <Route path="/dashboard/admissions" element={
              <ProtectedRoute allowedRoles={['admission', 'principal', 'super-admin']}>
                <Admissions />
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
