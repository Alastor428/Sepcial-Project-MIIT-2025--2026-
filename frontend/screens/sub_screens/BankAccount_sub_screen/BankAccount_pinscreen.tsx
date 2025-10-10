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
  Center,
} from "native-base";
import { TextInput } from "react-native";

// Define the navigation prop type
type RootStackParamList = {
  QuickPayPin: undefined;
  PaymentConfirmation: undefined;
  // Add other routes as needed
};

type NavigationProp = {
  navigate: (screenName: keyof RootStackParamList) => void;
  goBack: () => void;
};

export default function BankAccountPinScreen() {
  // Now use the typed navigation hook
  const navigation = useNavigation<NavigationProp>();
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  
  function handleKeyPress(key: string) {
    if (key === "clear") {
      setPin("");
    } else if (key === "back") {
      setPin((prev) => prev.slice(0, -1));
    } else if (pin.length < 6) {
      setPin((prev) => prev + key);
    }
  }
  
  const handleContinue = () => {
    if (pin.length === 6) {
      console.log("PIN Entered:", pin);
      // Navigate or verify PIN
      navigation.navigate("PaymentConfirmation"); // Now properly typed
    } else {
      alert("Please enter 6-digit PIN");
    }
  };
  
  return (
    <Box flex={1} bg="#fff" px={8} pt={20} pb={6}>
      {/* Header */}
      <HStack alignItems="center" mb={8}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={8} color="#7A83F4" />
        </Pressable>
        <Center flex={1}>
        <Text color="#7A83F4"fontSize="24" fontWeight="bold" pt={-20} fontFamily="inter">
          Bank Account
        </Text>
        </Center>
      </HStack>
      <VStack alignItems="center" space={4}>
        <Text fontSize="md" color="#8E7BF1" pt={5}>Enter Your Pin</Text>
        <HStack space={3} pt={24}>
          {Array(6).fill("").map((_, i) => (
            <Box key={i} w={10} h={10} borderWidth={1} borderColor="#7A83F4"borderRadius="2"alignItems="center" justifyContent="center" pt={15}>
              <Text fontSize="xl" color="#8E7BF1">{pin[i] ? "•" : ""}</Text>
            </Box>
          ))}
        </HStack>
            <HStack space={2} alignItems="center" w="90%" mt={-20}>
        <Input
        variant="unstyled"
        fontSize="lg"
      value={amount}
      onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
      keyboardType="numeric"
      flex={1}
      />
          </HStack>
        <Button
          mt={20}
          w="100%"
          borderRadius="full"
          bg="#7A83F4"
          _text={{ fontSize: "24", fontWeight: "bold", fontFamily:"inter"}}
          onPress={handleContinue}
        >
          Continue
        </Button>
      </VStack>
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
    <Pressable
      bg="#fff"
      borderWidth={1}
      borderColor="#B9BDF0"
      borderRadius={20}
      justifyContent="center"
      alignItems="center"
      w={16}
      h={20}
      onPress={onPress}
    >
     {label === "clear" ? (
        <Icon as={Ionicons} name="close-circle" size={10} color="#7A83F4" />
      ) : label === "back" ? (
        <Icon as={Ionicons} name="backspace" size={7} color="#7A83F4" />
      ) : (
        <Text fontSize="2xl" color="#7A83F4">
          {label}
        </Text>
      )}
    </Pressable>
  );
}