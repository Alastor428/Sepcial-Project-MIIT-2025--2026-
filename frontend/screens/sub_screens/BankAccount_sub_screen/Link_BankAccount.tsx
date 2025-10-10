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
  Button,
  Input,
} from "native-base";

export default function LinkBankAccountScreen() {
  const navigation = useNavigation();
  const [bankAccount, setBankAccount] = useState("");

  const handleKeyPress = (key) => {
    if (key === "clear") {
      setBankAccount("");
    } else if (key === "arrow-undo") {
      setBankAccount((prev) => prev.slice(0, -1));
    } else {
      setBankAccount((prev) => prev + key);
    }
  };

  const handleContinue = () => {
    if (bankAccount.length > 0) {
    } else {
      alert("Please enter your bank account number");
    }
  };
  return (
    <Box flex={1} bg="#fff" px={5} pt={20} pb={10}>
      <HStack alignItems="center" mb={8}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={8} color="#7A83F4" mr={4} bg="#ffff" />
        </Pressable>
        <Text fontSize="20" fontWeight="700" color="#7A83F4" fontFamily="inter">
          Link Bank Account
        </Text>
      </HStack>

      {/* Instruction Text */}
      <Text fontSize="20" mb={12} color="#7A83F4" mt={24}>
        Enter Bank Account
      </Text>

      {/* Input Field */}
      <Input
        borderRadius="1"
        borderColor="#7A83F4"
        mb={20}
      />

      {/* Continue Button */}
      <Button
        bg="#7A83F4"
        borderRadius="full"
        _text={{ fontSize: "md", fontWeight: "bold", color: "#fff" }}
        mb={8}
        onPress={handleContinue}
      >
        Continue
      </Button>

      {/* Numeric Keypad */}
     
    </Box>
  );
}

function KeypadButton({ label, onPress }) {
  return (
    <Pressable
      bg="#E0E0E0"
      borderRadius={8}
      justifyContent="center"
      alignItems="center"
      w={16}
      h={16}
      onPress={onPress}
    >
      {label === "x" ? (
        <Icon as={Ionicons} name="close-circle" size={6} color="#000" />
      ) : label === "→" ? (
        <Icon as={Ionicons} name="arrow-forward-circle" size={6} color="#000" />
      ) : (
        <Text fontSize="xl" color="#000">
          {label}
        </Text>
      )}
    </Pressable>
  );
}