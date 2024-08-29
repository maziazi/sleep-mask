import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Swal from "sweetalert2";
import Home from "./pages/Home";
import World from "./pages/World";
import Sleep from "./pages/Sleep";
import Login from "./pages/Login";
import { auth } from "./pages/Database/Fire";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [alarmTime, setAlarmTime] = useState(null);
  const proxyUrl = "https://jmwrx18b-8080.asse.devtunnels.ms/";
  const url = "http://192.168.0.162/api/get/led/schedule";

  useEffect(() => {
    // Membaca status autentikasi pengguna
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser.email);
        } else {
          setUser(null);
        }
      }
    );

    // Fetch data alarm
    const fetchAlarmData = async () => {
      try {
        const response = await fetch(proxyUrl + url);
        const result = await response.json();
        if (result.status === "Success") {
          setAlarmTime(result.data.time);
          console.log(result.data.time)
        }
      } catch (error) {
        console.error("Error fetching alarm data:", error);
      }
    };

    fetchAlarmData();

    // Unsubscribe dari listeners saat komponen dibongkar
    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString("en-GB");
      if (alarmTime && currentTime === alarmTime) {
        const audio = new Audio("/sound/alarm.mp3");
        audio.volume = 1;
        audio.play();
        Swal.fire({
          title: "Alarm",
          text: "The alarm is ringing!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Off",
        }).then((result) => {
          if (result.isConfirmed) {
            audio.pause();
            audio.currentTime = 0;

          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarmTime]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PrivateRoute isAuthenticated={user}>
              <Home />
            </PrivateRoute>
          }
          path="/"
        />
        <Route
          element={
            <PrivateRoute isAuthenticated={user}>
              <World />
            </PrivateRoute>
          }
          path="/world"
        />
        <Route
          element={
            <PrivateRoute isAuthenticated={user}>
              <Sleep />
            </PrivateRoute>
          }
          path="/sleep"
        />
        <Route
          element={
            <Private isAuthenticated={user}>
              <Login />
            </Private>
          }
          path="/login"
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const PrivateRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const Private = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
