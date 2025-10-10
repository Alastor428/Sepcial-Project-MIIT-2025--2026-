import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
} from "native-base";
import { space } from "native-base/lib/typescript/theme/styled-system";

export default function BankAccountLinkScreen() {
  const navigation = useNavigation();
  const [accountNumber, setAccountNumber] = useState("");
  
  function handleKeyPress(key: string) {
    if (key === "clear") {
      setAccountNumber("");
    } else if (key === "back") {
      setAccountNumber((prev) => prev.slice(0, -1));
    } else if (accountNumber.length < 20) {
      setAccountNumber((prev) => prev + key);
    }
  }
  
  const handleContinue = () => {
    if (accountNumber.length > 0) {
      console.log("Account Number:", accountNumber);
    } else {
      alert("Please enter your bank account number");
    }
  };

  return (
    <Box flex={1} bg="#fff" px={4} pt={12} pb={10}>
      {/* Header */}
      <HStack alignItems="center" mb={8}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-back" size={6} color="#7A83F4" mr={4} />
        </Pressable>
        <Text fontSize={24} fontWeight="700" color="#7A83F4" fontFamily="Inter">
          Bank Account
        </Text>
      </HStack>
      
      {/* Card Info */}
      <Box
        bg="#7A83F4"
        borderRadius={10}
        p={6}
        mb={8}
        alignSelf="center"
        width="90%"
        shadow={2}
      >
        <HStack
          justifyContent="space-between"
          space={3}
          alignItems="center"
          mb={2}
        >
          <VStack>
            <Text
              color="#fff"
              fontSize={16}
              fontWeight="700"
              fontFamily="Inter"
            >
              NexoWallet
            </Text>
            {/* Modified section with spacing between labels */}
            <HStack space={6} pt={5}>
              <VStack>
                <Text
                  color="#fff"
                  fontSize={12}
                  fontWeight="700"
                  fontFamily="Inter"
                >
                  Card Holder Name
                </Text>
              </VStack>
              <VStack>
                <Text
                  color="#fff"
                  fontSize={12}
                  fontWeight="700"
                  fontFamily="Inter"
                >
                  Account Name
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        
        <HStack justifyContent="space-between" alignItems="center" space={1} pt={2}>
          <VStack>
            <Text
              color="#fff"
              fontSize={12}
              fontWeight="700"
              fontFamily="Inter"
            >
              Bank Account Number
            </Text>
          </VStack>
          <Text
            color="#fff"
            fontSize={12}
            fontWeight="700"
            fontFamily="Inter"
          >
            *************1234
          </Text>
        </HStack>
      </Box>
      
      {/* Transfer Options */}
      <VStack space={4} mb={4}>
        <Pressable
          borderWidth={1}
          borderColor="#7A83F4"
          bg="#ffff"
          px={4}
          py={1}
          borderRadius={25}
          onPress={() => alert("Transfer from Bank Account")}
        >
          <Text fontSize="12" color="#7A83F4" fontWeight="700" fontStyle="bold" fontFamily="inter">
            Transfer from Bank Account
          </Text>
           <Icon
             as={Ionicons}
             name="chevron-forward"
             size={5}
             color="#7A83F4"
             left={300}
            />
        </Pressable>
        <Pressable
          bg="#ffff"
          px={4}
          py={1}
          borderRadius={25}
          borderWidth={1}
          borderColor="#7A83F4"
          onPress={() => alert("Transfer to Bank Account")}
        >
          <Text fontSize="12" color="#7A83F4" fontWeight="700" fontFamily="inter" fontStyle="bold">
            Transfer to Bank Account
          </Text>
          <Icon
             as={Ionicons}
             name="chevron-forward"
             size={5}
             color="#7A83F4"
             left={300}
             p={-5}
            />
        </Pressable>
      </VStack>
      
      {/* Rest of your component content */}
    </Box>
  );
}