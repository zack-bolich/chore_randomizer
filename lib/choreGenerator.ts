export function generateSchedule(upstairs: string[], downstairs: string[]) {
  const schedule: Record<string, Record<string, string>> = {};
  const lastAssigned: Record<string, string> = {};

  const days = ["Monday", "Tuesday", "Thursday", "Friday"];

  const upstairsAreas = ["Kitchen", "Bathroom", "Living Room"];
  const downstairsAreas = ["Kitchen", "Bathroom", "Hallway / Weightroom"];

  for (const day of days) {
    schedule[day] = {};

    // Upstairs
    for (const area of upstairsAreas) {
      const options = upstairs.filter((p) => p !== lastAssigned[area]);
      const pool = options.length ? options : upstairs;
      const chosen = pool[Math.floor(Math.random() * pool.length)];

      schedule[day][area] = chosen;
      lastAssigned[area] = chosen;
    }

    // Downstairs
    for (const area of downstairsAreas) {
      const options = downstairs.filter((p) => p !== lastAssigned[area]);
      const pool = options.length ? options : downstairs;
      const chosen = pool[Math.floor(Math.random() * pool.length)];

      schedule[day][area] = chosen;
      lastAssigned[area] = chosen;
    }
  }

  return schedule;
}