import React from "react";
import TransferScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/TransferScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/main_screens/HomeScreen";
import QRScreen from "../screens/sub_screens/Home_sub_screens/show_qr_screens/QR";
import SetAmountScreen from "../screens/sub_screens/Home_sub_screens/show_qr_screens/SetAmount";
import CashInScreen from "../screens/sub_screens/Home_sub_screens/cash_in_screens/Cash-In";
import TransferAmountScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/TransferAmountScreen";
import TransferConfirmModal from "../components/transfer_comfirm_modal";
import TransferPinScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/TransferPinScreen";
function PlaceholderScreen() {
  return null;
}

export type RootStackParamList = {
  HomeMain: undefined;
  QR: { currentAmount?: string } | undefined;
  SetAmountScreen: undefined;
  SaveImage: undefined;
  Transfer: undefined;
  TransferAmountScreen: { recipient: any };
  TransferConfirmModal: undefined;
  TransferPinScreen: { recipient: any; amount: string };
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
      <Stack.Screen name="SetAmountScreen" component={SetAmountScreen} />
      <Stack.Screen name="Transfer" component={TransferScreen} />
      <Stack.Screen
        name="TransferConfirmModal"
        component={TransferConfirmModal}
      />
      <Stack.Screen
        name="TransferAmountScreen"
        component={TransferAmountScreen}
      />
      <Stack.Screen name="TransferPinScreen" component={TransferPinScreen} />

      <Stack.Screen name="CashOut" component={PlaceholderScreen} />
      <Stack.Screen name="CashIn" component={CashInScreen} />
      <Stack.Screen name="QuickPay" component={PlaceholderScreen} />
      <Stack.Screen name="TopUp" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
}
