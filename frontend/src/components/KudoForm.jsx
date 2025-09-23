import { useState } from "react";

export default function KudoForm({ users, currentUserId, onSubmit, weeklyRemaining }) {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   if (users && users.length > 0) setRecipient(users[0].id);
  // }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ sender_id: currentUserId, recipient_id: Number(recipient), message });
    setMessage("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-black text-center sm:text-left">Give Kudos</h3>
        <div className="text-sm text-gray-700">Left this week: <span className="font-semibold">{typeof weeklyRemaining === 'number' ? weeklyRemaining : '—'}</span></div>
      </div>
      <select 
        value={recipient} 
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="">Select recipient</option>
        {users.map(u => <option key={u.id} value={u.id}>{u.first_name} {u.last_name} ({u.username})</option>)}
      </select>
      <textarea
        placeholder="Why are you giving this kudo?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-black resize-none"
      />
      <button 
        type="submit" 
        className={`w-full py-2 rounded transition ${weeklyRemaining <= 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
        disabled={weeklyRemaining <= 0}
      >
        {weeklyRemaining <= 0 ? 'No Kudos Left' : 'Send Kudo'}
      </button>
    </form>
  );
}
