import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [kudos, setKudos] = useState([]);
  const [weeklyRemaining, setWeeklyRemaining] = useState(3);

  const handleLogin = (user) => {
    setCurrentUser(user.user);
    // fetch weekly remaining for the logged in user
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/me/?user_id=${user.user.id}`);
        const data = await res.json();
        if (data.weekly_remaining !== undefined) setWeeklyRemaining(data.weekly_remaining);
      } catch (err) {
        // ignore
      }
    })();
  };

  const handleLogout = () => {
    // Clear any stored auth (if you store tokens later)
    setCurrentUser(null);
  };

  const [view, setView] = useState("dashboard");
  const navigate = (v) => setView(v);

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
    // refresh weekly remaining after sending
    try {
      const r2 = await fetch(`${API_BASE_URL}/me/?user_id=${currentUser.id}`);
      const d2 = await r2.json();
      if (d2.weekly_remaining !== undefined) setWeeklyRemaining(d2.weekly_remaining);
    } catch (err) {}
  };

  if (!currentUser) return <LoginPage onLogin={handleLogin} />;

  if (view === "profile") {
    return <Profile currentUser={currentUser} />;
  }

  if (view === "settings") {
    return (
      <Settings
        currentUser={currentUser}
        onSaved={(data) => {
          // Backend returns updated user data from me_view, update local state and go back to dashboard
          setCurrentUser(data);
          setView('dashboard');
        }}
      />
    );
  }

  return (
    <Dashboard
      currentUser={currentUser}
      users={users}
      kudos={kudos}
      onGiveKudo={handleGiveKudo}
      onLogout={handleLogout}
      weeklyRemaining={weeklyRemaining}
      setWeeklyRemaining={setWeeklyRemaining}
      onNavigate={navigate}
    />
  );
}