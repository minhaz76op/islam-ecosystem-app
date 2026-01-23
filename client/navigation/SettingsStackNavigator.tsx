import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "@/screens/SettingsScreen";
import EditProfileScreen from "@/screens/EditProfileScreen";
import LoginScreen from "@/screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";
import LanguageSelectScreen from "@/screens/LanguageSelectScreen";
import AlarmScreen from "@/screens/AlarmScreen";
import NotificationsScreen from "@/screens/NotificationsScreen";
import AboutScreen from "@/screens/AboutScreen";
import CreditsScreen from "@/screens/CreditsScreen";
import PrivacyPolicyScreen from "@/screens/PrivacyPolicyScreen";
import TermsOfServiceScreen from "@/screens/TermsOfServiceScreen";
import AdhanSettingsScreen from "@/screens/AdhanSettingsScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type SettingsStackParamList = {
  Settings: undefined;
  EditProfile: undefined;
  Login: undefined;
  Signup: undefined;
  LanguageSelect: undefined;
  Alarm: undefined;
  Notifications: undefined;
  About: undefined;
  Credits: undefined;
  PrivacyPolicy: undefined;
  TermsOfService: undefined;
  AdhanSettings: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: "Edit Profile",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: "Sign In",
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerTitle: "Sign Up",
        }}
      />
      <Stack.Screen
        name="LanguageSelect"
        component={LanguageSelectScreen}
        options={{
          headerTitle: "Language",
        }}
      />
      <Stack.Screen
        name="Alarm"
        component={AlarmScreen}
        options={{
          headerTitle: "Prayer Alarms",
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerTitle: "Notifications",
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: "About",
        }}
      />
      <Stack.Screen
        name="Credits"
        component={CreditsScreen}
        options={{
          headerTitle: "Credits",
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          headerTitle: "Privacy Policy",
        }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{
          headerTitle: "Terms of Service",
        }}
      />
      <Stack.Screen
        name="AdhanSettings"
        component={AdhanSettingsScreen}
        options={{
          headerTitle: "Adhan Settings",
        }}
      />
    </Stack.Navigator>
  );
}
