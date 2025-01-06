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

    // Obtener gastos por mes
    getByMonth: (mes, callback) => {
        db.query(
            'SELECT * FROM gastos WHERE MONTH(fecha) = ?',
            [mes],
            callback
        );
    },

    // Resumen mensual
    getMonthlySummary: (mes, callback) => {
        db.query(
            `SELECT 
          COUNT(*) AS totalGastos, 
          SUM(monto) AS montoTotal, 
          AVG(monto) AS montoPromedio 
       FROM gastos 
       WHERE MONTH(fecha) = ?`,
            [mes],
            callback
        );
    },

    // Crear un nuevo gasto
    create: (descripcion, monto, fecha, callback) => {
        db.query(
            'INSERT INTO gastos (descripcion, monto, fecha) VALUES (?, ?, ?)',
            [descripcion, monto, fecha],
            callback
        );
    },

    // Crear múltiples gastos
    createMultiple: (gastos, callback) => {
        const values = gastos.map(gasto => [gasto.descripcion, gasto.monto, gasto.fecha]);
        db.query(
            'INSERT INTO gastos (descripcion, monto, fecha) VALUES ?',
            [values],
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
