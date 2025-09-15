
const express = require('express');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users'); // Importa la ruta de usuarios
const connectDB = require('./config/db.config');

const app = express();
app.use(express.json());
app.use('/api/posts', postsRouter);
app.use('/api', usersRouter); // Habilita los endpoints de usuarios bajo /api

connectDB().then(() => {
  app.listen(8000, () => console.log('Server running on port 8000 (MongoMemoryServer)'));
}).catch(err => console.error(err));
