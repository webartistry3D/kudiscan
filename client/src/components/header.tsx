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
    setLocation("/profile");
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Search className="text-white w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold text-foreground" data-testid="header-title">
            {title}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground"
            onClick={handleNotifications}
            data-testid="button-notifications"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 rounded-full bg-muted hover:bg-accent"
            onClick={handleProfile}
            data-testid="button-profile"
          >
            <User className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
}
