const pool = require('../db');

// GET all hoteles
exports.getHoteles = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hoteles');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener hoteles' });
  }
};

// GET hotel by ID
exports.getHotelById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM hoteles WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hotel no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el hotel' });
  }
};

// POST create new hotel
exports.createHotel = async (req, res) => {
  const { nombre, direccion, estrellas, telefono } = req.body;

  // Validation
  if (!nombre || !direccion) {
    return res.status(400).json({ error: 'El nombre y la dirección son requeridos' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO hoteles (nombre, direccion, estrellas, telefono) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, direccion, estrellas || null, telefono || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el hotel' });
  }
};

// PUT update hotel
exports.updateHotel = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, estrellas, telefono } = req.body;

  // Validation
  if (!nombre || !direccion) {
    return res.status(400).json({ error: 'El nombre y la dirección son requeridos' });
  }

  try {
    const result = await pool.query(
      'UPDATE hoteles SET nombre = $1, direccion = $2, estrellas = $3, telefono = $4 WHERE id = $5 RETURNING *',
      [nombre, direccion, estrellas || null, telefono || null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hotel no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el hotel' });
  }
};
