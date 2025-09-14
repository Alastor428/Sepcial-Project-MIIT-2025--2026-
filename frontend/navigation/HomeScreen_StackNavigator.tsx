import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/main_screens/HomeScreen";
import QRScreen from "../screens/sub_screens/Home_sub_screens/show_qr_screens/QR";
import SetAmountScreen from "../screens/sub_screens/Home_sub_screens/show_qr_screens/SetAmount";
import TransferScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/TransferScreen";
import TransferAmountScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/TransferAmountScreen";
import TransferConfirmModal from "../components/transfer_comfirm_modal";
import CashInScreen from "../screens/sub_screens/Home_sub_screens/cash_in_screens/Cash-In";
import PinEntryScreen from "../screens/sub_screens/Home_sub_screens/cash_in_screens/Cash-In-pin-screen";
import TransferPinScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/TransferPinScreen";
import TransactionDetailsScreen from "../screens/sub_screens/Home_sub_screens/transfer_screens/Transfer_5";
import TopUpScreen from "../screens/sub_screens/Home_sub_screens/top_up_screens/Top-up-(1)";
import TopUpPinScreen from "../screens/sub_screens/Home_sub_screens/top_up_screens/top-up-pin-screen";
import QuickPayScreen from "../screens/sub_screens/Home_sub_screens/quick_pay_screens/Quickpay";
import EducationScreen from "../screens/sub_screens/Home_sub_screens/quick_pay_screens/Education";
import MIITPaymentScreen from "../screens/sub_screens/Home_sub_screens/quick_pay_screens/MIIT";
import QuickPayPinScreen from "../screens/sub_screens/Home_sub_screens/quick_pay_screens/Quickpay pin";
import CashOutScreen from "../screens/sub_screens/Home_sub_screens/cash_out_screens/cash-out-screen";
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
  TransactionDetailsScreen: { transactionData: {
      sender: any;
      recipient: { userId: string; name: string };
      amount: number;
      date: string;
      time: string;
    }; };
  CashOut: { recipient: any;
    loggedInUser: any;
    sender: {
      name: string;
      balance: number;
      userId: string;
    };};
  CashIn: { loggedInUser: { name: string; userId: string; balance: number }; 
  currentAmount?: string };
  PinEntryScreen: { sender: any; recipient: any; amount: number };
  QuickPay: { loggedInUser: { name: string; userId: string; balance: number };currentAmount?: string };
  EducationScreen: { loggedInUser: { sender: any; recipient: any; amount: number }};
  MIITPayment: { loggedInUser: {sender: any; recipient: any; amount: number; name: string; userId: string; balance: number} };
  QuickPayPinScreen: { transactionData: {
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
  };};
   TopUpScreen: { loggedInUser: any }; // or your user type
  TopUpPinScreen: {
  sender: any;
  recipient: { userId: string; name?: string }; // <-- allow optional name
  amount: number;
  phoneNumber: string;
};


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
      <Stack.Screen name="CashOut" component={CashOutScreen} />
      <Stack.Screen name="CashIn" component={CashInScreen} />
      <Stack.Screen name="PinEntryScreen" component={PinEntryScreen} />
      <Stack.Screen name="QuickPay" component={QuickPayScreen} />
      <Stack.Screen name="EducationScreen" component={EducationScreen} />
      <Stack.Screen name="MIITPayment" component={MIITPaymentScreen} />
      <Stack.Screen name="QuickPayPinScreen" component={QuickPayPinScreen} />
      <Stack.Screen name="TopUpScreen" component={TopUpScreen} />
      <Stack.Screen name="TopUpPinScreen" component={TopUpPinScreen} />
    </Stack.Navigator>
  );
}
