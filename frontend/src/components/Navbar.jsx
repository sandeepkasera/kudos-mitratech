import React, { useState, useRef, useEffect } from "react";

export default function Navbar({ currentUser, onLogout, weeklyRemaining, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
      <div>
        <div className="text-xl font-bold text-black mb-1 sm:mb-0">Kudos</div>
        <div className="text-sm text-gray-600">{currentUser && currentUser.organization ? currentUser.organization.name : ''}</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden sm:block text-black text-sm sm:text-base">
          {currentUser ? `Logged in as: ${currentUser.first_name} ${currentUser.last_name}` : "Not logged in"}
        </div>
        <div className="hidden sm:flex items-center text-sm text-gray-700">
          <span className="mr-2">Kudos left:</span>
          <span className="font-semibold text-black">{typeof weeklyRemaining === 'number' ? weeklyRemaining : '—'}</span>
        </div>

        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-1"
          >
            <img
              src={(currentUser && currentUser.avatar) || "https://i.pravatar.cc/64"}
              alt="profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-20">
              <button onClick={() => { setOpen(false); onNavigate && onNavigate('profile'); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Profile</button>
              <button onClick={() => { setOpen(false); onNavigate && onNavigate('settings'); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Settings</button>
              <div className="border-t" />
              <button
                onClick={() => { setOpen(false); onLogout && onLogout(); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
