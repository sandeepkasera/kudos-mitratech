const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

export async function login(username, password) {
  const r = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return r.json();
}

export async function me(user_id) {
  const r = await fetch(`${API_BASE}/me/?user_id=${user_id}`);
  return r.json();
}

export async function fetchUsers(orgId) {
  const url = orgId ? `${API_BASE}/users/?org_id=${orgId}` : `${API_BASE}/users/`;
  const r = await fetch(url);
  return r.json();
}

export async function getReceived(user_id) {
  const r = await fetch(`${API_BASE}/kudos/received/?user_id=${user_id}`);
  return r.json();
}
