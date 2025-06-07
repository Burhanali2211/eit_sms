
import { useState } from "react";
import { useDatabaseTable } from "@/hooks/use-database-connection";
import { toast } from "@/hooks/use-toast";
import { User, UserRole } from "@/types/dashboard";

interface UserManagementUser extends User {
  status: string;
  lastLogin?: string;
}

const mockUsers: UserManagementUser[] = [
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

export const useUserManagement = () => {
  const { 
    data: dbUsers = [], 
    create: createUser,
    update: updateUser,
    remove: removeUser,
    isLoading 
  } = useDatabaseTable<UserManagementUser>('users', {});

  const [users, setUsers] = useState<UserManagementUser[]>(
    dbUsers.length > 0 ? dbUsers : mockUsers
  );

  const handleAddUser = async (newUserData: Partial<UserManagementUser>) => {
    try {
      let newUser: UserManagementUser;

      if (dbUsers.length > 0) {
        const createdUser = await createUser(newUserData);
        if (typeof createdUser === 'object' && createdUser !== null && 'id' in createdUser) {
          newUser = createdUser as UserManagementUser;
        } else {
          throw new Error("Invalid user data returned from database");
        }
      } else {
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
      
      toast({
        title: "User Added",
        description: `${newUser.name} has been added successfully`,
      });

      return newUser;
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add user",
      });
      throw error;
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
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

  return {
    users,
    isLoading,
    handleAddUser,
    handleDeleteUser,
    handleStatusChange
  };
};
