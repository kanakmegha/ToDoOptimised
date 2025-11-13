/* import { useState } from "react";
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
 */
import { useState } from "react";
import { Task, Tracker } from "../components/MainContent";

interface SidebarProps {
  addTask: (task: Task) => void;
  addTracker: (tracker: Tracker) => void;
}

export default function Sidebar({ addTask, addTracker }: SidebarProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [trackerName, setTrackerName] = useState("");

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
    addTask({
      id: Date.now().toString(),
      title: taskTitle,
      goalType: "daily",
      status: "pending",
    });
    setTaskTitle("");
  };

  const handleAddTracker = () => {
    if (!trackerName.trim()) return;
    addTracker({
      id: Date.now().toString(),
      name: trackerName,
      baseFrequency: 5,
      actualFrequency: 0,
    });
    setTrackerName("");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Create</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="New Task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border rounded px-2 py-1 w-full max-w-xs mb-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-auto"
        >
          Add Task
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder="New Tracker"
          value={trackerName}
          onChange={(e) => setTrackerName(e.target.value)}
          className="border rounded px-2 py-1 w-full max-w-xs mb-2"
        />
        <button
          onClick={handleAddTracker}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-auto"
        >
          Add Tracker
        </button>
      </div>
    </div>
  );
}
