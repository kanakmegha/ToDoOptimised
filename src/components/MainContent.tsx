import { useState } from "react";
import { Tracker, Task, DayKey } from "../types";

interface Props {
  tasks: Task[];
  trackers: Tracker[];
  updateTrackerDay: (id: string, day: DayKey, delta: number) => void;
  updateTaskStatus: (id: string, status: "pending" | "completed") => void;
}


const views = ["Daily", "Weekly", "Monthly", "Yearly"] as const;
const daysOrder: DayKey[] = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function MainContent({ trackers }: Props) {
  const [view, setView] = useState<typeof views[number]>("Daily");

  return (
    <div className="space-y-6">
      {/* Card */}
      <div className="bg-white shadow-md rounded-lg p-6 border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{view} Progress</h2>

          <div className="flex gap-2">
            {views.map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  v === view ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-6">
          {trackers.map((t) => (
            <div key={t.id} className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full border-4 border-gray-300 bg-blue-100 flex items-center justify-center">
                <span className="font-bold text-lg text-gray-800">
                  0%
                </span>
              </div>
              <div className="mt-3 font-medium">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
