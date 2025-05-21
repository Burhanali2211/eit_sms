
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '@/types/dashboard';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data
const mockUsers: Record<string, Omit<User, 'id'> & { password: string }> = {
  'student@edusync.com': {
    name: 'Alex Student',
    email: 'student@edusync.com',
    role: 'student',
    password: 'password123',
    createdAt: new Date().toISOString(),
    avatar: 'https://github.com/shadcn.png',
  },
  'teacher@edusync.com': {
    name: 'Taylor Teacher',
    email: 'teacher@edusync.com',
    role: 'teacher',
    password: 'password123',
    createdAt: new Date().toISOString(),
    avatar: 'https://github.com/shadcn.png',
  },
  'principal@edusync.com': {
    name: 'Pat Principal',
    email: 'principal@edusync.com',
    role: 'principal',
    password: 'password123',
    createdAt: new Date().toISOString(),
    avatar: 'https://github.com/shadcn.png',
  },
  'admin@edusync.com': {
    name: 'Admin User',
    email: 'admin@edusync.com',
    role: 'admin',
    password: 'password123',
    createdAt: new Date().toISOString(),
    avatar: 'https://github.com/shadcn.png',
  },
  'financial@edusync.com': {
    name: 'Finance Manager',
    email: 'financial@edusync.com',
    role: 'financial',
    password: 'password123',
    createdAt: new Date().toISOString(),
    avatar: 'https://github.com/shadcn.png',
  },
  'admission@edusync.com': {
    name: 'Admission Officer',
    email: 'admission@edusync.com',
    role: 'admission',
    password: 'password123',
    createdAt: new Date().toISOString(),
    avatar: 'https://github.com/shadcn.png',
  },
  'schooladmin@edusync.com': {
    name: 'School Admin',
    email: 'schooladmin@edusync.com',
    role: 'school-admin',
    password: 'password123',
    createdAt: new Date().toISOString(),
    avatar: 'https://github.com/shadcn.png',
  },
  'labs@edusync.com': {
    name: 'Labs Manager',
    email: 'labs@edusync.com',
    role: 'labs',
    password: 'password123',
    createdAt: new Date().toISOString(),
    avatar: 'https://github.com/shadcn.png',
  },
  'club@edusync.com': {
    name: 'Club Coordinator',
    email: 'club@edusync.com',
    role: 'club',
    password: 'password123',
    createdAt: new Date().toISOString(),
    avatar: 'https://github.com/shadcn.png',
  },
  'library@edusync.com': {
    name: 'Librarian',
    email: 'library@edusync.com',
    role: 'library',
    password: 'password123',
    createdAt: new Date().toISOString(),
    avatar: 'https://github.com/shadcn.png',
  },
  'superadmin@edusync.com': {
    name: 'Super Admin',
    email: 'superadmin@edusync.com',
    role: 'super-admin',
    password: 'password123',
    createdAt: new Date().toISOString(),
    avatar: 'https://github.com/shadcn.png',
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('eduSync_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // If JSON parsing fails, clear the corrupted data
        localStorage.removeItem('eduSync_user');
        console.error("Failed to parse stored user data");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = mockUsers[email.toLowerCase()];
      
      if (!mockUser || mockUser.password !== password) {
        throw new Error('Invalid credentials');
      }
      
      if (role !== 'student' && mockUser.role !== role) {
        throw new Error(`Invalid role. You don't have ${role} privileges.`);
      }

      const userData: User = {
        id: email.toLowerCase(),
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        avatar: mockUser.avatar,
        createdAt: mockUser.createdAt,
      };

      setUser(userData);
      localStorage.setItem('eduSync_user', JSON.stringify(userData));
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${userData.name}!`,
      });
      
      // Redirect user to where they were trying to go or dashboard
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      });
      throw error; // Re-throw to be caught by the login component
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduSync_user');
    navigate('/login');
    toast({
      title: 'Logged out successfully',
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
