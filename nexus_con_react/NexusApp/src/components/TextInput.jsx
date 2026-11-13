// src/components/TextInput.jsx
import './TextInput.css';

export default function TextInput({
  value,
  onChange,
  placeholder,
  variant = 'default', // 'title' | 'default' | 'pill'
}) {
  return (
    <input
      type="text"
      className={`custom-input input-${variant}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}