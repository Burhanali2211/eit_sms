
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <DashboardLayout>
      <DashboardHeader title="Access Denied" />
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="text-center max-w-md">
          <div className="bg-red-100 p-4 rounded-full inline-flex mx-auto mb-6">
            <Shield className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Unauthorized Access</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. Your current role 
            ({user?.role || 'Unknown'}) doesn't have the required privileges.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Unauthorized;
