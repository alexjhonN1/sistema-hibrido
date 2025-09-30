import { createCliente, getAllClientes, getClientesByCodigo } from "../models/Cliente.js";

// Registrar cliente
export const registrarCliente = async (req, res) => {
  try {
    const { nombre, ruc, rubro } = req.body;

    if (!nombre || !ruc || !rubro) {
      return res.status(400).json({ message: "Nombre, RUC y rubro son obligatorios" });
    }

    const clienteId = await createCliente(nombre, ruc, rubro);
    res.json({ message: "✅ Cliente registrado correctamente", clienteId });
  } catch (error) {
    console.error("❌ Error al registrar cliente:", error.message);
    res.status(500).json({ message: "Error al registrar cliente" });
  }
};

// Listar todos los clientes
export const listarClientes = async (req, res) => {
  try {
    const clientes = await getAllClientes();
    res.json(clientes);
  } catch (error) {
    console.error("❌ Error al listar clientes:", error.message);
    res.status(500).json({ message: "Error al listar clientes" });
  }
};

// Listar clientes por código (0-9)
export const listarClientesPorCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const clientes = await getClientesByCodigo(codigo || null);
    res.json(clientes);
  } catch (error) {
    console.error("❌ Error al listar clientes por código:", error.message);
    res.status(500).json({ message: "Error al listar clientes por código" });
  }
};
