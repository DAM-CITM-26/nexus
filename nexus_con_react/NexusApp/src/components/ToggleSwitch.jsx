// src/components/ToggleSwitch.jsx
import './ToggleSwitch.css';

export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <div className="toggle-wrapper" onClick={() => onChange(!checked)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`toggle-track ${checked ? 'is-on' : 'is-off'}`}
      >
        <span className="toggle-thumb" />
      </button>
      {label && <span className="toggle-label">{label}</span>}
    </div>
  );
}