import express from "express";
import { UserModel } from "../models/user.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  try {
    const users = UserModel.getAll();
    
    res.status(200).json({
      status: 'success',
      data: users
    });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao listar usuários'
    });
  }
});

export default router;