import { useState } from "react";
import { Task, Tracker } from "../types";
import AddTrackerModal from "./AddTrackerModal";

export default function Sidebar({ addTask, addTracker }: { addTask: (t: Task) => void; addTracker: (t: Tracker) => void; }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [trackerName, setTrackerName] = useState("");
  const [baseFrequency, setBaseFrequency] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);

  const createEmptyProgress = (): Record<string, number> => ({});

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2">New Task</h3>
        <input className="w-full border p-2 rounded mb-2" placeholder="Task title..." value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        <button className="bg-blue-600 text-white px-3 py-2 rounded w-full" onClick={() => {
          if (!taskTitle.trim()) return;
          addTask({ id: Date.now().toString(), title: taskTitle.trim(), goalType: "daily", completedDates: [] });
          setTaskTitle("");
        }}>Add Task</button>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">New Tracker</h3>
        <input className="w-full border p-2 rounded mb-2" placeholder="Tracker name..." value={trackerName} onChange={(e) => setTrackerName(e.target.value)} />
        <div className="flex items-center gap-2 mb-3">
          <label className="text-sm">Daily target</label>
          <input type="number" min={1} className="border p-1 rounded w-20" value={baseFrequency} onChange={(e) => setBaseFrequency(Math.max(1, Number(e.target.value || 1)))} />
          <span className="text-sm text-gray-500">times / day</span>
        </div>
        <button className="bg-green-600 text-white px-3 py-2 rounded w-full" onClick={() => {
          if (!trackerName.trim()) return;
          addTracker({ id: Date.now().toString(), name: trackerName.trim(), baseFrequency, progress: createEmptyProgress() });
          setTrackerName("");
          setBaseFrequency(1);
        }}>Add Tracker</button>

        <div className="mt-3">
          <button className="text-sm text-gray-600 hover:underline" onClick={() => setShowModal(true)}>Open advanced tracker modal</button>
        </div>
      </div>

      {showModal && <AddTrackerModal close={() => setShowModal(false)} addTracker={(t) => { addTracker(t); setShowModal(false); }} />}
    </div>
  );
}
