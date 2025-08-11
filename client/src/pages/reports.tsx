import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { CategoryChart } from "@/components/category-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNaira } from "@/lib/currency";
import { TrendingUp, TrendingDown, Calendar, Target } from "lucide-react";

interface DashboardStats {
  totalExpenses: number;
  monthlyTotal: number;
  weeklyTotal: number;
  categoryTotals: Record<string, number>;
}

export default function Reports() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats']
  });

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-background min-h-screen">
        <Header title="Reports" />
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const budgetLimit = 150000;
  const budgetUsed = ((stats?.monthlyTotal || 0) / budgetLimit) * 100;
  const avgDaily = (stats?.monthlyTotal || 0) / new Date().getDate();

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen">
      <Header title="Reports" />
      
      <main className="pb-20">
        {/* Monthly Overview */}
        <section className="p-4">
          <Card className="bg-primary text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Calendar className="w-5 h-5 mr-2" />
                {currentMonth} Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Total Spent:</span>
                  <span className="text-xl font-bold" data-testid="text-monthly-total">
                    {formatNaira(stats?.monthlyTotal || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Daily Average:</span>
                  <span className="font-semibold" data-testid="text-daily-average">
                    {formatNaira(avgDaily)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Budget Status */}
        <section className="px-4 pb-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Budget Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Budget Limit:</span>
                  <span className="font-semibold">{formatNaira(budgetLimit)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Used:</span>
                  <span className={`font-semibold ${budgetUsed > 80 ? 'text-red-600' : 'text-primary'}`}>
                    {budgetUsed.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      budgetUsed > 80 ? 'bg-red-500' : budgetUsed > 60 ? 'bg-yellow-500' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(100, budgetUsed)}%` }}
                    data-testid="progress-budget-usage"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className="font-semibold text-primary">
                    {formatNaira(Math.max(0, budgetLimit - (stats?.monthlyTotal || 0)))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Weekly Comparison */}
        <section className="px-4 pb-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                This Week vs Last Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">This Week:</span>
                  <span className="font-semibold" data-testid="text-this-week">
                    {formatNaira(stats?.weeklyTotal || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Last Week:</span>
                  <span className="font-semibold text-muted-foreground">
                    {formatNaira(0)} {/* Placeholder - would need historical data */}
                  </span>
                </div>
                <div className="flex items-center justify-center p-3 bg-muted rounded-lg">
                  <TrendingUp className="w-4 h-4 text-primary mr-1" />
                  <span className="text-sm text-muted-foreground">
                    Tracking spending patterns
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Category Breakdown */}
        {stats?.categoryTotals && Object.keys(stats.categoryTotals).length > 0 && (
          <section className="px-4 pb-4">
            <CategoryChart categoryTotals={stats.categoryTotals} />
          </section>
        )}

        {/* Insights */}
        <section className="px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💡 Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {budgetUsed > 80 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">Budget Alert</p>
                  <p className="text-xs text-red-600 mt-1">
                    You've used {budgetUsed.toFixed(0)}% of your monthly budget
                  </p>
                </div>
              )}
              
              {avgDaily > 5000 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">High Daily Spending</p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Your daily average of {formatNaira(avgDaily)} is above ₦5,000
                  </p>
                </div>
              )}
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Track More</p>
                <p className="text-xs text-blue-600 mt-1">
                  Scan more receipts to get better insights into your spending patterns
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
