import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneNumberScreen from "../auth/PhoneNumberScreen";
import PinScreen from "../auth/PinScreen";
import SignUpScreen from "../auth/SignUpPhNameScreen";

export type AuthStackParamList = {
  PhoneNumber: undefined;
  Pin: { phone: string };
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      id={undefined} screenOptions={{ headerShown: false }}
      initialRouteName="PhoneNumber"
    >
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <Stack.Screen name="Pin" component={PinScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
