const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: [true, 'La marca es obligatoria'],
    trim: true
  },
  modelo: {
    type: String,
    required: [true, 'El modelo es obligatorio'],
    trim: true
  },
  placa: {
    type: String,
    required: [true, 'La placa es obligatoria'],
    unique: true,
    uppercase: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);