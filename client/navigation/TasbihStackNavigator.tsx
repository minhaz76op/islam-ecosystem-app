import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TasbihScreen from "@/screens/TasbihScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type TasbihStackParamList = {
  Tasbih: undefined;
};

const Stack = createNativeStackNavigator<TasbihStackParamList>();

export default function TasbihStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Tasbih"
        component={TasbihScreen}
        options={{
          headerTitle: "Tasbih",
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
