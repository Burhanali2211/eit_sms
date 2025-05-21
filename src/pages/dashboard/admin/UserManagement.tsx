
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
import { useDatabaseTable } from "@/hooks/use-database-connection";
import { toast } from "@/hooks/use-toast";
import { User, UserRole } from "@/types/dashboard";

// Using mock data until connected to database
const mockUsers = [
  {
    id: "1",
    name: "Alex Student",
    email: "student@edusync.com",
    role: "student" as UserRole,
    status: "Active",
    lastLogin: "2023-05-12 09:25 AM",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Taylor Teacher",
    email: "teacher@edusync.com",
    role: "teacher" as UserRole,
    status: "Active",
    lastLogin: "2023-05-12 08:10 AM",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "3",
    name: "Pat Principal",
    email: "principal@edusync.com",
    role: "principal" as UserRole,
    status: "Active",
    lastLogin: "2023-05-11 04:45 PM",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@edusync.com",
    role: "admin" as UserRole,
    status: "Active",
    lastLogin: "2023-05-12 10:30 AM",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "5",
    name: "Finance Manager",
    email: "financial@edusync.com",
    role: "financial" as UserRole,
    status: "Active",
    lastLogin: "2023-05-10 01:15 PM",
    avatar: "https://github.com/shadcn.png",
  },
];

// Define the user type for better type safety
interface UserManagementUser extends User {
  status: string;
  lastLogin?: string;
}

const UserManagement = () => {
  // Attempt to get users from database, fallback to mock data
  const { 
    data: dbUsers = [], 
    create: createUser,
    update: updateUser,
    remove: removeUser,
    isLoading 
  } = useDatabaseTable<UserManagementUser>('users', {});

  const [users, setUsers] = useState<UserManagementUser[]>(dbUsers.length > 0 ? dbUsers : mockUsers as UserManagementUser[]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Update state when database data loads
  useState(() => {
    if (dbUsers.length > 0) {
      setUsers(dbUsers);
    }
  });

  const handleAddUser = async (newUserData: Partial<UserManagementUser>) => {
    try {
      // Try to create in database first
      let newUser: UserManagementUser;

      if (dbUsers.length > 0) {
        const createdUser = await createUser(newUserData);
        if (typeof createdUser === 'object' && createdUser !== null && 'id' in createdUser) {
          newUser = createdUser as UserManagementUser;
        } else {
          throw new Error("Invalid user data returned from database");
        }
      } else {
        // Fallback to mock data
        newUser = {
          id: (users.length + 1).toString(),
          name: newUserData.name || '',
          email: newUserData.email || '',
          role: newUserData.role || 'student',
          status: "Active",
          lastLogin: "Never",
          avatar: "https://github.com/shadcn.png",
        };
      }

      setUsers(prev => [...prev, newUser]);
      setIsAddUserOpen(false);
      
      toast({
        title: "User Added",
        description: `${newUser.name} has been added successfully`,
      });
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add user",
      });
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      // Try to delete from database first
      if (dbUsers.length > 0) {
        await removeUser(id);
      }
      
      setUsers(users.filter((user) => user.id !== id));
      
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user",
      });
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // Try to update in database first
      if (dbUsers.length > 0) {
        await updateUser(id, { status: newStatus });
      }
      
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );
      
      toast({
        title: "Status Updated",
        description: `User status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user status",
      });
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="User Management" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
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
                  onAddUser={handleAddUser}
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
