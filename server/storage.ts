import { type Expense, type InsertExpense } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getExpenses(): Promise<Expense[]>;
  getExpenseById(id: string): Promise<Expense | undefined>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  updateExpense(id: string, updates: Partial<InsertExpense>): Promise<Expense | undefined>;
  deleteExpense(id: string): Promise<boolean>;
  getExpensesByDateRange(startDate: Date, endDate: Date): Promise<Expense[]>;
  getExpensesByCategory(category: string): Promise<Expense[]>;
  getTotalExpenses(): Promise<number>;
  getCategoryTotals(): Promise<Record<string, number>>;
}

export class MemStorage implements IStorage {
  private expenses: Map<string, Expense>;

  constructor() {
    this.expenses = new Map();
  }

  async getExpenses(): Promise<Expense[]> {
    return Array.from(this.expenses.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getExpenseById(id: string): Promise<Expense | undefined> {
    return this.expenses.get(id);
  }

  async createExpense(insertExpense: InsertExpense): Promise<Expense> {
    const id = randomUUID();
    const expense: Expense = {
      ...insertExpense,
      id,
      createdAt: new Date(),
    };
    this.expenses.set(id, expense);
    return expense;
  }

  async updateExpense(id: string, updates: Partial<InsertExpense>): Promise<Expense | undefined> {
    const expense = this.expenses.get(id);
    if (!expense) return undefined;

    const updatedExpense = { ...expense, ...updates };
    this.expenses.set(id, updatedExpense);
    return updatedExpense;
  }

  async deleteExpense(id: string): Promise<boolean> {
    return this.expenses.delete(id);
  }

  async getExpensesByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> {
    const expenses = Array.from(this.expenses.values());
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  }

  async getExpensesByCategory(category: string): Promise<Expense[]> {
    const expenses = Array.from(this.expenses.values());
    return expenses.filter(expense => expense.category === category);
  }

  async getTotalExpenses(): Promise<number> {
    const expenses = Array.from(this.expenses.values());
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  }

  async getCategoryTotals(): Promise<Record<string, number>> {
    const expenses = Array.from(this.expenses.values());
    const totals: Record<string, number> = {};
    
    for (const expense of expenses) {
      totals[expense.category] = (totals[expense.category] || 0) + parseFloat(expense.amount);
    }
    
    return totals;
  }
}

export const storage = new MemStorage();
