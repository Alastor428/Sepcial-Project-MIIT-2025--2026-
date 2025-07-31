// navigation/HomeScreen_StackNavigator.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/main_screens/HomeScreen";
import QRScreen from "../screens/sub_screens/Home_sub_screens/show_qr_screens/QR";
import TransferScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/Transfer_1";

function PlaceholderScreen() {
  return null;
}

export type RootStackParamList = {
  HomeMain: undefined;
  QR: undefined;
  SetAmountScreen: undefined;
  SaveImage: undefined;
  Transfer: undefined;
  CashOut: undefined;
  CashIn: undefined;
  QuickPay: undefined;
  TopUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function HomeScreen_StackNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="QR" component={QRScreen} />
      <Stack.Screen name="Transfer" component={TransferScreen} />
      <Stack.Screen name="CashOut" component={PlaceholderScreen} />
      <Stack.Screen name="CashIn" component={PlaceholderScreen} />
      <Stack.Screen name="QuickPay" component={PlaceholderScreen} />
      <Stack.Screen name="TopUp" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
}
