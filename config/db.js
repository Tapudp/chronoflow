const mongoose = require('mongoose');
const chronoLogger = require('../utils/logger');

function connect(dbUrl) {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', function (error) {
    chronoLogger.error(`MongoDB connection error :: `, error);
  });

  db.once('open', function () {
    chronoLogger.warn(`Connected to the MongoDB database!`);
  });

  return db;
}

function disconnect() {
  mongoose.connection.close(function () {
    chronoLogger.info(`Disconnected from the MongoDB database ::`);
  });
}

module.exports = {
  connect,
  disconnect,
};
