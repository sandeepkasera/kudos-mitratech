import React from "react";

export default function Navbar({ currentUser }) {
  return (
   <nav className="w-full bg-white shadow-md px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="text-xl font-bold text-black mb-2 sm:mb-0">Kudos App</div>
      <div className="text-black text-sm sm:text-base">
        {currentUser ? `Logged in as: ${currentUser.first_name} ${currentUser.last_name}` : "Not logged in"}
      </div>
    </nav>
  );
}
