import { Router } from "express";
import pool from "../config/db.js";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

// Guardar historial de consultas
router.post("/historial", verificarToken, async (req, res) => {
  try {
    const { ruc, accion } = req.body;
    const userId = req.user.id;

    const [result] = await pool.query(
      "INSERT INTO historial_sunat (user_id, ruc, accion) VALUES (?, ?, ?)",
      [userId, ruc, accion]
    );

    res.json({ message: "Historial guardado", id: result.insertId });
  } catch (error) {
    console.error("❌ Error en historial:", error.message);
    res.status(500).json({ message: "Error al guardar historial" });
  }
});

export default router;
