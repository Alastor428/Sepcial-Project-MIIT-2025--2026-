// CashInScreen.tsx
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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
import ContinueButton from "../../../../components/continue_button";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import type { StackNavigationProp } from "@react-navigation/stack";

type CashInScreenRouteProp = RouteProp<RootStackParamList, "CashIn">;
type CashInScreenNavigationProp = StackNavigationProp<RootStackParamList, "CashIn">;

export default function CashInScreen() {
  const route = useRoute<CashInScreenRouteProp>();
  const navigation = useNavigation<CashInScreenNavigationProp>();

  const { loggedInUser, currentAmount } = route.params ?? {};
  const [amount, setAmount] = useState(currentAmount?.toString() || "");

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

  const handleContinue = () => {
    const amountNum = Number(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const recipient = {
      name: "Bank",
      userId: "BANK-001",
      balance: 0,
      pin: "000000",
    };

    navigation.navigate("PinEntryScreen", {
      sender: loggedInUser,
      recipient,
      amount: amountNum, // ✅ now a number
    });
  };

  return (
    <Box flex={1} bg="white">
      {/* Header */}
      <Box
        bg="#B9BDF0"
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
        pt={12}
        pb={8}
        px={6}
        height={180}
      >
        <HStack alignItems="center" px={4} pt={2} pb={4} ml={-4}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-undo" size={7} color="#fff" />
          </Pressable>
          <Center flex={1}>
            <Text fontSize="32" fontWeight="bold" color="#fff">
              Cash In
            </Text>
          </Center>
          <Box w={6} />
        </HStack>
        <Center>
          <Text
            fontSize="20"
            color="#fff"
            fontWeight={"bold"}
            fontFamily={"inter"}
          >
            Transfer From Bank Account
          </Text>
        </Center>
      </Box>

      {/* Card */}
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
                  name="person-circle-outline"
                  size={7}
                  color="#fff"
                />
                <Text color="#fff" fontSize={20} fontFamily={"inter"}>
                  {loggedInUser?.name}
                </Text>
              </HStack>

              <Text
                color="#fff"
                fontSize={14}
                fontFamily={"inter"}
                opacity={0.5}
              >
                ID- {loggedInUser?.userId}
              </Text>
            </VStack>
          </HStack>

          {/* Transfer Amount */}
          <HStack justifyContent={"center"} alignItems={"center"}>
            <Text
              fontSize={16}
              fontFamily={"inter"}
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

          {/* Balance */}
          <HStack justifyContent={"center"} alignItems={"center"}>
            <Text
              fontWeight={"Medium"}
              fontSize={14}
              color={"#7A83F4"}
              mt={23}
              fontStyle={"inter"}
              opacity={0.5}
            >
              Total Balance (Ks): {loggedInUser?.balance} Ks
            </Text>
          </HStack>
        </Box>
      </HStack>

      {/* Continue Button */}
      <HStack justifyContent="center" mt={-1}>
        <ContinueButton onPress={handleContinue} />
      </HStack>
    </Box>
  );
}
