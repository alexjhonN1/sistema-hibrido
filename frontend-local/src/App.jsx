import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Sunat from "./pages/Sunat"; // 👈 Importar el módulo SUNAT

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <nav className="p-4 bg-gray-200 flex justify-between">
        {!token ? (
          <>
            <Link to="/login" className="text-blue-600">Login</Link>
            <Link to="/register" className="text-blue-600">Registro</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="text-blue-600">Dashboard</Link>
            <Link to="/dashboard/sunat" className="text-blue-600">Consultas SUNAT</Link>
          </>
        )}
      </nav>

      <Routes>
        {/* Login y Registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard protegido */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Módulo Consultas SUNAT */}
        <Route
          path="/dashboard/sunat"
          element={token ? <Sunat /> : <Navigate to="/login" />}
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
