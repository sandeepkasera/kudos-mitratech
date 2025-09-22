import React from "react";

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch (e) {
    return iso;
  }
}

export default function KudoList({ kudos }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto overflow-auto max-h-96">
      <h3 className="text-xl font-bold text-black mb-4 text-center sm:text-left">Received Kudos</h3>
      {kudos.length === 0 ? (
        <p className="text-black text-center">No kudos received yet.</p>
      ) : (
        <ul className="space-y-4">
          {kudos.map((k) => (
            <li key={k.id} className="border p-3 rounded text-black flex space-x-3">
              <img
                src={(k.sender && k.sender.avatar) || "https://i.pravatar.cc/64"}
                alt={k.sender ? `${k.sender.username}` : "sender"}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">
                      {k.sender ? `${k.sender.first_name} ${k.sender.last_name}` : "Unknown"}
                      <span className="ml-2 text-sm text-gray-600">@{k.sender ? k.sender.username : "?"}</span>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{k.message}</div>
                  </div>
                  <div className="text-xs text-gray-500">{formatDate(k.created_at)}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
