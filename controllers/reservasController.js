const pool = require('../db');

// GET all reservas
exports.getReservas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservas');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

// GET reserva by ID
exports.getReservaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM reservas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la reserva' });
  }
};

// POST create new reserva
exports.createReserva = async (req, res) => {
  const { fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id } = req.body;

  // Validation
  if (!fecha_entrada || !fecha_salida || !hotel_id || !cliente_id) {
    return res.status(400).json({ 
      error: 'Los campos fecha_entrada, fecha_salida, hotel_id y cliente_id son requeridos' 
    });
  }

  try {
    // Verify hotel exists
    const hotelCheck = await pool.query('SELECT id FROM hoteles WHERE id = $1', [hotel_id]);
    if (hotelCheck.rows.length === 0) {
      return res.status(400).json({ error: 'El hotel no existe' });
    }

    // Verify cliente exists
    const clienteCheck = await pool.query('SELECT id FROM clientes WHERE id = $1', [cliente_id]);
    if (clienteCheck.rows.length === 0) {
      return res.status(400).json({ error: 'El cliente no existe' });
    }

    const result = await pool.query(
      'INSERT INTO reservas (fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fecha_entrada, fecha_salida, num_huespedes || 1, hotel_id, cliente_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

// PUT update reserva
exports.updateReserva = async (req, res) => {
  const { id } = req.params;
  const { fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id } = req.body;

  // Validation
  if (!fecha_entrada || !fecha_salida || !hotel_id || !cliente_id) {
    return res.status(400).json({ 
      error: 'Los campos fecha_entrada, fecha_salida, hotel_id y cliente_id son requeridos' 
    });
  }

  try {
    // Verify hotel exists
    const hotelCheck = await pool.query('SELECT id FROM hoteles WHERE id = $1', [hotel_id]);
    if (hotelCheck.rows.length === 0) {
      return res.status(400).json({ error: 'El hotel no existe' });
    }

    // Verify cliente exists
    const clienteCheck = await pool.query('SELECT id FROM clientes WHERE id = $1', [cliente_id]);
    if (clienteCheck.rows.length === 0) {
      return res.status(400).json({ error: 'El cliente no existe' });
    }

    const result = await pool.query(
      'UPDATE reservas SET fecha_entrada = $1, fecha_salida = $2, num_huespedes = $3, hotel_id = $4, cliente_id = $5 WHERE id = $6 RETURNING *',
      [fecha_entrada, fecha_salida, num_huespedes || 1, hotel_id, cliente_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};
