import { Home, List, BarChart3, Settings } from "lucide-react";
import { useLocation } from "wouter";
import { Link } from "wouter";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/transactions", label: "Transactions", icon: List },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function BottomNavigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex flex-col items-center py-2 px-3 transition-colors ${
                isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'
              }`} 
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <IconComponent className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
