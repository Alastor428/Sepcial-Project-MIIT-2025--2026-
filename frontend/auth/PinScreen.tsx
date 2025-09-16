import React, { useState } from "react";
import { Box, Text, Center, VStack, Button } from "native-base";
import PinInputSection from "../components/pin_input_section";
import axios from "axios";

type PinScreenProps = {
  phone: string;
  onLoginSuccess: (user: any) => void;
  onBack: () => void;
};

export default function PinScreen({
  phone,
  onLoginSuccess,
  onBack,
}: PinScreenProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePinSubmit = async (pin: string) => {
    if (pin.length !== 6) {
      setError("Please enter a 6-digit PIN");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://172.16.206.192:5000/api/user/login",
        { phone, pin }
      );

      onLoginSuccess(response.data);
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid PIN. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center flex={1} px={6} bg="white"> 
      <VStack space={6} alignItems="center" w="100%" mt={-40}>
        <Text fontSize="24" fontWeight="bold" color="#7A83F4" mb={85}>
          Enter Your PIN
        </Text>

        {error ? (
          <Text color="red.500" fontSize="sm" textAlign="center">
            {error}
          </Text>
        ) : null}

        <PinInputSection onContinue={handlePinSubmit} />

        <Button
          variant="ghost"
          onPress={onBack}
          _text={{ color: "#7A83F4" ,fontWeight: "bold" , fontSize: 16, textDecorationLine: 'underline'
          }}
          isLoading={isLoading}
        >
          Back to Phone Number
        </Button>
      </VStack>
    </Center>
  );
}
