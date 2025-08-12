import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNaira } from "@/lib/currency";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Check, Crown, CreditCard, Calendar, AlertCircle } from "lucide-react";

export default function Subscription() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);

  useEffect(() => {
    fetchSubscriptionInfo();
  }, []);

  const fetchSubscriptionInfo = async () => {
    try {
      const response = await apiRequest("GET", "/api/subscription/info");
      const data = await response.json();
      setSubscriptionInfo(data);
    } catch (error) {
      console.error("Failed to fetch subscription info:", error);
    }
  };

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("POST", "/api/subscription/create");
      const data = await response.json();
      
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast({
          title: "Error",
          description: "Failed to create checkout session",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upgrade subscription",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.")) {
      return;
    }

    setLoading(true);
    try {
      await apiRequest("POST", "/api/subscription/cancel");
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled. You'll retain access until your current period ends.",
      });
      fetchSubscriptionInfo();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isPremium = (user as any)?.subscriptionPlan === "premium";
  const scansUsed = parseInt((user as any)?.monthlyScansUsed || "0");
  const scansLimit = isPremium ? Infinity : 10;

  return (
    <div className="w-full max-w-4xl mx-auto bg-background min-h-screen">
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setLocation("/settings")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Button>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground font-display">
              Subscription
            </h1>
          </div>
        </div>
      </header>

      <main className="pb-20 p-4 space-y-6">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isPremium ? <Crown className="w-5 h-5 text-primary" /> : <CreditCard className="w-5 h-5 text-muted-foreground" />}
              Current Plan
            </CardTitle>
            <CardDescription>
              Your current subscription status and usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Plan</span>
              <Badge variant={isPremium ? "default" : "secondary"} className={isPremium ? "bg-primary" : ""}>
                {isPremium ? "Premium" : "Freemium"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-medium">Status</span>
              <Badge variant={(user as any)?.subscriptionStatus === "active" ? "default" : "destructive"}>
                {(user as any)?.subscriptionStatus || "Active"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Monthly Scans Used</span>
              <span className="font-mono">
                {scansUsed} / {isPremium ? "Unlimited" : scansLimit}
              </span>
            </div>

            {subscriptionInfo?.subscriptionEndDate && (
              <div className="flex items-center justify-between">
                <span className="font-medium">Next Billing Date</span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(subscriptionInfo.subscriptionEndDate).toLocaleDateString()}
                </span>
              </div>
            )}

            {!isPremium && scansUsed >= scansLimit && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="text-sm text-destructive">
                  You've reached your monthly scan limit. Upgrade to Premium for unlimited scans.
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pricing Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Freemium Plan */}
          <Card className={!isPremium ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>Freemium</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="text-3xl font-bold">{formatNaira(0)}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Up to 10 receipt scans per month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Basic expense categorization</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Simple spending reports</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Mobile app access</span>
              </div>
              {isPremium && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleCancelSubscription}
                  disabled={loading}
                >
                  Downgrade to Freemium
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className={isPremium ? "border-primary bg-primary/5" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                Premium
              </CardTitle>
              <CardDescription>Complete finance management</CardDescription>
              <div className="text-3xl font-bold">{formatNaira(3000)}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              <div className="text-sm text-muted-foreground">{formatNaira(28800)}/year - Save 20%</div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Unlimited receipt scans</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Advanced AI-powered categorization</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Professional expense reports</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Budget tracking & alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Business loan application support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-sm">Priority email support</span>
              </div>
              {!isPremium && (
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => setLocation("/checkout")}
                  data-testid="button-upgrade-premium"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Billing Information */}
        {isPremium && subscriptionInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your billing and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscriptionInfo.paymentMethod && (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Payment Method</span>
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    **** **** **** {subscriptionInfo.paymentMethod.last4}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Cancel Subscription</p>
                  <p className="text-sm text-muted-foreground">
                    You'll retain access until your current billing period ends
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleCancelSubscription}
                  disabled={loading}
                >
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}