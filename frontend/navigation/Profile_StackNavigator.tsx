import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/main_screens/Profile_Screen";
import SettingsScreen from "../screens/sub_screens/Profile_sub_screens/Setting_Screen";
import ResetUsernameScreen from "../screens/sub_screens/Profile_sub_screens/Resetusername_Screen";
import ResetMobileNumberScreen from "../screens/sub_screens/Profile_sub_screens/ResetMobile_Screen";
import ResetPasswordScreen from "../screens/sub_screens/Profile_sub_screens/ResetPassword_Screen";
import ResetDateOfBirthScreen from "../screens/sub_screens/Profile_sub_screens/ResetDateOfBirth_screen";

function PlaceholderScreen() {
  return null;
}

export type RootStackParamList = {
    Profile:{ loggedInUser: any };
    Setting: undefined;
    ResetUserName: undefined;
    ResetMobileNumber: undefined;
    ResetPassword: undefined;
    ResetDateOfBirth: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

type ProfileStackProps = {
  loggedInUser: any;
};
export default function ProfileScreen_StackNavigator({
  loggedInUser,
}: ProfileStackProps) {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile">
                {(props) => <ProfileScreen {...props} loggedInUser={loggedInUser} />}
              </Stack.Screen>
        <Stack.Screen name="Setting" component={SettingsScreen} />
        
        <Stack.Screen name="ResetUserName" component={ResetUsernameScreen} />
        <Stack.Screen name="ResetMobileNumber" component={ResetMobileNumberScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="ResetDateOfBirth" component={ResetDateOfBirthScreen} />
    </Stack.Navigator>
  );
};
