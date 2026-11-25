// src/pages/HomePage.jsx
import { useState } from 'react';
import Header from '../components/Header';
import CalendarWidget from '../components/CalendarWidget';
import TaskCard from '../components/TaskCard';
import TaskOverlay from '../components/TaskOverlay';
import BottomNav from '../components/BottomNav';
//import './HomePage.css';

export default function HomePage({
  tasks,
  onNavigate,
  onEditTask,
  onCycleStatus,
  onCyclePriority,
}) {
  const [activeTaskId, setActiveTaskId] = useState(null);

  // Obtiene siempre la versión más reciente de la tarea seleccionada
  const activeTask = tasks.find((t) => t.id === activeTaskId) || null;

  const handleOpenEditor = (task) => {
    setActiveTaskId(null); // Cierra el overlay
    onEditTask(task);      // Abre EditTaskPage con esa tarea
  };

  const CurrentDate = () => { //retorna la fecha actual [dia/mes/año]
    //const date = new Date();
    //return date.toLocaleDateString();
    const date = CurrentDay() + " " + CurrentMonth() + " " + new Date().getFullYear();
    return date;
  };

  const CurrentDay = () => {  //solo el dia y en string
    const dayOfMonth = new Date().getDate(); // Returns 1-31   
    return dayOfMonth.toString();
  };

  const CurrentMonth = () => { //nombre del mes en español
    const currentMonthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date());       
    return currentMonthName;
  };

  return (
    <div className="home-page-container">
      <Header />

      <main className="home-content">
        <CalendarWidget onOpenCalendar={() => onNavigate('calendar')} />

        <section className="due-today-section">
          <h2 className="section-title">Para hoy: {CurrentDate()}</h2>
          <hr className="divider" />
          <p>{CurrentDay()}</p>
          <div className="task-list-scroll">
            {tasks
              .filter((task) => task.date.day === CurrentDay() 
              && task.date.month.toLowerCase() === CurrentMonth().toLowerCase()
              && task.date.year === new Date().getFullYear().toString()
            )   
              .sort((a, b) => a.deadline - b.deadline)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClickTask={(t) => setActiveTaskId(t.id)}
                  onChangeStatus={onCycleStatus}
                  onChangePriority={onCyclePriority}
              />
            ))}
          </div>
        </section>
      </main>

      {activeTask && (
        <TaskOverlay
          task={activeTask}
          onClose={() => setActiveTaskId(null)}
          onEdit={handleOpenEditor}
          onChangeStatus={onCycleStatus}
          onChangePriority={onCyclePriority}
        />
      )}

      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  );
}