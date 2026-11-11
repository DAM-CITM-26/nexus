import { useState } from 'react';
import Header from '../components/header';
import CalendarWidget from '../components/CalendarWidget';
import TaskCard from '../components/TaskCard';
import TaskOverlay from '../components/TaskOverlay';
import BottomNav from '../components/BottomNav';
import './HomePage.css';

export default function HomePage({ onNavigate }) {
  // Estado para la tarjeta seleccionada en el Overlay modal
  const [activeTask, setActiveTask] = useState(null);

  // Datos de ejemplo para las tareas de hoy (Due Today)
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Tarea 1',
      status: 'pendiente',
      priority: 'importante',
      deadline: '8:00 PM',
      eventTime: '8:00 PM - 9:00 PM',
      description: 'Revisión de avances del diseño de la interfaz.',
      location: 'Oficina Central',
      hasNotification: true,
    },
    {
      id: '2',
      title: 'Tarea 2',
      status: 'en_proceso',
      priority: 'no_urgente',
      deadline: '9:30 PM',
      eventTime: '9:30 PM - 10:00 PM',
      description: 'Preparar documentación técnica.',
      location: 'Remoto',
      hasNotification: false,
    },
    {
      id: '3',
      title: 'Tarea 3',
      status: 'hecho',
      priority: 'descartable',
      deadline: '10:00 PM',
      eventTime: '10:00 PM',
      description: 'Enviar reporte semanal.',
      location: 'Online',
      hasNotification: false,
    },
  ]);

  // Cambiar el estado directo desde la tarjeta sin abrir el overlay (opcional)
  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  // Navegar a la página de edición desde el Overlay
  const handleEditTask = (taskId) => {
    setActiveTask(null);
    onNavigate('edit-task', { taskId });
  };

  return (
    <div className="home-page-container">
      {/* 1. Cabecera fija o superior */}
      <Header />

      {/* 2. Contenido desplazable */}
      <main className="home-content">
        {/* Caja de widget del calendario */}
        <CalendarWidget onOpenCalendar={() => onNavigate('calendar')} />

        {/* Sección "Due Today" */}
        <section className="due-today-section">
          <h2 className="section-title">Due Today ...</h2>
          <hr className="divider" />

          {/* Lista de tarjetas pequeñas de tareas */}
          <div className="task-list-scroll">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClickTask={(t) => setActiveTask(t)}
                onChangeStatus={(status) => handleStatusChange(task.id, status)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* 3. Tarjeta desplegada en modo Modal / Overlay */}
      {activeTask && (
        <TaskOverlay
          task={activeTask}
          onClose={() => setActiveTask(null)}
          onEdit={handleEditTask}
        />
      )}

      {/* 4. Barra de navegación inferior fija */}
      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  );
}