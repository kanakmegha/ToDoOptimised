import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import AddTrackerModal from "./AddTrackerModal";

interface SidebarProps {
  addTask: (task: any) => void;
  addTracker: (tracker: any) => void;
}

export default function Sidebar({ addTask, addTracker }: SidebarProps) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTrackerModal, setShowTrackerModal] = useState(false);

  return (
    <aside className="w-1/5 bg-white border-l p-4 flex flex-col gap-4 shadow-sm">
      <h2 className="text-lg font-semibold">Actions</h2>
      <button
        onClick={() => setShowTaskModal(true)}
        className="bg-gray-200 hover:bg-gray-300 rounded p-2"
      >
        + Create Task
      </button>
      <button
        onClick={() => setShowTrackerModal(true)}
        className="bg-gray-200 hover:bg-gray-300 rounded p-2"
      >
        + Create Tracker
      </button>

      {showTaskModal && (
        <AddTaskModal close={() => setShowTaskModal(false)} addTask={addTask} />
      )}
      {showTrackerModal && (
        <AddTrackerModal
          close={() => setShowTrackerModal(false)}
          addTracker={addTracker}
        />
      )}
    </aside>
  );
}
