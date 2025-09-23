const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function me(user_id) {
  const res= await fetch(`${API_BASE}/me/?user_id=${user_id}`);
  return res.json();
}

export async function fetchUsers(orgId) {
  const url = orgId ? `${API_BASE}/users/?org_id=${orgId}` : `${API_BASE}/users/`;
  const res= await fetch(url);
  return res.json();
}

export async function getReceived(user_id) {
  const res= await fetch(`${API_BASE}/kudos/received/?user_id=${user_id}`);
  return res.json();
}
