// src/components/ReminderPanel.jsx
import './ReminderPanel.css';

export default function ReminderPanel({
  reminderTime,
  onChangeReminderTime,
  repeat,
  onChangeRepeat,
}) {
  const timeOptions = [
    'A la hora del evento',
    '10 minutos antes',
    '30 minutos antes',
    '1 hora antes',
    '2 horas antes',
    '1 día antes',
  ];

  const repeatOptions = [
    'Una sola vez',
    'Cada día',
    'Cada semana',
    'Cada mes',
    'Cada año',
  ];

  return (
    <div className="reminder-panel">
      <div className="reminder-field">
        <label>Avisar:</label>
        <select
          value={reminderTime}
          onChange={(e) => onChangeReminderTime(e.target.value)}
        >
          {timeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="reminder-field">
        <label>Periodicidad:</label>
        <select
          value={repeat}
          onChange={(e) => onChangeRepeat(e.target.value)}
        >
          {repeatOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}