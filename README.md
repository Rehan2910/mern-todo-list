# MERN To-Do List

A full-stack To-Do List built with **MongoDB, Express.js, React (Vite) and Node.js**.
Tasks are stored in MongoDB, served through a REST API, and managed from a React UI
(add, view, complete/incomplete, delete) without page reloads.

## Project structure
```
backend/    Express + Mongoose REST API
  models/Task.js     Task schema (title, completed, createdAt)
  routes/tasks.js    GET / POST / PUT / DELETE endpoints
  server.js          Server, CORS, MongoDB connection
frontend/   React app (Vite)
  src/App.jsx        State, fetch calls to the API
  src/components/    TaskForm, TaskList, TaskItem
screenshots/        Screenshots of the working app
```

## Prerequisites
- Node.js 18+ and npm
- MongoDB running locally, **or** a free MongoDB Atlas cluster

## Setup and run

### 1. Backend (port 5000)
```bash
cd backend
npm install
cp .env.example .env      # then edit .env (see below)
npm start
```
`.env` variables:

| Variable    | Example                                  | Meaning                          |
|-------------|------------------------------------------|----------------------------------|
| `PORT`      | `5000`                                   | Port the API listens on          |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/mern_todo`    | MongoDB connection string (local or Atlas) |

You should see `MongoDB connected` in the terminal.

### 2. Frontend (port 3000)
Open a second terminal:
```bash
cd frontend
npm install
npm start
```
Open http://localhost:3000. The backend allows CORS only from this address.

## API endpoints
| Method | Endpoint          | Description                                  | Status codes        |
|--------|-------------------|----------------------------------------------|---------------------|
| GET    | `/api/tasks`      | Get all tasks                                | 200                 |
| POST   | `/api/tasks`      | Add a task `{ "title": "..." }`              | 201, 400            |
| PUT    | `/api/tasks/:id`  | Edit title and/or set `completed`            | 200, 400, 404       |
| DELETE | `/api/tasks/:id`  | Delete a task                                | 200, 404            |

Titles are converted with `String()`, trimmed, and rejected with `400` if empty.

## Screenshots
See the `screenshots/` folder: adding, completing and deleting a task, and the merged pull requests.

## Git workflow
`feature/backend` and `feature/frontend` were developed on separate branches and merged into `main` through pull requests.
