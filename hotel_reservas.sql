-- Create database
CREATE DATABASE hotel_reservas
  WITH ENCODING='UTF8'
  LOCALE='C'
  TEMPLATE=template0;

-- Connect to the database
\c hotel_reservas

-- Create hoteles table
CREATE TABLE hoteles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  estrellas INT,
  telefono VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create clientes table
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefono VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reservas table
CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  fecha_entrada DATE NOT NULL,
  fecha_salida DATE NOT NULL,
  num_huespedes INT DEFAULT 1,
  hotel_id INT NOT NULL,
  cliente_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (hotel_id) REFERENCES hoteles(id) ON DELETE CASCADE,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_reservas_hotel_id ON reservas(hotel_id);
CREATE INDEX idx_reservas_cliente_id ON reservas(cliente_id);
CREATE INDEX idx_clientes_email ON clientes(email);

-- Sample data (optional)
INSERT INTO hoteles (nombre, direccion, estrellas, telefono) VALUES
('Hotel Paraíso', 'Calle 123', 4, '555-1234'),
('Hotel Oasis', 'Avenida Principal 456', 5, '555-5678'),
('Hotel Confort', 'Carrera 789', 3, '555-9012');

INSERT INTO clientes (nombre, email, telefono) VALUES
('Juan Pérez', 'juan@email.com', '555-5678'),
('María García', 'maria@email.com', '555-8901'),
('Carlos López', 'carlos@email.com', '555-2345');

INSERT INTO reservas (fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id) VALUES
('2025-05-01', '2025-05-07', 2, 1, 1),
('2025-06-15', '2025-06-20', 3, 2, 2),
('2025-07-01', '2025-07-10', 1, 3, 3);
