
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/dashboard/ProtectedRoute";
import Finance from "../pages/dashboard/Finance";

const FinanceRoutes = () => {
  return (
    <>
      {/* Financial routes */}
      <Route path="/dashboard/finance" element={
        <ProtectedRoute allowedRoles={['financial', 'principal', 'super-admin']}>
          <Finance />
        </ProtectedRoute>
      } />
    </>
  );
};

export default FinanceRoutes;
