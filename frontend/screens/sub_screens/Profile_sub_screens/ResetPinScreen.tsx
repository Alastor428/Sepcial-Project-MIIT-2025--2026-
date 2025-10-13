// ResetPinScreen.tsx
import React, { useState } from "react";
import { Box, Center, VStack, HStack, Text, Spinner, Pressable, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import PinInputSection from "../../../components/pin_input_section";

interface ResetPinScreenProps {
  navigation: any; // navigation prop
  defaultName?: string; // optional default name
}

const ResetPinScreen: React.FC<ResetPinScreenProps> = ({
  navigation,
  defaultName = "User",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePinSubmit = (pin: string) => {
    if (pin.length !== 6) {
      setError("Please enter a 6-digit PIN");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate PIN verification or proceed to next screen
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("Profile"); // replace with your target screen
    }, 800);
  };

  return (
    <Box flex={1} px={6} bg="white">
      {/* Header */}
      <HStack alignItems="center" pt={10} pb={4} mt={8}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
        </Pressable>
        <Center flex={1}>
          <Text fontSize="32" fontWeight="bold" color="#7A83F4">
            Enter PIN 
          </Text>
        </Center>
        <Box  />
      </HStack>

      {/* PIN Input Section */}
      <Center mt={"160px"}>
        <VStack >
          {error ? (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          ) : null}

          {isLoading ? (
            <Spinner size="lg" />
          ) : (
            <PinInputSection onContinue={handlePinSubmit} />
          )}
        </VStack>
      </Center>
    </Box>
  );
};

export default ResetPinScreen;
