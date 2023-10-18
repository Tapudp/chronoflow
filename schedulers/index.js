const httpRequest = require('../utils/httpRequest');
const chronoLogger = require('../utils/logger');
const constants = require('../constants');
const { fork } = require('child_process');

// Maintaining a list of ongoing tasks
let ongoingTasks = [];
let shouldFetchImmediately = true;

async function executeTask(task) {
  try {
    chronoLogger.info(`Executing task: ${task.task}`);

    const options = {
      hostname: 'localhost',
      port: constants.PORT,
      path: `/execution/${task._id}`,
      method: 'POST',
    };

    await httpRequest(options);

    // Task is completed, remove it from the ongoingTasks list
    ongoingTasks = ongoingTasks.filter((t) => t._id !== task._id);
  } catch (error) {
    chronoLogger.error(`Error executing task ${task._id} :: `, error);
  }
}

async function fetchAndExecuteTasks() {
  chronoLogger.info('Fetching and executing tasks . . . ');

  // If ongoingTasks list is empty and we shouldn't fetch immediately, exit execution.
  if (ongoingTasks.length === 0 && !shouldFetchImmediately) {
    return;
  }

  try {
    const options = {
      hostname: 'localhost',
      port: constants.PORT,
      path: '/execution',
      method: 'GET',
    };

    const data = await httpRequest(options);

    const tasks = JSON.parse(data);
    // Set the flag to control immediate fetch
    if (tasks.length === 0) {
      shouldFetchImmediately = false;
    }
    for (const task of tasks) {
      // check if the task is already in the ongoing list
      if (!ongoingTasks.some((t) => t._id === task._id)) {
        ongoingTasks.push(task);
        await executeTask(task);
      }
    }

    // if ongoing task list is empty refetch all the tasks
    if (ongoingTasks.length === 0) {
      fetchAndExecuteTasks();
    }
  } catch (error) {
    chronoLogger.error(`Error while executing tasks: `, error);
  }
}

// start the scheduler initially directly
fetchAndExecuteTasks();

// scheduler will refetch tasks after an hour to execute
setInterval(fetchAndExecuteTasks, constants.oneHourInMilis);

// handle exit of the scheduler process
process.on('exit', function (code, signal) {
  chronoLogger.error(`scheduler process exited with code ${code} and singla ${signal}`);
});

// handle error in the scheduler process
process.on('unhandledRejection', function (err, promise) {
  chronoLogger.error(`Unhandled rejection at: ${promise}, reason: ${err}`);
});
