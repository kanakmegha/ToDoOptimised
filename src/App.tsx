import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./index.css";

// ✅ Define a type for your items
interface Item {
  id: number;
  type: "task" | "tracker";
  name: string;
}

function App() {
  // ✅ Tell TypeScript that items is an array of Item
  const [items, setItems] = useState<Item[]>([]);

  // ✅ Type the parameter
  const addItem = (type: "task" | "tracker") => {
    const newItem: Item = {
      id: Date.now(),
      type,
      name: type === "task" ? "New Task" : "New Tracker",
    };
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <div className="app-container">
     
      <Sidebar addItem={addItem} />
      <MainContent items={items} />
      <Navbar />
    </div>
  );
}

export default App;
