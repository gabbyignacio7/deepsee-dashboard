import type { Express } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

// Rate limiter for login attempts - prevents brute force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per window
  message: { success: false, error: "Too many login attempts. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard authentication routes
  app.post("/api/auth/login", loginLimiter, (req, res) => {
    const { password } = req.body;
    // Use server-side secret, fall back to VITE_ for backwards compatibility
    const correctPassword = process.env.DASHBOARD_PASSWORD || process.env.VITE_DASHBOARD_PASSWORD;

    if (!req.session) {
      return res.status(500).json({ success: false, error: "Session not initialized" });
    }

    if (password === correctPassword) {
      // Regenerate session ID to prevent session fixation attacks
      req.session.regenerate((err) => {
        if (err) {
          return res.status(500).json({ success: false, error: "Session error" });
        }
        
        req.session.authenticated = true;
        res.json({ success: true });
      });
    } else {
      res.status(401).json({ success: false, error: "Incorrect password" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    if (!req.session) {
      return res.json({ success: true });
    }
    
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/auth/status", (req, res) => {
    res.json({ authenticated: !!(req.session && req.session.authenticated) });
  });

  app.get("/api/download/:file", (req, res) => {
    const fileName = req.params.file;
    const allowedFiles = ["client.zip", "server.zip", "shared.zip", "config.zip"];
    if (!allowedFiles.includes(fileName)) {
      return res.status(400).json({ error: "Invalid file" });
    }
    const filePath = path.join(process.cwd(), "downloads", fileName);
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      res.setHeader("Content-Type", "application/zip");
      res.download(filePath);
    } else {
      res.status(404).json({ error: "File not found" });
    }
  });

  app.get("/download-page", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Download Project</title>
      <style>body{font-family:sans-serif;padding:40px;max-width:600px;margin:0 auto}
      a{display:block;padding:15px 20px;margin:10px 0;background:#2563eb;color:white;text-decoration:none;border-radius:8px;text-align:center}
      a:hover{background:#1d4ed8}</style></head>
      <body>
      <h1>Download Project Files</h1>
      <p>Click each link below to download:</p>
      <a href="/api/download/client.zip" download>1. Client (Frontend) - 350KB</a>
      <a href="/api/download/server.zip" download>2. Server (Backend) - 8KB</a>
      <a href="/api/download/shared.zip" download>3. Shared (Types) - 1KB</a>
      <a href="/api/download/config.zip" download>4. Config Files - 8KB</a>
      <p style="margin-top:30px;color:#666">After downloading all 4 files, extract them to the same folder.</p>
      </body></html>
    `);
  });

  const httpServer = createServer(app);

  return httpServer;
}
