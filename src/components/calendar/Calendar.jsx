import React, { useState } from "react";
import "./Calendar.css";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function Calendar({ date, onDateSelect }) {
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());

  const selectedYear = date.getFullYear();
  const selectedMonth = date.getMonth();
  const selectedDay = date.getDate();

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  );

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const prevYear = () => setCurrentYear((y) => y - 1);
  const nextYear = () => setCurrentYear((y) => y + 1);

  const cells = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<div key={`empty-${i}`} className='calendar-cell empty' />);
  }

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const isSelected =
      day === selectedDay &&
      currentMonth === selectedMonth &&
      currentYear === selectedYear;

    cells.push(
      <div
        key={day}
        className={`calendar-cell ${isSelected ? "selected" : ""}`}
        onClick={() => onDateSelect(new Date(currentYear, currentMonth, day))}
      >
        {day}
      </div>
    );
  }

  return (
    <div className='calendar-popup'>
      <div className='calendar-header'>
        <div className='nav-group'>
          <button onClick={prevYear}>«</button>
          <button onClick={prevMonth}>‹</button>
        </div>

        <span>
          {monthName} {currentYear}
        </span>

        <div className='nav-group'>
          <button onClick={nextMonth}>›</button>
          <button onClick={nextYear}>»</button>
        </div>
      </div>

      <div className='calendar-weekdays'>
        {DAYS.map((d) => (
          <div key={d} className='calendar-weekday' role='columnheader'>
            {d}
          </div>
        ))}
      </div>

      <div className='calendar-grid'>{cells}</div>
    </div>
  );
}

export default Calendar;
