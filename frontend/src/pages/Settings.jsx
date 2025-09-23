import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Settings({ currentUser, onSaved }) {
  const [firstName, setFirstName] = useState(currentUser.first_name || "");
  const [lastName, setLastName] = useState(currentUser.last_name || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFirstName(currentUser.first_name || "");
    setLastName(currentUser.last_name || "");
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/me/?user_id=${currentUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: firstName, last_name: lastName }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Failed to save');
      } else {
        const data = await res.json();
        onSaved && onSaved(data);
      }
    } catch (err) {
      console.debug('settings save failed', err);
      setError('Server error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First name</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 block w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 block w-full border p-2 rounded" />
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <div>
            <button type="submit" disabled={saving} className="bg-black text-white py-2 px-4 rounded">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
