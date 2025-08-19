import React, { useState } from "react";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  Box,
  VStack,
  HStack,
  Pressable,
  Icon,
  Input,
  Modal,
  Text,
  Button,
} from "native-base";

type RouteParams = {
  accountNumber?: string;
};

export default function TransferConfirmScreen({ navigation }: any) {
  const [amount, setAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const route = useRoute<any>();
  const accountNumber = route?.params?.accountNumber ?? "Unknown";

  const maskedNumber =
    accountNumber.length > 3
      ? "******" + accountNumber.slice(-3)
      : accountNumber;

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, ""); // allow only numbers
    setAmount(cleaned);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    Alert.alert("Transfer Successful", `Transferred to ${accountNumber}`);
  };

  return (
    <Box flex={1} bg="#fff" p={4}>
      {/* Header */}
      <HStack alignItems="center" mb={6}>
        <Pressable onPress={navigation.goBack}>
          <Icon as={Ionicons} name="arrow-back" size={7} color="#7B93C7" />
        </Pressable>
        <Text flex={1} textAlign="center" fontSize="xl" fontWeight="600" color="#7B93C7">
          Transfer
        </Text>
      </HStack>

      {/* Account Info */}
      <HStack alignItems="center" mb={6}>
        <Icon
          as={Ionicons}
          name="person-circle-outline"
          size={7}
          color="#7B93C7"
          mr={2}
        />
        <VStack>
          <Text color="gray.500" fontSize="sm">
            Transferred Account Number
          </Text>
          <Text fontSize="md" fontWeight="600" color="gray.700">
            {maskedNumber}
          </Text>
        </VStack>
      </HStack>

      {/* Input Amount */}
      <VStack space={3}>
        <Text fontSize="sm" color="gray.600">
          Amount (Ks)
        </Text>
        <Input
          placeholder="Enter amount"
          keyboardType="numeric"
          fontSize="lg"
          value={amount}
          onChangeText={handleAmountChange}
        />
      </VStack>

      {/* Submit Button */}
      <Button
        mt={10}
        bg="#7B93C7"
        _text={{ fontWeight: "600" }}
        onPress={() => setShowConfirm(true)}
      >
        Continue
      </Button>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <Modal.Content maxWidth="350px">
          <Modal.Header>Confirm Transfer</Modal.Header>
          <Modal.Body>
            <Text>Transfer to - {maskedNumber}</Text>
            <Text mt={3}>Amount - {amount ? amount : "----"} Ks</Text>
          </Modal.Body>
          <Modal.Footer>
            <HStack space={3}>
              <Button variant="outline" onPress={() => setShowConfirm(false)}>
                Cancel
              </Button>
              <Button bg="#7B93C7" onPress={handleConfirm}>
                OK
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
