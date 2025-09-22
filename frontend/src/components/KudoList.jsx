import React from "react";

export default function KudoList({ kudos }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto overflow-auto max-h-96">
      <h3 className="text-xl font-bold text-black mb-4 text-center sm:text-left">Received Kudos</h3>
      {kudos.length === 0 ? (
        <p className="text-black text-center">No kudos received yet.</p>
      ) : (
        <ul className="space-y-4">
          {kudos.map((k) => (
            <li key={k.id} className="border p-3 rounded text-black">
              <strong>{k.sender_name}</strong>: {k.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
