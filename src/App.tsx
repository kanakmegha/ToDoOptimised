import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import { Task, Tracker } from "./types";

const LOCAL_KEY = "todo_optimised_v2";
const todayIso = (d = new Date()) => d.toISOString().slice(0, 10);

const sampleTasks: Task[] = [
  { id: "task-1", title: "Read 20 pages", goalType: "daily", completedDates: [] },
  { id: "task-2", title: "Meditate 10 min", goalType: "daily", completedDates: [] },
];

const sampleTrackers: Tracker[] = [
  { id: "tr-1", name: "Exercise", baseFrequency: 1, progress: {} },
  { id: "tr-2", name: "Reading", baseFrequency: 2, progress: {} },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.tasks ?? sampleTasks;
      }
    } catch {}
    return sampleTasks;
  });

  const [trackers, setTrackers] = useState<Tracker[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.trackers ?? sampleTrackers;
      }
    } catch {}
    return sampleTrackers;
  });

  // persist
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ tasks, trackers }));
  }, [tasks, trackers]);

  // TASKS
  const addTask = (task: Task) => setTasks((p) => [...p, task]);

  const toggleTaskCompletedForDate = (taskId: string, dateIso: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              completedDates: t.completedDates.includes(dateIso)
                ? t.completedDates.filter((d) => d !== dateIso)
                : [...t.completedDates, dateIso],
            }
          : t
      )
    );
  };

  // TRACKERS
  const addTracker = (tracker: Tracker) =>
    setTrackers((p) => [...p, tracker]);

  // change tracker count for given date by delta (can be negative)
  const changeTrackerCount = (trackerId: string, dateIso: string, delta: number) => {
    setTrackers((prev) =>
      prev.map((tr) => {
        if (tr.id !== trackerId) return tr;
        const current = tr.progress[dateIso] ?? 0;
        const updated = Math.max(0, current + delta);
        return {
          ...tr,
          progress: {
            ...tr.progress,
            [dateIso]: updated,
          },
        };
      })
    );
  };

  // helper: count tasks done on date
  const tasksCompletedCountForDate = (dateIso: string) =>
    tasks.filter((t) => t.completedDates.includes(dateIso)).length;

  return (
    <div className="flex flex-row h-screen bg-gray-100 text-gray-900">
      <aside className="w-1/5 border-r border-gray-300 p-4 overflow-y-auto bg-white">
        <Sidebar addTask={addTask} addTracker={addTracker} />
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <MainContent
          tasks={tasks}
          trackers={trackers}
          todayIso={todayIso()}
          toggleTaskCompletedForDate={toggleTaskCompletedForDate}
          changeTrackerCount={changeTrackerCount}
          tasksCompletedCountForDate={tasksCompletedCountForDate}
        />
      </main>

      <nav className="w-1/5 border-l border-gray-300 p-4 bg-white overflow-y-auto">
        <Navbar addTask={addTask} />
      </nav>
    </div>
  );
}
