import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/main_screens/HomeScreen";
import QRScreen from "../screens/sub_screens/Home_sub_screens/show_qr_screens/QR";
import SetAmountScreen from "../screens/sub_screens/Home_sub_screens/show_qr_screens/SetAmount";
import TransferScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/TransferScreen";
import TransferAmountScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/TransferAmountScreen";
import TransferConfirmModal from "../components/transfer_comfirm_modal";
import CashInScreen from "../screens/sub_screens/Home_sub_screens/cash_in_screens/Cash-In";
import PinEntryScreen from "../screens/sub_screens/Home_sub_screens/cash_in_screens/Cash-In(3)";
import TransferPinScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/TransferPinScreen";
import TransactionDetailsScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/Transfer_5";
function PlaceholderScreen() {
  return null;
}

export type RootStackParamList = {
  HomeMain: { loggedInUser: any };
  QR: { loggedInUser: any; currentAmount?: string };
  SetAmountScreen: { loggedInUser: any; currentAmount?: string };
  SaveImage: undefined;
  Transfer: { loggedInUser: any };
  TransferAmountScreen: {
    recipient: any;
    loggedInUser: any;
    sender: {
      name: string;
      balance: number;
      userId: string;
    };
  };
  TransferConfirmModal: undefined;
  TransferPinScreen: {
    sender: {
      name: string;
      balance: number;
      userId: string;
      pin: string;
    };
    recipient: {
      name: string;
      balance: number;
      userId: string;
      pin: string;
    };
    amount: string | number;
  };
  TransactionDetailsScreen: {
    transactionData: {
      sender: any;
      recipient: any;
      amount: number;
      date: string;
      time: string;
    };
  };
  CashOut: undefined;
  CashIn: undefined;
  PinEntry: undefined;
  QuickPay: undefined;
  TopUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type HomeStackProps = {
  loggedInUser: any;
};

export default function HomeScreen_StackNavigator({
  loggedInUser,
}: HomeStackProps) {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain">
        {(props) => <HomeScreen {...props} loggedInUser={loggedInUser} />}
      </Stack.Screen>

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
      <Stack.Screen
        name="TransactionDetailsScreen"
        component={TransactionDetailsScreen}
      />
      <Stack.Screen name="CashOut" component={PlaceholderScreen} />
      <Stack.Screen name="CashIn" component={CashInScreen} />
      <Stack.Screen name="PinEntry" component={PinEntryScreen} />
      <Stack.Screen name="QuickPay" component={PlaceholderScreen} />
      <Stack.Screen name="TopUp" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
}
