import React, { useState } from "react";

export default function SignupForm({ onSubmit }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!username || !password) return alert("Fill required fields");
    onSubmit({ fullName, username, password });
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2 className="card-title">Sign up</h2>
      <label className="label">Full name</label>
      <input className="input" value={fullName} onChange={e => setFullName(e.target.value)} />
      <label className="label">Username</label>
      <input className="input" value={username} onChange={e => setUsername(e.target.value)} />
      <label className="label">Password</label>
      <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn" type="submit">Create</button>
    </form>
  );
}
