import { useState } from "react";
import { Task } from "../types";

interface Props {
  addTask: (task: Task) => void;
  openAddTracker: () => void;
}

export default function Navbar({ addTask, openAddTracker }: Props) {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
    addTask({
      id: Date.now().toString(),
      title: taskTitle.trim(),
      status: "pending",
      goalType: "daily"
    });
    setTaskTitle("");
  };

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white shadow">
      <h1 className="text-xl font-bold text-gray-800">Goal Dashboard</h1>

      <div className="flex gap-3 items-center">
        <input
          className="border p-2 rounded w-48"
          placeholder="New task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <button
          onClick={handleAddTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>

        <button
          onClick={openAddTracker}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Tracker
        </button>
      </div>
    </div>
  );
}
