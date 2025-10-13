import React from "react";
import { Box, Text, HStack, Center, Pressable, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import PinInputSection from "../../../../components/pin_input_section";

type PinScreenNavigationProp = StackNavigationProp<RootStackParamList, "PinScreen">;
type PinScreenRouteProp = RouteProp<RootStackParamList, "PinScreen">;

const PinScreen: React.FC = () => {
  const navigation = useNavigation<PinScreenNavigationProp>();
  const route = useRoute<PinScreenRouteProp>();

  const { sender, recipient, amount, bankAccount } = route.params;

  const handlePinContinue = (enteredPin: string) => {
    if (enteredPin !== sender.pin) {
      alert("Incorrect PIN");
      return;
    }

    const transactionData = {
      sender,
      recipient: {
        userId: recipient.userId || "",
        name: recipient.name || bankAccount || "Unknown Recipient",
      },
      amount: Number(amount),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    navigation.navigate("TransactionDetailsScreen", { transactionData });
  };

  return (
    <Box flex={1} bg="#fff" safeArea>
      {/* Header */}
      <HStack alignItems="center" px={4} pt={2} pb={4} mb={10}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
        </Pressable>
        <Center flex={1}>
          <Text fontSize="24" fontWeight="bold" color="#7A83F4">
            Transfer PIN
          </Text>
        </Center>
        <Box w={6} />
      </HStack>

      {/* Instruction */}
      <Center>
        <Text fontSize="20" color="#7A83F4" mb={16}>
          Enter Your PIN
        </Text>
      </Center>

      {/* PIN Input */}
      <PinInputSection onContinue={handlePinContinue} />
    </Box>
  );
};

export default PinScreen;
