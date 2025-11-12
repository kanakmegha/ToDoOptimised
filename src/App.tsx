import { useState } from "react";
import MainContent, { Task, Tracker } from "./components/MainContent";

function App() {
  // Tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Read a book", goalType: "daily", status: "pending" },
    { id: "2", title: "Workout", goalType: "daily", status: "pending" },
  ]);

  // Trackers
  const [trackers, setTrackers] = useState<Tracker[]>([
    { id: "1", name: "Exercise", baseFrequency: 5, actualFrequency: 2 },
    { id: "2", name: "Reading", baseFrequency: 7, actualFrequency: 3 },
  ]);

  // Update task status
  const updateTaskStatus = (id: string, status: "pending" | "completed") => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  // Add new task
  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">My ToDo & Tracker App</h1>
      <MainContent
        tasks={tasks}
        trackers={trackers}
        updateTaskStatus={updateTaskStatus}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
