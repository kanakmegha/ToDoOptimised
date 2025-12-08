import { useState } from "react";
import { Task } from "../types";

interface Props {
  addTask: (task: Task) => void;
  openAddTracker: () => void;
}

export default function Navbar({ addTask, openAddTracker }: Props) {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    if (!taskName.trim()) return;
    addTask({
      id: Date.now().toString(),
      name: taskName.trim(),
      status: "pending"
    });
    setTaskName("");
  };

  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-2xl font-bold text-gray-800">Goal Dashboard</h1>

      <div className="flex gap-3">
        <input
          className="border p-2 rounded w-48"
          placeholder="Add task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <button onClick={handleAddTask} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Task
        </button>

        <button onClick={openAddTracker} className="bg-green-600 text-white px-4 py-2 rounded">
          + Tracker
        </button>
      </div>
    </div>
  );
}
