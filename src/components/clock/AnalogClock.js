import React, { useEffect, useState } from "react";

const AnalogClock = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("selected-theme") || "light"
  );
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }

    return () => clearInterval(interval);
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("selected-theme", newTheme);
  };

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <section className="clock container">
      <div className="clock__container grid">
        <div className="clock__content grid">
          <div className="clock__circle">
            <span className="clock__twelve"></span>
            <span className="clock__three"></span>
            <span className="clock__six"></span>
            <span className="clock__nine"></span>
            <div className="clock__rounder"></div>
            <div
              className="clock__hour"
              style={{ transform: `rotateZ(${hours * 30 + minutes / 2}deg)` }}
            ></div>
            <div
              className="clock__minutes"
              style={{ transform: `rotateZ(${minutes * 6}deg)` }}
            ></div>
            <div
              className="clock__seconds"
              style={{ transform: `rotateZ(${seconds * 6}deg)` }}
            ></div>
            <div className="clock__theme" onClick={handleThemeToggle}>
              <i
                className={`bx ${theme === "dark" ? "bxs-sun" : "bxs-moon"}`}
                id="theme-button"
              ></i>
            </div>
          </div>
          <div>
            <div className="clock__text">
              <div className="clock__text-hour">{formattedHours}:</div>
              <div className="clock__text-minutes">{formattedMinutes}</div>
              <div className="clock__text-ampm">{ampm}</div>
            </div>
            <div className="clock__date">
              <span>{time.getDate()}</span>
              <span>{months[time.getMonth()]},</span>
              <span>{time.getFullYear()}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AnalogClock;
