import { createServer } from "./config/server.js";
import { initDatabase } from "./config/database.js";
import authRoutes from "./routes/auth.js";

// Inicializar banco de dados
initDatabase();

// Criar servidor
const app = createServer();
const port = Deno.env.get('PORT') ?? "8000";

// Registrar rotas
app.use("/auth", authRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});