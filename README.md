# 🚗 Sistema de Gestión de Vehículos - Backend API

API REST desarrollada con Node.js, Express y MongoDB para la gestión de vehículos y sus registros de entradas/salidas.

## 🌐 Deploy

**URL de producción:** https://vehiculos-backend-production.up.railway.app

## 🛠️ Tecnologías Utilizadas

- **Node.js** v18+
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Manejo de peticiones cross-origin
- **dotenv** - Variables de entorno

## 📁 Estructura del Proyecto
```
vehiculos-backend/
├── controllers/       # Lógica de negocio
├── models/           # Modelos de MongoDB
├── routes/           # Rutas de la API
├── server.js         # Archivo principal
├── package.json      # Dependencias
└── .env              # Variables de entorno
```

## 🚀 Instalación Local

### Prerrequisitos
- Node.js 18 o superior
- MongoDB instalado localmente o cuenta en MongoDB Atlas
- Git

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/ludwikacartagena/vehiculos-backend.git
cd vehiculos-backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del proyecto:
```env
PORT=5000
MONGODB_URI=tu_conexion_mongodb
```

4. **Ejecutar el servidor**
```bash
npm start
```

El servidor estará disponible en `http://localhost:5000`

## 📡 Endpoints de la API

### Vehículos

#### Obtener todos los vehículos
```
GET /api/vehiculos
```

#### Crear un vehículo
```
POST /api/vehiculos
Content-Type: application/json

{
  "marca": "Toyota",
  "modelo": "Corolla",
  "placa": "ABC123"
}
```

#### Actualizar un vehículo
```
PUT /api/vehiculos/:id
Content-Type: application/json

{
  "marca": "Toyota",
  "modelo": "Corolla 2024",
  "placa": "ABC123"
}
```

#### Eliminar un vehículo
```
DELETE /api/vehiculos/:id
```

### Registros (Entradas/Salidas)

#### Obtener todos los registros
```
GET /api/registros
```

#### Crear un registro
```
POST /api/registros
Content-Type: application/json

{
  "vehiculo": "id_del_vehiculo",
  "motorista": "Juan Pérez",
  "fecha": "2024-11-10",
  "hora": "14:30",
  "kilometraje": 15000,
  "tipo": "entrada"
}
```

#### Actualizar un registro
```
PUT /api/registros/:id
```

#### Eliminar un registro
```
DELETE /api/registros/:id
```

#### Filtrar registros
```
GET /api/registros?fecha=2024-11-10
GET /api/registros?vehiculo=id_vehiculo
GET /api/registros?motorista=Juan
```

## 🗄️ Modelos de Datos

### Vehículo
```javascript
{
  marca: String (requerido),
  modelo: String (requerido),
  placa: String (requerido, único),
  createdAt: Date,
  updatedAt: Date
}
```

### Registro
```javascript
{
  vehiculo: ObjectId (referencia a Vehículo),
  motorista: String (requerido),
  fecha: Date (requerido),
  hora: String (requerido),
  kilometraje: Number (requerido),
  tipo: String (enum: ['entrada', 'salida']),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 CORS

La API permite peticiones desde:
- `http://localhost:3000`
- `http://localhost:5173`
- `https://vehiculos-frontend.vercel.app`
- Todos los subdominios de `*.vercel.app`

## 🐛 Problemas Conocidos

- **Conexión a MongoDB Atlas**: Asegúrate de tener la IP `0.0.0.0/0` en la whitelist de Network Access en MongoDB Atlas
- **Variables de entorno**: Verifica que `MONGODB_URI` esté correctamente configurada

## 👤 Autor

**Ludwika Cartagena**
- GitHub: [@ludwikacartagena](https://github.com/ludwikacartagena)

## 📄 Licencia

Este proyecto fue desarrollado como prueba técnica para Desarrollador Web.
