import React from "react";

export default function HabitGauge({
  value,
  target,
  size = 72,
  stroke = 8,
}: {
  value: number;
  target: number;
  size?: number;
  stroke?: number;
}) {
  const clamped = Math.max(0, value);
  const pct = Math.min(100, (Math.min(clamped, target) / Math.max(1, target)) * 100);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const excess = Math.max(0, clamped - target);

  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} className="block">
        <defs>
          <linearGradient id="hg1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="hg2" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        <circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke={clamped >= target ? "url(#hg2)" : "url(#hg1)"}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 360ms ease" }}
        />
        <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" fontSize={size * 0.22} fontWeight={700} fill="#111827">
          {clamped}
        </text>
        <text x="50%" y={size * 0.72} dominantBaseline="middle" textAnchor="middle" fontSize={size * 0.11} fill="#6b7280">
          /{target}
        </text>
      </svg>

      <div className="text-xs">
        {excess > 0 ? <div className="text-yellow-700 font-semibold">+{excess} bonus</div> : <div className="text-gray-500"> </div>}
        <div className={`text-xs ${clamped >= target ? "text-green-600" : "text-gray-600"}`}>
          {clamped >= target ? "Completed" : "In progress"}
        </div>
      </div>
    </div>
  );
}
