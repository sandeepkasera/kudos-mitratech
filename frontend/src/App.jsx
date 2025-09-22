import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [kudos, setKudos] = useState([]);

  const handleLogin = (user) => {
    setCurrentUser(user.user);
  };

  // Fetch all users (excluding the current user) after login
  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      const res = await fetch("http://localhost:8000/users/");
      const data = await res.json();
      setUsers(data.filter(u => u.id !== currentUser.id));
    };

    fetchUsers();
  }, [currentUser]);

  const handleGiveKudo = async ({ sender_id, recipient_id, message }) => {
    await fetch("http://localhost:8000/kudos/give/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender_id, recipient_id, message }),
    });

    // Optionally refresh received kudos
    const res = await fetch("http://localhost:8000/kudos/received/?user_id=" + currentUser.id);
    const data = await res.json();
    setKudos(data);
  };

  return currentUser ? (
    <Dashboard currentUser={currentUser} users={users} kudos={kudos} onGiveKudo={handleGiveKudo} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}
