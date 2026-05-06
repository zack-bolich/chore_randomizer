function shuffle(list: string[]) {
  return [...list].sort(() => Math.random() - 0.5);
}

function assignEvenly(people: string[], areas: string[], days: string[]) {
  const assignments: Record<string, Record<string, string>> = {};
  const totalSlots = areas.length * days.length;

  let pool: string[] = [];

  while (pool.length < totalSlots) {
    pool = [...pool, ...shuffle(people)];
  }

  pool = pool.slice(0, totalSlots);

  let index = 0;

  for (const day of days) {
    assignments[day] = {};

    const usedToday = new Set<string>();

    for (const area of areas) {
      let chosen = pool[index];

      if (usedToday.has(chosen)) {
        const swapIndex = pool.findIndex(
          (person, i) => i > index && !usedToday.has(person)
        );

        if (swapIndex !== -1) {
          [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
          chosen = pool[index];
        }
      }

      assignments[day][area] = chosen;
      usedToday.add(chosen);
      index++;
    }
  }

  return assignments;
}

export function generateSchedule(
  upstairsPeople: string[],
  downstairsPeople: string[]
) {
  const days = ["Monday", "Tuesday", "Thursday", "Friday"];

  const upstairsAreas = ["Kitchen", "Bathroom", "Living Room"];
  const downstairsAreas = ["Kitchen", "Bathroom", "Hallway / Weightroom"];

  const upstairsSchedule = assignEvenly(upstairsPeople, upstairsAreas, days);
  const downstairsSchedule = assignEvenly(downstairsPeople, downstairsAreas, days);

  const schedule: any = {};

  for (const day of days) {
    schedule[day] = {
      upstairs: upstairsSchedule[day],
      downstairs: downstairsSchedule[day],
    };
  }

  return schedule;
}