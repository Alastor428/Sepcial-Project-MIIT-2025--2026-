import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { theme } from "./theme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
