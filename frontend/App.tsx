import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
