import { Tracker } from "../types";

interface Props {
  trackers: Tracker[];
}

export default function Sidebar({ trackers }: Props) {
  return (
    <div className="h-full p-4 bg-gray-50 border-r w-64">
      <h3 className="text-lg font-semibold mb-4">Trackers</h3>

      {trackers.length === 0 && (
        <p className="text-sm text-gray-500">No trackers added yet</p>
      )}

      <ul className="space-y-3">
        {trackers.map((t) => (
          <li key={t.id} className="bg-white px-3 py-2 rounded shadow-sm border">
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
