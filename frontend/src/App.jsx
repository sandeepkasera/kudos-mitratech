import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser, setWeeklyRemaining } from './store/userSlice'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector(s => s.user.currentUser)
  const weeklyRemaining = useSelector(s => s.user.weeklyRemaining)
  const [users, setUsers] = useState([]);
  const [kudos, setKudos] = useState([]);

  const handleLogin = (user) => {
    (async () => {
      // set minimal user immediately
      dispatch(setUser(user.user));
      // fetch weekly remaining and full user data
      try {
        const res = await fetch(`${API_BASE_URL}/me/?user_id=${user.user.id}`);
        const data = await res.json();
        if (data.weekly_remaining !== undefined) dispatch(setWeeklyRemaining(data.weekly_remaining));
        // also update stored user to include nested organization etc
        if (data) dispatch(setUser(data));
      } catch (err) {
        // ignore
      }
      // navigate to dashboard after login
      navigate('/dashboard');
    })();
  };

  const handleLogout = () => {
    // Clear any stored auth (if you store tokens later)
    dispatch(clearUser());
  };

  const navigate = useNavigate();

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
      if (d2.weekly_remaining !== undefined) dispatch(setWeeklyRemaining(d2.weekly_remaining));
    } catch (err) {}
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/" element={currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      <Route path="/dashboard" element={currentUser ? <Dashboard currentUser={currentUser} users={users} kudos={kudos} onGiveKudo={handleGiveKudo} onLogout={handleLogout} weeklyRemaining={weeklyRemaining} onNavigate={(p) => navigate(p === 'profile' ? '/profile' : `/${p}`)} /> : <Navigate to="/login" replace />} />
      <Route path="/profile" element={currentUser ? <Profile currentUser={currentUser} /> : <Navigate to="/login" replace />} />
      <Route path="/settings" element={currentUser ? <Settings currentUser={currentUser} onSaved={(data) => { dispatch(setUser(data)); navigate('/dashboard'); }} /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}