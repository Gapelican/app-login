// @ts-types="npm:@types/express@4.17.15"
import express from "express";
import { validateRequest } from "../middlewares/validator.ts";
import { UserSchema, LoginSchema } from "../schemas/auth.ts";
import { AuthService } from "../services/auth-service.ts";

const router = express.Router();

router.post("/register", validateRequest(UserSchema), async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    const success = await AuthService.register(nome, email, senha);
    
    if (!success) {
      return res.status(409).json({
        status: 'error',
        message: 'Email já cadastrado'
      });
    }
    
    res.status(201).json({
      status: 'success',
      message: 'Usuário cadastrado com sucesso!'
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao cadastrar usuário'
    });
  }
});

router.post("/login", validateRequest(LoginSchema), async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    const user = await AuthService.login(email, senha);
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Email ou senha incorretos'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Login realizado com sucesso!',
      user
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao fazer login'
    });
  }
});

export default router;