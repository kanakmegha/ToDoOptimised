interface SidebarProps {
  addItem: (type: "task" | "tracker") => void;
}

function Sidebar({ addItem }: SidebarProps) {
  return (
    <div className="sidebar">
      <h3>Create</h3>
      <button onClick={() => addItem("task")}>+ New Task</button>
      <button onClick={() => addItem("tracker")}>+ New Tracker</button>
    </div>
  );
}

export default Sidebar;
