const pool = require('../db');

// GET all clientes
exports.getClientes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

// GET cliente by ID
exports.getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
};

// POST create new cliente
exports.createCliente = async (req, res) => {
  const { nombre, email, telefono } = req.body;

  // Validation
  if (!nombre || !email) {
    return res.status(400).json({ error: 'El nombre y el email son requeridos' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO clientes (nombre, email, telefono) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, telefono || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Check for unique email constraint violation
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El email ya existe' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
};

// PUT update cliente
exports.updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;

  // Validation
  if (!nombre || !email) {
    return res.status(400).json({ error: 'El nombre y el email son requeridos' });
  }

  try {
    const result = await pool.query(
      'UPDATE clientes SET nombre = $1, email = $2, telefono = $3 WHERE id = $4 RETURNING *',
      [nombre, email, telefono || null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    // Check for unique email constraint violation
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El email ya existe' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};
