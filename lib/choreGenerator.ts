export const days = ["Monday", "Tuesday", "Thursday", "Friday"];

export const choreAreas = {
  upstairs: ["Kitchen", "Bathroom", "Living Room"],
  downstairs: ["Kitchen", "Bathroom", "Hallway / Weightroom"],
};

export function generateSchedule(people: string[]) {
  const schedule: Record<string, Record<string, string>> = {};
  const lastAssigned: Record<string, string> = {};

  for (const day of days) {
    schedule[day] = {};

    for (const area of [...choreAreas.upstairs, ...choreAreas.downstairs]) {
      const options = people.filter((person) => person !== lastAssigned[area]);
      const pool = options.length ? options : people;
      const chosen = pool[Math.floor(Math.random() * pool.length)];

      schedule[day][area] = chosen;
      lastAssigned[area] = chosen;
    }
  }

  return schedule;
}