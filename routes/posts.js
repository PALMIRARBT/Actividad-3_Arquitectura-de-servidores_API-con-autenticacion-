const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authenticateToken = require('../middleware/auth'); // Importa el middleware de autenticación

// Crear Post (requiere autenticación)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, text, author } = req.body;
    const post = new Post({ title, text, author });
    await post.validate();
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar Posts (requiere autenticación)
router.get('/', authenticateToken, async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Detalle Post (requiere autenticación)
router.get('/:id', authenticateToken, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

// Modificar Post (requiere autenticación)
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar Post (requiere autenticación)
router.delete('/:id', authenticateToken, async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

module.exports = router;
