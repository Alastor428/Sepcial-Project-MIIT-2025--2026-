// TransferPinScreen.tsx
import React from "react";
import { Box, Text, HStack, Center, Icon, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import PinInputSection from "../../../../components/pin_input_section";

// Navigation & Route types
type TransferPinNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TransferPinScreen"
>;
type TransferPinRouteProp = RouteProp<RootStackParamList, "TransferPinScreen">;

export default function TransferPinScreen() {
  const navigation = useNavigation<TransferPinNavigationProp>();
  const route = useRoute<TransferPinRouteProp>();

  const { sender, recipient, amount } = route.params ?? {};

  // If params are missing, prevent crash
  if (!sender || !recipient || !amount) {
    return (
      <Center flex={1} px={6}>
        <Text fontSize="18" color="red.500" textAlign="center">
          Error: Missing transfer data.
        </Text>
        <Pressable
          mt={4}
          px={4}
          py={2}
          bg="#7A83F4"
          borderRadius={8}
          onPress={() => navigation.goBack()}
        >
          <Text color="white" textAlign="center" fontWeight="bold">
            Go Back
          </Text>
        </Pressable>
      </Center>
    );
  }

  const handlePinContinue = (enteredPin: string) => {
    if (enteredPin !== sender.pin) {
      alert("Incorrect PIN");
      return;
    }

    const amountNum = Number(amount);
    sender.balance -= amountNum;
    recipient.balance += amountNum;

    const transactionData = {
      sender,
      recipient,
      amount: amountNum,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    navigation.navigate("TransactionDetailsScreen", { transactionData });
  };

  return (
    <Box flex={1} bg="#fff" safeArea>
      {/* Header */}
      <HStack alignItems="center" px={4} pt={2} pb={4} mb={10}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
        </Pressable>
        <Center flex={1}>
          <Text fontSize="24" fontWeight="bold" color="#7A83F4">
            Transfer
          </Text>
        </Center>
        <Box w={6} />
      </HStack>

      {/* Instruction */}
      <Center>
        <Text fontSize="20" color="#7A83F4" mb={16}>
          Enter Your PIN
        </Text>
      </Center>

      {/* PIN Input */}
      <PinInputSection onContinue={handlePinContinue} />
    </Box>
  );
}
