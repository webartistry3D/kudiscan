import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Receipt, Shield, Trash2, UserCheck, UserX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatNaira } from "@/lib/currency";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
}

interface AdminExpense {
  id: string;
  userId: string;
  merchant: string;
  category: string;
  amount: string;
  date: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("users");

  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ['/api/admin/users']
  });

  const { data: expenses = [], isLoading: expensesLoading } = useQuery<AdminExpense[]>({
    queryKey: ['/api/admin/expenses']
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, updates }: { userId: string; updates: any }) => {
      const response = await apiRequest('PATCH', `/api/admin/users/${userId}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "User Updated",
        description: "User status has been updated successfully."
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update user status.",
        variant: "destructive"
      });
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await apiRequest('DELETE', `/api/admin/users/${userId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully."
      });
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete user.",
        variant: "destructive"
      });
    }
  });

  const handleToggleActive = (userId: string, isActive: boolean) => {
    updateUserMutation.mutate({
      userId,
      updates: { isActive: !isActive }
    });
  };

  const handleToggleAdmin = (userId: string, isAdmin: boolean) => {
    updateUserMutation.mutate({
      userId,
      updates: { isAdmin: !isAdmin }
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.isActive).length;
  const adminUsers = users.filter(user => user.isAdmin).length;
  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <Header title="Admin Dashboard" />
      
      <main className="pb-20">
        {/* Admin Stats */}
        <section className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <p className="text-sm opacity-90">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
              <CardContent className="p-4 text-center">
                <UserCheck className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <p className="text-sm opacity-90">Active Users</p>
                <p className="text-2xl font-bold">{activeUsers}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="p-4 text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <p className="text-sm opacity-90">Admins</p>
                <p className="text-2xl font-bold">{adminUsers}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
              <CardContent className="p-4 text-center">
                <Receipt className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <p className="text-sm opacity-90">Total Expenses</p>
                <p className="text-lg font-bold">{formatNaira(totalExpenses)}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Admin Tabs */}
        <section className="px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="users" data-testid="tab-users">Users</TabsTrigger>
              <TabsTrigger value="expenses" data-testid="tab-expenses">Expenses</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-3 mt-4">
              {usersLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : (
                users.map((user) => (
                  <Card key={user.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">
                              {user.firstName && user.lastName 
                                ? `${user.firstName} ${user.lastName}`
                                : user.email
                              }
                            </h3>
                            {user.isAdmin && (
                              <Badge variant="secondary" className="text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Admin
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-400">
                            Joined {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                          </p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          data-testid={`button-delete-user-${user.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Active:</span>
                            <Switch
                              checked={user.isActive}
                              onCheckedChange={() => handleToggleActive(user.id, user.isActive)}
                              data-testid={`switch-active-${user.id}`}
                            />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Admin:</span>
                            <Switch
                              checked={user.isAdmin}
                              onCheckedChange={() => handleToggleAdmin(user.id, user.isAdmin)}
                              data-testid={`switch-admin-${user.id}`}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="expenses" className="space-y-3 mt-4">
              {expensesLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : (
                expenses.map((expense) => (
                  <Card key={expense.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-gray-900">{expense.merchant}</h3>
                            <span className="font-semibold text-primary">
                              {formatNaira(expense.amount)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs capitalize">
                              {expense.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {format(new Date(expense.date), 'MMM dd, yyyy')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}