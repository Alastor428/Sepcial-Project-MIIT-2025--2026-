import React, { useState } from "react";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  Center,
} from "native-base";
import NextButton from "../../../components/next_button";

const ResetMobileNumberScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");

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
            Reset Mobile Number
          </Text>
        </HStack>
      </Box>

      {/* Input Field */}
      <Center>
        <HStack
          justifyContent="center"
          width="326px"
          height="56px"
          bg="white"
          borderWidth={1}
          borderColor="#7A83F4"
          borderRadius={10}
          alignItems="center"
          px={3}
        >
          <TextInput
            placeholder="Enter your new mobile number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            style={{
              flex: 1,
              fontSize: 16,
              height: "100%",
            }}
          />
        </HStack>
      </Center>

      {/* Next Button */}
      <HStack justifyContent={"center"} py={10}>
        <NextButton onPress={() => navigation.navigate("ResetPin")} />
      </HStack>
    </Box>
  );
};

export default ResetMobileNumberScreen;
