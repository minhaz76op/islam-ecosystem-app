import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IslamicGPTScreen from "@/screens/IslamicGPTScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type IslamicGPTStackParamList = {
  IslamicGPT: undefined;
};

const Stack = createNativeStackNavigator<IslamicGPTStackParamList>();

export default function IslamicGPTStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
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
