import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MainContent, { Task, Tracker } from "./components/MainContent";

export default function App() {
  // --- States ---
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Read a book", goalType: "daily", status: "pending" },
    { id: "2", title: "Workout", goalType: "daily", status: "completed" },
  ]);

  const [trackers, setTrackers] = useState<Tracker[]>([
    { id: "1", name: "Exercise", baseFrequency: 5, actualFrequency: 3 },
    { id: "2", name: "Reading", baseFrequency: 7, actualFrequency: 4 },
  ]);

  // --- Functions ---
  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const addTracker = (tracker: Tracker) => setTrackers((prev) => [...prev, tracker]);

  const updateTaskStatus = (id: string, status: "pending" | "completed") =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));

  // --- Layout ---
  return (
    <div className="flex flex-row h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-1/5 border-r border-gray-300 p-4 overflow-y-auto bg-white">
        <Sidebar addTask={addTask} addTracker={addTracker} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <MainContent
          tasks={tasks}
          trackers={trackers}
          updateTaskStatus={updateTaskStatus}
        />
      </main>

      {/* Navbar */}
      <nav className="w-1/5 border-l border-gray-300 p-4 bg-white overflow-y-auto">
        <Navbar />
      </nav>
    </div>
  );
}
