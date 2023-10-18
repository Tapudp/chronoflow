const Task = require('../models/Task');

// create new task
async function createTask(rule, task, frequency) {
  const ruleInMillis = rule * 1000;
  const newTask = new Task({ rule: ruleInMillis, task, frequency });
  return newTask.save();
}

// read all tasks
async function getAllTasks() {
  return Task.find({ isDeleted: 0, $expr: { $lte: ['$completedCount', '$frequency'] } });
}

// update a task by id
async function updatetask(taskId, rule, task, frequency) {
  return Task.findByIdAndUpdate(taskId, { rule, task, frequency }, { new: true });
}

// delete a task by id
async function deleteTask(taskId) {
  const task = await Task.findById(taskId);
  if (task) {
    task.isDeleted = 1; // marking for deletion
    await task.save();
  }
}

module.exports = {
  createTask,
  getAllTasks,
  updatetask,
  deleteTask,
};
