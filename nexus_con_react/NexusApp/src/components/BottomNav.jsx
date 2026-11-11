import Icon from './Icon';

export default function BottomNav({ activeTab, onNavigate }) {
  return (
    <nav className="bottom-nav">
      {/* Botón flotante a la izquierda (Progreso) */}
      <button 
        className="floating-btn left" 
        onClick={() => onNavigate('progress')}
      >
      <Icon name="progres" />
      </button>

      {/* Botón central (Página Actual / Inicio) */}
      <button 
        className={`home-btn ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate('home')}
      >
       <Icon name="home" />
      </button>

      {/* Botón flotante a la derecha (Creación) */}
      <button 
        className="floating-btn right" 
        onClick={() => onNavigate('create')}
      >
        <Icon name="plus" />
      </button>
    </nav>
  );
}