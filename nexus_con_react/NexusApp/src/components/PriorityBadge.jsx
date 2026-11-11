import './PriorityBadge.css';

export default function PriorityBadge({ priority, onChangePriority }) {
  // Mapeo de claves a texto formateado para la interfaz
  const priorityLabels = {
    importante: 'Importante',
    no_urgente: 'No urgente',
    descartable: 'Descartable',
  };

  const label = priorityLabels[priority] || priority;

  return (
    <button
      type="button"
      className={`badge priority-badge priority-${priority}`}
      onClick={(e) => {
        e.stopPropagation(); // Evita accionar el clic de la tarjeta contenedora
        if (onChangePriority) onChangePriority(priority);
      }}
    >
      {label}
    </button>
  );
}