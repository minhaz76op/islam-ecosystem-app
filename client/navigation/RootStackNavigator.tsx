import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import LoginScreen from "@/screens/LoginScreen";
import EditProfileScreen from "@/screens/EditProfileScreen";
import LanguageSelectScreen from "@/screens/LanguageSelectScreen";
import DuaListScreen from "@/screens/DuaListScreen";
import QuranScreen from "@/screens/QuranScreen";
import ArticlesScreen from "@/screens/ArticlesScreen";
import QuizScreen from "@/screens/QuizScreen";
import MosqueLocatorScreen from "@/screens/MosqueLocatorScreen";
import RozaTimetableScreen from "@/screens/RozaTimetableScreen";
import IslamicGPTScreen from "@/screens/IslamicGPTScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  EditProfile: undefined;
  LanguageSelect: undefined;
  DuaList: undefined;
  Quran: undefined;
  Articles: undefined;
  Quiz: undefined;
  MosqueLocator: undefined;
  RozaTimetable: undefined;
  IslamicGPT: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          presentation: "modal",
          headerTitle: "Sign In",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          presentation: "modal",
          headerTitle: "Edit Profile",
        }}
      />
      <Stack.Screen
        name="LanguageSelect"
        component={LanguageSelectScreen}
        options={{
          presentation: "modal",
          headerTitle: "Language",
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
        name="Articles"
        component={ArticlesScreen}
        options={{
          headerTitle: "Articles",
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
          headerTitle: "Find Mosques",
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
        name="IslamicGPT"
        component={IslamicGPTScreen}
        options={{
          headerTitle: "IslamicGPT",
        }}
      />
    </Stack.Navigator>
  );
}
