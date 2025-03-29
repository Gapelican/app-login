import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { UserModel, type UserDTO } from "../models/user.ts";

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
  
  login: async (email: string, senha: string): Promise<UserDTO | null> => {
    const user = UserModel.findByEmail(email);
    
    if (!user) {
      return null;
    }
    
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    
    if (!passwordMatch) {
      return null;
    }
    
    return UserModel.toDTO(user);
  }
};