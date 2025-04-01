import express from "express";
import cors from "cors";
import { securityMiddleware } from "../middlewares/security.js";

export function createServer() {
  const app = express();
  
  app.use(cors({
    origin: Deno.env.get('CORS_ORIGIN') || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  
  app.use(express.json());
  app.use(securityMiddleware);
  
  return app;
}