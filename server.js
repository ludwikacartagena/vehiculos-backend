const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares - CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://localhost:5173',
      'https://vehiculos-frontend.vercel.app'
    ];
    
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
const vehiculosRoutes = require('./routes/vehiculos');
const registrosRoutes = require('./routes/registros');

app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/registros', registrosRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Vehiculos - MongoDB Connected ✅' });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vehiculos';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB exitosamente');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  });
