
import { ReactNode, useEffect } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardNav from "./DashboardNav";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { logout, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Ensure user is authenticated, otherwise redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="bg-white border-r shadow-sm">
          <SidebarHeader className="px-6 py-6 border-b">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">
                <span className="text-school-primary">Edu</span>
                <span className="text-school-secondary">Sync</span>
              </h2>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="py-2">
            <DashboardNav />
          </SidebarContent>
          
          <SidebarFooter className="px-6 py-4 border-t mt-auto">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
