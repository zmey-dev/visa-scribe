
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/services/mockData';

export interface AuthServiceProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const useAuthService = ({
  setCurrentUser
}: AuthServiceProps) => {
  const { toast } = useToast();

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in a real app, this would validate with an API
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      setCurrentUser(user);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`
      });
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password."
      });
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  return {
    login,
    logout
  };
};
