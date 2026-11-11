import Icon from './Icon';
import './CalendarWidget.css';


export default function CalendarWidget({ onOpenCalendar }) {
  const days = [
    { day: 'Dl', date: 5, hasEvent: false },
    { day: 'Dim', date: 6, hasEvent: true, dotColor: '#00bcd4' },
    { day: 'Dc', date: 7, hasEvent: true, dotColor: '#4caf50' },
    { day: 'Dj', date: 8, hasEvent: false },
    { day: 'Dv', date: 9, hasEvent: false },
    { day: 'Ds', date: 10, hasEvent: false },
    { day: 'Dg', date: 11, hasEvent: false },
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