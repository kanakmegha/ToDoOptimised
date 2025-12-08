import React from "react";

function MiniRing({ pct }: { pct: number }) {
  const size = 56;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, pct) / 100) * circumference;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
      <circle cx={size/2} cy={size/2} r={radius} stroke="#60a5fa" strokeWidth={stroke} strokeLinecap="round" fill="none"
        strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 360ms ease" }} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={12} fontWeight={700} fill="#111827">
        {pct}%
      </text>
    </svg>
  );
}

export default function YearRingsCompact({
  months,
}: {
  months: { label: string; pct: number }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {months.map((m) => (
        <div key={m.label} className="flex items-center gap-3">
          <div className="shrink-0" style={{ width: 64 }}><MiniRing pct={m.pct} /></div>
          <div>
            <div className="font-medium text-sm">{m.label}</div>
            <div className="text-xs text-gray-500">{m.pct}% days met</div>
          </div>
        </div>
      ))}
    </div>
  );
}
