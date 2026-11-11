import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import './TaskOverlay.css';

export default function TaskOverlay({ task, onClose, onEdit }) {
  if (!task) return null;

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      {/* stopPropagation evita que al hacer clic dentro del overlay se cierre */}
      <div className="overlay-card-large" onClick={(e) => e.stopPropagation()}>
        
        <header className="overlay-header">
          <h2>{task.title}</h2>
          <button className="close-icon" onClick={onClose}>✕</button>
        </header>

        <div className="overlay-badges">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>

        <div className="overlay-details">
          <p><strong>Hora programada:</strong> {task.eventTime}</p>
          <p><strong>Ubicación:</strong> {task.location || 'Sin ubicación'}</p>
          <p><strong>Descripción:</strong> {task.description}</p>
          <p className="notification-status">
            {task.hasNotification ? '🔔 Notificación activa' : '🔕 Sin notificación'}
          </p>
        </div>

        <footer className="overlay-footer">
          <button 
            className="btn-edit" 
            onClick={() => onEdit(task.id)}
          >
            Editar contenido
          </button>
        </footer>

      </div>
    </div>
  );
}