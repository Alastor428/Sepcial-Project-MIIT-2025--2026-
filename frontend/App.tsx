import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";

// Screens
import PhoneNumberScreen from "./auth/PhoneNumberScreen";
import PinScreen from "./auth/PinScreen";
import SignUpScreen from "./auth/SignUpPhNameScreen";
import NRCScreen from "./auth/NRCNumber";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [currentScreen, setCurrentScreen] = useState<
    "phone" | "pin" | "signup" | "nrc"
  >("phone");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Step 1: After entering phone number → move to Pin screen
  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentScreen("pin");
  };

  // Step 2: Go back to phone screen
  const handleBackToPhone = () => {
    setCurrentScreen("phone");
    setPhoneNumber("");
  };

  // Step 3: When login success → store user & go to main app
  const handleLoginSuccess = (user: any) => {
    setLoggedInUser(user);
    setCurrentScreen("phone");
    setPhoneNumber("");
  };

  // Auth Screens (controlled by state)
  const renderAuthScreen = () => {
    if (currentScreen === "phone") {
      return (
        <PhoneNumberScreen
          onPhoneSubmit={handlePhoneSubmit}
          onSignUp={() => setCurrentScreen("signup")}
        />
      );
    } else if (currentScreen === "signup") {
      return (
        <SignUpScreen
          onBack={() => setCurrentScreen("phone")}
          onContinue={() => setCurrentScreen("nrc")} // after signup → NRC
        />
      );
    } else if (currentScreen === "nrc") {
      return (
        <NRCScreen
          onBack={() => setCurrentScreen("signup")}
          onContinue={() => setCurrentScreen("phone")} // after NRC → back to login
        />
      );
    } else if (currentScreen === "pin") {
      return (
        <PinScreen
          phone={phoneNumber}
          onBack={handleBackToPhone}
          onLoginSuccess={handleLoginSuccess}
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
