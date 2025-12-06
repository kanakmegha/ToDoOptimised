export interface Task {
    id: string;
    title: string;
    goalType: "daily" | "weekly" | "monthly" | "yearly";
    completedDates: string[]; // ISO date strings (yyyy-mm-dd)
  }
  
  export interface Tracker {
    id: string;
    name: string;
    // target times per day
    baseFrequency: number;
    // map ISO date -> number (how many times this habit was done that day)
    progress: Record<string, number>;
  }
  