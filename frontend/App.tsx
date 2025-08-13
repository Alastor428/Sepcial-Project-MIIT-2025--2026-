import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Box, NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import { Buttonpair } from "./components/cancle_ok_buttons";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import NextButton from "./components/next_button";
export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <BottomTabNavigator /> 
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
