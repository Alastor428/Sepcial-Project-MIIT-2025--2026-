import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Pressable,
  Icon,
  Input,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function EnterPinScreen({ navigation }: any) {
  const [pin, setPin] = useState<string>("");

  return (
    <Box flex={1} bg="#fff" safeArea>
      {/* Header */}
      <Box px={4} pt={4} pb={2}>
        <HStack alignItems="center" space={3}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-back" size={6} color="#7A5DE8" />
          </Pressable>
          <Text fontSize="2xl" fontWeight="bold" color="#7A5DE8">
            Transfer
          </Text>
        </HStack>
      </Box>

      {/* PIN Section */}
      <VStack mt={10} alignItems="center" space={6}>
        <Text fontSize="md" color="#7A5DE8">
          Enter Your Pin
        </Text>

        {/* Hidden Input for keyboard */}
        <Input
          value={pin}
          onChangeText={(text) => setPin(text.replace(/[^0-9]/g, ""))}
          keyboardType="numeric"
          maxLength={6}
          secureTextEntry
          autoFocus
          opacity={0} // hide the input
          h={0}
          w={0}
        />

        {/* PIN Boxes */}
        <HStack space={3}>
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              w={10}
              h={10}
              borderWidth={1.5}
              borderColor="#7A5DE8"
              borderRadius={6}
              justifyContent="center"
              alignItems="center"
              bg="#fff"
            >
              <Text fontSize="xl" color="#7A5DE8">
                {pin[index] ? "●" : ""}
              </Text>
            </Box>
          ))}
        </HStack>

        {/* Continue Button */}
        <Pressable
          mt={6}
          alignSelf="center"
          px={12}
          py={3}
          bg="#7A5DE8"
          borderRadius={20}
          onPress={() => {
            if (pin.length === 6) {
              console.log("Entered PIN:", pin);
              // add navigation or validation here
            } else {
              alert("Please enter a 6-digit PIN");
            }
          }}
        >
          <Text color="#fff" fontWeight="bold" fontSize="md">
            Continue
          </Text>
        </Pressable>
      </VStack>
    </Box>
  );
}
