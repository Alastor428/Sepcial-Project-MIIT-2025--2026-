import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Pressable,
  Icon,
  Center,
  Spinner,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import DoneButton from "../../../../components/done_button";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";

type TransactionDetailsScreenProp = StackNavigationProp<RootStackParamList>;

export default function TransactionDetailsScreen() {
  const navigation = useNavigation<TransactionDetailsScreenProp>();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://192.168.68.124:5000/api/user/123/dashboard")
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner color="#7A83F4" />
        <Text mt={2}>Loading Transaction...</Text>
      </Center>
    );
  }

  if (!user) {
    return (
      <Center flex={1}>
        <Text color="red.500">Failed to load user data.</Text>
      </Center>
    );
  }

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
          -1,000.00 Ks
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
          <Text color="#7A83F4">16 July 2025</Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text color="#7A83F4">Time</Text>
          <Text color="#7A83F4">11:11 PM</Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text color="#7A83F4">Account ID</Text>
          <Text color="#7A83F4">010********</Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text color="#7A83F4">Transfer To</Text>
          <Text color="#7A83F4">(******321)</Text>
        </HStack>
      </VStack>

      <Box mt={6} h={0.5} bg="#7A83F4" />

      {/* Amount Section */}
      <HStack px={6} mt={4} justifyContent="space-between">
        <Text color="#7A83F4">Amount</Text>
        <Text color="#7A83F4">-1,000.00 Ks</Text>
      </HStack>

      {/* Done Button */}
      <Center mt={10}>
        <Pressable onPress={() => navigation.navigate("HomeMain")}>
          <DoneButton />
        </Pressable>
      </Center>
    </Box>
  );
}
