import React from "react";
import { Box, Text, HStack, Center, Icon, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import PinInputSection from "../../../../components/pin_input_section";

// Navigation type
type QuickPayPinScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "QuickPayPinScreen"
>;

// Route type
type QuickPayPinScreenRouteProp = RouteProp<
  RootStackParamList,
  "QuickPayPinScreen"
>;

// Sender type
interface Sender {
  studentId: string;
  studentName: string;
  contactNumber?: string;
  pin: string;
  balance: number;
}

// Recipient type
interface Recipient {
  userId: string;
  name: string;
}

const QuickPayPinScreen: React.FC = () => {
  const navigation = useNavigation<QuickPayPinScreenNavigationProp>();
  const route = useRoute<QuickPayPinScreenRouteProp>();

  // Destructure the passed transactionData
  const { transactionData } = route.params;
  const { sender, recipient, amount } = transactionData;

  const handlePinContinue = (enteredPin: string) => {
    // Check PIN directly from sender
    if (enteredPin.trim() !== sender.pin.trim()) {
      alert("Incorrect PIN");
      return;
    }

    // Build transaction data for next screen
    const transactionToSend = {
      sender,
      recipient,
      amount: Number(amount), // ensure number type
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    navigation.navigate("TransactionDetailsScreen", {
      transactionData: transactionToSend,
    });
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
            Quick Pay
          </Text>
        </Center>
        <Box w={6} />
      </HStack>

      {/* Title */}
      <Center>
        <Text fontSize="20" color="#7A83F4" mb={16}>
          Enter Your PIN
        </Text>
      </Center>

      {/* PIN Input */}
      <PinInputSection onContinue={handlePinContinue} />
    </Box>
  );
};

export default QuickPayPinScreen;
