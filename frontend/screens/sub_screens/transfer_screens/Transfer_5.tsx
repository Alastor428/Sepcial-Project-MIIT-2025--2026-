import React from "react";
import { Box, Text, VStack, HStack, Pressable, Icon, Center } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function TransactionDetailsScreen({ navigation }: any) {
  return (
    <Box flex={1} bg="#fff" safeArea>
      {/* Header */}
      <Box px={4} pt={4} pb={2}>
        <HStack alignItems="center" space={3}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-back" size={6} color="#7A5DE8" />
          </Pressable>
          <Text fontSize="2xl" fontWeight="bold" color="#7A5DE8">
            Transaction Details
          </Text>
        </HStack>
      </Box>

      {/* Success Icon and Message */}
      <Center mt={8}>
        <Box
          w={16}
          h={16}
          borderRadius={50}
          bg="#7A5DE8"
          justifyContent="center"
          alignItems="center"
        >
          <Icon as={Ionicons} name="checkmark" size={8} color="#fff" />
        </Box>
        <Text mt={4} fontSize="md" color="#7A5DE8">
          Payment Successful
        </Text>
        <Text mt={2} fontSize="2xl" fontWeight="bold" color="#7A5DE8">
          -1,000.00 Ks
        </Text>
      </Center>

      <Box mt={8} h={0.5} bg="#7A5DE8" />

      {/* Transaction Details */}
      <VStack px={6} mt={6} space={4}>
        <Text fontSize="md" color="#7A5DE8" fontWeight="bold">
          Transaction details
        </Text>

        <HStack justifyContent="space-between">
          <Text color="#7A5DE8">Date</Text>
          <Text color="#7A5DE8">16 July 2025</Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text color="#7A5DE8">Time</Text>
          <Text color="#7A5DE8">11:11 PM</Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text color="#7A5DE8">Account ID</Text>
          <Text color="#7A5DE8">010********</Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text color="#7A5DE8">Transfer To</Text>
          <Text color="#7A5DE8">(******321)</Text>
        </HStack>
      </VStack>

      <Box mt={6} h={0.5} bg="#7A5DE8" />

      {/* Amount Section */}
      <HStack px={6} mt={4} justifyContent="space-between">
        <Text color="#7A5DE8">Amount</Text>
        <Text color="#7A5DE8">-1,000.00 Ks</Text>
      </HStack>

      {/* Done Button */}
      <Center mt={10}>
        <Pressable
          px={12}
          py={3}
          bg="#7A5DE8"
          borderRadius={20}
          onPress={() => navigation.navigate("Home")} // Change to your route
        >
          <Text color="#fff" fontWeight="bold" fontSize="md">
            Done
          </Text>
        </Pressable>
      </Center>
    </Box>
  );
}
