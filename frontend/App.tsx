import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LoginScreen from "./auth/LoginScreen";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {!loggedInUser ? (
          <LoginScreen setLoggedInUser={setLoggedInUser} />
        ) : (
          <BottomTabNavigator loggedInUser={loggedInUser} />
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
