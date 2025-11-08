const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
  vehiculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehiculo',
    required: [true, 'El vehículo es obligatorio']
  },
  motorista: {
    type: String,
    required: [true, 'El nombre del motorista es obligatorio'],
    trim: true
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es obligatoria'],
    default: Date.now
  },
  hora: {
    type: String,
    required: [true, 'La hora es obligatoria']
  },
  kilometraje: {
    type: Number,
    required: [true, 'El kilometraje es obligatorio'],
    min: [0, 'El kilometraje no puede ser negativo']
  },
  tipo: {
    type: String,
    enum: ['entrada', 'salida'],
    required: [true, 'El tipo es obligatorio']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Registro', registroSchema);