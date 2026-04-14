const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Import routes
const hotelesRoutes = require('./routes/hoteles');
const clientesRoutes = require('./routes/clientes');
const reservasRoutes = require('./routes/reservas');

// Use routes
app.use('/api/hoteles', hotelesRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/reservas', reservasRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Cerrando servidor...');
  pool.end();
  process.exit(0);
});
