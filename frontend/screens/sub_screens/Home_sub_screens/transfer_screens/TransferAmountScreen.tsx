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
import TransferButton from "../../../../components/transfer_button";

export default function TransferAmountScreen({ navigation }: any) {
  const [amount, setAmount] = useState("");
  const onTransfer = () => {
    navigation.navigate({
      name: "TransferConfirmScreen",
      params: { currentAmount: amount || undefined },
      merge: true,
    });
  };
  return (
    <Box flex={1} bg="#fff">
      <Box px={4} pt={12} pb={4} ml={-4}>
        <HStack alignItems="center" px={4} pt={2} pb={4}>
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
      </Box>

      {/* Recipient Info */}
      <VStack px={6} mt={4} space={3}>
        <HStack alignItems="center" space={3}>
          <Icon
            as={Ionicons}
            name="person-circle-outline"
            size={10}
            color="#7A83F4"
          />
          <VStack>
            <Text fontWeight="medium" color="#7A83F4" fontSize="lg">
              Transferred Account Name
            </Text>
            <Text color="#7A83F4" fontSize="sm">
              ******789
            </Text>
          </VStack>
        </HStack>

        {/* Amount Input */}
        <VStack mt={6} space={2}>
          <Text color="#7A83F4" fontSize="lg">
            Amount (Ks)
          </Text>
          <Input
            variant="unstyled"
            placeholder="Enter Amount"
            fontSize="lg"
            value={amount}
            onChangeText={
              (text) => setAmount(text.replace(/[^0-9.]/g, "")) // allow only numbers and dot
            }
            keyboardType="numeric"
          />
          <HStack justifyContent="space-between" mt={2}>
            <HStack alignItems="center" space={1}>
              <Text color="#7A83F4" fontSize="xs">
                Available Balance
              </Text>
              <Icon as={Ionicons} name="eye-outline" size={4} color="#7A83F4" />
            </HStack>
            <Text color="#7A83F4" fontSize="xs">
              1000.00ks
            </Text>
          </HStack>
        </VStack>

        <TransferButton onPress={onTransfer} />
      </VStack>
    </Box>
  );
}
