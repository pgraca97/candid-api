import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import pool from "./config/db.js";
import applicationRoutes from "./routes/application.routes.js";
import companyRoutes from "./routes/company.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste básica
app.get("/", (req, res) => {
  res.json({ message: "Job Tracker API is running" });
});

// Rota de teste de base de dados
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// Rotas da aplicação
app.use("/api/applications", applicationRoutes);
app.use("/api/companies", companyRoutes); 

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/test-db`);
  console.log(`   GET  http://localhost:${PORT}/api/applications`);
  console.log(`   POST http://localhost:${PORT}/api/applications`);
  console.log(`   GET  http://localhost:${PORT}/api/companies`);
});