import { useState } from "react";

function Sunat() {
  const [ruc, setRuc] = useState("");
  const [claveSol, setClaveSol] = useState("");

  const handleConsultaRuc = () => {
    if (!ruc) {
      alert("Ingrese un RUC antes de consultar.");
      return;
    }
    // Redirección a SUNAT consulta RUC
    window.open(`https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias?accion=consPorRuc&nroRuc=${ruc}`, "_blank");
  };

  const handleBuzon = () => {
    window.open("https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm", "_blank");
  };

  const handleSunatFiel = () => {
    window.open("https://www.sunat.gob.pe/operaciones-en-linea.html", "_blank");
  };

  const handleGuardarHistorial = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/sunat/historial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ruc, accion: "Consulta RUC" }),
      });
      const data = await res.json();
      console.log("Historial guardado:", data);
    } catch (err) {
      console.error("Error al guardar historial", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Consultas a SUNAT</h2>

      <div className="space-y-4">
        {/* Consulta RUC */}
        <div>
          <label className="block font-medium">Número de RUC:</label>
          <input
            type="text"
            value={ruc}
            onChange={(e) => setRuc(e.target.value)}
            className="border p-2 rounded w-64"
            placeholder="Ingrese RUC"
          />
          <button
            onClick={() => { handleConsultaRuc(); handleGuardarHistorial(); }}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Consultar RUC
          </button>
        </div>

        {/* Buzón SUNAT */}
        <div>
          <button
            onClick={handleBuzon}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ir al Buzón SUNAT
          </button>
        </div>

        {/* SUNAT Fiel */}
        <div>
          <button
            onClick={handleSunatFiel}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Acceder a SUNAT Fiel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sunat;
