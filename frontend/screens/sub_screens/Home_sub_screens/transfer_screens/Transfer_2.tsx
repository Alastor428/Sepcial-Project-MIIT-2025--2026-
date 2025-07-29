import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Icon,
  Pressable,
  Center,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function TransferAmountScreen({ navigation }: any) {
  const [amount, setAmount] = useState("");

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box px={4} pt={12} pb={4}>
        <HStack alignItems="center" space={3}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-back" size={6} color="#4C3FA7" />
          </Pressable>
          <Text fontSize="2xl" fontWeight="bold" color="#4C3FA7">
            Transfer
          </Text>
        </HStack>
      </Box>

      {/* Recipient Info */}
      <VStack px={6} mt={4} space={3}>
        <HStack alignItems="center" space={3}>
          <Icon
            as={Ionicons}
            name="person-circle-outline"
            size={6}
            color="#4C3FA7"
          />
          <VStack>
            <Text fontWeight="medium" color="#4C3FA7">
              Transferred Account Name
            </Text>
            <Text color="#4C3FA7" fontSize="sm">
              ******789
            </Text>
          </VStack>
        </HStack>

        {/* Amount Input */}
        <VStack mt={6} space={2}>
          <Text color="#4C3FA7">Amount (Ks)</Text>
          <Input
            variant="unstyled"
            placeholder="Enter Amount"
            fontSize="lg"
            value={amount}
            onChangeText={(text) =>
              setAmount(text.replace(/[^0-9.]/g, "")) // allow only numbers and dot
            }
            keyboardType="numeric"
          />
          <HStack justifyContent="space-between" mt={2}>
            <HStack alignItems="center" space={1}>
              <Text color="#4C3FA7" fontSize="xs">
                Available Balance
              </Text>
              <Icon as={Ionicons} name="eye-outline" size={4} color="#4C3FA7" />
            </HStack>
            <Text color="#4C3FA7" fontSize="xs">
              1000.00ks
            </Text>
          </HStack>
        </VStack>

        <Pressable
          mt={6}
          alignSelf="center"
          px={8}
          py={2}
          bg="#4C3FA7"
          borderRadius={8}
          onPress={() => console.log("Transfer amount:", amount)}
        >
          <Text color="#fff" fontWeight="bold">
            Transfer
          </Text>
        </Pressable>
      </VStack>
    </Box>
  );
}
