import React, { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Box, VStack, HStack, Text, Pressable, Icon } from "native-base";

// Dummy bank data
const dummyBankData: any = {
  KBZ: { accountName: "Kiran Linn", balance: 150000 },
  AYA: { accountName: "Kiran Linn", balance: 50000 },
  CB: { accountName: "Kiran Linn", balance: 20000 },
};

type RouteParams = {
  selectedBank: string;
  bankAccount: string;
  loggedInUser: {
    name: string;
    userId: string;
    pin: string;
  };
};

export default function BankAccountLinkScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { selectedBank, bankAccount, loggedInUser } = route.params || {};

  const [accountNumber] = useState(bankAccount);

  const bankInfo = selectedBank ? dummyBankData[selectedBank] : null;

  return (
    <Box flex={1} bg="#fff" px={4} pt={12} pb={10}>
      <HStack alignItems="center" mb={8}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" mr={4} />
        </Pressable>
        <Text fontSize={24} fontWeight="700" color="#7A83F4" marginLeft={20}>
          Bank Account
        </Text>
      </HStack>

      <Box
        bg="#7A83F4"
        borderRadius={20}
        p={6}
        mb={8}
        alignSelf="center"
        width="90%"
        height="180"
        shadow={2}
      >
        <VStack space={3}>
          <Text color="#fff" fontSize={16} fontWeight="700">
            {selectedBank || "Bank Not Selected"}
          </Text>
          <HStack>
            <Text color="#fff" fontSize={12}>
            Bank Account Number:
          </Text>
          <Text color="#fff" fontSize={16} fontWeight="700">
            {accountNumber || "Not Provided"}
          </Text>
          </HStack>
          {bankInfo && (
            <>
              <Text color="#fff" fontSize={14}>
                Account Name: {bankInfo.accountName}
              </Text>
              <Text color="#fff" fontSize={14}>
                Balance: {bankInfo.balance} Ks
              </Text>
            </>
          )}
        </VStack>
      </Box>

      <VStack space={4} mb={4} width={"90%"} ml={4}>
        <Pressable
          borderWidth={1}
          borderColor="#7A83F4"
          bg="#fff"
          px={8}
          py={3}
          borderRadius={5}
          onPress={() =>
            navigation.navigate("BankAccountPin", {
              selectedBank,
              bankAccount,
              loggedInUser,
              amount: bankInfo?.balance || 0,
            })
          }
        >
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontSize="14" color="#7A83F4" fontWeight="700">
              Transfer from Bank Account
            </Text>
            <Icon as={Ionicons} name="chevron-forward" size={5} color="#7A83F4" />
          </HStack>
        </Pressable>

        <Pressable
          borderWidth={1}
          borderColor="#7A83F4"
          bg="#fff"
          px={8}
          py={3}
          borderRadius={5}
          onPress={() => alert("Transfer to Bank Account")}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontSize="14" color="#7A83F4" fontWeight="700">
              Transfer to Bank Account
            </Text>
            <Icon as={Ionicons} name="chevron-forward" size={5} color="#7A83F4" />
          </HStack>
        </Pressable>
      </VStack>
    </Box>
  );
}
