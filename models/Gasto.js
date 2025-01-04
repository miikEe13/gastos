// models/Gasto.js
const db = require('../config/db');

const Gasto = {
  // Obtener todos los gastos
  getAll: (callback) => {
    db.query('SELECT * FROM gastos', callback);
  },

  // Obtener un gasto por ID
  getById: (id, callback) => {
    db.query('SELECT * FROM gastos WHERE id = ?', [id], callback);
  },

  // Crear un nuevo gasto
  create: (descripcion, monto, fecha, callback) => {
    db.query(
      'INSERT INTO gastos (descripcion, monto, fecha) VALUES (?, ?, ?)',
      [descripcion, monto, fecha],
      callback
    );
  },

  // Actualizar un gasto por ID
  update: (id, descripcion, monto, fecha, callback) => {
    db.query(
      'UPDATE gastos SET descripcion = ?, monto = ?, fecha = ? WHERE id = ?',
      [descripcion, monto, fecha, id],
      callback
    );
  },

  // Eliminar un gasto por ID
  delete: (id, callback) => {
    db.query('DELETE FROM gastos WHERE id = ?', [id], callback);
  }
};

module.exports = Gasto;
