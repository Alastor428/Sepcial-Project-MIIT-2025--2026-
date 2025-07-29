import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Pressable,
  Icon,
  Input,
  Center,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function EnterPinScreen({ navigation }: any) {
  const [pin, setPin] = useState<string>("");

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

      {/* PIN Input */}
      <VStack mt={10} alignItems="center" space={6}>
        <Text fontSize="md" color="#4C3FA7">
          Enter Your PIN
        </Text>

        <Input
          value={pin}
          onChangeText={(text) => setPin(text.replace(/[^0-9]/g, ""))}
          placeholder="Enter 6-digit PIN"
          maxLength={6}
          keyboardType="numeric"
          secureTextEntry
          textAlign="center"
          fontSize="xl"
          borderColor="#4C3FA7"
          borderWidth={1.5}
          borderRadius={10}
          px={4}
          py={3}
          w="60%"
        />

        <Pressable
          mt={6}
          alignSelf="center"
          px={8}
          py={2}
          bg="#4C3FA7"
          borderRadius={8}
          onPress={() => {
            if (pin.length === 6) {
              console.log("Entered PIN:", pin);
              // add navigation or validation here
            } else {
              alert("Please enter a 6-digit PIN");
            }
          }}
        >
          <Text color="#fff" fontWeight="bold">
            Continue
          </Text>
        </Pressable>
      </VStack>
    </Box>
  );
}
