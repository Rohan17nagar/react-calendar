import React, { useState, useRef, useEffect } from "react";
import Calendar from "./components/calendar/Calendar";
import "./App.css";

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const containerRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div className='app-container'>
      <h3>Select Date</h3>

      <div className='calendar-container' ref={containerRef}>
        <input
          type='text'
          readOnly
          placeholder='DD-MM-YYYY'
          value={selectedDate ? formatDate(selectedDate) : ""}
          className='date-input'
          onClick={() => setShowCalendar((prev) => !prev)}
        />

        {showCalendar && (
          <Calendar
            date={selectedDate || new Date()}
            onDateSelect={handleDateSelect}
          />
        )}
      </div>
    </div>
  );
}

export default App;
