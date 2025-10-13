import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScanScreen from "../screens/main_screens/Scan";
import TransferAmountScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/TransferAmountScreen";
import TransactionDetailsScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/Transfer_5";
import TransferPinScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/TransferPinScreen";
import TransferConfirmModal from "../components/transfer_comfirm_modal";
export type ScanStackParamList = {
  ScanMain: { loggedInUser: any } | undefined;
  TransferAmountScreen: {
    recipient: any;
    loggedInUser: any;
    sender: { name: string; balance: number; userId: string };
  };
  TransferConfirmModal: undefined;
  TransferPinScreen: {
    sender: { name: string; balance: number; userId: string; pin: string };
    recipient: { name: string; balance: number; userId: string; pin: string };
    amount: string | number;
  };
  TransactionDetailsScreen: {
    transactionData: {
      sender: any;
      recipient: { userId: string; name: string };
      amount: number;
      date: string;
      time: string;
    };
  };
};

const Stack = createStackNavigator<ScanStackParamList>();

export default function Scan_StackNavigator({ route }: { route?: any }) {
  const loggedInUser = route?.params?.loggedInUser ?? null;

  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ScanMain"
        component={ScanScreen}
        initialParams={{ loggedInUser }}
      />
      <Stack.Screen name="TransferConfirmModal" component={TransferConfirmModal} />
      <Stack.Screen name="TransferAmountScreen" component={TransferAmountScreen} />
      <Stack.Screen name="TransferPinScreen" component={TransferPinScreen} />
      <Stack.Screen name="TransactionDetailsScreen" component={TransactionDetailsScreen} />
    </Stack.Navigator>
  );
}

