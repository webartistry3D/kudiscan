import { Bell, Menu, X, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// types
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  actionLink?: string;
  actionText?: string;
}
interface NotificationsResponse {
  count: number;
  notifications: NotificationItem[];
}

interface HeaderProps {
  title?: string;
}

export function Header({ title = "KudiScan" }: HeaderProps) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: notifications } = useQuery<NotificationsResponse>({
    queryKey: ['/api/notifications'],
    refetchInterval: 30000,
  });

  // ---- added: safe locals to avoid "possibly undefined" ----
  const notifCount = notifications?.count ?? 0;
  const notifItems = notifications?.notifications ?? [];
  // ----------------------------------------------------------

  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = (actionLink?: string) => {
    if (actionLink) {
      setLocation(actionLink);
      setShowNotifications(false);
    }
  };

  const handleProfile = () => {
    setLocation("/profile");
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <Bot className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
          <h1 className="text-xl lg:text-2xl font-bold text-foreground font-display" data-testid="header-title">
            {title}
          </h1>
        </div>
        <div className="flex items-center space-x-3 relative">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground w-10 h-10 lg:w-12 lg:h-12 relative"
              onClick={handleNotifications}
              data-testid="button-notifications"
            >
              <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
              {notifCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0 bg-red-500 hover:bg-red-500"
                  variant="destructive"
                >
                  {notifCount > 9 ? '9+' : notifCount}
                </Badge>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto z-50">
                <Card className="shadow-lg border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      {notifCount > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {notifCount}
                        </Badge>
                      )}
                    </div>

                    {notifItems.length > 0 ? (
                      <div className="space-y-2">
                        {notifItems.map((notification: NotificationItem) => (
                          <div
                            key={notification.id}
                            className="p-3 rounded-lg bg-accent/50 hover:bg-accent cursor-pointer transition-colors"
                            onClick={() => handleNotificationClick(notification.actionLink)}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-foreground mb-1">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {notification.message}
                                </p>
                                {notification.actionText && (
                                  <p className="text-xs text-primary font-medium">
                                    {notification.actionText} →
                                  </p>
                                )}
                              </div>
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No new notifications
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-muted hover:bg-accent"
            onClick={handleProfile}
            data-testid="button-profile"
          >
            <User className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Overlay to close notifications when clicking outside */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </header>
  );
}
