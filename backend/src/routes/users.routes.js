import { Router } from "express";
import pool from "../config/db.js";
import { verificarToken } from "../middleware/auth.middleware.js";
import { verificarRol } from "../middleware/role.middleware.js";

const router = Router();

// Obtener todos los usuarios (solo ADMIN)
router.get("/", verificarToken, verificarRol(["ADMIN"]), async (req, res) => {
  const [rows] = await pool.query("SELECT id, nombre, email, rol, estado FROM users");
  res.json(rows);
});

// Actualizar rol o estado de usuario (solo ADMIN)
router.put("/:id", verificarToken, verificarRol(["ADMIN"]), async (req, res) => {
  const { rol, estado } = req.body;
  await pool.query("UPDATE users SET rol=?, estado=? WHERE id=?", [rol, estado, req.params.id]);
  res.json({ message: "✅ Usuario actualizado" });
});

// Eliminar usuario (solo ADMIN)
router.delete("/:id", verificarToken, verificarRol(["ADMIN"]), async (req, res) => {
  await pool.query("DELETE FROM users WHERE id=?", [req.params.id]);
  res.json({ message: "✅ Usuario eliminado" });
});

export default router;
