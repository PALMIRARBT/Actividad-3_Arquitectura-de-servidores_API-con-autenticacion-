const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

async function connectDB() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  return mongod;
}

module.exports = connectDB;
