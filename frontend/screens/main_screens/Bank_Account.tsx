import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  VStack,
  Text,
  Pressable,
  Icon,
  Center,
  HStack,
} from "native-base";

// Define the stack param list for your BankAccount stack
type BankAccountStackParamList = {
  BankAccount: undefined;
  LinkBankAccount: undefined;
};

export default function BankAccountScreen() {
  // Correctly typed navigation
  const navigation = useNavigation<NativeStackNavigationProp<BankAccountStackParamList>>();

  return (
    <Box flex={1} bg="#fff">
      {/* Header Section */}
      <Box
        bg="#B9BDF0"
        borderBottomRadius={30}
        height={304}
        pt={4} pb={2}
        alignItems="center"
        
      >
        <HStack  alignItems="center" mt={75}>
          <Text
          flex={1} textAlign="center"
          color="#fff"
          fontSize={32}
          fontWeight="bold"
          fontFamily="Inter"
        >
          Bank Account
        </Text>
        </HStack>
      </Box>

      {/* Main Content */}
      <VStack flex={1} justifyContent="space-between" alignItems="center" px={10} mt={8} mb={40} space={6}>
        {/* Description */}
        <Text
          fontSize={16}
          fontWeight="400"
          textAlign="center"
          color="#B9BDF0"
        >
          Easily Cash in/Cash out from your bank account
        </Text>

        {/* Link Bank Account Button */}
        <Pressable onPress={() => navigation.navigate("LinkBankAccount")}>
          <Box
            bg="#fff"
            borderRadius={10}
            py={3}
            px={10}
            flexDirection="row"
            alignItems="center"
            borderWidth={1}
            borderColor="#7A83F4"
          >
            <Icon
              as={Ionicons}
              name="add-circle-outline"
              size={8}
              color="#B9BDF0"
              mr={2}
            />
            <Text
              color="#B9BDF0"
              fontSize={16}
              fontWeight="400"
              fontFamily="Inter"
            >
              Link Bank Account
            </Text>
          </Box>
        </Pressable>
      </VStack>
    </Box>
  );
}
