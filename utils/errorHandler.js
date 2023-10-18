const chronoLogger = require('./logger');

function errorHandler(err, res) {
  const errorObject = { error: err.message, stack: err.stack };
  chronoLogger.error(JSON.stringify(errorObject, null, 2));
  res.status(500).json(errorObject);
}

module.exports = errorHandler;
