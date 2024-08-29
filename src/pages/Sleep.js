import React, { useEffect, useState } from 'react';
import BottomNavbar from '../Layout/BottomNavbar';
import Grafik from '../components/Grafik';
import { off, onValue, ref, remove } from 'firebase/database';
import { database } from './Database/Fire';
import Note from '../components/Note';
import Swal from 'sweetalert2';

const Sleep = () => {
  const [dataFirebase, setDataFirebase] = useState([]);
  const [dataNote, setDataNote] = useState([]);
  const [show, setShow] = useState(false);
  const starCountRef = ref(database, "alarm/");
  const noteDatabase = ref(database, "note/");

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
      onValue(noteDatabase, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setDataNote(data);
        } else {
          setDataNote([]);
        }
      });
    };

    fetchData();

    // Membersihkan listener ketika komponen tidak lagi digunakan
    return () => {
      off(starCountRef);
      off(noteDatabase);
    };
  }, [starCountRef, noteDatabase]);

  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const timestamp = 1720296986954;
  const time = convertTimestampToTime(timestamp);
  console.log(time);

  const handleDeleteNote = (uid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        remove(ref(database, `note/${uid}`))
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.error("Error deleting note:", err);
          });
      }
    });
  };

  return (
    <BottomNavbar>
      {show ? (
        <Note onClick={() => setShow(false)} />
      ) : (
        <div className="mt-7">
          <div onClick={() => setShow(true)} className="flex justify-end px-4 ">
            <i className="bx bx-notepad text-2xl text-red-600 "></i>
          </div>
          <Grafik data={Object.values(dataFirebase)} />

          <div className="grid grid-cols-1 gap-[20px] w-full px-2 pb-9 ">
            <h2 className='text-black font-semibold'>Daily Sleep Note</h2>
            {dataNote &&
              Object.entries(dataNote).map(([uid, item]) => (
                <div key={uid} className="bg-[#131338] rounded-[10px] flex justify-between items-center p-3">
                  <h1 className="text-white max-w-[300px] text-[12px]">
                    {item.note}
                  </h1>
                  <i onClick={() => handleDeleteNote(uid)} className="bx bxs-trash text-red-600"></i>
                </div>
              ))}
          </div>
        </div>
      )}
    </BottomNavbar>
  );
};

export default Sleep;
