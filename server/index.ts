// server/index.ts
import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// --- ✅ CORS at the very top ---
const FRONTEND_URL = "https://kudiscan.onrender.com";

const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handles all OPTIONS preflights

// --- JSON parsing ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Rewrite middleware: strip leading /api so existing routes match ---
// This lets your backend continue to register routes like "/auth/register"
// while accepting requests from the client to "/api/auth/register".
app.use("/api", (req: Request, _res: Response, next: NextFunction) => {
  // Remove the "/api" prefix so downstream route matching sees "/auth/..."
  // Example: incoming "/api/auth/register" -> becomes "/auth/register"
  if (req.url.startsWith("/")) {
    // req.url includes the path _after_ the mount point when using app.use('/api', ...)
    // but to be safe, replace any leading /api in case of proxy differences.
    req.url = req.url.replace(/^\/api/, "") || "/";
  }
  next();
});

// --- Request logging ---
app.use((req, res, next) => {
  const start = Date.now();
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.json = function (bodyJson: any, ...args: any[]) {
    capturedJsonResponse = bodyJson;
    // @ts-ignore call original with proper this
    return originalResJson.apply(this, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    if (req.path.startsWith("/api") || req.path.startsWith("/auth") || req.path.startsWith("/")) {
      let logLine = `${req.method} ${req.path} ${res.statusCode} in ${Date.now() - start}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      log(logLine.length > 80 ? logLine.slice(0, 79) + "…" : logLine);
    }
  });

  next();
});

// --- Mount your API routes ---
(async () => {
  // Keep calling registerRoutes(app) as before; the /api prefix is handled by the middleware above.
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Only setup Vite in development
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({ port, host: "0.0.0.0", reusePort: true }, () =>
    log(`serving on port ${port}`)
  );
})();
