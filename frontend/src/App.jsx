import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

// Base URL of the Express API (backend runs on port 5000 by default)
const API = "http://localhost:5000/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);   // B2: tasks live in state
  const [error, setError] = useState("");

  // B2: fetch all tasks once when the page loads
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setTasks)
      .catch(() => setError("Could not load tasks. Is the backend running?"));
  }, []);

  // B3: send a new task to POST, then add the saved task to the list
  async function addTask(title) {
    setError("");
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error);
      setTasks((prev) => [data, ...prev]);   // no page reload (B6)
    } catch {
      setError("Could not add task.");
    }
  }

  // B4: toggle completed through PUT, replace that task in state
  async function toggleTask(task) {
    setError("");
    try {
      const res = await fetch(`${API}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error);
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
    } catch {
      setError("Could not update task.");
    }
  }

  // B5: delete through DELETE, then remove it from state
  async function deleteTask(id) {
    setError("");
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) return setError((await res.json()).error);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError("Could not delete task.");
    }
  }

  return (
    <main className="container">
      <h1>MERN To-Do List</h1>
      <TaskForm onAdd={addTask} />
      {error && <p className="error">{error}</p>}
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </main>
  );
}
