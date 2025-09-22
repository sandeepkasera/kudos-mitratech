import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Profile({ currentUser }) {
  const [given, setGiven] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const fetchGiven = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/kudos/sent/?user_id=${currentUser.id}`);
        const data = await res.json();
        setGiven(data);
      } catch (err) {
        setGiven([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGiven();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">Profile</h2>
          <p className="text-gray-700">Name: {currentUser.first_name} {currentUser.last_name}</p>
          <p className="text-gray-700">Username: {currentUser.username}</p>
          <p className="text-gray-700">Organization: {currentUser.organization ? currentUser.organization.name : '—'}</p>
        </div>

        <div className="mt-6 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Kudos you gave</h3>
          {loading ? (
            <p>Loading...</p>
          ) : given.length === 0 ? (
            <p className="text-gray-700">You haven't given any kudos yet.</p>
          ) : (
            <ul className="space-y-4">
              {given.map(k => (
                <li key={k.id} className="border p-3 rounded">
                  <div className="text-sm text-gray-600">To: {k.recipient ? `${k.recipient.first_name} ${k.recipient.last_name} (@${k.recipient.username})` : 'Unknown'}</div>
                  <div className="mt-1">{k.message}</div>
                  <div className="text-xs text-gray-500 mt-2">{new Date(k.created_at).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
