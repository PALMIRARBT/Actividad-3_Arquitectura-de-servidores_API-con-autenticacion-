const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Endpoint para registrar un nuevo usuario
router.post('/users', async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;
    // Validación básica de campos
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    // Cifrar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      bio
    });
    await user.save();
    res.status(201).json({ message: 'Usuario creado correctamente', user: { name: user.name, email: user.email, bio: user.bio, active: user.active } });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tu_clave_secreta'; // Cambia esto por una clave segura en producción

// Endpoint para login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan email o contraseña' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    // Genera el token JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error en el login' });
  }
});

module.exports = router;
