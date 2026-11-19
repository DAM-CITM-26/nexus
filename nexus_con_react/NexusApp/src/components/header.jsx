import React, {useState} from "react";
import Icon from './Icon';
import ConfOverlay from './ConfigurationOverlay';

export default function Header({ onOpenSettings, onToggleTheme }) {
  const [isConfOpen, setIsConfOpen] = useState(false);


  return (
    <>
    <header className="header-container">
      <div><Icon name="LogoOGR"/></div>
      <div className="search-bar">
        <input  id="search" type="text" placeholder="Type to search..." />
        <button type="button" className="search-icon"><Icon name="lupa"/></button>
      </div>
      <button type="button" className="settings-btn" 
          onClick={() => setIsConfOpen((prev) => !prev) }> 
          <Icon name="dotsMain"/> 
      </button>
    </header>

    <ConfOverlay
        isOpen={isConfOpen}
        onClose={() => setIsConfOpen(false)}
        onOpenSettings={onOpenSettings}
        onToggleTheme={onToggleTheme}
      />
    </>
  );
}