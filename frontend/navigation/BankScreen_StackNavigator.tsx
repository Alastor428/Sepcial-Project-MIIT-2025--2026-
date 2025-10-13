// BankAccount_StackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BankAccountScreen from '../screens/main_screens/Bank_Account';
import LinkBankAccountScreen from '../screens/sub_screens/BankAccount_sub_screen/Link_BankAccount';
import BankAccountLinkScreen from '../screens/sub_screens/BankAccount_sub_screen/Show_BankCard';
import BankAccountPinScreen from '../screens/sub_screens/BankAccount_sub_screen/BankAccount_pinscreen';

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
};


const Stack = createNativeStackNavigator<BankAccountStackParamList>();

export default function BankAccountStackNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BankAccount" component={BankAccountScreen} />
      <Stack.Screen name="LinkBankAccount" component={LinkBankAccountScreen} />
      <Stack.Screen name="BankAccountLink" component={BankAccountLinkScreen}/>
      <Stack.Screen name="BankAccountPin" component={BankAccountPinScreen}/>
    </Stack.Navigator>
  );
}
