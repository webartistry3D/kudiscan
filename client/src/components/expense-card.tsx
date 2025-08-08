import { Card, CardContent } from "@/components/ui/card";
import { getCategoryColors, getCategoryIcon } from "@/lib/categories";
import { formatNaira } from "@/lib/currency";
import { format } from "date-fns";
import { type Expense } from "@shared/schema";

interface ExpenseCardProps {
  expense: Expense;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  const { color, bgColor } = getCategoryColors(expense.category);
  const icon = getCategoryIcon(expense.category);
  
  return (
    <Card className="shadow-sm border-gray-100" data-testid={`expense-card-${expense.id}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}>
              <i className={`${icon} ${color} text-sm`} />
            </div>
            <div>
              <p className="font-medium text-gray-900" data-testid={`text-merchant-${expense.id}`}>
                {expense.merchant}
              </p>
              <p className="text-sm text-gray-500 capitalize" data-testid={`text-category-${expense.id}`}>
                {expense.category}
              </p>
              <p className="text-xs text-gray-400" data-testid={`text-date-${expense.id}`}>
                {format(new Date(expense.date), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900" data-testid={`text-amount-${expense.id}`}>
              {formatNaira(expense.amount)}
            </p>
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
