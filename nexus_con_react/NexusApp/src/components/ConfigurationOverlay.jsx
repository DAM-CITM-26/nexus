// src/components/TaskOverlay.jsx
import Icon from './Icon';


export default function ConfOverlay({
  
}) {
  
  return (
    <div className="overlay-conf" onClick={togglePopup}>
      <div>
        <Icon name="Settings" size={20} />
        <p>Configuración</p>
      </div>

      <div>
        <Icon name="eye" size={20} />
        <p>Tema Pantalla</p>
      </div>
    </div>
  );
}