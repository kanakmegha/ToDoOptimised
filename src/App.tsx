import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import { Tracker, Task, DayKey } from "./types";

export default function App() {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTracker = (tracker: Tracker) => setTrackers((prev) => [...prev, tracker]);

  const updateTrackerDay = (id: string, day: DayKey, delta: number) => {
    setTrackers((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              actualDaily: { ...t.actualDaily, [day]: (t.actualDaily[day] || 0) + delta },
              actualFrequency: t.actualFrequency + delta,
            }
          : t
      )
    );
  };

  const updateTaskStatus = (id: string, status: "pending" | "completed") => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-300">
        <Sidebar trackers={addTracker} />
      </div>

      {/* Main Content + Navbar */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="h-16 bg-white border-b border-gray-300 flex items-center px-4 shadow-sm">
          <Navbar addTask={(task) => setTasks([...tasks, task])} openAddTracker={function(): void {
            throw new Error("Function not implemented.");
          } } />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <MainContent
            tasks={tasks}
            trackers={trackers}
            updateTrackerDay={updateTrackerDay}
            updateTaskStatus={updateTaskStatus}
          />
        </div>
      </div>
    </div>
  );
}
