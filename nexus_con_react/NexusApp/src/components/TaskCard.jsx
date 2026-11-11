import './TaskCard.css';

export default function TaskCard({ task, onClick }) {
  return (
    <div className="task-card-small" onClick={() => onClick(task)}>
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`status-badge status-${task.status}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>

      <div className="task-card-body">
        <span className="deadline-box">{task.deadline}</span>
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );
}