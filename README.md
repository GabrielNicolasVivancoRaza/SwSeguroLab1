# API REST - Gestión de Reservas de Hotel

Aplicación de API REST desarrollada con Node.js, Express y PostgreSQL para gestionar hoteles, clientes y reservas.

## Descripción

Esta API permite realizar operaciones CRUD (Create, Read, Update, Delete - aunque sin DELETE en esta versión) sobre:
- **Hoteles**: Crear, obtener y actualizar información de hoteles
- **Clientes**: Crear, obtener y actualizar información de clientes
- **Reservas**: Crear, obtener y actualizar reservas de hoteles

## Requisitos Previos

- **Node.js** (v14 o superior)
- **PostgreSQL** (v12 o superior)
- **npm** (incluido con Node.js)

## Instalación y Configuración

### 1. Clonar o descargar el repositorio

```bash
cd ruta/del/proyecto
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos PostgreSQL

#### Opción A: Usando psql desde la línea de comandos

```bash
psql -U postgres -f hotel_reservas.sql
```

#### Opción B: Crear la base de datos manualmente

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE hotel_reservas;

# Conectarse a la base de datos
\c hotel_reservas

# Ejecutar el script SQL
\i hotel_reservas.sql
```

### 4. Configurar las variables de entorno

Editar el archivo `.env` con las credenciales de tu PostgreSQL:

```env
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hotel_reservas
PORT=3000
NODE_ENV=development
```

**Nota**: Por defecto, la contraseña de PostgreSQL está vacía. Ajusta según tu configuración.

### 5. Iniciar el servidor

#### Modo desarrollo (con nodemon - reinicia automáticamente)

```bash
npm run dev
```

#### Modo producción

```bash
npm start
```

El servidor iniciará en `http://localhost:3000`

## Estructura del Proyecto

```
.
├── controllers/              # Controladores con la lógica de negocio
│   ├── hotelesController.js
│   ├── clientesController.js
│   └── reservasController.js
├── routes/                   # Rutas de la API
│   ├── hoteles.js
│   ├── clientes.js
│   └── reservas.js
├── db.js                     # Configuración de conexión a PostgreSQL
├── server.js                 # Punto de entrada de la aplicación
├── .env                      # Variables de entorno
├── hotel_reservas.sql        # Script para crear la base de datos
├── package.json              # Dependencias del proyecto
└── README.md                 # Este archivo
```

## Endpoints de la API

### Base URL
```
http://localhost:3000/api
```

### Hoteles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/hoteles` | Obtener lista de todos los hoteles |
| GET | `/hoteles/{id}` | Obtener un hotel específico por ID |
| POST | `/hoteles` | Crear un nuevo hotel |
| PUT | `/hoteles/{id}` | Actualizar un hotel existente |

**Ejemplo de POST/PUT:**
```json
{
  "nombre": "Hotel Paraíso",
  "direccion": "Calle 123",
  "estrellas": 4,
  "telefono": "555-1234"
}
```

### Clientes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/clientes` | Obtener lista de todos los clientes |
| GET | `/clientes/{id}` | Obtener un cliente específico por ID |
| POST | `/clientes` | Crear un nuevo cliente |
| PUT | `/clientes/{id}` | Actualizar un cliente existente |

**Ejemplo de POST/PUT:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "telefono": "555-5678"
}
```

### Reservas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/reservas` | Obtener lista de todas las reservas |
| GET | `/reservas/{id}` | Obtener una reserva específica por ID |
| POST | `/reservas` | Crear una nueva reserva |
| PUT | `/reservas/{id}` | Actualizar una reserva existente |

**Ejemplo de POST/PUT:**
```json
{
  "fecha_entrada": "2025-05-01",
  "fecha_salida": "2025-05-07",
  "num_huespedes": 2,
  "hotel_id": 1,
  "cliente_id": 1
}
```

## Códigos de Estado HTTP

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa (GET/PUT) |
| 201 | Created - Recurso creado exitosamente (POST) |
| 400 | Bad Request - Datos inválidos o falta de campos requeridos |
| 404 | Not Found - El recurso no existe |
| 500 | Internal Server Error - Error en el servidor |

## Ejemplo de uso con cURL

### Obtener todos los hoteles
```bash
curl http://localhost:3000/api/hoteles
```

### Crear un nuevo hotel
```bash
curl -X POST http://localhost:3000/api/hoteles \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Hotel Nueva Era",
    "direccion": "Boulevard Central",
    "estrellas": 3,
    "telefono": "555-0000"
  }'
```

### Actualizar un hotel
```bash
curl -X PUT http://localhost:3000/api/hoteles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Hotel Actualizado",
    "direccion": "Nueva dirección",
    "estrellas": 5,
    "telefono": "555-9999"
  }'
```

### Obtener un cliente específico
```bash
curl http://localhost:3000/api/clientes/1
```

### Crear una reserva
```bash
curl -X POST http://localhost:3000/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "fecha_entrada": "2025-08-01",
    "fecha_salida": "2025-08-10",
    "num_huespedes": 4,
    "hotel_id": 1,
    "cliente_id": 1
  }'
```

## Validaciones Implementadas

- **Hoteles**: Se requieren `nombre` y `dirección`
- **Clientes**: Se requieren `nombre` y `email` (único)
- **Reservas**: Se requieren `fecha_entrada`, `fecha_salida`, `hotel_id` y `cliente_id`
  - Valida que el hotel y cliente existan antes de crear/actualizar
  - El número de huéspedes tiene un valor por defecto de 1

## Respuesta de Errores

Formato de error estándar:
```json
{
  "error": "Descripción del error"
}
```

## Troubleshooting

### Error: "connect ECONNREFUSED"
- Verifica que PostgreSQL esté ejecutándose
- Revisa las credenciales en el archivo `.env`

### Error: "Database not found"
- Ejecuta el script `hotel_reservas.sql` para crear la base de datos

### Error: "listen EADDRINUSE"
- El puerto 3000 ya está en uso
- Cambia el puerto en el archivo `.env` o cierra la aplicación que usa ese puerto

## Notas Adicionales

- Esta es una API básica sin autenticación ni medidas de seguridad avanzadas
- Las contraseñas deben ser hasheadas antes de producción
- Se recomienda implementar autenticación JWT para aplicaciones reales
- Para bases de datos grandes, se pueden añadir paginación y filtros

## Licencia

Este proyecto está bajo licencia ISC
"# SwSeguroLab1" 
