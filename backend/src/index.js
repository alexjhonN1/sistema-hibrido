// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import sunatRoutes from "./routes/sunat.routes.js";
import usersRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Rutas
app.use("/api/auth", authRoutes);          // Login / Register
app.use("/api/dashboard", dashboardRoutes); // Dashboard
app.use("/api/sunat", sunatRoutes);         // Consultas a SUNAT
app.use("/api/users", usersRoutes);         // Gestión de usuarios (solo ADMIN)

// Servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
