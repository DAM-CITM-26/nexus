import Icon from './Icon';

export default function ConfOverlay({
  isOpen,
  onClose,
  onOpenSettings,
  onToggleTheme,
}) {
  // Si no está abierto, no renderiza nada (igual que TaskOverlay)
  if (!isOpen) return null;

  return (
    <div className="overlay-conf">
      <button className="overlay-row-conf" onClick={onClose}> 
        <Icon name="close" size={20} />
      </button>
      <div className="overlay-row-conf">
        <Icon name="Settings" size={20} />
        <p>Configuración</p>
      </div>

      <div className="overlay-row-conf">
        <Icon name="eye" size={20} />
        <p>Tema Pantalla</p>
      </div>
    </div>
  );
}