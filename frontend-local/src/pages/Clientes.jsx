import { useState, useEffect } from "react";
import axios from "axios";

// Lista de rubros según tabla
const RUBROS = [
  { codigo: "01", descripcion: "PERSONA NATURAL SIN NEGOCIO" },
  { codigo: "02", descripcion: "PERSONA NATURAL CON NEGOCIO" },
  { codigo: "03", descripcion: "SOCIEDAD CONYUGAL SIN NEGOCIO" },
  { codigo: "04", descripcion: "SOCIEDAD CONYUGAL CON NEGOCIO" },
  { codigo: "05", descripcion: "SUCESION INDIVISA SIN NEGOCIO" },
  { codigo: "06", descripcion: "SUCESION INDIVISA CON NEGOCIO" },
  { codigo: "07", descripcion: "EMPRESA INDIVIDUAL DE RESP. LTDA" },
  { codigo: "08", descripcion: "SOCIEDAD CIVIL" },
  { codigo: "09", descripcion: "SOCIEDAD IRREGULAR" },
  { codigo: "10", descripcion: "ASOCIACION EN PARTICIPACION" },
  { codigo: "11", descripcion: "ASOCIACION" },
  { codigo: "12", descripcion: "FUNDACION" },
  { codigo: "13", descripcion: "SOCIEDAD EN COMANDITA SIMPLE" },
  { codigo: "14", descripcion: "SOCIEDAD COLECTIVA" },
  { codigo: "15", descripcion: "INSTITUCIONES PUBLICAS" },
  { codigo: "16", descripcion: "INSTITUCIONES RELIGIOSAS" },
  { codigo: "17", descripcion: "SOCIEDAD DE BENEFICIENCIA" },
  { codigo: "18", descripcion: "ENTIDADES DE AUXILIO MUTUO" },
  { codigo: "19", descripcion: "UNIVERS. CENTROS EDUCAT. Y CULT." },
  { codigo: "20", descripcion: "GOBIERNO REGIONAL, LOCAL" },
  { codigo: "21", descripcion: "GOBIERNO CENTRAL" },
  { codigo: "22", descripcion: "COMUNIDAD LABORAL" },
  { codigo: "23", descripcion: "COMUNIDAD CAMPESINA,NATIVA,COMUNAL" },
  { codigo: "24", descripcion: "COOPERATIVAS, SAIS, CAPS" },
  { codigo: "25", descripcion: "EMPRESA DE PROPIEDAD SOCIAL" },
  { codigo: "26", descripcion: "SOCIEDAD ANONIMA" },
  { codigo: "27", descripcion: "SOCIEDAD EN COMANDITA POR ACCIONES" },
  { codigo: "28", descripcion: "SOC.COM.RESPONS. LTDA" },
  { codigo: "29", descripcion: "SUC,AG.EMP.EXTRANJ,EST.PERM NO DOM." },
  { codigo: "30", descripcion: "EMPRESA DE DERECHO PUBLICO" },
  { codigo: "31", descripcion: "EMPRESA ESTATAL DE DERECHO PRIVADO" },
  { codigo: "32", descripcion: "EMPRESA DE ECONOMIA MIXTA" },
  { codigo: "33", descripcion: "ACCIONARIADO DEL ESTADO" },
  { codigo: "34", descripcion: "MISIONES DIPLOMATICAS Y ORG. INTER." },
  { codigo: "35", descripcion: "JUNTA DE PROPIETARIOS" },
  { codigo: "36", descripcion: "OF.REPRESENTACION DE NO DOMICILIADO" },
  { codigo: "37", descripcion: "FONDOS MUTUOS DE INVERSION" },
  { codigo: "38", descripcion: "SOCIEDAD ANONIMA ABIERTA" },
  { codigo: "39", descripcion: "SOCIEDAD ANONIMA CERRADA" },
  { codigo: "40", descripcion: "CONTRATOS COLABORACION EMPRESARIAL" },
  { codigo: "41", descripcion: "ENT.INST.COOPERAC.TECNICA - ENIEX" },
  { codigo: "42", descripcion: "COMUNIDAD DE BIENES" },
  { codigo: "43", descripcion: "SOCIEDAD MINERA DE RESP.LIMITADA" },
  { codigo: "44", descripcion: "ASOC. FUNDAC. Y COMITE NO INSCRITOS" },
  { codigo: "45", descripcion: "PARTIDOS,MOVIM, ALIANZAS POLITICAS" },
  { codigo: "46", descripcion: "ASOC. DE HECHO DE PROFESIONALES" },
  { codigo: "47", descripcion: "CAFAES Y SUBCAFAES" },
  { codigo: "48", descripcion: "SINDICATOS Y FEDERACIONES" },
  { codigo: "49", descripcion: "COLEGIOS PROFESIONALES" },
  { codigo: "50", descripcion: "COMITES INSCRITOS" },
  { codigo: "51", descripcion: "ORGANIZACIONES SOCIALES DE BASE" },
];

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [filtroCodigo, setFiltroCodigo] = useState(null);
  const [form, setForm] = useState({ nombre: "", ruc: "", rubro: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async (codigo = null) => {
    try {
      let url = "http://localhost:4000/api/clientes";
      if (codigo !== null) url += `/codigo/${codigo}`;
      const res = await axios.get(url);
      setClientes(res.data);
    } catch (err) {
      console.error("❌ Error al cargar clientes:", err);
      setMessage("❌ Error al cargar clientes");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar solo strings y limpiar espacios
      const payload = {
        nombre: String(form.nombre).trim(),
        ruc: String(form.ruc).trim(),
        rubro: String(form.rubro).trim(),
      };

      await axios.post("http://localhost:4000/api/clientes", payload);
      setMessage("✅ Cliente registrado correctamente");
      setForm({ nombre: "", ruc: "", rubro: "" });
      fetchClientes(filtroCodigo);
    } catch (err) {
      console.error(
        "❌ Error al registrar cliente:",
        err.response?.data?.message || err.message
      );
      setMessage(err.response?.data?.message || "❌ Error al registrar cliente");
    }
  };

  const filtrarPorCodigo = (codigo) => {
    setFiltroCodigo(codigo);
    fetchClientes(codigo);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">
        Clientes / Proveedores
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del cliente"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-xl"
        />
        <input
          type="text"
          name="ruc"
          placeholder="RUC"
          value={form.ruc}
          onChange={handleChange}
          required
          maxLength={20} // limitar a 20 caracteres según la base de datos
          className="w-full border border-gray-300 p-3 rounded-xl"
        />
        <select
          name="rubro"
          value={form.rubro}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-xl"
        >
          <option value="">Selecciona un rubro</option>
          {RUBROS.map((r) => (
            <option key={r.codigo} value={r.descripcion}>
              {r.codigo} - {r.descripcion}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
        >
          Registrar Cliente
        </button>
        {message && (
          <p
            className={`mt-2 font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      {/* Filtros por código */}
      <div className="flex gap-2 flex-wrap">
        {[...Array(10).keys()].map((num) => (
          <button
            key={num}
            onClick={() => filtrarPorCodigo(num)}
            className={`px-3 py-1 rounded-full border ${
              filtroCodigo === num ? "bg-blue-500 text-white" : "bg-white border-gray-300"
            }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => filtrarPorCodigo(null)}
          className="px-3 py-1 rounded-full border bg-gray-200"
        >
          Todos
        </button>
      </div>

      {/* Listado de clientes */}
      <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <h3 className="font-semibold text-lg mb-4">Listado de Clientes</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">#</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">RUC</th>
              <th className="p-2">Rubro</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length ? (
              clientes.map((c, idx) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{c.nombre}</td>
                  <td className="p-2">{c.ruc}</td>
                  <td className="p-2">{c.categoria}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center text-gray-500">
                  No hay clientes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
