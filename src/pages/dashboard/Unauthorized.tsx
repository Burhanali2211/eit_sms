
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Unauthorized = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardHeader title="Access Denied" />
      <div className={cn(
        "flex-1 flex flex-col items-center justify-center p-6",
        "dashboard-content"
      )}>
        <div className="text-center max-w-md">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full inline-flex mx-auto mb-6">
            <Shield className="h-12 w-12 text-red-500 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Unauthorized Access</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this page. Your current role
            ({user?.role || 'Unknown'}) doesn't have the required privileges.
          </p>

          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Access Restricted</AlertTitle>
            <AlertDescription>
              This area requires elevated permissions. Please contact your administrator if you believe you should have access.
            </AlertDescription>
          </Alert>

          <div className="space-x-4">
            <Button onClick={() => navigate('/dashboard')} variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>

            <Button
              onClick={() => navigate(-1)}
              variant="outline"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Unauthorized;
