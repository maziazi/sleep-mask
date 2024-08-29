import React, { useEffect, useState } from 'react'
import BottomNavbar from '../Layout/BottomNavbar'
import Grafik from '../components/Grafik'
import AnalogClock from '../components/clock/AnalogClock';

const World = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Membersihkan interval ketika komponen di-unmount
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <BottomNavbar>
      <AnalogClock />
    </BottomNavbar>
  );
};

const styles = {
  clockContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#282c34',
  },
  clock: {
    fontSize: '5rem',
    color: 'white',
    fontFamily: 'monospace',
  }
};


export default World