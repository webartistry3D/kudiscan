import { Bell, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "KudiScan" }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Search className="text-white w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold text-gray-900" data-testid="header-title">
            {title}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-gray-900"
            data-testid="button-notifications"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
            data-testid="button-profile"
          >
            <User className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}
