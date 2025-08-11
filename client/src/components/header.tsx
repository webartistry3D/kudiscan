import { Bell, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "KudiScan" }: HeaderProps) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "No new notifications at this time",
    });
  };

  const handleProfile = () => {
    setLocation("/settings");
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Search className="text-white w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white" data-testid="header-title">
            {title}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            onClick={handleNotifications}
            data-testid="button-notifications"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={handleProfile}
            data-testid="button-profile"
          >
            <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>
      </div>
    </header>
  );
}
