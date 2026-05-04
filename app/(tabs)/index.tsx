import { useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { choreAreas, generateSchedule } from "../../lib/choreGenerator";

export default function Index() {
  const [schedule, setSchedule] = useState<any>({});

  const people = ["Zack", "Person 2", "Person 3"];

  const handleGenerate = () => {
    const result = generateSchedule(people);
    setSchedule(result);
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "black" }}>
        Weekly Chore Schedule
      </Text>

      <Button title="Generate Chores" onPress={handleGenerate} />

      {Object.keys(schedule).length > 0 && (
  <>
    {/* UPSTAIRS */}
    <Text style={{ fontSize: 20, marginTop: 20, fontWeight: "bold" }}>
      Upstairs
    </Text>

    {Object.keys(schedule).map((day) => (
      <View key={day} style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{day}</Text>
        {choreAreas.upstairs.map((area) => (
          <Text key={area}>
            {area}: {schedule[day][area]}
          </Text>
        ))}
      </View>
    ))}

    {/* DOWNSTAIRS */}
    <Text style={{ fontSize: 20, marginTop: 20, fontWeight: "bold" }}>
      Downstairs
    </Text>

    {Object.keys(schedule).map((day) => (
      <View key={day} style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{day}</Text>
        {choreAreas.downstairs.map((area) => (
          <Text key={area}>
            {area}: {schedule[day][area]}
          </Text>
        ))}
      </View>
    ))}
  </>
)}
    </ScrollView>
  );
}