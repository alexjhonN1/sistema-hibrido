import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${open ? "w-64" : "w-16"} bg-blue-800 text-white transition-all duration-300 flex flex-col`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="p-4 text-center hover:bg-blue-700"
        >
          {open ? "◀" : "▶"}
        </button>
        <nav className="flex flex-col p-2 space-y-2">
          <Link to="/dashboard" className="hover:bg-blue-700 p-2 rounded transition">
            🏠 {open && "Inicio"}
          </Link>
          <Link to="/dashboard/users" className="hover:bg-blue-700 p-2 rounded transition">
            👥 {open && "Usuarios"}
          </Link>
          <Link to="/dashboard/settings" className="hover:bg-blue-700 p-2 rounded transition">
            ⚙️ {open && "Configuración"}
          </Link>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-700">
            Bienvenido, {user?.nombre || "Usuario"}
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </header>

        {/* Main */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <p className="text-gray-600">
            Aquí podrás administrar usuarios, configuraciones y más módulos.
          </p>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
