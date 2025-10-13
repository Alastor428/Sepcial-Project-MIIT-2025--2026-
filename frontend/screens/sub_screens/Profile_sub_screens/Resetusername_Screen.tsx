// ResetUsernameScreen.tsx
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Text,
  Pressable,
  Icon,
  Center,
  HStack,
} from "native-base";
import { TextInput } from "react-native";
import NextButton from "../../../components/next_button";

const ResetUsernameScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  const handleNext = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    // Navigate to ResetPinScreen and pass the name as defaultName
    navigation.navigate("ResetPin", {
      defaultName: name,
      phone: "user-phone-number", // pass the user's phone if needed
      onLoginSuccess: (user: any) => {
        console.log("Login Success:", user);
        // You can navigate to dashboard or transaction screen here
      },
      onBack: () => navigation.goBack(),
    });
  };

  return (
    <Box flex={1} bg="white">
      {/* Header */}
      <Box
        bg="white"
        p={4}
        flexDirection="row"
        mb={20}
        justifyContent="space-between"
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={8} color="#7A83F4" mt={"50px"} />
        </Pressable>
        <HStack justifyContent={"center"}>
          <Text fontSize="24" fontWeight="bold" color="#7A83F4" mt={"50px"} mr={20}>
            Reset Username
          </Text>
        </HStack>
      </Box>

      {/* Input Field */}
      <Center>
        <HStack
          justifyContent={"center"}
          width={"326px"}
          height={"56px"}
          backgroundColor={"white"}
          borderWidth={1}
          borderColor={"#7A83F4"}
          borderRadius={10}
        >
          <TextInput
            placeholder="Enter your new username"
            value={name}
            onChangeText={setName}
            keyboardType="default"
            style={{
              padding: 12,
              fontSize: 16,
            }}
          />
        </HStack>
      </Center>

      {/* Next Button */}
      <HStack justifyContent={"center"} py={10}>
        <NextButton onPress={handleNext} />
      </HStack>
    </Box>
  );
};

export default ResetUsernameScreen;
