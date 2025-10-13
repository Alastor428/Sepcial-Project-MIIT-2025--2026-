import React, { useRef, useState } from "react";
import { Box, HStack, Text, Pressable, Icon, Center } from "native-base";
import { TextInput } from "react-native";
import NextButton from "../../../components/next_button";
import { Ionicons } from "@expo/vector-icons";

interface ResetPasswordScreenProps {
  navigation: any;
  defaultName?: string;
  phone?: string;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  navigation,
  defaultName = "User",
  phone = "user-phone-number",
}) => {
  const PIN_LENGTH = 6;
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < PIN_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !pin[index] && index > 0) {
      const newPin = [...pin];
      newPin[index - 1] = "";
      setPin(newPin);
      inputs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const enteredPin = pin.join("");

    if (enteredPin.length !== PIN_LENGTH) {
      alert("Please enter a 6-digit PIN");
      return;
    }

    // Navigate to ResetPinScreen and pass required props
    navigation.navigate("ResetPin", {
      defaultName, // pass username
      phone,       // pass phone number
      onLoginSuccess: (user: any) => {
        console.log("Login Success:", user);
        navigation.navigate("Profile"); // redirect after login
      },
      onBack: () => navigation.goBack(),
    });
  };

  return (
    <Box flex={1} bg="white">
      {/* Header */}
      <Box bg="white" p={4} flexDirection="row" mb={20} justifyContent="space-between">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={8} color="#7A83F4" mt={50} />
        </Pressable>
        <HStack justifyContent="center">
          <Text fontSize="24" fontWeight="bold" color="#7A83F4" mt={50} mr={20}>
            Reset Password
          </Text>
        </HStack>
      </Box>

      {/* PIN Inputs */}
      <Center>
        <HStack space={2} mb={6}>
  {pin.map((value, index) => (
    <TextInput
      key={index}
      ref={(ref) => {
        inputs.current[index] = ref; // <-- corrected
      }}
      value={value}
      onChangeText={(text) =>
        handleChange(text.replace(/[^0-9]/g, "").slice(0, 1), index)
      }
      onKeyPress={(e) => handleKeyPress(e, index)}
      keyboardType="numeric"
      secureTextEntry
      maxLength={1}
      style={{
        textAlign: "center",
        fontSize: 18,
        borderColor: "#7A83F4",
        borderWidth: 1,
        borderRadius: 6,
        width: 38,
        height: 38,
      }}
    />
  ))}
</HStack>


        {/* Next Button */}
        <Box w="100%" alignItems="center" mt={4}>
          <NextButton onPress={handleContinue} />
        </Box>
      </Center>
    </Box>
  );
};

export default ResetPasswordScreen;
