import React from "react";

/**
 * weeks: array of arrays of ISO date strings (week arrays)
 * progressMap: Record<iso, number>
 * baseFrequency: number
 */
export default function MonthWeekCards({
  weeks,
  progressMap,
  baseFrequency,
}: {
  weeks: string[][];
  progressMap: Record<string, number>;
  baseFrequency: number;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {weeks.map((w, idx) => {
        const met = w.filter(d => (progressMap[d] ?? 0) >= baseFrequency).length;
        const pct = Math.round((met / w.length) * 100);
        return (
          <div key={idx} className="bg-white p-2 rounded shadow-sm flex items-center gap-3">
            <div className="w-12 text-[13px] font-semibold">W{idx+1}</div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
                <div style={{ width: `${pct}%` }} className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 transition-all" />
              </div>
              <div className="text-[11px] text-gray-500 mt-1">{pct}% — {met}/{w.length} days</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
