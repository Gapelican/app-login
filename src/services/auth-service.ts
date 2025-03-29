import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { UserModel, type UserDTO } from "../models/user.ts";
import { generateToken } from "../middlewares/auth.ts";
import jwt from "jsonwebtoken";



export const AuthService = {
  register: async (nome: string, email: string, senha: string): Promise<boolean> => {
    const existingUser = UserModel.findByEmail(email);
    
    if (existingUser) {
      return false;
    }
    
    const hashedPassword = await bcrypt.hash(senha);
    UserModel.create(nome, email, hashedPassword);
    return true;
  },
  
  login: async (email: string, senha: string): Promise<{ user: UserDTO, token: string } | null> => {
    const user = UserModel.findByEmail(email);
    
    if (!user) {
      return null;
    }
    
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    
    if (!passwordMatch) {
      return null;
    }
    
    const userDto = UserModel.toDTO(user);
    const token = generateToken(user.id, user.email);
    
    return { user: userDto, token };
  },
  
  validateToken: (token: string): { valid: boolean, user?: UserDTO } => {
    try {
      const decoded = jwt.verify(token, Deno.env.get("JWT_SECRET")) as { userId: number, email: string };
      const user = UserModel.findByEmail(decoded.email);
      
      if (!user) {
        return { valid: false };
      }
      
      return { valid: true, user: UserModel.toDTO(user) };
    } catch (_error) {
      return { valid: false };
    }
  }
};