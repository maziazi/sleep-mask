import React, { useEffect, useState } from "react";
import AlarmBox from "../components/AlarmBox";
import BottomNavbar from "../Layout/BottomNavbar";
import AlarmForm from "../components/molecules/AlarmForm";
import SplashScreen from "./SplashScreen";
import { onValue, ref, off } from "firebase/database";
import { database } from "./Database/Fire";
import Grafik from "../components/Grafik";

const Home = () => {
  const proxyUrl = "https://jmwrx18b-8080.asse.devtunnels.ms/";
  const url = "http://192.168.0.162/api/get/led/schedule";
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [dataFirebase, setDataFirebase] = useState([]);
  const [error, setError] = useState(null);

  const starCountRef = ref(database, "alarm/");

  useEffect(() => {
    fetch( proxyUrl + url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Membaca data dari Firebase saat komponen pertama kali dimuat
    const fetchData = () => {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setDataFirebase(data);
        } else {
          setDataFirebase([]);
        }
      });
    };

    fetchData();

    // Membersihkan listener ketika komponen tidak lagi digunakan
    return () => {
      off(starCountRef);
    };
  }, [starCountRef]);



  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const formateDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const options = { weekday: "long" };
    return dateObj.toLocaleDateString("en-US", options);
  };
  

  return (
    <BottomNavbar>
      <div className="relative mx-[15px] pb-[80px]">
        <div className="flex justify-between items-center mt-[54px]">
          <h1 className="font-bold text-[36px]">Alarm</h1>
          <button
            className="p-4 py-2 rounded bg-transparent hover:bg-blue-600 hover:text-white text-black"
            onClick={() => setShow(!show)}
          >
            <i className="bx bx-plus font-bold text-[18px]"></i>
          </button>
        </div>
        {show && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="p-2 rounded-lg shadow-lg">
                <AlarmForm onClick={() => setShow(false)} />
              </div>
            </div>
          </>
        )}
        <div
          className={`grid grid-cols-1 gap-[15px] mt-[20px] ${
            show ? "z-30" : "z-10"
          }`}
        >
          {/* {dataFirebase &&
            Object.keys(dataFirebase).map((key) => (
              <AlarmBox
                day={formateDate(dataFirebase[key].date)}
                key={key}
                time={dataFirebase[key].time}
              />
            ))} */}

          <AlarmBox
            day={formateDate(data?.data?.date)}
            time={data?.data?.time}
          />
        </div>
      </div>
    </BottomNavbar>
  );
};

export default Home;
