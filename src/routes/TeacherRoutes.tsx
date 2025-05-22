import { Route } from "react-router-dom";
import ProtectedRoute from "../components/dashboard/ProtectedRoute";
import Classes from "../pages/dashboard/teacher/Classes";
import Grades from "../pages/dashboard/teacher/Grades";

const TeacherRoutes = () => {
  return (
    <>
      {/* Teacher specific routes */}
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

export default TeacherRoutes;
