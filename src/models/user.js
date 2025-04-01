import { db } from "../config/database.js";

export const UserModel = {
  findByEmail: (email) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email);
  },
  
  create: (nome, email, senha) => {
    const stmt = db.prepare("INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)");
    stmt.run(nome, email, senha);
  },
  
  toDTO: (user) => {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email
    };
  }
};