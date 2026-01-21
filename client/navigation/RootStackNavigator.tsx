import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import LoginScreen from "@/screens/LoginScreen";
import EditProfileScreen from "@/screens/EditProfileScreen";
import LanguageSelectScreen from "@/screens/LanguageSelectScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  EditProfile: undefined;
  LanguageSelect: undefined;
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
    </Stack.Navigator>
  );
}
