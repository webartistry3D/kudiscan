import { Home, List, BarChart3, Settings, Shield, Users, Edit3 } from "lucide-react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

const userNavItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/manual-entry", label: "Add", icon: Edit3 },
  { path: "/transactions", label: "History", icon: List },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/settings", label: "Settings", icon: Settings },
];

const adminNavItems = [
  { path: "/", label: "Admin", icon: Shield },
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/transactions", label: "Transactions", icon: List },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function BottomNavigation() {
  const [location] = useLocation();
  const { isAdmin } = useAuth();
  
  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md lg:max-w-6xl bg-background border-t border-border px-4 py-2">
      <div className="flex justify-around lg:justify-center lg:gap-8 items-center">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex flex-col items-center py-2 px-3 lg:px-4 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`} 
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 mb-1" />
              <span className="text-xs lg:text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
