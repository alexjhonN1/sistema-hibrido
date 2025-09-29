// src/routes/users.routes.js
import { Router } from "express";
import { 
  getUsers, 
  updateUser, 
  deleteUser, 
  createUserAdmin 
} from "../controllers/users.controller.js";
import { verificarToken } from "../middleware/auth.middleware.js";
import { verificarRol } from "../middleware/role.middleware.js";

const router = Router();

// ✅ Obtener todos los usuarios (solo ADMIN)
router.get(
  "/users",
  verificarToken,
  verificarRol(["ADMIN"]),
  getUsers
);

// ✅ Crear un usuario (solo ADMIN)
router.post(
  "/users",
  verificarToken,
  verificarRol(["ADMIN"]),
  createUserAdmin
);

// ✅ Actualizar rol, estado o fechas de usuario (solo ADMIN)
router.put(
  "/users/:id",
  verificarToken,
  verificarRol(["ADMIN"]),
  updateUser
);

// ✅ Eliminar usuario (solo ADMIN)
router.delete(
  "/users/:id",
  verificarToken,
  verificarRol(["ADMIN"]),
  deleteUser
);

export default router;
