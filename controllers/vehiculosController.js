const Vehiculo = require('../models/Vehiculo');

// Obtener todos los vehículos
exports.obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().sort({ createdAt: -1 });
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener vehículos', error: error.message });
  }
};

// Obtener un vehículo por ID
exports.obtenerVehiculoPorId = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
    }
    res.json(vehiculo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el vehículo', error: error.message });
  }
};

// Crear un nuevo vehículo
exports.crearVehiculo = async (req, res) => {
  try {
    const { marca, modelo, placa } = req.body;
    
    // Validar campos obligatorios
    if (!marca || !modelo || !placa) {
      return res.status(400).json({ mensaje: 'Marca, modelo y placa son obligatorios' });
    }

    const nuevoVehiculo = new Vehiculo({ marca, modelo, placa });
    await nuevoVehiculo.save();
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'La placa ya existe' });
    }
    res.status(500).json({ mensaje: 'Error al crear el vehículo', error: error.message });
  }
};

// Actualizar un vehículo
exports.actualizarVehiculo = async (req, res) => {
  try {
    const { marca, modelo, placa } = req.body;
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      { marca, modelo, placa },
      { new: true, runValidators: true }
    );
    
    if (!vehiculoActualizado) {
      return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
    }
    
    res.json(vehiculoActualizado);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'La placa ya existe' });
    }
    res.status(500).json({ mensaje: 'Error al actualizar el vehículo', error: error.message });
  }
};

// Eliminar un vehículo
exports.eliminarVehiculo = async (req, res) => {
  try {
    const vehiculoEliminado = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculoEliminado) {
      return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
    }
    res.json({ mensaje: 'Vehículo eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el vehículo', error: error.message });
  }
};