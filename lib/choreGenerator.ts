export function generateSchedule(upstairsPeople: string[], downstairsPeople: string[]) {
  const days = ["Monday", "Tuesday", "Thursday", "Friday"];

  const upstairsAreas = ["Kitchen", "Bathroom", "Living Room"];
  const downstairsAreas = ["Kitchen", "Bathroom", "Hallway / Weightroom"];

  const schedule: any = {};

  for (const day of days) {
    schedule[day] = {
      upstairs: {},
      downstairs: {},
    };

    for (const area of upstairsAreas) {
      const chosen =
        upstairsPeople[Math.floor(Math.random() * upstairsPeople.length)];

      schedule[day].upstairs[area] = chosen;
    }

    for (const area of downstairsAreas) {
      const chosen =
        downstairsPeople[Math.floor(Math.random() * downstairsPeople.length)];

      schedule[day].downstairs[area] = chosen;
    }
  }

  return schedule;
}