import { ref, serverTimestamp, set } from "firebase/database";
import React, { useState } from "react";
import { database } from "../../pages/Database/Fire";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const AlarmForm = ({ onClick }) => {
  const [brightness, setBrightness] = useState(50);
  const [alarmName, setAlarmName] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [delay, setDelay] = useState("");

  const proxyUrl = "https://jmwrx18b-8080.asse.devtunnels.ms/";
  const url = "http://192.168.0.162/api/set/led/schedule";
  const time = `${hours}:${minutes}:${seconds}`;
  const handleSubmit = (e) => {
    e.preventDefault();


    const alarmData = {
      alarm: alarmName,
      brightness: parseInt(brightness),
      date,
      time: time, // Only the hour part is sent as per requirement
      delay: parseInt(delay),
    };

    fetch(proxyUrl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alarmData),
    })
      .then((response) => response.json())
      .then((data) => {
        const uid = uuidv4();
        const timestamp = serverTimestamp();
        set(ref(database, `alarm/${uid}/`), {
          alarm: alarmName,
          brightness: parseInt(brightness),
          date,
          time, // Only the hour part is sent as per requirement
          delay: parseInt(delay),
          timeUpload: timestamp,
        }).then((success) => {
          Swal.fire({
            title: "Success Add Alarm!",
            text: "Have been created alarm!",
            icon: "success",
          });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-semibold mb-4">Set Alarm</h2>
        <i onClick={onClick} className="bx bx-x text-red-600 text-2xl "></i>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="alarmName"
            className="block text-sm font-medium text-gray-700"
          >
            Alarm Name
          </label>
          <input
            type="text"
            id="alarmName"
            placeholder="Alarm"
            value={alarmName}
            onChange={(e) => setAlarmName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="brightness"
            className="block text-sm font-medium text-gray-700"
          >
            Brightness ({brightness}%)
          </label>
          <input
            type="range"
            id="brightness"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="w-full mt-2"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Time (HH:MM:SS)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="hours"
              min="0"
              max="23"
              placeholder="HH"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="mt-1 block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="number"
              id="minutes"
              min="0"
              max="59"
              placeholder="MM"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="mt-1 block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="number"
              id="seconds"
              min="0"
              max="59"
              placeholder="SS"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="mt-1 block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="delay"
            className="block text-sm font-medium text-gray-700"
          >
            Delay
          </label>
          <input
            type="number"
            id="delay"
            placeholder="Delay"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Set Alarm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlarmForm;
