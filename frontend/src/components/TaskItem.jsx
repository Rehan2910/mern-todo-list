// One task row: checkbox (B4), title, delete button (B5)
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />
      {/* completed tasks get a strike-through via the "done" class */}
      <span className={task.completed ? "done" : ""}>{task.title}</span>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </li>
  );
}
