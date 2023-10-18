const taskService = require('../services/taskService');
const errorHandler = require('../utils/errorHandler');
const validateFields = require('../utils/validateFields');

// create a new task
async function createTask(req, res) {
  const { rule, task, frequency } = req.body;

  try {
    const createdTask = await taskService.createTask(rule, task, frequency);
    res.status(201).json(createdTask);
  } catch (err) {
    errorHandler(err, res);
  }
}

// read all tasks
async function getAllTasks(req, res) {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    errorHandler(err, res);
  }
}

// update a task
async function updateTask(req, res) {
  const taskId = req.params.id;
  const { rule, task, frequency } = req.body;
  try {
    const updatedTask = await taskService.updatetask(taskId, rule, task, frequency);

    res.json(updatedTask);
  } catch (err) {
    errorHandler(err, res);
  }
}

// delete a task
async function deleteTask(req, res) {
  const taskId = req.params.id;
  try {
    await taskService.deleteTask(taskId);
    res.sendStatus(204);
  } catch (err) {
    errorHandler(err, res);
  }
}

module.exports = {
  createTask: [validateFields(['task', 'rule', 'frequency']), createTask],
  getAllTasks,
  updateTask: [validateFields(['task', 'rule', 'frequency']), updateTask],
  deleteTask: [validateFields(['task']), deleteTask],
};
