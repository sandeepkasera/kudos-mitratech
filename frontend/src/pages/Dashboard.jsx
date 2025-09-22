import React from "react";
import Navbar from "../components/Navbar.jsx";
import KudoForm from "../components/KudoForm.jsx";
import ReceivedKudos from "../components/KudoList.jsx";

export default function Dashboard({ currentUser, users, kudos, onGiveKudo, onLogout, weeklyRemaining }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <Navbar currentUser={currentUser} onLogout={onLogout} weeklyRemaining={weeklyRemaining} />
      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 mt-6">
        <KudoForm users={users} currentUserId={currentUser.id} onSubmit={onGiveKudo} weeklyRemaining={weeklyRemaining} />
        <ReceivedKudos kudos={kudos} />
      </div>
    </div>
  );
}
