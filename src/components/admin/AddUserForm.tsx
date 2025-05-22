import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, UserRole } from "@/types/dashboard";
import { toast } from "@/hooks/use-toast";

interface AddUserFormProps {
  onAddUser: (user: Omit<User, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

const AddUserForm = ({ onAddUser, onCancel }: AddUserFormProps) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student" as UserRole,
    password: "",
  });

  const handleSubmit = () => {
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields",
      });
      return;
    }

    onAddUser(newUser);
  };

  return (
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
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Add User</Button>
      </div>
    </div>
  );
};

export default AddUserForm;
