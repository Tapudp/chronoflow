const dbConfig = require('../config/db');
const startScheduler = require('./schedulerHelper');
const chronoLogger = require('../utils/logger');
require('dotenv').config();

async function setupApp(server) {
  try {
    await dbConfig.connect(process.env.DB_URL);
    chronoLogger.info('Connected to the MongoDB database!');

    // starting the scheduler after the connection established to the database
    const scheduler = await startScheduler();

    // handle server shutdown
    process.on('SIGINT', function () {
      dbConfig.disconnect(function () {
        chronoLogger.info('Database connection closed.');

        server.close(function () {
          chronoLogger.info('Server has stopped.');

          if (scheduler) {
            scheduler.kill('SIGINT');
          }
          process.exit(0);
        });
      });
    });
  } catch (err) {
    chronoLogger.error('Error while app setup:', err.message, err.stack);
  }
}

module.exports = { setupApp };
