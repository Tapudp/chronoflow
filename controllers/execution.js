const executionService = require('../services/executionService');
const errorHandler = require('../utils/errorHandler');
const Task = require('../models/Task');

// fetch tasks scheduled for execution in the next hour
async function getTasksForExecution(req, res) {
  try {
    const tasks = await executionService.getTasksForExecution();
    res.json(tasks);
  } catch (err) {
    errorHandler(err, res);
  }
}

// handle execution of task
async function executeTask(req, res) {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (task) {
      await executionService.executeTask(task);
      res.json({ message: `Task executed successfully ${taskId}` });
    } else {
      res.status(404).json({ error: `Task not found` });
    }
  } catch (err) {
    errorHandler(err, res);
  }
}

module.exports = {
  getTasksForExecution,
  executeTask,
};
