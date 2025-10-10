import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BankAccountScreen from "../screens/main_screens/Bank_Account";
import LinkBankAccountScreen from "../screens/sub_screens/BankAccount_sub_screen/Link_BankAccount";

export type RootStackParamList = {
  BankAccount: undefined;
  LinkBankAccount: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function BankScreen_StackNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BankAccount" component={BankAccountScreen} />
      <Stack.Screen name="LinkBankAccount" component={LinkBankAccountScreen} />
    </Stack.Navigator>
  );
}
