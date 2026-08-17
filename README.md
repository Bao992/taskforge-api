# TaskForge API

A simple task management REST API built with Node.js and Express.

## Features

-GET all tasks
-GET a single task
-POST create a task
-PUT update a task
-DELETE a task
-Verify task endpoint
-File persistence using task.json
-Static frontend page

## Installation

```bash
npm install

## Run the server

```bash
node server.js
```

```text
http//localhost:3000
```

## Routes

| Method | Route | Description |
|----------|---------|-----------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get on task |
| GET | /tasks/:id/verify | Verify a task |
| POST | /tasks | Create a task |
| PUT | tasks/:id | Update a task |
| Delete | /tasks/:id | Delete a task |