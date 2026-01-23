import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import CalendarScreen from "@/screens/CalendarScreen";
import DailySalahScreen from "@/screens/DailySalahScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type HomeStackParamList = {
  Home: undefined;
  Calendar: undefined;
  DailySalah: undefined;
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
    </Stack.Navigator>
  );
}
