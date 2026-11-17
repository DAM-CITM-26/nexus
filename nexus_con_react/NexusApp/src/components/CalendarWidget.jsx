import Icon from './Icon';
//import './CalendarWidget.css';


export default function CalendarWidget({ onOpenCalendar }) {
  const days = [
    { day: 'Lun', date: 5, hasEvent: false },
    { day: 'Mar', date: 6, hasEvent: true, dotColor: '#00bcd4' },
    { day: 'Mie', date: 7, hasEvent: true, dotColor: '#4caf50' },
    { day: 'Jue', date: 8, hasEvent: false },
    { day: 'Vie', date: 9, hasEvent: false },
    { day: 'Sab', date: 10, hasEvent: false },
    { day: 'Dom', date: 11, hasEvent: false },
  ];

  return (
    <div className="calendar-card" onClick={onOpenCalendar}>
      <h2 className="calendar-title">Octubre 2026</h2>
      <div className="days-row">
        {days.map((item) => (
          <div key={item.date} className="day-column">
            <span className="day-label">{item.day}</span>
            <div className="day-circle">
              {item.hasEvent && (
                <span 
                  className="event-dot" 
                  style={{ backgroundColor: item.dotColor }} 
                />
              )}
              {item.date}
            </div>
          </div>
        ))}
        <button type="button" className="settings-btn"> <Icon name="arrow"/> </button>
        
      </div>
    </div>
  );
}