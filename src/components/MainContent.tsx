import { useState } from "react";

// Task interface
export interface Task {
  id: string;
  title: string;
  goalType: string; // "daily", "weekly", "monthly"
  status: "pending" | "completed";
}

// Tracker interface
export interface Tracker {
  id: string;
  name: string;
  baseFrequency: number;
  actualFrequency: number;
}

interface MainContentProps {
  tasks: Task[];
  trackers: Tracker[];
  updateTaskStatus: (id: string, status: "pending" | "completed") => void;
  addTask: (task: Task) => void;
}

export default function MainContent({
  tasks,
  trackers,
  updateTaskStatus,
  addTask,
}: MainContentProps) {
  const [monthlyGoal, setMonthlyGoal] = useState<string>("");
  const [dailyFreq, setDailyFreq] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateMonthlyTasks = async (goal: string) => {
    if (!goal.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;
      if (!apiKey) throw new Error("API key not configured in .env");

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content:
                "You are an assistant that breaks down monthly goals into daily tasks in valid JSON.",
            },
            {
              role: "user",
              content: `Break down this monthly goal "${goal}" into daily tasks for 30 days. Return only JSON array of objects like [{ "day": "YYYY-MM-DD", "task": "..." }].`,
            },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenRouter error ${response.status}: ${errText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.trim();
      if (!content) throw new Error("No response from model");

      let breakdown: { day: string; task: string }[] = [];
      try {
        const jsonMatch = content.match(/\[([\s\S]*)\]/);
        if (jsonMatch) breakdown = JSON.parse(jsonMatch[0]);
        else throw new Error("Invalid JSON format");
      } catch (parseErr) {
        throw new Error("Failed to parse model output: " + parseErr);
      }

      breakdown.forEach((b) => {
        addTask({
          id: b.day + "_" + b.task,
          title: b.task,
          goalType: "monthly",
          status: "pending",
        });
      });
    } catch (err: any) {
      console.error("LLM error:", err);
      setError(err.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-6 p-4">
      {/* ===== Tasks Section ===== */}
      <section className="flex-1 min-w-[300px] max-w-sm bg-gray-50 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((t) => (
              <li
                key={t.id}
                className={`p-3 bg-white rounded shadow-sm border flex justify-between items-center transition ${
                  t.status === "completed" ? "line-through bg-gray-100 text-gray-500" : ""
                }`}
              >
                <div>
                  <h3 className="font-medium">{t.title}</h3>
                  <p className="text-sm text-gray-500">{t.goalType}</p>
                </div>
                <button
                  className={`text-sm px-2 py-1 rounded ${
                    t.status === "completed"
                      ? "bg-gray-300 text-gray-700"
                      : "bg-green-500 text-white"
                  }`}
                  onClick={() =>
                    updateTaskStatus(
                      t.id,
                      t.status === "completed" ? "pending" : "completed"
                    )
                  }
                >
                  {t.status === "completed" ? "Undo" : "Done"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ===== Trackers Section ===== */}
      <section className="flex-1 min-w-[300px] max-w-sm bg-gray-50 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Trackers</h2>
        {trackers.length === 0 ? (
          <p className="text-gray-500">No trackers yet.</p>
        ) : (
          <ul className="space-y-2">
            {trackers.map((tr) => {
              const progress = Math.min(
                (tr.actualFrequency / tr.baseFrequency) * 100,
                100
              );
              return (
                <li key={tr.id} className="p-3 bg-white rounded shadow-sm border">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">{tr.name}</h3>
                    <span className="text-sm text-gray-500">
                      {tr.actualFrequency}/{tr.baseFrequency}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded">
                    <div
                      className="bg-blue-500 h-3 rounded transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-2 flex items-center gap-2">
          <label className="text-sm">Daily Frequency:</label>
          <input
            type="number"
            min={1}
            value={dailyFreq}
            onChange={(e) => setDailyFreq(Number(e.target.value))}
            className="border p-1 rounded w-20"
          />
        </div>
      </section>

      {/* ===== Monthly Goals Section ===== */}
      <section className="flex-1 min-w-[300px] max-w-sm bg-gray-50 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Monthly Goals</h2>
        <input
          type="text"
          value={monthlyGoal}
          onChange={(e) => setMonthlyGoal(e.target.value)}
          className="border p-2 w-full rounded mb-2"
          placeholder="Enter monthly goal"
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          disabled={loading}
          onClick={() => generateMonthlyTasks(monthlyGoal)}
        >
          {loading ? "Generating..." : "Generate Breakdown"}
        </button>
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      </section>
    </div>
  );
}
