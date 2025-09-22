import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [kudos, setKudos] = useState([]);

  const handleLogin = (user) => {
    setCurrentUser(user.user);
  };

  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      const res = await fetch(`${API_BASE_URL}/users/`);
      const data = await res.json();
      setUsers(data.filter(u => u.id !== currentUser.id));
    };

    const fetchKudos = async () => {
    const res = await fetch(`${API_BASE_URL}/kudos/received/?user_id=${currentUser.id}`);
    const data = await res.json();
    setKudos(data);
    }

    fetchUsers();
    fetchKudos();
  }, [currentUser]);

  const handleGiveKudo = async ({ sender_id, recipient_id, message }) => {
    await fetch(`${API_BASE_URL}/kudos/give/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender_id, recipient_id, message }),
    });

    const res = await fetch(`${API_BASE_URL}/kudos/received/?user_id=${currentUser.id}`);
    const data = await res.json();
    setKudos(data);
  };

  return currentUser ? (
    <Dashboard currentUser={currentUser} users={users} kudos={kudos} onGiveKudo={handleGiveKudo} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}