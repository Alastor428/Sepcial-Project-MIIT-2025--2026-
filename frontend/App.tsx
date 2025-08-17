import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Box, NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import { Buttonpair } from "./components/cancle_ok_buttons";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import TransferPinScreen from "./screens/sub_screens/Home_sub_screens/transfer_screens/Transfer_4";
import TransferConfirmScreen from "./screens/sub_screens/Home_sub_screens/transfer_screens/Transfer_3";
export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <BottomTabNavigator/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
