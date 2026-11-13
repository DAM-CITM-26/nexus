// src/pages/EditTaskPage.jsx
import { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import TextInput from '../components/TextInput';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import ToggleSwitch from '../components/ToggleSwitch';
import ReminderPanel from '../components/ReminderPanel';
import WheelColumn from '../components/WheelColumn';
import './NewTaskPage.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const YEARS = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const PERIODS = ['AM', 'PM'];

// Extrae hora, minutos y AM/PM desde cadenas como "8:00 PM"
function parseDeadline(timeStr = '11:30 AM') {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { hour: '11', minute: '30', period: 'AM' };
  return {
    hour: String(Number(match[1])),
    minute: match[2],
    period: match[3].toUpperCase(),
  };
}

export default function EditTaskPage({ task, onNavigate, onUpdateTask }) {
  // Si se entra sin tarea seleccionada, volvemos a inicio
  if (!task) {
    onNavigate('home');
    return null;
  }

  const parsedTime = parseDeadline(task.deadline);
  const initialDate = task.date || { day: '13', month: 'November', year: '2026' };

  // Estados precargados con la información de la tarea
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(
    task.description === 'Sin descripción' ? '' : task.description || ''
  );
  const [location, setLocation] = useState(
    task.location === 'Sin ubicación' ? '' : task.location || ''
  );

  const [status, setStatus] = useState(task.status || 'pendiente');
  const [priority, setPriority] = useState(task.priority || 'importante');

  const [hasNotification, setHasNotification] = useState(Boolean(task.hasNotification));
  const [reminderTime, setReminderTime] = useState(
    task.reminderConfig?.reminderTime || '30 minutos antes'
  );
  const [repeat, setRepeat] = useState(
    task.reminderConfig?.repeat || 'Una sola vez'
  );

  const [month, setMonth] = useState(initialDate.month);
  const [day, setDay] = useState(String(initialDate.day));
  const [year, setYear] = useState(String(initialDate.year));

  const [hour, setHour] = useState(parsedTime.hour);
  const [minute, setMinute] = useState(parsedTime.minute);
  const [period, setPeriod] = useState(parsedTime.period);

  const cycleStatus = () => {
    const order = ['pendiente', 'en_proceso', 'hecho'];
    const next = order[(order.indexOf(status) + 1) % order.length];
    setStatus(next);
  };

  const cyclePriority = () => {
    const order = ['importante', 'no_urgente', 'descartable'];
    const next = order[(order.indexOf(priority) + 1) % order.length];
    setPriority(next);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('El título no puede quedar vacío.');
      return;
    }

    const formattedTime = `${hour}:${minute} ${period}`;
    const updatedTask = {
      ...task, // Conserva el mismo ID original
      title: title.trim(),
      description: description.trim() || 'Sin descripción',
      location: location.trim() || 'Sin ubicación',
      status,
      priority,
      deadline: formattedTime,
      eventTime: `${day} ${month} ${year} · ${formattedTime}`,
      date: { day, month, year },
      hasNotification,
      reminderConfig: hasNotification ? { reminderTime, repeat } : null,
    };

    onUpdateTask(updatedTask);
    onNavigate('home');
  };

  return (
    <div className="new-task-page">
      <Header />

      <form className="new-task-form" onSubmit={handleSaveChanges}>
        <div className="save-btn-container">
          <button type="submit" className="save-event-btn">
            Guardar cambios
          </button>
        </div>

        <TextInput
          variant="title"
          value={title}
          onChange={setTitle}
          placeholder="Título"
        />

        <TextInput
          variant="default"
          value={description}
          onChange={setDescription}
          placeholder="Descripción"
        />

        <div className="badges-location-row">
          <StatusBadge status={status} onChangeStatus={cycleStatus} />
          <PriorityBadge priority={priority} onChangePriority={cyclePriority} />
          <div className="location-input-box">
            <TextInput
              variant="pill"
              value={location}
              onChange={setLocation}
              placeholder="Ubicació"
            />
          </div>
        </div>

        <div className="reminder-section">
          <ToggleSwitch
            checked={hasNotification}
            onChange={setHasNotification}
            label="Recordatorio"
          />

          {hasNotification && (
            <ReminderPanel
              reminderTime={reminderTime}
              onChangeReminderTime={setReminderTime}
              repeat={repeat}
              onChangeRepeat={setRepeat}
            />
          )}
        </div>

        <div className="date-dial-group">
          <div className="dial-col-month">
            <WheelColumn
              options={MONTHS}
              value={month}
              onChange={setMonth}
              variant="peach"
              visibleRows={5}
            />
          </div>
          <div className="dial-col-small">
            <WheelColumn
              options={DAYS}
              value={day}
              onChange={setDay}
              variant="gray"
              visibleRows={5}
            />
          </div>
          <div className="dial-col-medium">
            <WheelColumn
              options={YEARS}
              value={year}
              onChange={setYear}
              variant="gray"
              visibleRows={5}
            />
          </div>
        </div>

        <div className="time-dial-group">
          <div className="dial-col-small">
            <WheelColumn
              options={HOURS}
              value={hour}
              onChange={setHour}
              variant="gray"
              visibleRows={5}
            />
          </div>
          <div className="dial-col-small">
            <WheelColumn
              options={MINUTES}
              value={minute}
              onChange={setMinute}
              variant="gray"
              visibleRows={5}
            />
          </div>
          <div className="dial-col-small">
            <WheelColumn
              options={PERIODS}
              value={period}
              onChange={setPeriod}
              variant="gray"
              visibleRows={3}
            />
          </div>
        </div>
      </form>

      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  );
}