// controllers/gastoController.js
const Gasto = require('../models/Gasto');

// Obtener todos los gastos
exports.getAllGastos = (req, res) => {
  Gasto.getAll((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener los gastos' });
    }
    res.json(results);
  });
};

// Obtener un gasto por ID
exports.getGastoById = (req, res) => {
  const { id } = req.params;
  Gasto.getById(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener el gasto' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }
    res.json(result[0]);
  });
};

// Crear un nuevo gasto
exports.createGasto = (req, res) => {
  const { descripcion, monto, fecha } = req.body;
  if (!descripcion || !monto || !fecha) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  Gasto.create(descripcion, monto, fecha, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al crear el gasto' });
    }
    res.status(201).json({ message: 'Gasto creado exitosamente', id: result.insertId });
  });
};

// Actualizar un gasto por ID
exports.updateGasto = (req, res) => {
  const { id } = req.params;
  const { descripcion, monto, fecha } = req.body;

  Gasto.update(id, descripcion, monto, fecha, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al actualizar el gasto' });
    }
    res.json({ message: 'Gasto actualizado exitosamente' });
  });
};

// Eliminar un gasto por ID
exports.deleteGasto = (req, res) => {
  const { id } = req.params;

  Gasto.delete(id, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar el gasto' });
    }
    res.json({ message: 'Gasto eliminado exitosamente' });
  });
};
