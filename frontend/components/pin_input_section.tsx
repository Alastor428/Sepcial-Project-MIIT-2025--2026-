import React, { useRef, useState } from "react";
import { Box, Text, HStack, Center, Input, Pressable } from "native-base";
import ContinueButton from "./continue_button";

interface PinInputSectionProps {
  onContinue: (pin: string) => void;
}

const PinInputSection: React.FC<PinInputSectionProps> = ({ onContinue }) => {
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

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !pin[index] && index > 0) {
      const newPin = [...pin];
      newPin[index - 1] = "";
      setPin(newPin);
      inputs.current[index - 1].focus();
    }
  };

  const handleContinue = () => {
    const enteredPin = pin.join("");
    onContinue(enteredPin);
  };

  return (
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
            onChangeText={(text) =>
              handleChange(text.replace(/[^0-9]/g, "").slice(0, 1), index)
            }
            onKeyPress={(e) => handleKeyPress(e, index)}
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
      <Box w="100%" alignItems="center">
        {" "}
        <ContinueButton onPress={handleContinue} />
      </Box>
    </Center>
  );
};

export default PinInputSection;
