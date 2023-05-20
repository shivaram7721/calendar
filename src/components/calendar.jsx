import { useState } from 'react';
import moment from 'moment';
import './calendar.css'

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const weekdays = moment.weekdays();
  const weekdaysShort = moment.weekdaysShort();
  const months = moment.months();

  const firstDayOfMonth = () => moment(currentMonth).startOf('month').format('d');
  console.log(moment())

  const renderCalendar = () => {
    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
      blanks.push(<td key={i * 10} className="empty-slot">{""}</td>);
    }

    let daysInMonth = [];
    for (let d = 1; d <= currentMonth.daysInMonth(); d++) {
      daysInMonth.push(
        <td key={d} className="calendar-day">
          {d}
        </td>
      );
    }

    let totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    return (
      <table className="calendar">
        <thead>
          <tr className="calendar-header">
            <td colSpan="7">
              <button onClick={prevMonth}>Prev</button>
              {months[currentMonth.month()]} {currentMonth.year()}
              <button onClick={nextMonth}>Next</button>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekdaysShort.map((day) => (
              <td key={day} className="calendar-header">
                {day}
              </td>
            ))}
          </tr>
          {rows.map((row, i) => (
            <tr key={i}>{row}</tr>
          ))}
        </tbody>
      </table>
    );
  };

  const prevMonth = () => {
    setCurrentMonth(moment(currentMonth).subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentMonth(moment(currentMonth).add(1, 'month'));
  };

  return (
    <div className="calendar-container">
      {renderCalendar()}
    </div>
  );
}

export default Calendar;
