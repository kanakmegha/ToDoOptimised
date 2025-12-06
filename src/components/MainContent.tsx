import React, { useMemo, useState } from "react";
import { Task, Tracker } from "../types";

/** Utilities */
const isoDate = (d: Date) => d.toISOString().slice(0, 10);
const addDaysIso = (dateIso: string, delta: number) => {
  const d = new Date(dateIso + "T00:00:00");
  d.setDate(d.getDate() + delta);
  return isoDate(d);
};
const rangeDatesIso = (startIso: string, endIso: string) => {
  const arr: string[] = [];
  let cur = new Date(startIso + "T00:00:00");
  const end = new Date(endIso + "T00:00:00");
  while (cur <= end) {
    arr.push(isoDate(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return arr;
};

// week start (Monday)
const getWeekStartIso = (d: Date) => {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // Mon=0
  date.setDate(date.getDate() - day);
  return isoDate(date);
};

/** Circular progress used in Day view and Year view mini rings */
function CircularProgress({ value, max, size = 80, stroke = 8 }: { value: number; max: number; size?: number; stroke?: number; }) {
  const percentage = Math.min(100, (value / Math.max(1, max)) * 100);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <svg width={size} height={size} className="block">
      <defs>
        <linearGradient id="gprog" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="url(#gprog)" strokeWidth={stroke} strokeLinecap="round" fill="none"
        strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 400ms ease" }} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={size * 0.24} fontWeight={700} fill="#111827">
        {value}
      </text>
      <text x="50%" y="72%" dominantBaseline="middle" textAnchor="middle" fontSize={size * 0.12} fill="#6b7280">
        /{max}
      </text>
    </svg>
  );
}

/** View mode */
type ViewMode = "day" | "week" | "month" | "year";

export default function MainContent({
  tasks,
  trackers,
  todayIso,
  toggleTaskCompletedForDate,
  changeTrackerCount,
  tasksCompletedCountForDate,
}: {
  tasks: Task[];
  trackers: Tracker[];
  todayIso: string;
  toggleTaskCompletedForDate: (taskId: string, dateIso: string) => void;
  changeTrackerCount: (trackerId: string, dateIso: string, delta: number) => void;
  tasksCompletedCountForDate: (dateIso: string) => number;
}) {
  const [view, setView] = useState<ViewMode>("day");

  // derived ranges
  const weekStartIso = useMemo(() => getWeekStartIso(new Date(todayIso + "T00:00:00")), [todayIso]);
  const weekDates = useMemo(() => rangeDatesIso(weekStartIso, addDaysIso(weekStartIso, 6)), [weekStartIso]);
  const monthStartIso = useMemo(() => {
    const d = new Date(todayIso + "T00:00:00");
    return isoDate(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [todayIso]);
  const monthEndIso = useMemo(() => {
    const d = new Date(todayIso + "T00:00:00");
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return isoDate(end);
  }, [todayIso]);
  const monthDates = useMemo(() => rangeDatesIso(monthStartIso, monthEndIso), [monthStartIso, monthEndIso]);

  const tasksToday = tasks.filter((t) => t.goalType === "daily");
  const tasksCompletedToday = tasksCompletedCountForDate(todayIso);

  return (
    <div>
      {/* header & controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {view === "day" ? "Today" : view === "week" ? "This Week" : view === "month" ? "This Month" : "This Year"}
            <span className="text-sm text-gray-500 ml-3">
              {new Date(todayIso + "T00:00:00").toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
            </span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">Tasks ({tasksCompletedToday}/{tasksToday.length} done)</p>
        </div>

        <div className="flex items-center gap-2">
          {(["day", "week", "month", "year"] as ViewMode[]).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-1 rounded text-sm font-medium ${view === v ? "bg-blue-600 text-white" : "text-gray-700"}`}>
              {v[0].toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* DAY VIEW */}
      {view === "day" && (
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Tasks for Today</h2>
            <div className="space-y-3">
              {tasks.map((t) => {
                const done = t.completedDates.includes(todayIso);
                return (
                  <div key={t.id} className="p-3 bg-white rounded shadow flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t.title}</p>
                      <span className="text-sm text-gray-600">{t.goalType}</span>
                    </div>
                    <button onClick={() => toggleTaskCompletedForDate(t.id, todayIso)} className={`px-3 py-1 rounded ${done ? "bg-green-500 text-white" : "bg-gray-300 hover:bg-gray-400"}`}>
                      {done ? "Done" : "Mark Done"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Trackers (Today)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {trackers.map((tr) => {
                const count = tr.progress[todayIso] ?? 0;
                const target = tr.baseFrequency;
                const bonus = Math.max(0, count - target);
                const completed = count >= target;
                return (
                  <div key={tr.id} className="p-4 bg-white rounded-2xl shadow-md flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <CircularProgress value={Math.min(count, target)} max={target} size={90} />
                      <div className="flex items-center gap-2 mt-3">
                        <button onClick={() => changeTrackerCount(tr.id, todayIso, -1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">−</button>
                        <button onClick={() => changeTrackerCount(tr.id, todayIso, 1)} className={`px-3 py-1 rounded text-white ${completed ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"}`}>
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-lg">{tr.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{completed ? "Daily goal reached 🎉" : `${Math.max(0, target - count)} left to reach daily goal`}</p>

                      <div className="w-full mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (count / Math.max(1, target)) * 100)}%`, background: completed ? "linear-gradient(90deg,#16a34a,#15803d)" : "linear-gradient(90deg,#60a5fa,#2563eb)" }} />
                      </div>

                      {bonus > 0 && <div className="mt-2 text-xs text-yellow-700 font-semibold">+{bonus} bonus</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* WEEK VIEW */}
      {view === "week" && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Weekly Progress (Per tracker)</h2>

          <div className="space-y-4">
            {trackers.map((tr) => (
              <div key={tr.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="font-semibold">{tr.name}</p>
                    <p className="text-xs text-gray-500">Daily target: {tr.baseFrequency}</p>
                  </div>
                  <div className="text-sm text-gray-700">
                    {weekDates.filter((d) => (tr.progress[d] ?? 0) >= tr.baseFrequency).length}/7 days
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  {weekDates.map((d) => {
                    const count = tr.progress[d] ?? 0;
                    const met = count >= tr.baseFrequency;
                    return (
                      <div key={d} className="flex flex-col items-center text-xs">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${met ? "bg-green-500 text-white" : (count > 0 ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-600")}`}>
                          {met ? "✔" : (count > 0 ? count : new Date(d).toLocaleDateString(undefined, { weekday: "short" }).slice(0, 1))}
                        </div>
                        <div className="text-xs mt-1">{new Date(d + "T00:00:00").toLocaleDateString(undefined, { day: "numeric", month: "short" })}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MONTH VIEW */}
      {view === "month" && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Month view — Weekly progress per habit</h2>

          <div className="space-y-4">
            {trackers.map((tr) => {
              // split monthDates to calendar-like weeks (Mon-Sun)
              const weeks: string[][] = [];
              let cur: string[] = [];
              for (const d of monthDates) {
                cur.push(d);
                const dt = new Date(d + "T00:00:00");
                if (dt.getDay() === 0) {
                  weeks.push(cur);
                  cur = [];
                }
              }
              if (cur.length) weeks.push(cur);

              return (
                <div key={tr.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold">{tr.name}</p>
                      <p className="text-xs text-gray-500">Target: {tr.baseFrequency} / day</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {weeks.map((wDates, idx) => {
                      const metDays = wDates.filter((d) => (tr.progress[d] ?? 0) >= tr.baseFrequency).length;
                      const percent = Math.round((metDays / wDates.length) * 100);
                      return (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="text-sm">Week {idx + 1}</div>
                          <div className="w-2/3">
                            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                              <div style={{ width: `${percent}%` }} className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all" />
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{percent}%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* YEAR VIEW */}
      {view === "year" && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Year view — Monthly rings per habit</h2>

          <div className="space-y-4">
            {trackers.map((tr) => (
              <div key={tr.id} className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold mb-3">{tr.name}</p>
                <div className="flex flex-wrap gap-3">
                  {Array.from({ length: 12 }).map((_, mIdx) => {
                    const mStart = new Date(new Date(todayIso + "T00:00:00").getFullYear(), mIdx, 1);
                    const mEnd = new Date(mStart.getFullYear(), mStart.getMonth() + 1, 0);
                    const mDates = rangeDatesIso(isoDate(mStart), isoDate(mEnd));
                    const met = mDates.filter((d) => (tr.progress[d] ?? 0) >= tr.baseFrequency).length;
                    const percent = Math.round((met / mDates.length) * 100);
                    const label = mStart.toLocaleString(undefined, { month: "short" });
                    return (
                      <div key={mIdx} className="flex items-center gap-3">
                        <div style={{ width: 68 }}>
                          <CircularProgress value={percent} max={100} size={68} stroke={8} />
                        </div>
                        <div>
                          <div className="font-medium">{label}</div>
                          <div className="text-xs text-gray-500">{percent}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
