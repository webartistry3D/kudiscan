import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { formatNaira } from "@/lib/currency";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Users, 
  Banknote, 
  TrendingUp, 
  Activity, 
  Search,
  UserCheck,
  UserX,
  Crown,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Shield,
  AlertTriangle
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalExpenses: number;
  monthlyRevenue: number;
  newUsersThisMonth: number;
  averageSpending: number;
}

interface UserData {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  totalExpenses: number;
  lastActivity?: string;
}

export default function Admin() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userFilterStatus, setUserFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const { toast } = useToast();

  const { data: adminStats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ['/api/admin/stats'],
  });

  const { data: users, isLoading: usersLoading } = useQuery<UserData[]>({
    queryKey: ['/api/admin/users'],
  });

  const toggleUserStatusMutation = useMutation({
    mutationFn: async ({ userId, isActive }: { userId: string; isActive: boolean }) => {
      return await apiRequest(`/api/admin/users/${userId}/status`, 'PATCH', { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/stats'] });
      toast({
        title: "Success",
        description: "User status updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    },
  });

  const toggleAdminStatusMutation = useMutation({
    mutationFn: async ({ userId, isAdmin }: { userId: string; isAdmin: boolean }) => {
      return await apiRequest(`/api/admin/users/${userId}/admin`, 'PATCH', { isAdmin });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "Success",
        description: "Admin status updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update admin status",
        variant: "destructive",
      });
    },
  });

  const filteredUsers = users?.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase().includes(userSearchTerm.toLowerCase());
    
    const matchesStatus = 
      userFilterStatus === "all" || 
      (userFilterStatus === "active" && user.isActive) ||
      (userFilterStatus === "inactive" && !user.isActive);
    
    return matchesSearch && matchesStatus;
  }) || [];

  if (statsLoading) {
    return (
      <div className="max-w-md mx-auto bg-background min-h-screen">
        <Header title="Admin Dashboard" />
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-card rounded-lg"></div>
            ))}
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen overflow-x-hidden">
      <Header title="Admin Dashboard" />
      
      <main className="pb-20 pt-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full max-w-md mx-auto">
          <div className="px-4 mb-4">
            <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
              <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
              <TabsTrigger value="users" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Users</TabsTrigger>
              <TabsTrigger value="reports" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Reports</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="px-4 space-y-4 max-w-full">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-full">
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-xs text-muted-foreground">Total Users</p>
                      <p className="text-lg font-bold" data-testid="text-total-users">
                        {adminStats?.totalUsers || 0}
                      </p>
                    </div>
                    <Users className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-xs text-muted-foreground">Active Users</p>
                      <p className="text-lg font-bold text-green-600" data-testid="text-active-users">
                        {adminStats?.activeUsers || 0}
                      </p>
                    </div>
                    <UserCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-xs text-muted-foreground">Total Expenses</p>
                      <p className="text-sm font-bold truncate" data-testid="text-total-platform-expenses">
                        {formatNaira(adminStats?.totalExpenses || 0)}
                      </p>
                    </div>
                    <Banknote className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-xs text-muted-foreground">Avg Spending</p>
                      <p className="text-sm font-bold truncate" data-testid="text-average-spending">
                        {formatNaira(adminStats?.averageSpending || 0)}
                      </p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">New users this month:</span>
                    <Badge variant="secondary">{adminStats?.newUsersThisMonth || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">System status:</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Healthy
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="px-4 space-y-4 max-w-full">
            {/* User Filters */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div>
                  <Label htmlFor="user-search">Search Users</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="user-search"
                      placeholder="Search by email or name..."
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                      className="pl-10"
                      data-testid="input-user-search"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="user-filter">Filter by Status</Label>
                  <Select value={userFilterStatus} onValueChange={(value: "all" | "active" | "inactive") => setUserFilterStatus(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active Users</SelectItem>
                      <SelectItem value="inactive">Inactive Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Users List */}
            <div className="space-y-3">
              {usersLoading ? (
                <div className="animate-pulse space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-muted rounded-lg"></div>
                  ))}
                </div>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center relative">
                            <span className="text-white font-semibold text-sm">
                              {user.firstName?.[0] || user.email[0].toUpperCase()}
                            </span>
                            {user.isAdmin && (
                              <Crown className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">
                                {user.firstName && user.lastName 
                                  ? `${user.firstName} ${user.lastName}` 
                                  : user.email}
                              </p>
                              {user.isAdmin && (
                                <Badge variant="secondary" className="text-xs">Admin</Badge>
                              )}
                              {!user.isActive && (
                                <Badge variant="destructive" className="text-xs">Inactive</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatNaira(user.totalExpenses)} total expenses
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button
                            size="sm"
                            variant={user.isActive ? "destructive" : "default"}
                            onClick={() => toggleUserStatusMutation.mutate({
                              userId: user.id,
                              isActive: !user.isActive
                            })}
                            disabled={toggleUserStatusMutation.isPending}
                            data-testid={`button-toggle-user-status-${user.id}`}
                          >
                            {user.isActive ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleAdminStatusMutation.mutate({
                              userId: user.id,
                              isAdmin: !user.isAdmin
                            })}
                            disabled={toggleAdminStatusMutation.isPending}
                            data-testid={`button-toggle-admin-status-${user.id}`}
                          >
                            <Shield className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">No users found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="px-4 space-y-4 max-w-full">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  System Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast({
                    title: "User Analytics",
                    description: "Detailed user analytics report coming soon!",
                  })}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate User Analytics Report
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast({
                    title: "Financial Report",
                    description: "Financial summary report coming soon!",
                  })}
                >
                  <Banknote className="w-4 h-4 mr-2" />
                  Generate Financial Report
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast({
                    title: "System Health",
                    description: "System health report coming soon!",
                  })}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  System Health Report
                </Button>
              </CardContent>
            </Card>

            {/* Quick System Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Settings className="w-5 h-5 mr-2" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Application Version:</span>
                  <Badge variant="outline">v1.0.0</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Database Status:</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Connected
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Backup:</span>
                  <span className="text-sm">Today at 3:00 AM</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  );
}