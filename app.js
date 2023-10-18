const express = require('express');
const dbConfig = require('./config/db');
const errorHandler = require('./utils/errorHandler');
const tasksRoute = require('./routes/tasks');
const executionRoute = require('./routes/execution');
const constants = require('./constants');
const chronoLogger = require('./utils/logger');
const { setupApp } = require('./helpers/appHelper');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/tasks', tasksRoute);
app.use('/execution', executionRoute);
app.use(errorHandler);

const PORT = process.env.PORT || constants.PORT;

const server = app.listen(PORT, function () {
  chronoLogger.info(`Chronoflow is running on port ${PORT}`);
});

// handles database connection and spawn of scheduler process
setupApp(server);
