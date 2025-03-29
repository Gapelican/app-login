import { db } from "../config/database.ts";

export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export interface UserDTO {
  id: number;
  nome: string;
  email: string;
}

export const UserModel = {
  findByEmail: (email: string): User | undefined => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email) as User | undefined;
  },
  
  create: (nome: string, email: string, senha: string): void => {
    const stmt = db.prepare("INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)");
    stmt.run(nome, email, senha);
  },
  
  getAll: (): UserDTO[] => {
    const stmt = db.prepare("SELECT id, nome, email FROM users");
    return stmt.all() as UserDTO[];
  },
  
  toDTO: (user: User): UserDTO => {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email
    };
  }
};