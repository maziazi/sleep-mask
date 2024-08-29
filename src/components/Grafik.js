import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const hoursOfDay = Array.from(
  { length: 24 },
  (_, i) => `${String(i).padStart(2, "0")}:00`
);

const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  const options = { weekday: "long" };
  return dateObj.toLocaleDateString("en-US", options);
};

const Grafik = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (data.length > 0) {
      const formattedData = data.map((item) => ({
        ...item,
        day: formatDate(item.date),
      }));

      const groupedData = daysOfWeek.map((day) => {
        const dayData = formattedData.filter((item) => item.day === day);
        return dayData.length > 0
          ? dayData.reduce((acc, item) => acc + item.brightness, 0) /
              dayData.length
          : 0;
      });

      const newChartData = {
        labels: daysOfWeek,
        datasets: [
          {
            label: "Waktu Tidur",
            data: groupedData,
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            pointBackgroundColor: "rgba(75,192,192,1)",
            pointBorderColor: "#fff",
          },
        ],
      };

      setChartData(newChartData);
    }
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Grafik Waktu Tidur",
        color: "#000",
      },
    },
    scales: {
      x: {
        type: "category",
        labels: daysOfWeek,
        title: {
          display: true,
          text: "Hari",
          color: "#000",
        },
        ticks: {
          color: "#000",
        },
      },
      y: {
        title: {
          display: true,
          text: "Tidur",
          color: "#000",
        },
        ticks: {
          color: "#000",
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", height: "40vh", width: "100vw" }}>
      <Line data={chartData} options={options}></Line>
    </div>
  );
};

export default Grafik;
