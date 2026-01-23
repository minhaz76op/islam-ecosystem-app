import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import CalendarScreen from "@/screens/CalendarScreen";
import DailySalahScreen from "@/screens/DailySalahScreen";
import DailyTaskScreen from "@/screens/DailyTaskScreen";
import DietHealthScreen from "@/screens/DietHealthScreen";
import ExerciseScreen from "@/screens/ExerciseScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type HomeStackParamList = {
  Home: undefined;
  Calendar: undefined;
  DailySalah: undefined;
  DailyTask: undefined;
  DietHealth: undefined;
  Exercise: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerTitle: "Islamic Calendar",
        }}
      />
      <Stack.Screen
        name="DailySalah"
        component={DailySalahScreen}
        options={{
          headerTitle: "Daily Salah",
        }}
      />
      <Stack.Screen
        name="DailyTask"
        component={DailyTaskScreen}
        options={{
          headerTitle: "Daily Tasks",
        }}
      />
      <Stack.Screen
        name="DietHealth"
        component={DietHealthScreen}
        options={{
          headerTitle: "Diet & Health",
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          headerTitle: "Exercise",
        }}
      />
    </Stack.Navigator>
  );
}
