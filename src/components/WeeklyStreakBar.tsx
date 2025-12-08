import React from "react";

/**
 * Renders a full-width 7-segment bar for a week.
 * days: ISO date strings (7)
 * progressMap: Record<iso, number>
 * baseFrequency: number
 */
export default function WeeklyStreakBar({
  days,
  progressMap,
  baseFrequency,
}: {
  days: string[];
  progressMap: Record<string, number>;
  baseFrequency: number;
}) {
  return (
    <div className="w-full flex items-center gap-1">
      {days.map((d, i) => {
        const count = progressMap[d] ?? 0;
        const met = count >= baseFrequency;
        const pct = Math.min(100, Math.round((Math.min(count, baseFrequency) / Math.max(1, baseFrequency)) * 100));
        return (
          <div key={d} className="flex-1">
            <div
              title={met ? `Completed (${count})` : (count > 0 ? `Partial (${count})` : "Pending")}
              className={`h-8 rounded-md transition-all flex items-center justify-center text-xs font-semibold ${met ? "bg-green-500 text-white" : (count>0 ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-600")}`}
              style={{ width: "100%" }}
            >
              {met ? "✔" : (count > 0 ? String(count) : new Date(d+"T00:00:00").toLocaleDateString(undefined, { weekday: "short" }).slice(0,1))}
            </div>
            <div className="text-[10px] text-center text-gray-400 mt-1">{new Date(d+"T00:00:00").getDate()}</div>
          </div>
        );
      })}
    </div>
  );
}
