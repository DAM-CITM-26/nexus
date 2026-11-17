//import './header.css';
import React, {useState} from "react";
import Icon from './Icon';


export default function Header( {
  isOpen,
  })  
  {
    const [isOpen, setIsOpen] = useState(false);
      const togglePopup = () => {
    setIsOpen(!isOpen);}
  return (
    <header className="header-container">
      <div><Icon name="LogoOGR"/></div>
      <div className="search-bar">
        <input  id="search" type="text" placeholder="Type to search..." />
        <button type="button" className="search-icon"><Icon name="lupa"/></button>
      </div>
      <button type="button" className="settings-btn" 
          onClick={() => {setIsOpen(true)} }> 
          <Icon name="dotsMain"/> 
      </button>
    </header>
  );
}