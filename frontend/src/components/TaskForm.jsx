import { useState } from "react";

// B3: controlled input + submit button for adding a task
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();                 // stop the browser reloading the page
    if (!title.trim()) return;
    await onAdd(title);
    setTitle("");                       // clear the input after adding
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
