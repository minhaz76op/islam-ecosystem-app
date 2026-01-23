import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsScreen from "@/screens/FriendsScreen";
import ChatScreen from "@/screens/ChatScreen";
import ChallengesScreen from "@/screens/ChallengesScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

interface User {
  id: string;
  username: string;
  displayName: string | null;
}

export type FriendsStackParamList = {
  Friends: undefined;
  Chat: { friend: User };
  Challenges: undefined;
};

const Stack = createNativeStackNavigator<FriendsStackParamList>();

export default function FriendsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          headerTitle: "Friends",
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerTitle: "Chat",
        }}
      />
      <Stack.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          headerTitle: "Challenges",
        }}
      />
    </Stack.Navigator>
  );
}
