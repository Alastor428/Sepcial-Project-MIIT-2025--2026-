// CashInScreen.tsx
import React, { useState } from "react";
import { TextInput } from "react-native";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  Center,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ContinueButton from "../../../../components/continue_button";
import axios from "axios";

export default function CashInScreen({ navigation, route }: any) {
  const [amount, setAmount] = useState("");

  // Get data from route params
  const { loggedInUser, selectedBank = "KBZ", bankAccount = "00123456789" } =
    route.params || {};

  if (!loggedInUser) {
    return (
      <Center flex={1}>
        <Text>No user data available</Text>
        <Pressable mt={4} onPress={() => navigation.navigate("HomeMain")}>
          <Text color="#7A83F4" fontWeight="bold">
            Go Back Home
          </Text>
        </Pressable>
      </Center>
    );
  }

  const onTransferPress = () => {
    const numericAmount = parseFloat(amount);

    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    navigation.navigate("PinScreen", {
      sender: loggedInUser,
      recipient: {
        name: selectedBank,
        accountNumber: bankAccount,
      },
      amount: numericAmount,
      bankaccount: bankAccount,
    });
    setAmount("");
  };

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box bg="#B9BDF0" height={180} borderBottomRadius={20}>
        <HStack alignItems="center" px={4} py={"15%"}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-undo" size="7" color="#fff" />
          </Pressable>
          <Text
            fontSize="32"
            fontWeight="bold"
            fontStyle={"inter"}
            color="#fff"
            mx={"auto"}
          >
            Cash In
          </Text>
        </HStack>

        <Center>
          <Text fontSize="20" fontWeight="bold" color="#fff" mt={-10}>
            Transfer From Bank Account
          </Text>
        </Center>
      </Box>

      {/* Bank Card */}
      <HStack justifyContent="center">
        <Box
          width={328}
          height={256}
          bg={"#fff"}
          borderRadius={20}
          shadow={5}
          mt={31}
          mb={10}
        >
          {/* Bank Info */}
          <HStack
            px={4}
            pt={4}
            bg={"#7a83f4"}
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            justifyContent={"center"}
            height={104}
          >
            <VStack justifyContent={"center"} alignItems={"center"}>
              <HStack mb={2}>
                <Icon
                  as={Ionicons}
                  name="bank-outline"
                  size={7}
                  color="#fff"
                />
                <Text color="#fff" fontSize={20}>
                  {selectedBank}
                </Text>
              </HStack>
              <Text color="#fff" fontSize={14} opacity={0.5}>
                Account - {bankAccount}
              </Text>
            </VStack>
          </HStack>

          {/* Amount Input */}
          <HStack justifyContent={"center"} alignItems={"center"}>
            <Text
              fontSize={16}
              color={"#7A83F4"}
              mt={14}
              fontWeight={"medium"}
            >
              Transfer Amount
            </Text>
          </HStack>
          <HStack
            width={"80%"}
            style={{ justifyContent: "center" }}
            mx={"auto"}
          >
            <TextInput
              style={{
                flex: 1,
                borderWidth: 0,
                fontSize: 18,
                paddingVertical: 8,
                paddingHorizontal: 4,
                borderBottomColor: "#7A83F4",
                borderBottomWidth: 2,
              }}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9.]/g, "");
                const parts = cleaned.split(".");
                const normalized =
                  parts.length > 2
                    ? parts[0] + "." + parts.slice(1).join("")
                    : cleaned;
                setAmount(normalized);
              }}
            />
            <Text fontSize="lg" color="#7A83F4" ml={2}>
              Ks
            </Text>
          </HStack>

          {/* Total Balance */}
          <HStack justifyContent={"center"} alignItems={"center"}>
            <Text
              fontSize={14}
              color={"#7A83F4"}
              mt={23}
              opacity={0.5}
            >
              Total Balance (Ks): {loggedInUser?.balance ?? 0} Ks
            </Text>
          </HStack>
        </Box>
      </HStack>

      {/* Continue Button */}
      <HStack justifyContent="center">
        <ContinueButton onPress={onTransferPress} />
      </HStack>
    </Box>
  );
}
