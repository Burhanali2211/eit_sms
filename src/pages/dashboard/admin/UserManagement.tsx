
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types/dashboard";
import { Search, MoreHorizontal, UserPlus, ShieldCheck, UserX } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock user data
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
  {
    id: "6",
    name: "School Admin",
    email: "schooladmin@edusync.com",
    role: "school-admin" as UserRole,
    status: "Inactive",
    lastLogin: "2023-04-25 11:20 AM",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "7",
    name: "Super Admin",
    email: "superadmin@edusync.com",
    role: "super-admin" as UserRole,
    status: "Active",
    lastLogin: "2023-05-12 11:45 AM",
    avatar: "https://github.com/shadcn.png",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student" as UserRole,
    password: "",
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields",
      });
      return;
    }

    // Add new user
    const updatedUsers = [
      ...users,
      {
        id: (users.length + 1).toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "Active",
        lastLogin: "Never",
        avatar: "https://github.com/shadcn.png",
      },
    ];

    setUsers(updatedUsers);
    setIsAddUserOpen(false);
    
    // Reset form
    setNewUser({
      name: "",
      email: "",
      role: "student",
      password: "",
    });

    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully`,
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    toast({
      title: "User Deleted",
      description: "User has been deleted successfully",
    });
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
    toast({
      title: "Status Updated",
      description: `User status changed to ${newStatus}`,
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="User Management" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Users</CardTitle>
            <div className="flex space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="name">Full Name</label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) =>
                          setNewUser({ ...newUser, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email">Email</label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="role">Role</label>
                      <Select
                        value={newUser.role}
                        onValueChange={(value) =>
                          setNewUser({ ...newUser, role: value as UserRole })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="principal">Principal</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="financial">Financial</SelectItem>
                          <SelectItem value="admission">Admission</SelectItem>
                          <SelectItem value="school-admin">School Admin</SelectItem>
                          <SelectItem value="labs">Labs</SelectItem>
                          <SelectItem value="club">Club</SelectItem>
                          <SelectItem value="library">Library</SelectItem>
                          <SelectItem value="super-admin">Super Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="password">Password</label>
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) =>
                          setNewUser({ ...newUser, password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser}>Add User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">
                            {user.role.replace("-", " ")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {user.status}
                        </div>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                toast({
                                  title: "Edit User",
                                  description: `Editing ${user.name}`,
                                })
                              }
                            >
                              Edit user
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(
                                  user.id,
                                  user.status === "Active" ? "Inactive" : "Active"
                                )
                              }
                            >
                              {user.status === "Active"
                                ? "Deactivate user"
                                : "Activate user"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                toast({
                                  title: "Reset Password",
                                  description: `Password reset email sent to ${user.email}`,
                                })
                              }
                            >
                              Reset password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete user
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
