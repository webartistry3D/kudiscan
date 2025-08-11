import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: user, isLoading, error } = useQuery<{ user: User } | null>({
    queryKey: ['/api/auth/user'],
    retry: false,
    queryFn: async (): Promise<{ user: User } | null> => {
      const response = await fetch('/api/auth/user', {
        credentials: 'include',
      });
      if (response.status === 401) {
        return null;
      }
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return { user: data.user };
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('/api/auth/logout', 'POST');
      return response.json();
    },
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully."
      });
      setLocation("/login");
    },
    onError: () => {
      // Force logout even if API call fails
      queryClient.clear();
      setLocation("/login");
    }
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return {
    user: user?.user,
    isLoading,
    isAuthenticated: !!user?.user && !error,
    isAdmin: user?.user?.isAdmin || false,
    logout,
    isLoggingOut: logoutMutation.isPending,
  };
}