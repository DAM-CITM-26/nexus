import Icon from './Icon';

export default function Header() {
  return (
    <header className="header-container">
      <div><Icon name="LogoOGR"/></div>
      <div className="search-bar">
        <input type="text" placeholder="Type to search..." />
        <button type="button" className="search-icon"><Icon name="lupa"/></button>
      </div>
      <button type="button" className="settings-btn"> <Icon name="dotsMain"/></button>
    </header>
  );
}