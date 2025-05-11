
import { ReactNode } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardNav from "./DashboardNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { logout, user } = useAuth();
  
  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="bg-white border-r">
          <SidebarHeader className="px-6 py-4">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-school-primary">
                EduSync<span className="text-school-secondary">Academy</span>
              </h2>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <DashboardNav />
          </SidebarContent>
          
          <SidebarFooter className="px-6 py-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
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
