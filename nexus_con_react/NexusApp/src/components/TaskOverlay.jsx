// src/components/TaskOverlay.jsx
import Icon from './Icon';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import './TaskOverlay.css';

export default function TaskOverlay({
  task,
  onClose,
  onEdit,
  onChangeStatus,
  onChangePriority,
}) {
  if (!task) return null;

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-card-large" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera: Título + Botón cerrar */}
        <header className="overlay-header">
          <h2 className="overlay-title">{task.title}</h2>
          <button
            type="button"
            className="overlay-close-btn"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <Icon name="close" size={20} />
          </button>
        </header>

        {/* Badges interactivos de Estado y Prioridad */}
        <div className="overlay-badges">
          <StatusBadge
            status={task.status}
            onChangeStatus={() => onChangeStatus && onChangeStatus(task.id)}
          />
          <PriorityBadge
            priority={task.priority}
            onChangePriority={() => onChangePriority && onChangePriority(task.id)}
          />
        </div>

        {/* Detalles de la tarea */}
        <div className="overlay-details">
          <div className="overlay-detail-row">
            <strong>Fecha y hora:</strong>
            <span>{task.eventTime || task.deadline}</span>
          </div>

          <div className="overlay-detail-row">
            <strong>Ubicación:</strong>
            <span>{task.location || 'Sin ubicación'}</span>
          </div>

          <div className="overlay-description-box">
            <strong>Descripción:</strong>
            <p>{task.description || 'Sin descripción'}</p>
          </div>

          {/* Estado del recordatorio con tus iconos bell / campanaNo */}
          <div className="overlay-reminder-row">
            <Icon
              name={task.hasNotification ? 'bell' : 'campanaNo'}
              size={20}
              color={task.hasNotification ? '#d99b4e' : '#888888'}
            />
            <span>
              {task.hasNotification
                ? `Recordatorio activo${
                    task.reminderConfig
                      ? ` (${task.reminderConfig.reminderTime} · ${task.reminderConfig.repeat})`
                      : ''
                  }`
                : 'Sin recordatorio'}
            </span>
          </div>
        </div>

        {/* Pie con enlace a la página de edición */}
        <footer className="overlay-footer">
          <button
            type="button"
            className="overlay-edit-btn"
            onClick={() => onEdit(task)}
          >
            <Icon name="edit" size={18} />
            <span>Editar contenido</span>
          </button>
        </footer>
      </div>
    </div>
  );
}