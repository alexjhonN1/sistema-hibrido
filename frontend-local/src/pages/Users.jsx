import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // ✅ Lista de roles disponibles
  const token = localStorage.getItem("token");

  // ✅ Obtener usuarios y roles al montar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, rolesRes] = await Promise.all([
          axios.get("http://localhost:4000/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:4000/api/roles", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setUsers(usersRes.data);
        setRoles(rolesRes.data);
      } catch (err) {
        console.error("❌ Error al cargar usuarios/roles:", err);
      }
    };
    fetchData();
  }, [token]);

  // ✅ Actualizar usuario (rol, estado, fechas)
  const actualizarUsuario = async (id, rol, estado, fecha_inicio, fecha_fin) => {
    try {
      await axios.put(
        `http://localhost:4000/api/users/${id}`,
        { rol, estado, fecha_inicio, fecha_fin },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refrescar en frontend
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, rol, estado, fecha_inicio, fecha_fin } : u
        )
      );
    } catch (err) {
      console.error("❌ Error al actualizar usuario:", err);
    }
  };

  // ✅ Eliminar usuario
  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("❌ Error al eliminar usuario:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Control de Roles</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rol</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Fecha Inicio</th>
            <th className="border p-2">Fecha Fin</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.nombre}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">
                <select
                  value={u.rol || ""}
                  onChange={(e) =>
                    actualizarUsuario(
                      u.id,
                      e.target.value,
                      u.estado,
                      u.fecha_inicio,
                      u.fecha_fin
                    )
                  }
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.nombre}>
                      {r.nombre}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border p-2">
                <select
                  value={u.estado}
                  onChange={(e) =>
                    actualizarUsuario(
                      u.id,
                      u.rol,
                      e.target.value,
                      u.fecha_inicio,
                      u.fecha_fin
                    )
                  }
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="datetime-local"
                  value={u.fecha_inicio ? u.fecha_inicio.slice(0, 16) : ""}
                  onChange={(e) =>
                    actualizarUsuario(
                      u.id,
                      u.rol,
                      u.estado,
                      e.target.value,
                      u.fecha_fin
                    )
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="datetime-local"
                  value={u.fecha_fin ? u.fecha_fin.slice(0, 16) : ""}
                  onChange={(e) =>
                    actualizarUsuario(
                      u.id,
                      u.rol,
                      u.estado,
                      u.fecha_inicio,
                      e.target.value
                    )
                  }
                />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => eliminarUsuario(u.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
