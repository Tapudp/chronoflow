const express = require('express');
const router = express.Router();
const executionController = require('../controllers/execution');

router.get('/', executionController.getTasksForExecution);
router.post('/:id', executionController.executeTask);

module.exports = router;
