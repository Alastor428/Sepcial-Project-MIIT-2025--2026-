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
  Modal,
} from "native-base";

export default function CashInBankTransferScreen() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(true);

  function handleKeyPress(key: string) {
    if (key === "clear") {
      setAmount("");
    } else if (key === "back") {
      setAmount((prev) => prev.slice(0, -1));
    } else {
      setAmount((prev) => prev + key);
    }
  }

  const handleCancel = () => {
    setShowModal(false);
    navigation.goBack();
  };

  const handleConfirm = () => {
    if (amount) {
      console.log("Transfer amount:", amount);
      setShowModal(false);
    }
  };

  return (
    <Box flex={1} bg="#8E7BF1" px={6} pt={16} pb={10}>
      {/* Header */}
      <HStack alignItems="center" mb={2}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-back" size={6} color="#fff" mr={4} />
        </Pressable>
        <Text color="#fff" fontSize="xl" fontWeight="bold">
          Cash In
        </Text>
      </HStack>
      <Modal isOpen={showModal} size="lg" onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            <HStack alignItems="center">
              <Icon
                as={MaterialIcons}
                name="account-balance"
                size={5}
                mr={2}
                color="#536FA0"
              />
              <Text fontSize="md" fontWeight="bold" color="#536FA0">
                Transfer from Your Banks Account
              </Text>
            </HStack>
          </Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Text fontSize="sm" color="#555">Account Number</Text>
              <Text fontSize="lg" fontWeight="bold" color="#536FA0">
                *****123
              </Text>
              
              <Text fontSize="sm" color="#555" mt={2}>Amount</Text>
              <HStack
                alignItems="center"
                borderBottomWidth={1}
                borderColor="#ccc"
                mt={1}
                pb={1}
              >
                <Input
                  flex={1}
                  value={amount}
                  placeholder="Amount- ( --- )Ks"
                  fontSize="lg"
                  variant="unstyled"
                  isReadOnly
                  keyboardType="numeric"
                />
                <Text fontSize="md" fontWeight="bold" color="#536FA0">
                  Ks
                </Text>
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <HStack space={4} justifyContent="flex-end">
              <Pressable onPress={handleCancel}>
                <Text color="#8E7BF1" fontSize="md" fontWeight="bold">
                  Cancel
                </Text>
              </Pressable>
              <Pressable onPress={handleConfirm}>
                <Text color="#8E7BF1" fontSize="md" fontWeight="bold">
                  OK
                </Text>
              </Pressable>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <HStack space={2} alignItems="center" w="90%" mt={-20}>
        <Text fontSize="lg" color="#7A83F4">
          Amount
        </Text>
        <Input
        variant="unstyled"
        placeholder="Enter Amount"
        fontSize="lg"
      value={amount}
      onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
      keyboardType="numeric"
      flex={1}
      />
          </HStack>
    </Box>
  );
}

function KeypadButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <View style={{ width: "24%", aspectRatio: 1 }}>
      <Pressable
        bg="#F3F3F3"
        borderRadius={12}
        justifyContent="center"
        alignItems="center"
        flex={1}
        onPress={onPress}
      >
        {label === "clear" ? (
          <Icon as={Ionicons} name="close-circle" size={5} color="#333" />
        ) : label === "back" ? (
          <Icon as={Ionicons} name="arrow-back" size={5} color="#333" />
        ) : (
          <Text fontSize="xl" color="#333">
            {label}
          </Text>
        )}
      </Pressable>
    </View>
  );
}