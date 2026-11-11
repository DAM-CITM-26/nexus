import { useState } from 'react';
import HomePage from './pages/HomePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <main className="app-root">
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'calendar' && <div>Pantalla Calendario Completo</div>}
      {currentPage === 'progress' && <div>Pantalla de Progreso</div>}
      {currentPage === 'create' && <div>Pantalla de Crear Tarea/Evento</div>}
    </main>
  );
}