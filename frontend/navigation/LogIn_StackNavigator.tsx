import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneNumberScreen from "../auth/PhoneNumberScreen";
import PinScreen from "../auth/PinScreen";
import SignUpScreen from "../auth/SignUpPhNameScreen";

export type AuthStackParamList = {
  
  PhoneNumber: undefined;
  Pin: { phone: string };
  SignUpScreen: undefined;
};


const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Pin" component={PinScreen} />
    </Stack.Navigator>
  );
}
