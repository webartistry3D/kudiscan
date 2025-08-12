import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Transactions from "@/pages/transactions";
import Reports from "@/pages/reports";
import Settings from "@/pages/settings";
import Profile from "@/pages/profile";
import AdminDashboard from "@/pages/admin";
import BudgetSettings from "@/pages/budget-settings";
import PrivacySettings from "@/pages/privacy-settings";
import HelpCenter from "@/pages/help-center";
import ContactSupport from "@/pages/contact-support";
import ExpenseCategories from "@/pages/expense-categories";

function ProtectedRoute({ component: Component, adminOnly = false }: { component: any, adminOnly?: boolean }) {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center animate-pulse">
            <span className="text-primary-foreground text-2xl font-bold">K</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

  if (adminOnly && !isAdmin) {
    return <Dashboard />;
  }

  return <Component />;
}

function Router() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center animate-pulse">
            <span className="text-primary-foreground text-2xl font-bold">K</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Define the home component based on user role
  const HomeComponent = () => {
    if (!isAuthenticated) return <Landing />;
    return isAdmin ? <AdminDashboard /> : <Dashboard />;
  };

  return (
    <Switch>
      {/* Public routes */}
      <Route path="/login" component={isAuthenticated ? HomeComponent : Login} />
      <Route path="/register" component={isAuthenticated ? HomeComponent : Register} />
      
      {/* Protected routes */}
      <Route path="/" component={HomeComponent} />
      <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/transactions" component={() => <ProtectedRoute component={Transactions} />} />
      <Route path="/reports" component={() => <ProtectedRoute component={Reports} />} />
      <Route path="/settings" component={() => <ProtectedRoute component={Settings} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />
      <Route path="/budget-settings" component={() => <ProtectedRoute component={BudgetSettings} />} />
      <Route path="/privacy-settings" component={() => <ProtectedRoute component={PrivacySettings} />} />
      <Route path="/help-center" component={() => <ProtectedRoute component={HelpCenter} />} />
      <Route path="/contact-support" component={() => <ProtectedRoute component={ContactSupport} />} />
      <Route path="/expense-categories" component={() => <ProtectedRoute component={ExpenseCategories} />} />
      <Route path="/admin" component={() => <ProtectedRoute component={AdminDashboard} adminOnly={true} />} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
