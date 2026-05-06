function shuffle(list: string[]) {
  return [...list].sort(() => Math.random() - 0.5);
}

export function generateSchedule(
  upstairsPeople: string[],
  downstairsPeople: string[]
) {
  const days = ["Monday", "Tuesday", "Thursday", "Friday"];

  const upstairsAreas = ["Kitchen", "Bathroom", "Living Room"];
  const downstairsAreas = ["Kitchen", "Bathroom", "Hallway / Weightroom"];

  const schedule: any = {};

  for (const day of days) {
    schedule[day] = {
      upstairs: {},
      downstairs: {},
    };

    const shuffledUpstairs = shuffle(upstairsPeople);
    const shuffledDownstairs = shuffle(downstairsPeople);

    upstairsAreas.forEach((area, index) => {
      schedule[day].upstairs[area] = shuffledUpstairs[index] || "";
    });

    downstairsAreas.forEach((area, index) => {
      schedule[day].downstairs[area] = shuffledDownstairs[index] || "";
    });
  }

  return schedule;
}