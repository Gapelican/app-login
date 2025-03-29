import { DatabaseSync } from "node:sqlite";

const dbFile = Deno.env.get('DB_FILE') || "users-dev.db";

export const db = new DatabaseSync(dbFile);

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log(`Banco de dados inicializado: ${dbFile}`);
}