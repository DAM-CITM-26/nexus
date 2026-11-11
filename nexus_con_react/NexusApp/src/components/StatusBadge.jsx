import './StatusBadge.css';

export default function StatusBadge({ status, onChangeStatus }) {
  // status puede ser: 'hecho' | 'pendiente' | 'en_proceso'
  return (
    <button 
      className={`badge status-badge status-${status}`}
      onClick={(e) => {
        e.stopPropagation(); // Evita abrir/cerrar el overlay al hacer clic en el botón
        onChangeStatus && onChangeStatus(status);
      }}
    >
      {status === 'en_proceso' ? 'En proceso' : status}
    </button>
  );
}