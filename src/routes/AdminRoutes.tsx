
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/dashboard/ProtectedRoute";
import UserManagement from "../pages/dashboard/admin/UserManagement";
import SystemSettings from "../pages/dashboard/admin/SystemSettings";
import ConfigurationManager from "../pages/dashboard/admin/ConfigurationManager";
import SchoolManagement from "../pages/dashboard/admin/SchoolManagement";
import SystemDatabase from "../pages/dashboard/admin/SystemDatabase";
import SystemLogs from "../pages/dashboard/admin/SystemLogs";
import AuditTrail from "../pages/dashboard/admin/AuditTrail";
import SystemHealth from "../pages/dashboard/admin/SystemHealth";
import BackupRecovery from "../pages/dashboard/admin/BackupRecovery";
import SystemMonitoring from "../pages/dashboard/admin/SystemMonitoring";
import LabResources from "../pages/dashboard/admin/LabResources";
import ClubActivities from "../pages/dashboard/admin/ClubActivities";
import Library from "../pages/dashboard/admin/Library";
import Admissions from "../pages/dashboard/admin/Admissions";

const AdminRoutes = () => {
  return (
    <>
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
      
      <Route path="/dashboard/configuration" element={
        <ProtectedRoute allowedRoles={['super-admin']}>
          <ConfigurationManager />
        </ProtectedRoute>
      } />
      
      {/* School admin routes */}
      <Route path="/dashboard/school-management" element={
        <ProtectedRoute allowedRoles={['school-admin', 'principal', 'super-admin']}>
          <SchoolManagement />
        </ProtectedRoute>
      } />
      
      {/* Super Admin only routes */}
      <Route path="/dashboard/database" element={
        <ProtectedRoute allowedRoles={['super-admin']}>
          <SystemDatabase />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/logs" element={
        <ProtectedRoute allowedRoles={['super-admin', 'admin']}>
          <SystemLogs />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/audit" element={
        <ProtectedRoute allowedRoles={['super-admin', 'admin']}>
          <AuditTrail />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/health" element={
        <ProtectedRoute allowedRoles={['super-admin', 'admin']}>
          <SystemHealth />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/backup" element={
        <ProtectedRoute allowedRoles={['super-admin', 'admin']}>
          <BackupRecovery />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/monitoring" element={
        <ProtectedRoute allowedRoles={['super-admin', 'admin']}>
          <SystemMonitoring />
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
    </>
  );
};

export default AdminRoutes;
