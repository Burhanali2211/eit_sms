
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/dashboard/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/dashboard/Profile";
import Notifications from "@/pages/dashboard/Notifications";
import Calendar from "@/pages/dashboard/Calendar";
import Settings from "@/pages/dashboard/Settings";
import Unauthorized from "@/pages/dashboard/Unauthorized";
import SchoolOverview from "@/pages/dashboard/SchoolOverview";
import Staff from "@/pages/dashboard/Staff";
import Transportation from "@/pages/dashboard/Transportation";

// Import Admin routes
import UserManagement from "@/pages/dashboard/admin/UserManagement";
import LabResources from "@/pages/dashboard/admin/LabResources";
import Library from "@/pages/dashboard/admin/Library";

// Import Teacher routes
import Classes from "@/pages/dashboard/teacher/Classes";
import Grades from "@/pages/dashboard/teacher/Grades";

const DashboardRoutes = () => {
  return (
    <>
      {/* Common dashboard routes */}
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
      
      <Route path="/dashboard/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/unauthorized" element={
        <ProtectedRoute>
          <Unauthorized />
        </ProtectedRoute>
      } />
      
      {/* Transportation route - accessible to admin, principal, and super-admin */}
      <Route path="/dashboard/transportation" element={
        <ProtectedRoute allowedRoles={['admin', 'principal', 'super-admin', 'school-admin']}>
          <Transportation />
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
      
      {/* Admin routes */}
      <Route path="/dashboard/users" element={
        <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
          <UserManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/labs" element={
        <ProtectedRoute allowedRoles={['labs', 'principal', 'super-admin']}>
          <LabResources />
        </ProtectedRoute>
      } />
      
      {/* Library route */}
      <Route path="/dashboard/library" element={
        <ProtectedRoute allowedRoles={['library', 'principal', 'super-admin']}>
          <Library />
        </ProtectedRoute>
      } />
      
      {/* Teacher routes */}
      <Route path="/dashboard/classes" element={
        <ProtectedRoute allowedRoles={['teacher', 'principal', 'school-admin']}>
          <Classes />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/grades" element={
        <ProtectedRoute allowedRoles={['teacher', 'principal', 'super-admin']}>
          <Grades />
        </ProtectedRoute>
      } />
    </>
  );
};

export default DashboardRoutes;
