import { useState } from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";
import { generateSchedule } from "../../lib/choreGenerator";

export default function Index() {
  const [schedule, setSchedule] = useState<any>({});

  const upstairsPeople = ["Frank", "Chris", "Martin", "Dakota", "Jackey", "Sean"];
  const downstairsPeople = ["Adrian", "Steven", "Evan", "Jason", "Zack"];
  const days = ["Monday", "Tuesday", "Thursday", "Friday"];

  const handleGenerate = () => {
    const result = generateSchedule(upstairsPeople, downstairsPeople);
    setSchedule(result);
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: "white" }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
          color: "black",
        }}
      >
        Weekly Chore Schedule
      </Text>
      <Image
        source={require("../../assets/images/header.png")}
        style={{
          width: "100%",
          height: 260,
          resizeMode: "contain",
          alignSelf: "center",
          marginBottom: 5,
        }}
      />
      <Button title="Generate Chores" onPress={handleGenerate} />

      {Object.keys(schedule).length > 0 && (
        <>
          <Text style={{ fontSize: 20, marginTop: 20, fontWeight: "bold", color: "black" }}>
            Upstairs
          </Text>

          <View style={{ borderWidth: 1, marginTop: 10 }}>
            <View style={{ flexDirection: "row", backgroundColor: "#ddd" }}>
              <Text style={{ flex: 1, padding: 5, color: "black" }}>Area</Text>
              {days.map((d) => (
                <Text key={d} style={{ flex: 1, padding: 5, color: "black" }}>
                  {d.slice(0, 3)}
                </Text>
              ))}
            </View>

            {["Kitchen", "Bathroom", "Living Room"].map((area) => (
              <View key={area} style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1, padding: 5, color: "black" }}>{area}</Text>
                {days.map((day) => (
                  <Text key={day} style={{ flex: 1, padding: 5, color: "black" }}>
                    {schedule[day]?.upstairs?.[area]}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          <Text style={{ fontSize: 20, marginTop: 20, fontWeight: "bold", color: "black" }}>
            Downstairs
          </Text>

          <View style={{ borderWidth: 1, marginTop: 10 }}>
            <View style={{ flexDirection: "row", backgroundColor: "#ddd" }}>
              <Text style={{ flex: 1, padding: 5, color: "black" }}>Area</Text>
              {days.map((d) => (
                <Text key={d} style={{ flex: 1, padding: 5, color: "black" }}>
                  {d.slice(0, 3)}
                </Text>
              ))}
            </View>

            {["Kitchen", "Bathroom", "Hallway / Weightroom"].map((area) => (
              <View key={area} style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1, padding: 5, color: "black" }}>{area}</Text>
                {days.map((day) => (
                  <Text key={day} style={{ flex: 1, padding: 5, color: "black" }}>
                    {schedule[day]?.downstairs?.[area]}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}