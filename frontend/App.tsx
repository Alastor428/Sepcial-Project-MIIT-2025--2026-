import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import { userAPI } from "./services/api";

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
                dob: nrcData.birthday.split("/").reverse().join("-"), // convert to YYYY-MM-DD
                gender:
                  nrcData.gender.charAt(0).toUpperCase() +
                  nrcData.gender.slice(1), // Male, Female
                employment: nrcData.job,
              };

              console.log("Registering user with data:", fullData);
              const registeredUser = await userAPI.register(fullData);
              console.log("Registration successful:", registeredUser);

              // Show success message
              alert("Account created successfully! You can now login.");

              setCurrentScreen("phone");
              setSignUpData(null);
            } catch (error: any) {
              console.error("Registration error:", error);

              // Handle specific error messages
              if (error.response?.data?.message === "User already exists") {
                alert(
                  "An account with this phone number already exists. Please use a different phone number or try logging in."
                );
              } else if (error.response?.data?.error) {
                alert(`Registration failed: ${error.response.data.error}`);
              } else {
                alert(
                  "Registration failed. Please check your internet connection and try again."
                );
              }
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
