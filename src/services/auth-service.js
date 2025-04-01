import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { UserModel } from "../models/user.js";
import { generateToken } from "../middlewares/auth.js";
import jwt from "jsonwebtoken";

export const AuthService = {
  register: async (nome, email, senha) => {
    const existingUser = UserModel.findByEmail(email);
    if (existingUser) {
      return false;
    }
    const hashedPassword = await bcrypt.hash(senha);
    UserModel.create(nome, email, hashedPassword);
    return true;
  },

  login: async (email, senha) => {
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

  validateToken: (token) => {
    try {
      const decoded = jwt.verify(token, Deno.env.get("JWT_SECRET"));
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