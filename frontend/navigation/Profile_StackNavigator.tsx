import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/main_screens/Profile_Screen";
import SettingsScreen from "../screens/sub_screens/Profile_sub_screens/Setting_Screen";
import ResetUsernameScreen from "../screens/sub_screens/Profile_sub_screens/Resetusername_Screen";

function PlaceholderScreen() {
  return null;
}

export type RootStackParamList = {
    Profile:{ loggedInUser: any };
    Setting: undefined;
    ResetUserName: undefined;
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
    </Stack.Navigator>
  );
};
