import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
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
} from "native-base";

export default function PinEntryScreen() {
  const navigation = useNavigation();
  const [pin, setPin] = useState("");
  const[amount, setAmount] = useState("");

  function handleKeyPress(key: string) {
    if (key === "back") {
      setPin((prev) => prev.slice(0, -1));
    } else if (key === "enter") {
      handleSubmit();
    } else if (pin.length < 6) {
      setPin((prev) => prev + key);
    }
  }

  const handleSubmit = () => {
    if (pin.length === 6) {
      console.log("Submitting PIN:", pin);
    }
  };

  return (
    <Box flex={1} bg="#7A83F4" px={6} pt={16} pb={10}>
      {/* Header */}
      <HStack alignItems="center" mb={8}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-back" size={6} color="#fff" mr={4} />
        </Pressable>
        <Text color="#fff" fontSize="xl" fontWeight="bold">
          Cash In
        </Text>
      </HStack>
      <VStack alignItems="center" mt={4}>
        <Text color="#fff" fontSize="lg" mb={8}>
          Enter Your Pin
        </Text>
        <HStack justifyContent="space-between" w="80%" mb={12}>
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              w="12%"
              h={12}
              borderBottomWidth={2}
              borderBottomColor="#fff"
              justifyContent="center"
              alignItems="center"
            >
              {pin[index] ? (
                <Text color="#fff" fontSize="xl" fontWeight="bold">
                  •
                </Text>
              ) : null}
            </Box>
          ))}
        </HStack>
        <Pressable
          w="80%"
          p={4}
          bg="#536FA0"
          borderRadius={8}
          alignItems="center"
          onPress={handleSubmit}
          isDisabled={pin.length !== 6}
          opacity={pin.length !== 6 ? 0.5 : 1}
        >
          <Text color="#fff" fontSize="lg" fontWeight="bold">
            Continue
          </Text>
        </Pressable>
      </VStack>
      <HStack space={2} alignItems="center" w="90%" mt={-20}>
      <Text  fontSize="lg" color="#7A83F4">
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
  if (!label) {
    return <View style={{ width: "24%", aspectRatio: 1 }} />;
  }

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
        {label === "back" ? (
          <Icon as={Ionicons} name="backspace" size={5} color="#333" />
        ) : (
          <Text fontSize="xl" color="#333">
            {label}
          </Text>
        )}
      </Pressable>
    </View>
  );
}