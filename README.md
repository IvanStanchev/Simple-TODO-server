# Simple TODO server

This is a simple TODO RESTful server written in Node. It uses a simple JSON format.

## Requirements

- [Node.js](https://nodejs.org/en/download/)
- npm (comes with Node.js)

## Installation

  Open a terminal and run the following command:

    npm install

## Usage

  Open a terminal and run the following command:

    npm run start

  The server will start on port 3000, if it is free. If you want to change the port, see the [Configuration](#configuration) section.

  Use the [API](#api) section to know what is available to use on the server.

### Configuration

In order to change the port of the server, you can change the `port` variable inside `src/index.js`.

## API

### Postman collection

https://www.postman.com/orange-crescent-818445/workspace/tues/collection/2920644-1b02d0c2-43f4-42f2-b259-d3a259a33d09?action=share&creator=2920644

### GET /tasks

Returns a list of tasks.

    curl http://localhost:3000/tasks

### GET /tasks/:id

Returns a task.

    curl http://localhost:3000/tasks/{taskId}

### POST /tasks

Creates a new task.

    curl -X POST -H "Content-Type: application/json" -d '{"title":"Buy milk", "description": "A 3.7% one", "completed": "false", "isInProgress": "false" }' http://localhost:3000/tasks

### PUT /tasks/:id

Updates a task.

    curl -X PUT -H "Content-Type: application/json" -d '{"title":"Buy tea", "description": "A green one", "completed": "false", "isInProgress": "false" }' http://localhost:3000/tasks/{taskId}

### DELETE /tasks/:id

Deletes a task.

    curl -X DELETE http://localhost:3000/tasks/{taskId}

## License

[MIT](./LICENSE)
