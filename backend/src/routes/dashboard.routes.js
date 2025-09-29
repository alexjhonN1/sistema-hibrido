// backend/src/routes/dashboard.routes.js
import { Router } from "express";
import pool from "../config/db.js";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

// Ruta de bienvenida (opcional, puedes dejarla si la usas)
router.get("/", verificarToken, (req, res) => {
  res.json({
    message: "✅ Bienvenido al Dashboard",
    user: req.user, // contiene id, email, rol del token
  });
});

// 🔹 Ruta de estadísticas para el dashboard
router.get("/stats", verificarToken, async (req, res) => {
  try {
    // Usuarios activos
    const [[usuariosActivos]] = await pool.query(
      "SELECT COUNT(*) AS total FROM users WHERE estado = 1"
    );

    // Clientes registrados
    const [[clientes]] = await pool.query(
      "SELECT COUNT(*) AS total FROM clientes"
    );

    // Consultas realizadas a SUNAT
    const [[consultas]] = await pool.query(
      "SELECT COUNT(*) AS total FROM sunat_consultas"
    );

    res.json({
      usuariosActivos: usuariosActivos.total,
      clientes: clientes.total,
      consultas: consultas.total,
    });
  } catch (error) {
    console.error("❌ Error en /api/dashboard/stats:", error.message);
    res.status(500).json({ message: "Error al obtener estadísticas" });
  }
});

export default router;
