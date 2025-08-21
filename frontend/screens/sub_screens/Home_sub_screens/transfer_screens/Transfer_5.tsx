// TransactionDetailsScreen.tsx
import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Pressable,
  Icon,
  Center,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import DoneButton from "../../../../components/done_button";

type TransactionDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TransactionDetailsScreen"
>;

type TransactionDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "TransactionDetailsScreen"
>;

export default function TransactionDetailsScreen() {
  const navigation = useNavigation<TransactionDetailsScreenNavigationProp>();
  const route = useRoute<TransactionDetailsScreenRouteProp>();

  const { transactionData } = route.params;
  const { sender, recipient, amount, date, time } = transactionData;

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box px={4} pt={12} pb={4} ml={-4}>
        <HStack alignItems="center" px={4} pt={2} pb={4}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
          </Pressable>
          <Center flex={1}>
            <Text fontSize="24" fontWeight="bold" color="#7A83F4">
              Transaction Details
            </Text>
          </Center>
          <Box w={6} />
        </HStack>
      </Box>

      {/* Success Icon and Message */}
      <Center mt={6}>
        <Box
          w={16}
          h={16}
          borderRadius={50}
          bg="#7A83F4"
          justifyContent="center"
          alignItems="center"
        >
          <Icon as={Ionicons} name="checkmark" size={8} color="#fff" />
        </Box>
        <Text mt={4} fontSize="md" color="#7A83F4">
          Payment Successful
        </Text>
        <Text mt={2} fontSize="2xl" fontWeight="bold" color="#7A83F4">
          -{amount.toLocaleString()} Ks
        </Text>
      </Center>

      <Box mt={8} h={0.5} bg="#7A83F4" />

      {/* Transaction Details */}
      <VStack px={6} mt={6} space={4}>
        <Text fontSize="md" color="#7A83F4" fontWeight="bold">
          Transaction details
        </Text>

        <HStack justifyContent="space-between">
          <Text color="#7A83F4">Date</Text>
          <Text color="#7A83F4">{date}</Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text color="#7A83F4">Time</Text>
          <Text color="#7A83F4">{time}</Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text color="#7A83F4">From</Text>
          <Text color="#7A83F4">{sender.name}</Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text color="#7A83F4">To</Text>
          <Text color="#7A83F4">{recipient.name}</Text>
        </HStack>
      </VStack>

      <Box mt={6} h={0.5} bg="#7A83F4" />

      {/* Amount Section */}
      <HStack px={6} mt={4} justifyContent="space-between">
        <Text color="#7A83F4">Amount</Text>
        <Text color="#7A83F4">-{amount.toLocaleString()} Ks</Text>
      </HStack>

      {/* Done Button */}
      <Center mt={10}>
        <DoneButton
          onPress={() =>
            navigation.navigate("HomeMain", { loggedInUser: sender })
          }
        />
      </Center>
    </Box>
  );
}
