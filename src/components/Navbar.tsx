import { useState } from "react";

interface NavbarProps {
  addTask: (task: any) => void;
}

export default function Navbar({ addTask }: NavbarProps) {
  const [goal, setGoal] = useState("");

  const handleGenerate = () => {
    if (!goal.trim()) return;
    // Placeholder for future LLM integration
    const newTask = {
      id: Date.now(),
      title: goal,
      goalType: "monthly",
      status: "pending",
    };
    addTask(newTask);
    setGoal("");
  };

  return (
    <nav className="w-1/5 bg-white border-r p-4 flex flex-col gap-4 shadow-sm">
      <h2 className="text-xl font-semibold">Monthly Goals</h2>
      <input
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your goal..."
        className="p-2 border rounded"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Generate Breakdown
      </button>
    </nav>
  );
}
