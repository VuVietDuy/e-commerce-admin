import React from "react";
import { assets } from "../assets/assets";

function Navbar() {
  const handleLogout = () => {
    // Logout logic here
    console.log("Logged out");
  };
  return (
    <div className="flex items-center py-2 justify-between">
      <img className="w-[max(10%,80px)]" src={assets.logo} />
      <button
        onClick={handleLogout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;