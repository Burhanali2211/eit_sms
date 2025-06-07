
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserList from "@/components/admin/UserList";
import AddUserForm from "@/components/admin/AddUserForm";
import UserStats from "@/components/admin/UserStats";
import { useUserManagement } from "@/hooks/useUserManagement";

const UserManagement = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const { users, isLoading, handleAddUser, handleDeleteUser, handleStatusChange } = useUserManagement();

  const onAddUser = async (newUserData: any) => {
    await handleAddUser(newUserData);
    setIsAddUserOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="User Management" />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <UserStats users={users} />
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Users</CardTitle>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account for the system.
                  </DialogDescription>
                </DialogHeader>
                <AddUserForm 
                  onAddUser={onAddUser}
                  onCancel={() => setIsAddUserOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading users...</div>
            ) : (
              <UserList 
                users={users} 
                onDelete={handleDeleteUser} 
                onStatusChange={handleStatusChange} 
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
