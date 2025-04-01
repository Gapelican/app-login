import jwt from "jsonwebtoken";

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "sua_chave_secreta_temporaria";


export function generateToken(userId, email) {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Token de autenticação não fornecido"
      });
    }
    
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    req.user = decoded;
    next();
  } catch (_error) {
    return res.status(401).json({
      status: "error",
      message: "Token inválido ou expirado"
    });
  }
}