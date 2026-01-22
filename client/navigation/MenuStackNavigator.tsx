import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "@/screens/MenuScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type MenuStackParamList = {
  Menu: undefined;
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
    </Stack.Navigator>
  );
}
