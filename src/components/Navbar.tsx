import { Task } from "../types";
import { useState } from "react";

interface Props {
  addTask: (t: Task) => void;
}

export default function Navbar({ addTask }: Props) {
  const [quick, setQuick] = useState("");
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Overview</h2>
      <p className="text-sm text-gray-600 mb-4">Switch day / week / month / year using the controls in the main header.</p>

      <div className="mb-4">
        <input value={quick} onChange={(e) => setQuick(e.target.value)} placeholder="Quick task..." className="w-full p-2 border rounded mb-2" />
        <button className="bg-blue-600 text-white px-3 py-2 rounded w-full" onClick={() => {
          if (!quick.trim()) return;
          addTask({ id: Date.now().toString(), title: quick.trim(), goalType: "daily", completedDates: []});
          setQuick("");
        }}>Add Task</button>
      </div>
    </div>
  );
}
