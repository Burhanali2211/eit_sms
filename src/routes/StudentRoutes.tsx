
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/dashboard/ProtectedRoute";
import Courses from "../pages/dashboard/student/Courses";
import Attendance from "../pages/dashboard/Attendance";

const StudentRoutes = () => {
  return (
    <>
      {/* Student specific routes */}
      <Route path="/dashboard/courses" element={
        <ProtectedRoute allowedRoles={['student']}>
          <Courses />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/attendance" element={
        <ProtectedRoute allowedRoles={['student', 'teacher', 'school-admin']}>
          <Attendance />
        </ProtectedRoute>
      } />
    </>
  );
};

export default StudentRoutes;
