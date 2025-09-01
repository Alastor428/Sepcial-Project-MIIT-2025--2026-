import React, { useState } from "react";
import { Box, Text, HStack, Center, Icon, Pressable, Alert } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import PinInputSection from "../../../../components/pin_input_section";
import axios from "axios";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "TransferPinScreen"
>;
type RouteProps = RouteProp<RootStackParamList, "TransferPinScreen">;

const TransferPinScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  const { sender, recipient, amount } = route.params;
  const [pinError, setPinError] = useState("");

  const handlePinContinue = async (enteredPin: string) => {
    if (enteredPin !== sender.pin) {
      setPinError("Incorrect PIN");
      return;
    }

    // Simulate transfer using dummy backend
    try {
      // Update sender balance
      sender.balance = sender.balance - Number(amount);
      // Update recipient balance
      recipient.balance = recipient.balance + Number(amount);

      console.log("Transfer successful!");
      console.log("Sender new balance:", sender.balance);
      console.log("Recipient new balance:", recipient.balance);

      // In real backend, you would call an API to save these balances

      navigation.navigate("HomeMain", { loggedInUser: sender });
    } catch (error) {
      console.error(error);
      setPinError("Transfer failed");
    }
  };

  return (
    <Box flex={1} bg="#fff" safeArea>
      <HStack alignItems="center" px={4} pt={2} pb={4} mb={-20}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
        </Pressable>
        <Center flex={1}>
          <Text fontSize="24" fontWeight="bold" color="#7A83F4">
            Transfer
          </Text>
        </Center>
        <Box w={6} />
      </HStack>

      <Center mt={20}>
        <Text fontSize="16" mb={2}>
          Enter your PIN to confirm transfer
        </Text>
        {pinError ? <Text color="red.500">{pinError}</Text> : null}
      </Center>

      <PinInputSection onContinue={handlePinContinue} />
    </Box>
  );
};

export default TransferPinScreen;
