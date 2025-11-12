import { useState } from "react";

interface AddTaskModalProps {
  close: () => void;
  addTask: (task: any) => void;
}

export default function AddTaskModal({ close, addTask }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [goalType, setGoalType] = useState("daily");

  const handleSubmit = () => {
    if (!title.trim()) return;
    addTask({
      id: Date.now(),
      title,
      goalType,
      status: "pending",
    });
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h3 className="text-lg font-semibold mb-3">New Task</h3>
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="w-full border p-2 mb-3 rounded"
          value={goalType}
          onChange={(e) => setGoalType(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
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
