import TaskItem from "./TaskItem.jsx";

// Renders every task, or a message when there are none
export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) return <p className="empty">No tasks yet.</p>;
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
