// src/App.jsx
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import NewTaskPage from './pages/NewTaskPage';
import EditTaskPage from './pages/EditTaskPage';

const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Reunión de Diseño',
    status: 'pendiente',
    priority: 'importante',
    deadline: '8:00 PM',
    eventTime: '13 November 2026 · 8:00 PM',
    date: { day: '13', month: 'November', year: '2026' },
    description: 'Revisión de avances del diseño de la interfaz.',
    location: 'Oficina Central',
    hasNotification: true,
    reminderConfig: { reminderTime: '30 minutos antes', repeat: 'Una sola vez' },
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [editingTask, setEditingTask] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('nexus_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('nexus_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Crear nueva tarea
  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // Abrir pantalla de edición con una tarea específica
  const handleStartEdit = (task) => {
    setEditingTask(task);
    setCurrentPage('edit');
  };

  // Guardar los cambios editados de una tarea existente
  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setEditingTask(null);
  };

  // Alternar estado rápidamente al pulsar StatusBadge
  const handleCycleStatus = (taskId) => {
    const order = ['pendiente', 'en_proceso', 'hecho'];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const next = order[(order.indexOf(t.status) + 1) % order.length];
        return { ...t, status: next };
      })
    );
  };

  // Alternar prioridad rápidamente al pulsar PriorityBadge
  const handleCyclePriority = (taskId) => {
    const order = ['importante', 'no_urgente', 'descartable'];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const next = order[(order.indexOf(t.priority) + 1) % order.length];
        return { ...t, priority: next };
      })
    );
  };

  return (
    <main className="app-root">
      {currentPage === 'home' && (
        <HomePage
          tasks={tasks}
          onNavigate={setCurrentPage}
          onEditTask={handleStartEdit}
          onCycleStatus={handleCycleStatus}
          onCyclePriority={handleCyclePriority}
        />
      )}

      {currentPage === 'create' && (
        <NewTaskPage
          onNavigate={setCurrentPage}
          onAddTask={handleAddTask}
        />
      )}

      {currentPage === 'edit' && (
        <EditTaskPage
          task={editingTask}
          onNavigate={setCurrentPage}
          onUpdateTask={handleUpdateTask}
        />
      )}

      {currentPage === 'calendar' && <div>Pantalla Calendario Completo</div>}
      {currentPage === 'progress' && <div>Pantalla de Progreso</div>}
    </main>
  );
}