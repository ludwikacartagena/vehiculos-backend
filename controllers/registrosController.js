const Registro = require('../models/Registro');
const Vehiculo = require('../models/Vehiculo');

// Obtener todos los registros con filtros opcionales
exports.obtenerRegistros = async (req, res) => {
  try {
    const { fecha, vehiculo, motorista } = req.query;
    let filtro = {};

    // Aplicar filtros si existen
    if (fecha) {
      const fechaInicio = new Date(fecha);
      const fechaFin = new Date(fecha);
      fechaFin.setDate(fechaFin.getDate() + 1);
      filtro.fecha = { $gte: fechaInicio, $lt: fechaFin };
    }
    
    if (vehiculo) {
      filtro.vehiculo = vehiculo;
    }
    
    if (motorista) {
      filtro.motorista = { $regex: motorista, $options: 'i' };
    }

    const registros = await Registro.find(filtro)
      .populate('vehiculo')
      .sort({ fecha: -1, hora: -1 });
    
    res.json(registros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener registros', error: error.message });
  }
};

// Obtener un registro por ID
exports.obtenerRegistroPorId = async (req, res) => {
  try {
    const registro = await Registro.findById(req.params.id).populate('vehiculo');
    if (!registro) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json(registro);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el registro', error: error.message });
  }
};

// Crear un nuevo registro
exports.crearRegistro = async (req, res) => {
  try {
    const { vehiculo, motorista, fecha, hora, kilometraje, tipo } = req.body;
    
    // Validar campos obligatorios
    if (!vehiculo || !motorista || !fecha || !hora || kilometraje === undefined || !tipo) {
      return res.status(400).json({ 
        mensaje: 'Todos los campos son obligatorios' 
      });
    }

    // Verificar que el vehículo existe
    const vehiculoExiste = await Vehiculo.findById(vehiculo);
    if (!vehiculoExiste) {
      return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
    }

    const nuevoRegistro = new Registro({
      vehiculo,
      motorista,
      fecha,
      hora,
      kilometraje,
      tipo
    });
    
    await nuevoRegistro.save();
    const registroPopulado = await Registro.findById(nuevoRegistro._id).populate('vehiculo');
    
    res.status(201).json(registroPopulado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el registro', error: error.message });
  }
};

// Actualizar un registro
exports.actualizarRegistro = async (req, res) => {
  try {
    const { vehiculo, motorista, fecha, hora, kilometraje, tipo } = req.body;
    
    const registroActualizado = await Registro.findByIdAndUpdate(
      req.params.id,
      { vehiculo, motorista, fecha, hora, kilometraje, tipo },
      { new: true, runValidators: true }
    ).populate('vehiculo');
    
    if (!registroActualizado) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    
    res.json(registroActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el registro', error: error.message });
  }
};

// Eliminar un registro
exports.eliminarRegistro = async (req, res) => {
  try {
    const registroEliminado = await Registro.findByIdAndDelete(req.params.id);
    if (!registroEliminado) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json({ mensaje: 'Registro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el registro', error: error.message });
  }
};