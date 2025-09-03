
import React from "react";
import { Box, Text, HStack, Center, Icon, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import PinInputSection from "../../../../components/pin_input_section";

type TopUpPinScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TopUpPinScreen"
>;
type TopUpPinScreenRouteProp = RouteProp<
  RootStackParamList,
  "TopUpPinScreen"
>;

const TopUpPinScreen: React.FC = () => {
  const navigation = useNavigation<TopUpPinScreenNavigationProp>();
  const route = useRoute<TopUpPinScreenRouteProp>();

  const { sender, recipient, amount } = route.params;

  const handlePinContinue = (enteredPin: string) => {
    if (enteredPin !== sender.pin) {
      alert("Incorrect PIN");
      return;
    }

    const amountNum = Number(amount);
    sender.balance -= amountNum;
    recipient.balance += amountNum;

    const transactionData = {
      sender,
      recipient,
      amount: amountNum,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    navigation.navigate("TransactionDetailsScreen", { transactionData });
  };

  return (
    <Box flex={1} bg="#fff" safeArea>
      <HStack alignItems="center" px={4} pt={2} pb={4} mb={10}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
        </Pressable>
        <Center flex={1}>
          <Text fontSize="24" fontWeight="bold" color="#7A83F4">
            Top Up
          </Text>
        </Center>
        <Box w={6} />
      </HStack>
      <Center>
          <Text fontSize="20"  color="#7A83F4" mb={16}>
              Enter Your PIN
          </Text>
        </Center>
      <PinInputSection onContinue={handlePinContinue} />
    </Box>
  );
};

export default TopUpPinScreen;
