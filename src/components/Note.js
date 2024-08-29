import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { ref, serverTimestamp, set } from 'firebase/database';
import { database } from '../pages/Database/Fire';

const Note = ({onCLick}) => {
   const [note, setNote] = useState("");

   const handleSubmit = (e) => {
     e.preventDefault();
     const uid = uuidv4();
     const timestamp = serverTimestamp();
     set(ref(database, `note/${uid}/`), {
       uid,
       note,
       timeUpload: timestamp,
     }).then((success) => {
       Swal.fire({
         title: "Success!",
         text: "Note has been created!",
         icon: "success",
       })
     });
   };

  return (
    <form onSubmit={handleSubmit} className="py-5 px-5 ">
      <div className="flex justify-between items-center">
        <label
          htmlFor="message"
          class="block mb-2 text-md font-medium text-gray-900 dark:text-black"
        >
          Daily Sleep
        </label>
        <i onClick={onCLick} className="bx bx-x text-red-600 text-2xl "></i>
      </div>
      <textarea
        id="message"
        rows="8"
        class="block p-2.5 w-full text-sm placeholder text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="py-2 px-7 text-center text-sm text-white bg-[#131338] mt-3 rounded-lg "
      >
        Save Data
      </button>
    </form>
  );
}

export default Note