import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Sunat from "./pages/Sunat"; 
import Users from "./pages/Users";
import Clientes from "./pages/Clientes"; // Nuevo módulo

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Login y Registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard con rutas hijas */}
        <Route 
          path="/dashboard/*" 
          element={token ? <Dashboard /> : <Navigate to="/login" />} 
        >
          <Route path="users" element={<Users />} />
          <Route path="sunat" element={<Sunat />} />
          <Route path="clientes" element={<Clientes />} />
          {/* Aquí se pueden agregar más rutas hijas */}
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
