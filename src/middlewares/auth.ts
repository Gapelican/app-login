// src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "sua_chave_secreta_temporaria";

interface DecodedToken {
  userId: number;
  email: string;
}

// Interface para estender o tipo Request
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export function generateToken(userId: number, email: string): string {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Token de autenticação não fornecido"
      });
    }
    
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    
    req.user = decoded;
    next();
  } catch (_error) {
    return res.status(401).json({
      status: "error",
      message: "Token inválido ou expirado"
    });
  }
}
