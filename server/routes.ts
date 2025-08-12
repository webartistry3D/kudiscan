import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertExpenseSchema, loginSchema, registerSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import passport from "passport";
import { setupAuth, isAuthenticated, isAdmin, getCurrentUser } from "./auth";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const { confirmPassword, ...userData } = validatedData;
      const user = await storage.createUser(userData);
      
      // Auto-login after registration
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Registration successful but login failed" });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json({ user: userWithoutPassword });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    try {
      loginSchema.parse(req.body);
      
      passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err) {
          return res.status(500).json({ message: "Login failed" });
        }
        if (!user) {
          return res.status(401).json({ message: info?.message || "Invalid credentials" });
        }
        
        req.login(user, (err) => {
          if (err) {
            return res.status(500).json({ message: "Login failed" });
          }
          res.json({ user });
        });
      })(req, res, next);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    try {
      req.logout((err) => {
        if (err) {
          console.error("Logout error:", err);
          return res.status(500).json({ message: "Logout failed" });
        }
        // Destroy the session
        req.session.destroy((sessionErr) => {
          if (sessionErr) {
            console.error("Session destroy error:", sessionErr);
          }
          res.clearCookie('connect.sid'); // Clear session cookie
          res.json({ message: "Logged out successfully" });
        });
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  });

  app.get("/api/auth/user", isAuthenticated, async (req, res) => {
    res.json({ user: getCurrentUser(req) });
  });

  // Protected expense routes
  app.get("/api/expenses", isAuthenticated, async (req, res) => {
    try {
      const userId = getCurrentUser(req).id;
      const expenses = await storage.getExpenses(userId);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch expenses" });
    }
  });

  // Get expense by ID
  app.get("/api/expenses/:id", isAuthenticated, async (req, res) => {
    try {
      const userId = getCurrentUser(req).id;
      const expense = await storage.getExpenseById(req.params.id, userId);
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
      }
      res.json(expense);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch expense" });
    }
  });

  // Create new expense
  app.post("/api/expenses", isAuthenticated, async (req, res) => {
    try {
      const userId = getCurrentUser(req).id;
      const validatedData = insertExpenseSchema.parse(req.body);
      const expense = await storage.createExpense(validatedData, userId);
      res.status(201).json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create expense" });
    }
  });

  // Update expense
  app.patch("/api/expenses/:id", isAuthenticated, async (req, res) => {
    try {
      const userId = getCurrentUser(req).id;
      const updates = insertExpenseSchema.partial().parse(req.body);
      const expense = await storage.updateExpense(req.params.id, updates, userId);
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
  app.delete("/api/expenses/:id", isAuthenticated, async (req, res) => {
    try {
      const userId = getCurrentUser(req).id;
      const deleted = await storage.deleteExpense(req.params.id, userId);
      if (!deleted) {
        return res.status(404).json({ message: "Expense not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete expense" });
    }
  });

  // Get dashboard statistics
  app.get("/api/dashboard/stats", isAuthenticated, async (req, res) => {
    try {
      const userId = getCurrentUser(req).id;
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfWeek = new Date(now.getTime() - (now.getDay() * 24 * 60 * 60 * 1000));
      
      const totalExpenses = await storage.getTotalExpenses(userId);
      const monthlyExpenses = await storage.getExpensesByDateRange(userId, startOfMonth, now);
      const weeklyExpenses = await storage.getExpensesByDateRange(userId, startOfWeek, now);
      const categoryTotals = await storage.getCategoryTotals(userId);
      const recentTransactions = (await storage.getExpenses(userId)).slice(0, 10);
      
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
      console.error("Dashboard stats error:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Upload receipt image
  app.post("/api/upload-receipt", isAuthenticated, upload.single('receipt'), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Convert file to base64 data URL for OCR processing
      const imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      
      res.json({ imageUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload image" });
    }
  });

  // Admin routes
  app.get("/api/admin/stats", isAdmin, async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      const allExpenses = await storage.getAllExpenses();
      
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const activeUsers = allUsers.filter(u => u.isActive).length;
      const newUsersThisMonth = allUsers.filter(u => 
        u.createdAt && new Date(u.createdAt) >= startOfMonth
      ).length;
      
      const totalExpenses = allExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
      const averageSpending = allUsers.length > 0 ? totalExpenses / allUsers.length : 0;

      res.json({
        totalUsers: allUsers.length,
        activeUsers,
        totalExpenses,
        monthlyRevenue: 0, // Placeholder for actual revenue calculation
        newUsersThisMonth,
        averageSpending,
      });
    } catch (error) {
      console.error("Error getting admin stats:", error);
      res.status(500).json({ message: "Failed to get admin stats" });
    }
  });

  app.get("/api/admin/users", isAdmin, async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      const allExpenses = await storage.getAllExpenses();

      const usersWithStats = allUsers.map(user => {
        const userExpenses = allExpenses.filter(e => e.userId === user.id);
        const totalExpenses = userExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
        
        const { password: _, ...userWithoutPassword } = user;
        
        return {
          ...userWithoutPassword,
          totalExpenses,
          lastActivity: userExpenses.length > 0 
            ? new Date(Math.max(...userExpenses.map(e => new Date(e.date).getTime()))).toISOString()
            : null,
        };
      });

      res.json(usersWithStats);
    } catch (error) {
      console.error("Error getting admin users:", error);
      res.status(500).json({ message: "Failed to get users" });
    }
  });

  app.get("/api/admin/expenses", isAdmin, async (req, res) => {
    try {
      const expenses = await storage.getAllExpenses();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch all expenses" });
    }
  });

  app.patch("/api/admin/users/:id/status", isAdmin, async (req, res) => {
    try {
      const { isActive } = req.body;
      const user = await storage.updateUser(req.params.id, { isActive });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User status updated successfully" });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ message: "Failed to update user status" });
    }
  });

  app.patch("/api/admin/users/:id/admin", isAdmin, async (req, res) => {
    try {
      const { isAdmin: makeAdmin } = req.body;
      const user = await storage.updateUser(req.params.id, { isAdmin: makeAdmin });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "Admin status updated successfully" });
    } catch (error) {
      console.error("Error updating admin status:", error);
      res.status(500).json({ message: "Failed to update admin status" });
    }
  });

  app.patch("/api/admin/users/:id", isAdmin, async (req, res) => {
    try {
      const { isActive, isAdmin: makeAdmin } = req.body;
      const updates: any = {};
      
      if (typeof isActive === 'boolean') updates.isActive = isActive;
      if (typeof makeAdmin === 'boolean') updates.isAdmin = makeAdmin;
      
      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  app.delete("/api/admin/users/:id", isAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteUser(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // Subscription management endpoints
  app.get("/api/subscription/info", isAuthenticated, async (req, res) => {
    try {
      const user = await storage.getUserById(getCurrentUser(req).id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        subscriptionPlan: user.subscriptionPlan,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionEndDate: user.subscriptionEndDate,
        monthlyScansUsed: parseInt(user.monthlyScansUsed),
        lastScanResetDate: user.lastScanResetDate,
        paymentMethod: user.stripeCustomerId ? { last4: "1234" } : null
      });
    } catch (error) {
      console.error("Error fetching subscription info:", error);
      res.status(500).json({ message: "Failed to fetch subscription info" });
    }
  });

  app.post("/api/subscription/create", isAuthenticated, async (req, res) => {
    try {
      const user = await storage.getUserById(getCurrentUser(req).id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // In a real implementation, integrate with Stripe here
      const mockCheckoutUrl = `https://buy.stripe.com/test_28o5kA0GKdWKgWQ288?client_reference_id=${user.id}`;
      
      res.json({ 
        checkoutUrl: mockCheckoutUrl,
        message: "Redirecting to payment..."
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });

  app.post("/api/subscription/cancel", isAuthenticated, async (req, res) => {
    try {
      const user = await storage.getUserById(getCurrentUser(req).id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await storage.updateUser(getCurrentUser(req).id, {
        subscriptionStatus: "canceled",
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });

      res.json({ message: "Subscription cancelled successfully" });
    } catch (error) {
      console.error("Error canceling subscription:", error);
      res.status(500).json({ message: "Failed to cancel subscription" });
    }
  });

  // Check and enforce scan limits
  app.post("/api/expenses/check-limit", isAuthenticated, async (req, res) => {
    try {
      const user = await storage.getUserById(getCurrentUser(req).id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Reset monthly scans if it's a new month
      const now = new Date();
      const lastReset = new Date(user.lastScanResetDate);
      const isNewMonth = now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear();

      if (isNewMonth) {
        await storage.updateUser(getCurrentUser(req).id, {
          monthlyScansUsed: "0",
          lastScanResetDate: now
        });
        return res.json({ 
          canScan: true, 
          scansUsed: 0, 
          scansLimit: user.subscriptionPlan === "premium" ? -1 : 10,
          message: "Monthly scans reset"
        });
      }

      const scansUsed = parseInt(user.monthlyScansUsed);
      const scansLimit = user.subscriptionPlan === "premium" ? -1 : 10;

      if (user.subscriptionPlan === "freemium" && scansUsed >= 10) {
        return res.json({ 
          canScan: false, 
          scansUsed, 
          scansLimit: 10,
          message: "Monthly scan limit reached. Upgrade to Premium for unlimited scans."
        });
      }

      res.json({ 
        canScan: true, 
        scansUsed, 
        scansLimit,
        message: "Scan allowed"
      });
    } catch (error) {
      console.error("Error checking scan limit:", error);
      res.status(500).json({ message: "Failed to check scan limit" });
    }
  });

  app.post("/api/expenses/increment-scan", isAuthenticated, async (req, res) => {
    try {
      const user = await storage.getUserById(getCurrentUser(req).id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newScansUsed = parseInt(user.monthlyScansUsed) + 1;
      await storage.updateUser(getCurrentUser(req).id, {
        monthlyScansUsed: newScansUsed.toString()
      });

      res.json({ scansUsed: newScansUsed });
    } catch (error) {
      console.error("Error incrementing scan count:", error);
      res.status(500).json({ message: "Failed to increment scan count" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
