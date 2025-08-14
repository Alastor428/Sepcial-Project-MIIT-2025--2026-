import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  Input,
  View,
  Center,
  Divider,
} from "native-base";

export default function TransactionDetailsScreen() {
  const navigation = useNavigation();
  const transactionData = {
    amount: "+1,000.00 Ks",
    date: "16 July 2025",
    time: "11:11 PM",
    accountId: "010******",
    transferSource: "Bank Account",
    status: "Payment Successful"
  };
  
  const handleDone = () => {
    console.log("Transaction completed");
    navigation.goBack(); 
  };
  
  return (
    <Box flex={1} bg="#7A83F4" px={6} pt={16} pb={10}>
      <HStack alignItems="center" mb={2}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-back" size={6} color="#fff" mr={4} />
        </Pressable>
        <Text color="#fff" fontSize="xl" fontWeight="bold">
          Transaction Details
        </Text>
      </HStack>
      
      <Box
        mt={6}
        p={6}
        borderRadius={12}
        bg="#fff"
        shadow={2}
      >
        <Center mb={6}>
          <Icon 
            as={MaterialIcons} 
            name="check-circle" 
            size={12} 
            color="#7A83F4" 
            mb={2}
          />
          <Text color="#7A83F4" fontSize="lg" fontWeight="bold">
            {transactionData.status}
          </Text>
        </Center>
        
        <Divider mb={4} />
        
        <Center mb={6}>
          <Text fontSize="2xl" fontWeight="bold" color="#7A83F4">
            {transactionData.amount}
          </Text>
        </Center>
        
        <Divider mb={4} />
        
        <VStack space={4}>
          <HStack justifyContent="space-between">
            <Text color="#555" fontSize="md">Date</Text>
            <Text color="#7A83F4" fontSize="md" fontWeight="bold">
              {transactionData.date}
            </Text>
          </HStack>
          
          <HStack justifyContent="space-between">
            <Text color="#555" fontSize="md">Time</Text>
            <Text color="#7A83F4" fontSize="md" fontWeight="bold">
              {transactionData.time}
            </Text>
          </HStack>
          
          <HStack justifyContent="space-between">
            <Text color="#555" fontSize="md">Account ID</Text>
            <Text color="#7A83F4" fontSize="md" fontWeight="bold">
              {transactionData.accountId}
            </Text>
          </HStack>
          
          <HStack justifyContent="space-between">
            <Text color="#555" fontSize="md">Transfer Source</Text>
            <Text color="#7A83F4" fontSize="md" fontWeight="bold">
              {transactionData.transferSource}
            </Text>
          </HStack>
        </VStack>
      </Box>
      
      <Pressable
        mt="auto"
        p={4}
        bg="#2196F3"
        borderRadius={8}
        alignItems="center"
        onPress={handleDone}
      >
        <Text color="#fff" fontSize="lg" fontWeight="bold">
          Done
        </Text>
      </Pressable>
    </Box>
  );
}