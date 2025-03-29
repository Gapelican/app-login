import { createServer } from "./config/server.ts";
import { initDatabase } from "./config/database.ts";
import authRoutes from "./routes/auth.ts";
import userRoutes from "./routes/users.ts";

// Inicializar banco de dados
initDatabase();

// Criar servidor
const app = createServer();
const port = Deno.env.get('PORT') ?? "8000";

// Registrar rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});