import { useState } from "react";
import { Tracker } from "../types";

interface Props { close: () => void; addTracker: (t: Tracker) => void; }

export default function AddTrackerModal({ close, addTracker }: Props) {
  const [name, setName] = useState("");
  const [baseFrequency, setBaseFrequency] = useState<number>(1);

  const handleAdd = () => {
    if (!name.trim()) return;
    addTracker({ id: Date.now().toString(), name: name.trim(), baseFrequency, progress: {} });
    setName("");
    setBaseFrequency(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h3 className="text-lg font-semibold mb-3">New Tracker</h3>
        <input className="w-full border p-2 mb-3 rounded" placeholder="Tracker name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" min={1} className="w-full border p-2 mb-3 rounded" value={baseFrequency} onChange={(e) => setBaseFrequency(Math.max(1, Number(e.target.value || 1)))} />
        <div className="flex justify-end gap-2">
          <button onClick={close} className="text-gray-500">Cancel</button>
          <button onClick={handleAdd} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
        </div>
      </div>
    </div>
  );
}
