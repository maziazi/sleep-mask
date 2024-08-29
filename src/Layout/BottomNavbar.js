import { signOut } from "firebase/auth";
import React from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { auth } from "../pages/Database/Fire";

const BottomNavbar = ({ children }) => {
  const { pathname } = useLocation();
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Perubahan: Menggunakan navigate hook untuk redirect
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <main className="mb-16 overflow-auto h-full">{children}</main>
      <div className="fixed bottom-0 left-0 right-0 bg-[#131338] text-white flex justify-around items-center h-16">
        <NavLink to="/" className="flex flex-col items-center">
          <i
            className={`bx bx-stopwatch ${
              pathname === "/" ? "text-[#FFF845]" : "text-[#787878]"
            } text-[30px]`}
          ></i>
          <span className="text-xs">Alarm</span>
        </NavLink>
        {/* <NavLink to="/world" className="flex flex-col items-center">
          <i
            className={`bx bx-globe text-[30px] ${
              pathname === "/world" ? "text-[#FFF845]" : "text-[#787878]"
            }`}
          ></i>
          <span className="text-xs">World</span>
        </NavLink> */}
        <NavLink to="/sleep" className="flex flex-col items-center">
          <i
            className={`bx bx-moon text-[30px] ${
              pathname === "/sleep" ? "text-[#FFF845]" : "text-[#787878]"
            }`}
          ></i>
          <span className="text-xs">Sleep</span>
        </NavLink>
        <div onClick={signOutHandler} className="flex flex-col items-center">
          <i
            className={`bx bx-log-out text-[30px] ${
              pathname === "/login" ? "text-[#FFF845]" : "text-[#787878]"
            }`}
          ></i>
          <span className="text-xs">Log Out</span>
        </div>
      </div>
    </>
  );
};

export default BottomNavbar;
