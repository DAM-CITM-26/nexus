// src/components/TaskCard.jsx
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import './TaskCard.css';

export default function TaskCard({
  task,
  onClickTask,
  onClick,
  onChangeStatus,
  onChangePriority,
}) {
  const handleOpen = () => {
    const callback = onClickTask || onClick;
    if (callback) callback(task);
  };

  return (
    <div className="task-card-small" onClick={handleOpen}>
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <StatusBadge
          status={task.status}
          onChangeStatus={() => onChangeStatus && onChangeStatus(task.id)}
        />
      </div>

      <div className="task-card-body">
        <span className="deadline-box">{task.deadline}</span>
        <PriorityBadge
          priority={task.priority}
          onChangePriority={() => onChangePriority && onChangePriority(task.id)}
        />
      </div>
    </div>
  );
}