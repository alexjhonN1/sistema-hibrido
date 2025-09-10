const pool = require("../config/db");

const User = {
  create: async (username, password, role) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, password, role]
      );
      return res;
    } finally {
      if (conn) conn.release();
    }
  },

  findByUsername: async (username) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * FROM users WHERE username = ?", [
        username,
      ]);
      return rows[0];
    } finally {
      if (conn) conn.release();
    }
  },
};

module.exports = User;
