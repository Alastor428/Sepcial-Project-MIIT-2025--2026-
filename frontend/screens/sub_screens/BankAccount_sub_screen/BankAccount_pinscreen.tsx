import React, { useState } from "react";
import { Box, HStack, Text, Pressable, Icon, Center, Spinner } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import PinInputSection from "../../../components/pin_input_section";

export default function BankAccountPinScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { selectedBank, bankAccount, amount, loggedInUser } = route.params || {};

  const [isLoading, setIsLoading] = useState(false);

  const handlePinContinue = (enteredPin: string) => {
    // ✅ Only check PIN if loggedInUser exists
    if (loggedInUser && enteredPin !== loggedInUser.pin) {
      alert("Incorrect PIN. Please try again.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      alert(
        `Transaction Successful!\nBank: ${selectedBank}\nAccount: ${bankAccount}\nAmount: ${amount}`
      );
      setIsLoading(false);

      // Navigate to confirmation screen
      navigation.navigate("BankAccountLink", { selectedBank, bankAccount, loggedInUser });
    }, 1000);
  };

  return (
    <Box flex={1} bg="#fff" safeArea>
      <HStack alignItems="center" px={4} pt={2} pb={4} mb={10}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
        </Pressable>
        <Center flex={1}>
          <Text fontSize="24" fontWeight="bold" color="#7A83F4">
            Bank Account
          </Text>
        </Center>
        <Box w={6} />
      </HStack>

      <Center>
        <Text fontSize="20" color="#7A83F4" mb={16}>
          Enter Your PIN
        </Text>
      </Center>

      {isLoading ? (
        <Center flex={1}>
          <Spinner size="lg" color="#7A83F4" />
          <Text mt={4} color="#7A83F4">
            Processing Transaction...
          </Text>
        </Center>
      ) : (
        <PinInputSection onContinue={handlePinContinue} />
      )}
    </Box>
  );
}
