import React, { useState } from "react";
import { Box, Text, Center, Input, Button, VStack } from "native-base";
import { TextInput } from "react-native";
import ContinueButton from "../components/continue_button";

type PhoneNumberScreenProps = {
  onPhoneSubmit: (phone: string) => void;
};

export default function PhoneNumberScreen({
  onPhoneSubmit,
}: PhoneNumberScreenProps) {
  const [phone, setPhone] = useState("09");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setError("");
    onPhoneSubmit(phone);
  };

  return (
    <Center flex={1} px={6}>
      <VStack space={6} alignItems="center" w="100%">
        <Text fontSize="2xl" fontWeight="bold" color="#7A83F4">
          Enter Your Phone Number
        </Text>

        <Text fontSize="md" textAlign="center" color="gray.600">
          We'll send you a verification code to this number
        </Text>

        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            if (error) setError("");
          }}
          style={{
            borderWidth: 1,
            borderColor: error ? "#ef4444" : "#7A83F4",
            padding: 15,
            borderRadius: 8,
            color: "black",
            width: "100%",
            fontSize: 16,
          }}
          keyboardType="phone-pad"
          maxLength={11}
        />

        {error ? (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        ) : null}
        <ContinueButton onPress={handleContinue} />
      </VStack>
    </Center>
  );
}
