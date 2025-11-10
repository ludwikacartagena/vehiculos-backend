const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/// Middlewares
app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como Postman, mobile apps)
    if (!origin) return callback(null, true);
    
    // Dominios permitidos
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://localhost:5173',
      'https://vehiculos-frontend.vercel.app'
    ];
    
    // Permitir el dominio exacto o cualquier subdominio de vercel.app
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    callback(null, true); // Por ahora permitimos todo para debugging
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

3. **Scroll abajo** y en "Commit message" escribe:
```
   Update CORS to allow all Vercel subdomains
}));
app.use(express.json());

// Rutas
const vehiculosRoutes = require('./routes/vehiculos');
const registrosRoutes = require('./routes/registros');

app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/registros', registrosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Vehículos funcionando' });
});

// Conexión a MongoDB
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vehiculos';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
  });
