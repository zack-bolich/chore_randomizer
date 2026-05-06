import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { generateSchedule } from "../../lib/choreGenerator";

function getCurrentScheduleWeekKey() {
  const now = new Date();

  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay());
  sunday.setHours(17, 0, 0, 0);

  if (now < sunday) {
    sunday.setDate(sunday.getDate() - 7);
  }

  return sunday.toISOString();
}
export default function Index() {
  const [schedule, setSchedule] = useState<any>({});

  const upstairsPeople = ["Frank", "Chris", "Martin", "Dakota", "Jackey", "Sean"];
  const downstairsPeople = ["Adrian", "Steven", "Evan", "Jason", "Zack"];
  const days = ["Monday", "Tuesday", "Thursday", "Friday"];

  useEffect(() => {
    async function loadOrCreateSchedule() {
      const savedSchedule = await AsyncStorage.getItem("weeklySchedule");
      const savedWeekKey = await AsyncStorage.getItem("weeklyScheduleKey");

      const currentWeekKey = getCurrentScheduleWeekKey();

      if (savedSchedule && savedWeekKey === currentWeekKey) {
        setSchedule(JSON.parse(savedSchedule));
        return;
      }

      const newSchedule = generateSchedule(upstairsPeople, downstairsPeople);

      await AsyncStorage.setItem("weeklySchedule", JSON.stringify(newSchedule));
      await AsyncStorage.setItem("weeklyScheduleKey", currentWeekKey);

      setSchedule(newSchedule);
    }

    loadOrCreateSchedule();
  }, []);

  return (
    <ScrollView style={{ padding: 20, backgroundColor: "white" }}>

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