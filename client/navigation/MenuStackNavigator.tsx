import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "@/screens/MenuScreen";
import DuaListScreen from "@/screens/DuaListScreen";
import QuranScreen from "@/screens/QuranScreen";
import ArticlesScreen from "@/screens/ArticlesScreen";
import QuizScreen from "@/screens/QuizScreen";
import MosqueLocatorScreen from "@/screens/MosqueLocatorScreen";
import RozaTimetableScreen from "@/screens/RozaTimetableScreen";
import NamesOfAllahScreen from "@/screens/NamesOfAllahScreen";
import IslamicNamesScreen from "@/screens/IslamicNamesScreen";
import QiblaDirectionScreen from "@/screens/QiblaDirectionScreen";
import ZakatCalculatorScreen from "@/screens/ZakatCalculatorScreen";
import CharityReminderScreen from "@/screens/CharityReminderScreen";
import MissedPrayerScreen from "@/screens/MissedPrayerScreen";
import RuqyahScreen from "@/screens/RuqyahScreen";
import IslamicHistoryScreen from "@/screens/IslamicHistoryScreen";
import IslamicStoriesScreen from "@/screens/IslamicStoriesScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type MenuStackParamList = {
  Menu: undefined;
  DuaList: undefined;
  Quran: undefined;
  Articles: undefined;
  Quiz: undefined;
  MosqueLocator: undefined;
  RozaTimetable: undefined;
  NamesOfAllah: undefined;
  IslamicNames: undefined;
  QiblaDirection: undefined;
  ZakatCalculator: undefined;
  CharityReminder: undefined;
  MissedPrayer: undefined;
  Ruqyah: undefined;
  IslamicHistory: undefined;
  IslamicStories: undefined;
};

const Stack = createNativeStackNavigator<MenuStackParamList>();

export default function MenuStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerTitle: "Menu",
        }}
      />
      <Stack.Screen
        name="DuaList"
        component={DuaListScreen}
        options={{
          headerTitle: "Duas",
        }}
      />
      <Stack.Screen
        name="Quran"
        component={QuranScreen}
        options={{
          headerTitle: "Holy Quran",
        }}
      />
      <Stack.Screen
        name="NamesOfAllah"
        component={NamesOfAllahScreen}
        options={{
          headerTitle: "99 Names of Allah",
        }}
      />
      <Stack.Screen
        name="IslamicNames"
        component={IslamicNamesScreen}
        options={{
          headerTitle: "Islamic Names",
        }}
      />
      <Stack.Screen
        name="QiblaDirection"
        component={QiblaDirectionScreen}
        options={{
          headerTitle: "Qibla Direction",
        }}
      />
      <Stack.Screen
        name="ZakatCalculator"
        component={ZakatCalculatorScreen}
        options={{
          headerTitle: "Zakat Calculator",
        }}
      />
      <Stack.Screen
        name="CharityReminder"
        component={CharityReminderScreen}
        options={{
          headerTitle: "Charity Reminder",
        }}
      />
      <Stack.Screen
        name="Articles"
        component={ArticlesScreen}
        options={{
          headerTitle: "Islamic Articles",
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          headerTitle: "Islamic Quiz",
        }}
      />
      <Stack.Screen
        name="MosqueLocator"
        component={MosqueLocatorScreen}
        options={{
          headerTitle: "Mosque Locator",
        }}
      />
      <Stack.Screen
        name="RozaTimetable"
        component={RozaTimetableScreen}
        options={{
          headerTitle: "Roza Timetable",
        }}
      />
      <Stack.Screen
        name="MissedPrayer"
        component={MissedPrayerScreen}
        options={{
          headerTitle: "Missed Prayer Tracker",
        }}
      />
      <Stack.Screen
        name="Ruqyah"
        component={RuqyahScreen}
        options={{
          headerTitle: "Ruqyah",
        }}
      />
      <Stack.Screen
        name="IslamicHistory"
        component={IslamicHistoryScreen}
        options={{
          headerTitle: "History of Islam",
        }}
      />
      <Stack.Screen
        name="IslamicStories"
        component={IslamicStoriesScreen}
        options={{
          headerTitle: "Islamic Stories",
        }}
      />
    </Stack.Navigator>
  );
}
