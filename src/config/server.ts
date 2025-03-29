import express from "express";
import cors from "cors";
import { securityMiddleware } from "../middlewares/security.ts";

export function createServer() {
  const app = express();
  
  // Adicionar CORS para permitir chamadas do frontend
  app.use(cors({
    origin: Deno.env.get('CORS_ORIGIN') || "http://localhost:8000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  
  // Middlewares globais
  app.use(express.json());
  app.use(securityMiddleware);
  
  return app;
}