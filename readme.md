# Task Scheduler API

The Task Scheduler API is a Node.js application that allows you to manage and execute tasks at specified times. It provides RESTful API endpoints to create, read, update, and delete tasks. Additionally, the scheduler fetches tasks and executes them at scheduled intervals.

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Task Model](#task-model)
- [Scheduler](#scheduler)
- [Getting Started](#getting-started)

## API Endpoints

### Create a Task

- **Route:** POST /tasks
- **Description:** Create a new task with the specified rule, task name, and frequency.
- **Request Body:**
  - `rule` (Number): The time rule for task execution.
  - `task` (String): The task name or description.
  - `frequency` (Number): The task execution frequency.
- **Example:**
  ```json
  {
    "rule": 3600,
    "task": "Example Task",
    "frequency": 24
  }
  ```

### Get All Tasks

- **Route:** GET /tasks
- **Description:** Retrieve a list of all tasks, excluding deleted tasks.
- **Response:** An array of tasks.

### Update a Task

- **Route:** PUT /tasks/:id
- **Description:** Update an existing task by ID.
- **Request Parameters:**
  - **`id` (String):** The ID of the task to update.
- **Request Body:**
  - Fields to update, e.g., rule, task, frequency.
- **Example:**

```json
{
  "rule": 7200
}
```

### Delete a Task

- **Route:** DELETE /tasks/:id
- **Description:** Delete a task by marking it as deleted.
- **Request Parameters:**
  - **`id` (String):** The ID of the task to delete.

### Execute Tasks

- **Route:** GET /execution
- **Description:** Execute tasks that are due for execution.
- **Response:**
  - An array of executed tasks.

## Task Model

The task model has the following fields:

- `rule` (Number): The time rule for task execution.
- `task` (String): The task name or description.
- `frequency` (Number): The task execution frequency.
- `completedCount` (Number): Status flag (0: not completed, 1: marked as completed).
- `isDeleted` (Number): Status flag (0: not deleted, 1: marked for deletion, 2: deleted).

## Scheduler

The scheduler module is responsible for managing the execution of tasks within the Task Scheduler application. It operates as a standalone component designed to run on separate cloud functions or parallel processes.

### Key Features

1. **Immediate Task Fetch:** Upon initialization, the scheduler immediately retrieves tasks without waiting for an hour. This allows for the prompt execution of tasks when the scheduler is activated.

2. **Scheduled Task Retrieval:** Subsequently, the scheduler establishes an interval-based mechanism. At regular hourly intervals, the scheduler retrieves tasks to ensure that tasks scheduled for execution are processed efficiently.

By separating the scheduler into a distinct module, it can operate independently, either as a separate cloud function or within a parallel process. This modular design enhances scalability, reliability, and the ability to manage tasks seamlessly, meeting the application's execution requirements.

## Getting Started

1. Clone this repository.
2. Set up your environment variables and MongoDB configuration in the .env file.
3. Install dependencies with `npm install`.
4. Start the application with
   - in production environment `npm start`.
   - in development environment `npm run dev`.
5. you can copy the contents of `example.env` to your `.env` for testing purposes
