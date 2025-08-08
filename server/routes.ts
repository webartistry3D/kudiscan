import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertExpenseSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all expenses
  app.get("/api/expenses", async (req, res) => {
    try {
      const expenses = await storage.getExpenses();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch expenses" });
    }
  });

  // Get expense by ID
  app.get("/api/expenses/:id", async (req, res) => {
    try {
      const expense = await storage.getExpenseById(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
      }
      res.json(expense);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch expense" });
    }
  });

  // Create new expense
  app.post("/api/expenses", async (req, res) => {
    try {
      const validatedData = insertExpenseSchema.parse(req.body);
      const expense = await storage.createExpense(validatedData);
      res.status(201).json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create expense" });
    }
  });

  // Update expense
  app.patch("/api/expenses/:id", async (req, res) => {
    try {
      const updates = insertExpenseSchema.partial().parse(req.body);
      const expense = await storage.updateExpense(req.params.id, updates);
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
      }
      res.json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update expense" });
    }
  });

  // Delete expense
  app.delete("/api/expenses/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteExpense(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Expense not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete expense" });
    }
  });

  // Get dashboard statistics
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfWeek = new Date(now.getTime() - (now.getDay() * 24 * 60 * 60 * 1000));
      
      const totalExpenses = await storage.getTotalExpenses();
      const monthlyExpenses = await storage.getExpensesByDateRange(startOfMonth, now);
      const weeklyExpenses = await storage.getExpensesByDateRange(startOfWeek, now);
      const categoryTotals = await storage.getCategoryTotals();
      const recentTransactions = (await storage.getExpenses()).slice(0, 10);
      
      const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      const weeklyTotal = weeklyExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      
      res.json({
        totalExpenses,
        monthlyTotal,
        weeklyTotal,
        categoryTotals,
        receiptCount: recentTransactions.length,
        categoryCount: Object.keys(categoryTotals).length,
        recentTransactions: recentTransactions.slice(0, 5)
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Upload receipt image
  app.post("/api/upload-receipt", upload.single('receipt'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // In a real app, you would save the file to cloud storage
      // For now, we'll just return a mock URL
      const imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      
      res.json({ imageUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
