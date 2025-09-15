// Importa la librería mongoose para trabajar con MongoDB
const mongoose = require('mongoose');

// Define el esquema del usuario con los campos y validaciones
const userSchema = new mongoose.Schema({
  // Nombre del usuario, obligatorio
  name: {
    type: String,
    required: true
  },
  // Email del usuario, obligatorio, único y con formato válido
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Formato de email inválido']
  },
  // Contraseña del usuario, obligatorio
  password: {
    type: String,
    required: true
  },
  // Biografía del usuario, opcional
  bio: {
    type: String
  },
  // Estado de activación del usuario, por defecto es falso
  active: {
    type: Boolean,
    default: false
  },
  // Fecha de creación del usuario, por defecto la fecha actual
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Fecha de última actualización, por defecto la fecha actual
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware que actualiza la fecha de actualización antes de guardar el usuario
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Exporta el modelo User para usarlo en otras partes de la aplicación
module.exports = mongoose.model('User', userSchema);
