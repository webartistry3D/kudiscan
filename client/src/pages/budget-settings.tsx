import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Target } from "lucide-react";
import { formatNaira } from "@/lib/currency";

export default function BudgetSettings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [monthlyBudget, setMonthlyBudget] = useState("5000000");
  const [categoryBudgets, setCategoryBudgets] = useState({
    food: "120000",
    transport: "80000",
    utilities: "60000",
    entertainment: "50000",
    healthcare: "40000",
    shopping: "30000"
  });

  // Calculate spent amounts for budget remaining (mock data for now)
  const spentAmounts = {
    food: 35000,
    transport: 20000,
    utilities: 28000,
    entertainment: 12000,
    healthcare: 8000,
    shopping: 15000
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSave = () => {
    toast({
      title: "Budget Saved",
      description: "Your budget settings have been updated successfully.",
    });
  };

  // Calculate cumulative remaining budget
  const calculateCumulativeRemaining = (currentCategory: string) => {
    const totalMonthly = parseInt(monthlyBudget) || 0;
    let totalAllocated = 0;
    
    // Sum all category budgets including the current one being displayed
    Object.entries(categoryBudgets).forEach(([category, amount]) => {
      totalAllocated += parseInt(amount) || 0;
    });
    
    return Math.max(0, totalMonthly - totalAllocated);
  };

  const handleReset = () => {
    setMonthlyBudget("5000000");
    setCategoryBudgets({
      food: "120000",
      transport: "80000", 
      utilities: "60000",
      entertainment: "50000",
      healthcare: "40000",
      shopping: "30000"
    });
    toast({
      title: "Budget Reset",
      description: "Budget settings have been reset to defaults.",
    });
  };

  return (
    <div className="w-full max-w-none md:max-w-4xl lg:max-w-6xl mx-auto bg-background min-h-screen">
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
              Budget Settings
            </h1>
          </div>
        </div>
      </header>
      
      <main className="pb-20 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Monthly Budget */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Monthly Budget Limit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="monthly-budget">Set your monthly spending limit</Label>
                  <div className="flex items-center mt-2">
                    <span className="text-2xl mr-2">₦</span>
                    <Input
                      id="monthly-budget"
                      type="text"
                      value={monthlyBudget}
                      onChange={(e) => setMonthlyBudget(e.target.value.replace(/[^0-9]/g, ''))}
                      className="text-2xl font-bold"
                      data-testid="input-monthly-budget"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Current limit: {formatNaira(parseInt(monthlyBudget) || 0)}
                  </p>
                  <p className="text-sm text-primary font-medium mt-1">
                    Total Remaining: {formatNaira(calculateCumulativeRemaining(''))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Budgets */}
          {Object.entries(categoryBudgets).map(([category, amount]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="capitalize">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor={`budget-${category}`}>Monthly limit</Label>
                  <div className="flex items-center">
                    <span className="mr-2">₦</span>
                    <Input
                      id={`budget-${category}`}
                      type="text"
                      value={amount}
                      onChange={(e) => setCategoryBudgets(prev => ({
                        ...prev,
                        [category]: e.target.value.replace(/[^0-9]/g, '')
                      }))}
                      data-testid={`input-budget-${category}`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatNaira(parseInt(amount) || 0)}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    Budget Remaining: {formatNaira(calculateCumulativeRemaining(category))}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button 
            variant="outline" 
            className="w-auto"
            onClick={handleReset}
            data-testid="button-reset-budget"
          >
            Reset to Defaults
          </Button>
          <Button 
            onClick={handleSave}
            className="w-auto bg-primary hover:bg-primary/90"
            data-testid="button-save-budget"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}