import { useEffect } from "react";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useSettings } from "@/hooks/use-settings";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  Info, 
  LogOut,
  Camera,
  Moon,
  Download,
  Crown,
  Loader2,
  IndianRupee
} from "lucide-react";

export default function Settings() {
  const { user, isAdmin, logout, isLoggingOut } = useAuth();
  const { settings, togglePushNotifications, toggleDarkMode, toggleAutoCapture } = useSettings();
  const { toast } = useToast();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePushNotificationToggle = async () => {
    const result = await togglePushNotifications();
    if (!result && !settings.pushNotifications) {
      toast({
        title: "Notification Permission",
        description: "Please allow notifications in your browser settings to enable push notifications.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  const handleExportData = () => {
    toast({
      title: "Export Data",
      description: "Data export feature coming soon!",
    });
  };

  const handlePrivacySettings = () => {
    toast({
      title: "Privacy Settings",
      description: "Privacy settings page coming soon!",
    });
  };

  const handleHelpCenter = () => {
    toast({
      title: "Help Center",
      description: "Help center opening soon!",
    });
  };

  const handleContactSupport = () => {
    toast({
      title: "Contact Support",
      description: "Support contact page coming soon!",
    });
  };

  const handleAbout = () => {
    toast({
      title: "About KudiScan",
      description: "Version 1.0.0 - Your smart expense tracker for Nigeria",
    });
  };

  const handleMonthlyBudget = () => {
    toast({
      title: "Monthly Budget",
      description: "Budget configuration coming soon!",
    });
  };

  const handleCategoryBudgets = () => {
    toast({
      title: "Category Budgets",
      description: "Category budget settings coming soon!",
    });
  };

  const userDisplayName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.email || "User";

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen">
      <Header title="Settings" />
      
      <main className="pb-20">
        {/* Profile Section */}
        <section className="p-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center relative">
                  <User className="w-8 h-8 text-white" />
                  {isAdmin && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{userDisplayName}</h3>
                    {isAdmin && (
                      <Badge variant="secondary" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : 'recently'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* App Settings */}
        <section className="px-4 pb-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">App Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">Get notified about budget alerts</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.pushNotifications}
                  onCheckedChange={handlePushNotificationToggle}
                  data-testid="switch-notifications" 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Moon className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-500">Switch to dark theme</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.darkMode}
                  onCheckedChange={toggleDarkMode}
                  data-testid="switch-dark-mode" 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Auto-Capture</p>
                    <p className="text-sm text-gray-500">Automatically detect receipts</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.autoCapture}
                  onCheckedChange={toggleAutoCapture}
                  data-testid="switch-auto-capture" 
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Budget Settings */}
        <section className="px-4 pb-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={handleMonthlyBudget}
                data-testid="button-monthly-budget"
              >
                <span className="w-5 h-5 mr-3 text-gray-600 flex items-center justify-center font-bold">₦</span>
                <div className="text-left">
                  <p className="font-medium">Monthly Budget</p>
                  <p className="text-sm text-gray-500">₦150,000</p>
                </div>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={handleCategoryBudgets}
                data-testid="button-category-budgets"
              >
                <div className="w-5 h-5 mr-3 bg-primary rounded flex items-center justify-center">
                  <span className="text-white text-xs">%</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-medium">Category Budgets</p>
                  <p className="text-sm text-gray-500 truncate">Set spending limits per category</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Data & Privacy */}
        <section className="px-4 pb-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={handleExportData}
                data-testid="button-export-data"
              >
                <Download className="w-5 h-5 mr-3 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm text-gray-500">Download your expense data</p>
                </div>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={handlePrivacySettings}
                data-testid="button-privacy-settings"
              >
                <Shield className="w-5 h-5 mr-3 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium">Privacy Settings</p>
                  <p className="text-sm text-gray-500">Control your data usage</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Support & Help */}
        <section className="px-4 pb-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Support & Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={handleHelpCenter}
                data-testid="button-help-center"
              >
                <HelpCircle className="w-5 h-5 mr-3 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium">Help Center</p>
                  <p className="text-sm text-gray-500">FAQs and tutorials</p>
                </div>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={handleContactSupport}
                data-testid="button-contact-support"
              >
                <div className="w-5 h-5 mr-3 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 text-xs">@</span>
                </div>
                <div className="text-left">
                  <p className="font-medium">Contact Support</p>
                  <p className="text-sm text-gray-500">Get help from our team</p>
                </div>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={handleAbout}
                data-testid="button-about"
              >
                <Info className="w-5 h-5 mr-3 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium">About KudiScan</p>
                  <p className="text-sm text-gray-500">Version 1.0.0</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Admin Section */}
        {isAdmin && (
          <section className="px-4 pb-4">
            <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-yellow-600" />
                  Admin Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="default" 
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                  onClick={() => window.location.href = '/admin'}
                  data-testid="button-admin-dashboard"
                >
                  <Shield className="w-5 h-5 mr-3" />
                  Open Admin Dashboard
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Sign Out */}
        <section className="px-4">
          <Button 
            className="w-full bg-red-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-600 shadow-lg"
            onClick={handleLogout}
            disabled={isLoggingOut}
            data-testid="button-sign-out"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Signing Out...
              </>
            ) : (
              <>
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </>
            )}
          </Button>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
