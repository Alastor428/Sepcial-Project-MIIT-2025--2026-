// BankAccount_StackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BankAccountScreen from '../screens/main_screens/Bank_Account';
import LinkBankAccountScreen from '../screens/sub_screens/BankAccount_sub_screen/Link_BankAccount';
import BankAccountLinkScreen from '../screens/sub_screens/BankAccount_sub_screen/Show_BankCard';
import BankAccountPinScreen from '../screens/sub_screens/BankAccount_sub_screen/BankAccount_pinscreen';
import CashInScreen from '../screens/sub_screens/Home_sub_screens/cash_in_screens/Cash-In';
import CashOutScreen from '../screens/sub_screens/Home_sub_screens/cash_out_screens/cash-out-screen';
import PinScreen from '../screens/sub_screens/Home_sub_screens/cash_out_screens/CashInOutPin_Screen';
import TransactionDetailsScreen from '../screens/sub_screens/Home_sub_screens/transfer_screens/Transfer_5';

export type BankAccountStackParamList = {
  BankAccount: { loggedInUser: any }; // receives logged-in user from login
  LinkBankAccount: { loggedInUser: any }; // pass logged-in user here
  BankAccountLink: { loggedInUser: any }; // optional if needed
  BankAccountPin: {
    loggedInUser: any;
    selectedBank: string;
    bankAccount: string;
    amount?: number;
  };
  CashInScreen: {
    loggedInUser: { name: string; userId: string; balance: number };
    currentAmount?: string;
  };
  CashOut: { loggedInUser: any; selectedBank: string; bankAccount: string}
  PinScreen: {
    sender: { name: string; userId: string; pin: string };
    recipient: { name: string; accountNumber: string };
    amount: number;
    bankaccount: string;
  };
  TransactionDetails: { transactionId: string; userId: string
  };
};


const Stack = createNativeStackNavigator<BankAccountStackParamList>();

export default function BankAccountStackNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BankAccount" component={BankAccountScreen} />
      <Stack.Screen name="LinkBankAccount" component={LinkBankAccountScreen} />
      <Stack.Screen name="BankAccountLink" component={BankAccountLinkScreen}/>
      <Stack.Screen name="BankAccountPin" component={BankAccountPinScreen}/>
      <Stack.Screen name="CashInScreen" component={CashInScreen} />
      <Stack.Screen name="CashOut" component={CashOutScreen} />
      <Stack.Screen name="PinScreen" component={PinScreen} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
    </Stack.Navigator>
  );
}
