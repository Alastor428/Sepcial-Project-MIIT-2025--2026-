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
import TransferConfirmModal from "../../../../components/transfer_comfirm_modal";

export default function TransferAmountScreen({ navigation, route }: any) {
  const { recipient } = route.params; // recipient info passed from previous screen
  const [amount, setAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // Mask phone number: show only last half
  const maskPhone = (phone: string) => {
    if (!phone) return "";
    const half = Math.floor(phone.length / 2);
    return "*".repeat(half) + phone.slice(half);
  };

  // Handle transfer button press
  const onTransferPress = () => {
    const numericAmount = parseFloat(amount);

    if (!amount || isNaN(numericAmount)) {
      alert("Please enter a valid amount.");
      return;
    }

    if (numericAmount > recipient.balance) {
      alert("Insufficient balance. Please enter a lower amount.");
      setAmount(""); // clear input field
      return;
    }

    // Show confirmation modal
    setShowConfirm(true);
  };

  // Handle confirm in modal
  const handleConfirm = () => {
    setShowConfirm(false);
    navigation.navigate("TransferPinScreen", {
      recipient,
      amount,
    });
    setAmount(""); // clear input after success
    // TODO: Call your backend API here to actually perform the transfer
  };

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
              {recipient.name}
            </Text>
            <Text color="#7A83F4" fontSize="sm">
              {maskPhone(recipient.phone)}
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
            onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
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
              {recipient.balance.toFixed(2)} Ks
            </Text>
          </HStack>
        </VStack>

        {/* Transfer Button */}
        <TransferButton onPress={onTransferPress} />
      </VStack>

      {/* confirm modal is called here and I need to change handle confirm  here */}
      <TransferConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        recipient={recipient}
        amount={amount}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}
