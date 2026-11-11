import TaskCard from './TaskCard';

export default function TaskList({ tasks = [] }) {
  if (tasks.length === 0) {
    return <p className="empty-list-msg">No hay tareas disponibles.</p>;
  }

  return (
    <div className="task-list-scroll">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          time={task.time}
          status={task.status}
          priority={task.priority}
        />
      ))}
    </div>
  );
}