import express from "express";
import { securityMiddleware } from "../middlewares/security.ts";

export function createServer() {
  const app = express();
  
  // Middlewares globais
  app.use(express.json());
  app.use(securityMiddleware);
  
  return app;
}