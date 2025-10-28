import { Router } from "express";
import { verificarToken, verificarRol } from "../middleware/auth.middleware.js";
import { registrarCliente, listarClientes, listarClientesPorCodigo } from "../controllers/clientes.controller.js";

const router = Router();

// Registrar cliente (ADMIN/TRABAJADOR)
router.post(
  "/clientes",
  verificarToken,
  verificarRol(["ADMIN", "TRABAJADOR"]),
  registrarCliente
);

// Listar todos los clientes
router.get(
  "/clientes",
  verificarToken,
  verificarRol(["ADMIN", "TRABAJADOR"]),
  listarClientes
);

// Listar clientes por código 0-9
router.get(
  "/clientes/codigo/:codigo",
  verificarToken,
  verificarRol(["ADMIN", "TRABAJADOR"]),
  listarClientesPorCodigo
);

export default router;
