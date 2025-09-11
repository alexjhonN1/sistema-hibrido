import { Router } from "express";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verificarToken, (req, res) => {
  res.json({
    message: "✅ Bienvenido al Dashboard",
    user: req.user, // id, email, rol
  });
});

export default router;
