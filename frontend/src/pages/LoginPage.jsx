import React, { useState } from "react";
import LoginForm from "../components/LoginForm.jsx";

export default function LoginPage({ onLogin }) {
  return <LoginForm onLogin={onLogin} />;
}
