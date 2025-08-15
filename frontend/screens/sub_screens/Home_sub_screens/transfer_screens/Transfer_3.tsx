// TransferPinScreen.tsx
import React, { useState, useRef } from "react";
import { Box, Text, HStack, Center, Icon, Pressable, Input, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import ContinueButton from "../../../../components/continue_button";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const TransferPinScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<Array<any>>([]);

  const handleChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === "Backspace" && !pin[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleContinue = () => {
    const enteredPin = pin.join("");
    console.log("Entered Account PIN:", enteredPin);
    // validate and navigate
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

      {/* Body */}
      <Center flex={1} px={6} mt={-250}>
        <Text fontSize="20" mb={85} color="#7A83F4">
          Enter Your Pin
        </Text>

        {/* PIN Inputs */}
        <HStack space={3} mb={20}>
          {pin.map((value, index) => (
            <Input
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              value={value}
              onChangeText={(text) => handleChange(text.replace(/[^0-9]/g, "").slice(0, 1), index)}
              keyboardType="numeric"
              variant="unstyled"
              secureTextEntry
              textAlign="center"
              fontSize="xl"
              borderColor="#7A83F4"
              borderWidth={1}
              borderRadius={6}
              w={38}
              h={38}
              maxLength={1}
            />

          ))}
        </HStack>

        {/* Continue Button */}
        <Pressable
          w="100%"
          py={4}
          onPress={handleContinue}
          ml={5}
        >
          <ContinueButton/>
        </Pressable>
      </Center>
    </Box>
  );
};

export default TransferPinScreen;
