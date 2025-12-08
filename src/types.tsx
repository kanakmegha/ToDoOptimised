export type DayKey = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface Tracker {
  id: string;
  name: string;
  baseFrequencyDaily: number;
  actualDaily: Record<DayKey, number>;
  days: Record<DayKey, number>; // weekly total
  actualFrequency: number; // overall frequency completed
}

export interface Task {
  id: string;
  title: string;
  goalType: "daily" | "weekly" | "monthly";
  status: "pending" | "completed";
}
