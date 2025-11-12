import { useState } from "react";

interface AddTrackerModalProps {
  close: () => void;
  addTracker: (tracker: any) => void;
}

export default function AddTrackerModal({ close, addTracker }: AddTrackerModalProps) {
  const [name, setName] = useState("");
  const [baseFrequency, setBaseFrequency] = useState(1);

  const handleSubmit = () => {
    if (!name.trim()) return;
    addTracker({
      id: Date.now(),
      name,
      baseFrequency,
      actualFrequency: 0,
    });
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h3 className="text-lg font-semibold mb-3">New Tracker</h3>
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Tracker name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-3 rounded"
          type="number"
          placeholder="Base frequency"
          value={baseFrequency}
          onChange={(e) => setBaseFrequency(Number(e.target.value))}
        />
        <div className="flex justify-end gap-2">
          <button onClick={close} className="text-gray-500">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
