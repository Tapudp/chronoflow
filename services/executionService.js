const appConstants = require('../constants');
const Task = require('../models/Task');
const chronoLogger = require('../utils/logger');

// fetch tasks scheduled for execution in the next hour
async function getTasksForExecution() {
  const currentTime = new Date();
  const oneHourLater = new Date(currentTime.getTime() + appConstants.oneHourInMilis);
  return Task.find({
    rule: { $lte: oneHourLater },
    isDeleted: 0,
    $expr: { $lte: ['$completedCount', '$frequency'] },
  });
}

// execute a task
async function executeTask(task) {
  chronoLogger.warn(`Executing Task: ${task.task}`);

  // marking task as completed
  task.completedCount += 1;
  return task.save();
}

module.exports = {
  getTasksForExecution,
  executeTask,
};
