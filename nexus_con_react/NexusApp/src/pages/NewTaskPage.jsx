// src/pages/NewTaskPage.jsx
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

export default function NewTaskPage({ onNavigate, onAddTask }) {
  // Estados de los campos de texto
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  // Estados de los átomos Badge
  const [status, setStatus] = useState('pendiente');
  const [priority, setPriority] = useState('importante');

  // Estados del Recordatorio
  const [hasNotification, setHasNotification] = useState(false);
  const [reminderTime, setReminderTime] = useState('30 minutos antes');
  const [repeat, setRepeat] = useState('Una sola vez');

  // Estados de los diales de Fecha
  const [month, setMonth] = useState('November');
  const [day, setDay] = useState('13');
  const [year, setYear] = useState('2026');

  // Estados de los diales de Hora
  const [hour, setHour] = useState('11');
  const [minute, setMinute] = useState('30');
  const [period, setPeriod] = useState('AM');

  // Ciclar estado al hacer clic en el átomo StatusBadge
  const cycleStatus = () => {
    const order = ['pendiente', 'en_proceso', 'hecho'];
    const next = order[(order.indexOf(status) + 1) % order.length];
    setStatus(next);
  };

  // Ciclar prioridad al hacer clic en el átomo PriorityBadge
  const cyclePriority = () => {
    const order = ['importante', 'no_urgente', 'descartable'];
    const next = order[(order.indexOf(priority) + 1) % order.length];
    setPriority(next);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, escribe un título para el evento.');
      return;
    }

    const formattedTime = `${hour}:${minute} ${period}`;
    const newTask = {
      id: Date.now().toString(),
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

    onAddTask(newTask); // Envía la tarea al estado global en App.jsx
    onNavigate('home'); // Vuelve a la pantalla principal
  };

  return (
    <div className="new-task-page">
      <Header />

      <form className="new-task-form" onSubmit={handleSave}>
        {/* Botón superior Guardar Evento */}
        <div className="save-btn-container">
          <button type="submit" className="save-event-btn">
            Guardar evento
          </button>
        </div>

        {/* Inputs de Título y Descripción */}
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

        {/* Fila de átomos: Estado, Prioridad y Ubicación */}
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

        {/* Interruptor On/Off de Recordatorio */}
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

        {/* Dial 1: Fecha (Mes, Día, Año) */}
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

        {/* Dial 2: Hora (Hora, Minutos, AM/PM) */}
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

      <BottomNav activeTab="create" onNavigate={onNavigate} />
    </div>
  );
}