import React, { useState } from "react";
import { TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Text,
  Pressable,
  Icon,
  Select,
  CheckIcon,
  VStack,
} from "native-base";
import ContinueButton from "../../../components/continue_button";

export default function LinkBankAccountScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { loggedInUser } = route.params || {};

  const [selectedBank, setSelectedBank] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const handleContinue = () => {
    if (!selectedBank) {
      alert("Please select your bank");
      return;
    }

    if (!bankAccount.trim()) {
      alert("Please enter your bank account number");
      return;
    }

    // ✅ Navigate to PIN screen with dummy bank data and logged-in user for PIN verification
    navigation.navigate("BankAccountPin", {
      selectedBank,
      bankAccount,
      amount: 50000, // dummy amount
      loggedInUser,
    });
  };

  return (
    <Box flex={1} bg="#fff" px={5} pt={20} pb={10}>
      <HStack alignItems="center" mb={8}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={8} color="#7A83F4" mr={4} />
        </Pressable>
        <Text fontSize="20" fontWeight="700" color="#7A83F4">
          Link Bank Account
        </Text>
      </HStack>

      <Text fontSize="20" mb={6} color="#7A83F4">
        Enter Bank Account
      </Text>

      <VStack space={5}>
        <Select
          selectedValue={selectedBank}
          placeholder="Select Bank"
          borderColor="#7A83F4"
          borderRadius={10}
          _selectedItem={{
            bg: "#7A83F4",
            endIcon: <CheckIcon size="5" color="#fff" />,
          }}
          onValueChange={(value) => setSelectedBank(value)}
        >
          <Select.Item label="KBZ Bank" value="KBZ" />
          <Select.Item label="AYA Bank" value="AYA" />
          <Select.Item label="CB Bank" value="CB" />
          <Select.Item label="AGD Bank" value="AGD" />
          <Select.Item label="Yoma Bank" value="Yoma" />
          <Select.Item label="MTB Bank" value="MTB" />
          <Select.Item label="MEB Bank" value="MEB" />
          <Select.Item label="MAB Bank" value="MAB" />
          <Select.Item label="MADB Bank" value="MADB" />
          <Select.Item label="GTB Bank" value="GTB" />
          <Select.Item label="MFTB Bank" value="MFTB" />
        </Select>

        <TextInput
          value={bankAccount}
          onChangeText={setBankAccount}
          keyboardType="numeric"
          placeholder="Enter account number"
          style={{
            borderWidth: 1,
            borderColor: "#7A83F4",
            borderRadius: 10,
            padding: 12,
            fontSize: 18,
            color: "#000",
          }}
        />
      </VStack>

      <HStack justifyContent="center" mt={12}>
        <ContinueButton onPress={handleContinue} />
      </HStack>
    </Box>
  );
}
