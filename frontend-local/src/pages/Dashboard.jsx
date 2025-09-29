import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-gray-800 text-gray-200 transition-all duration-300 flex flex-col shadow-lg`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="p-4 text-center hover:bg-gray-700 border-b border-gray-600"
        >
          {open ? "◀" : "▶"}
        </button>
        <nav className="flex flex-col p-3 space-y-2 text-sm">
          <Link
            to="/dashboard/users"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">🔑</span>
            {open && <span>Usuarios y Roles</span>}
          </Link>
          <Link
            to="/dashboard/sunat"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">🏛</span>
            {open && <span>Consultas SUNAT</span>}
          </Link>
          <Link
            to="/dashboard/clientes"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">👥</span>
            {open && <span>Clientes / Proveedores</span>}
          </Link>
          <Link
            to="/dashboard/empleados"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">🗂</span>
            {open && <span>Empleados y Horarios</span>}
          </Link>
          <Link
            to="/dashboard/cuentas"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">💰</span>
            {open && <span>Cuentas y Movimientos</span>}
          </Link>
          <Link
            to="/dashboard/macros"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">⚙️</span>
            {open && <span>Macros Automatizadas</span>}
          </Link>
          <Link
            to="/dashboard/sync"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">☁️</span>
            {open && <span>Sincronización Nube</span>}
          </Link>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center border-b">
          <h1 className="text-xl font-bold text-gray-800">
            Bienvenido, {user?.nombre || "Usuario"}
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </header>

        {/* Main */}
        <main className="p-6 space-y-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-700">
            Panel Principal
          </h2>

          {/* Tarjetas resumen */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg p-6 rounded-xl border-l-4 border-blue-500">
              <h3 className="text-gray-600">Usuarios activos</h3>
              <p className="text-2xl font-bold text-blue-600">25</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-xl border-l-4 border-green-500">
              <h3 className="text-gray-600">Consultas SUNAT</h3>
              <p className="text-2xl font-bold text-green-600">120</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-xl border-l-4 border-yellow-500">
              <h3 className="text-gray-600">Clientes Registrados</h3>
              <p className="text-2xl font-bold text-yellow-600">58</p>
            </div>
          </div>

          {/* Guía de navegación */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Accede a los módulos</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>🔑 Usuarios y Roles</li>
              <li>🏛 Consultas a SUNAT</li>
              <li>👥 Clientes / Proveedores</li>
              <li>🗂 Empleados y Horarios</li>
              <li>💰 Cuentas y Movimientos</li>
              <li>⚙️ Macros Automatizadas</li>
              <li>☁️ Sincronización con la nube</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
