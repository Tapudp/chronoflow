const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  rule: Number,
  task: String,
  frequency: Number,
  completedCount: {
    type: Number,
    default: 0, // 0: never completed, counter that moves till frequency time
  },
  isDeleted: {
    type: Number,
    default: 0, // 0: not deleted, 1: marked for deletion, 2: deleted
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
