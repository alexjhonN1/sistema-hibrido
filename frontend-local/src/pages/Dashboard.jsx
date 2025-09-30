import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom"; // <-- Agregado Outlet

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 text-gray-200 transition-all duration-300 flex flex-col shadow-lg`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 text-center hover:bg-gray-700 border-b border-gray-600"
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>
        <nav className="flex flex-col p-3 space-y-2 text-sm">
          <Link
            to="/dashboard/users"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">🔑</span>
            {sidebarOpen && <span>Usuarios y Roles</span>}
          </Link>
          <Link
            to="/dashboard/sunat"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">🏛</span>
            {sidebarOpen && <span>Consultas SUNAT</span>}
          </Link>
          <Link
            to="/dashboard/clientes"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">👥</span>
            {sidebarOpen && <span>Clientes / Proveedores</span>}
          </Link>
          <Link
            to="/dashboard/empleados"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">🗂</span>
            {sidebarOpen && <span>Empleados y Horarios</span>}
          </Link>
          <Link
            to="/dashboard/cuentas"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">💰</span>
            {sidebarOpen && <span>Cuentas y Movimientos</span>}
          </Link>
          <Link
            to="/dashboard/macros"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">⚙️</span>
            {sidebarOpen && <span>Macros Automatizadas</span>}
          </Link>
          <Link
            to="/dashboard/sync"
            className="hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
          >
            <span className="text-lg">☁️</span>
            {sidebarOpen && <span>Sincronización Nube</span>}
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
          {/* Outlet para rutas hijas */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
