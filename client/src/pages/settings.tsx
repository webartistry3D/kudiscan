import { useEffect } from "react";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Link } from "wouter";
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
    window.scrollTo({ top: 0, behavior: 'instant' });
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



  const handleAbout = () => {
    toast({
      title: "About KudiScan v1.0.0",
      description: "Your smart expense tracker.\n\nMission: To simplify expense tracking for SMEs in Nigeria through AI-powered OCR technology.\n\nVision: To become Nigeria's leading finance management platform.\n\nGoals: Democratize financial literacy, provide insights for better spending decisions and position SMEs for loans to finance business expansion.",
    });
  };



  const userDisplayName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.email || "User";

  return (
    <div className="w-full max-w-none md:max-w-4xl lg:max-w-6xl mx-auto bg-background min-h-screen">
      <Header title="Settings" />
      
      <main className="pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-4">
        {/* Profile Section */}
        <section className="lg:col-span-2">
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
        <section className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">App Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Bell className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Push Notifications</p>
                    <p className="text-sm text-primary/70">Get notified about budget alerts</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.pushNotifications}
                  onCheckedChange={handlePushNotificationToggle}
                  data-testid="switch-notifications" 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Moon className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Dark Mode</p>
                    <p className="text-sm text-primary/70">Switch to dark theme</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.darkMode}
                  onCheckedChange={toggleDarkMode}
                  data-testid="switch-dark-mode" 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Camera className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Auto-Capture</p>
                    <p className="text-sm text-primary/70">Automatically detect receipts</p>
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
        <section className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <Link href="/budget-settings">
                <Button 
                  variant="ghost" 
                  className="w-auto justify-start px-4 py-6 h-auto"
                  data-testid="button-budget-settings"
                >
                  <span className="w-6 h-6 mr-4 text-primary flex items-center justify-center font-bold text-lg">₦</span>
                  <div className="text-left">
                    <p className="font-medium text-primary">Budget Settings</p>
                    <p className="text-sm text-primary/70">Set monthly budgets</p>
                  </div>
                </Button>
              </Link>
              
              <Link href="/expense-categories">
                <Button 
                  variant="ghost" 
                  className="w-auto justify-start px-4 py-6 h-auto"
                  data-testid="button-expense-categories"
                >
                  <Crown className="w-6 h-6 mr-4 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-primary">Expense Categories</p>
                    <p className="text-sm text-primary/70">Manage expense categories</p>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Data & Privacy */}
        <section className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <Button 
                variant="ghost" 
                className="w-auto justify-start px-4 py-6 h-auto"
                onClick={handleExportData}
                data-testid="button-export-data"
              >
                <Download className="w-6 h-6 mr-4 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-primary">Export Data</p>
                  <p className="text-sm text-primary/70">Download your expense data</p>
                </div>
              </Button>
              
              <Link href="/privacy-settings">
                <Button 
                  variant="ghost" 
                  className="w-auto justify-start px-4 py-6 h-auto"
                  data-testid="button-privacy-settings"
                >
                  <Shield className="w-6 h-6 mr-4 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-primary">Privacy Settings</p>
                    <p className="text-sm text-primary/70">Control your data usage</p>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Support & Help */}
        <section className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Support & Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <Link href="/help-center">
                <Button 
                  variant="ghost" 
                  className="w-auto justify-start px-4 py-6 h-auto"
                  data-testid="button-help-center"
                >
                  <HelpCircle className="w-6 h-6 mr-4 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-primary">Help Center</p>
                    <p className="text-sm text-primary/70">FAQs and tutorials</p>
                  </div>
                </Button>
              </Link>
              
              <Link href="/contact-support">
                <Button 
                  variant="ghost" 
                  className="w-auto justify-start px-4 py-6 h-auto"
                  data-testid="button-contact-support"
                >
                  <div className="w-6 h-6 mr-4 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">@</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-primary">Contact Support</p>
                    <p className="text-sm text-primary/70">Get help from our team</p>
                  </div>
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                className="w-auto justify-start px-4 py-6 h-auto"
                onClick={handleAbout}
                data-testid="button-about"
              >
                <Info className="w-6 h-6 mr-4 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-primary">About KudiScan</p>
                  <p className="text-sm text-primary/70">Version 1.0.0</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Admin Section */}


        </div>
        {/* Sign Out */}
        <section className="px-4">
          <Button 
            className="w-auto bg-red-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-600 shadow-lg mx-auto"
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
