const { fork } = require('child_process');
const chronoLogger = require('../utils/logger');

async function startScheduler() {
  const scheduler = await fork('./schedulers/');

  scheduler.on('spawn', function () {
    chronoLogger.info('Scheduler process started...!');
  });

  // handle error in the scheduler process
  scheduler.on('error', function (err) {
    chronoLogger.error('Scheduler process error: ', err);
  });

  // handle exit of the scheduler process
  scheduler.on('exit', function (code, signal) {
    chronoLogger.warn(`Scheduler process exited with the code ${code} and signal ${signal}`);
  });

  return scheduler;
}

module.exports = startScheduler;
