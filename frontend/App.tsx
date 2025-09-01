import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import PhoneNumberScreen from "./auth/PhoneNumberScreen";
import PinScreen from "./auth/PinScreen";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [currentScreen, setCurrentScreen] = useState<"phone" | "pin">("phone");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentScreen("pin");
  };

  const handleBackToPhone = () => {
    setCurrentScreen("phone");
    setPhoneNumber("");
  };

  const handleLoginSuccess = (user: any) => {
    setLoggedInUser(user);
    setCurrentScreen("phone");
    setPhoneNumber("");
  };

  const renderAuthScreen = () => {
    if (currentScreen === "phone") {
      return <PhoneNumberScreen onPhoneSubmit={handlePhoneSubmit} />;
    } else if (currentScreen === "pin") {
      return (
        <PinScreen
          phone={phoneNumber}
          onLoginSuccess={handleLoginSuccess}
          onBack={handleBackToPhone}
        />
      );
    }
    return null;
  };

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {!loggedInUser ? (
          renderAuthScreen()
        ) : (
          <BottomTabNavigator loggedInUser={loggedInUser} />
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
