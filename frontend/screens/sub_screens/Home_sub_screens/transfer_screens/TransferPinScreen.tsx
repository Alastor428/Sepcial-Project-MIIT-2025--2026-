// TransferPinScreen.tsx
import React, { useState } from "react";
import {
  Box,
  Text,
  HStack,
  Center,
  Icon,
  Pressable,
  Spinner,
} from "native-base";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import PinInputSection from "../../../../components/pin_input_section";
import { transactionAPI } from "../../../../services/api";

interface User {
  _id?: string;
  name: string;
  userId: string;
  balance: number;
  phone: string;
  pin: string;
  gender?: string;
  employment?: string;
  dob?: string;
  nrc?: string;
  avatar?: string;
  createdAt?: Date;
}

interface TransferParams {
  sender: User;
  recipient: User;
  amount: string;
  loggedInUser: User;
}

type TransferPinScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TransferPinScreen"
>;
type TransferPinScreenRouteProp = RouteProp<
  RootStackParamList,
  "TransferPinScreen"
> & {
  params: TransferParams;
};

const TransferPinScreen: React.FC = () => {
  const navigation = useNavigation<TransferPinScreenNavigationProp>();
  const route = useRoute<TransferPinScreenRouteProp>();
  const [isLoading, setIsLoading] = useState(false);

  const { sender, recipient, amount } = route.params;

  const handlePinContinue = async (enteredPin: string) => {
    if (enteredPin !== sender.pin) {
      alert("Incorrect PIN");
      return;
    }

    setIsLoading(true);
    try {
      const amountNum = Number(amount);

      // Call the real API to transfer money
      const transferResult = await transactionAPI.transfer(
        sender.userId,
        recipient.phone,
        amountNum
      );

      // Create transaction data for the success screen
      const transactionData = {
        sender: transferResult.sender,
        recipient,
        amount: amountNum,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        transactionId: transferResult.transaction._id,
      };

      navigation.navigate("TransactionDetailsScreen", { transactionData });
    } catch (error: any) {
      console.error("Transfer error:", error);
      alert(
        error.response?.data?.error || "Transfer failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex={1} bg="#fff" safeArea>
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
      <Center>
        <Text fontSize="20" color="#7A83F4" mb={16}>
          Enter Your PIN
        </Text>
      </Center>

      {isLoading ? (
        <Center flex={1}>
          <Spinner size="lg" color="#7A83F4" />
          <Text mt={4} color="#7A83F4">
            Processing Transfer...
          </Text>
        </Center>
      ) : (
        <PinInputSection onContinue={handlePinContinue} />
      )}
    </Box>
  );
};

export default TransferPinScreen;
