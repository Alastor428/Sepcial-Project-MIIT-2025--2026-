import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import axios from "axios";

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
  const [signUpData, setSignUpData] = useState<any>(null);

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
          onContinue={(data) => {
            setSignUpData(data);
            setCurrentScreen("nrc");
          }} // after signup → NRC
        />
      );
    } else if (currentScreen === "nrc") {
      return (
        <NRCScreen
          onBack={() => setCurrentScreen("signup")}
          signUpData={signUpData}
          onContinue={async (nrcData) => {
            try {
              const fullData = {
                ...signUpData,
                nrc: nrcData.nrc,
                dob: nrcData.birthday.split('/').reverse().join('-'), // convert to YYYY-MM-DD
                gender: nrcData.gender.charAt(0).toUpperCase() + nrcData.gender.slice(1), // Male, Female
                employment: nrcData.job,
              };
              await axios.post("http://192.168.99.96:5000/api/user/register", fullData);
              setCurrentScreen("phone");
              setSignUpData(null);
            } catch (error) {
              console.error("Registration error:", error);
              // Handle error, perhaps show alert
            }
          }}
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
