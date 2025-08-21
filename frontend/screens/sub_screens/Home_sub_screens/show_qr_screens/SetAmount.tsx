import React, { useState } from "react";
import { Box, Center, Text, HStack, Icon, Pressable } from "native-base";
import { TextInput } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import NextButton from "../../../../components/next_button";
import { Ionicons } from "@expo/vector-icons";

type Props = StackScreenProps<RootStackParamList, "SetAmountScreen">;

export default function SetAmountScreen({ navigation, route }: Props) {
  const { loggedInUser, currentAmount } = route.params;
  const [amount, setAmount] = useState(currentAmount || "");

  const onNext = () => {
    if (!amount) return;
    navigation.navigate("QR", { loggedInUser, currentAmount: amount });
  };

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box bg="#fff" pt={20} pb={2} px={8} alignItems="flex-start">
        <HStack alignItems="center" px={4} pt={2} pb={4} ml={-4}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
          </Pressable>
          <Center flex={1}>
            <Text fontSize="24" fontWeight="bold" color="#7A83F4">
              Set Amount
            </Text>
          </Center>
          <Box w={6} />
        </HStack>
      </Box>

      {/* Input Section */}
      <Center flex={1} px={4}>
        <Box
          w="90%"
          alignItems="center"
          borderWidth={2}
          borderColor="#7A83F4"
          borderRadius={8}
          shadow={2}
          mt={-80}
          marginY={30}
          marginX={4}
          width={344}
          height={208}
          px={4}
          py={2}
          bg="#fff"
        >
          <HStack width="100%" mb={5}>
            <Text fontSize="lg" color="#7A83F4" mr={3}>
              Amount
            </Text>
          </HStack>

          <HStack mb={10} alignItems="center">
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

          <NextButton onPress={onNext} />
        </Box>
      </Center>
    </Box>
  );
}
