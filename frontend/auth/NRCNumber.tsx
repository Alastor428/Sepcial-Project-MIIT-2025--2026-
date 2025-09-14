import React, { useState } from "react";
import { TextInput } from "react-native";
import { 
  Center, 
  VStack,
  FormControl,  
  Text, 
  Box, 
  Icon, 
  Pressable, 
  HStack, 
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ContinueButton from "../components/continue_button";

type NRCScreenProps = {
  onBack: () => void;
  onContinue: (data: { nrc: string; birthday: string }) => void;
};

export default function NRCScreen({ onBack, onContinue }: NRCScreenProps) {
  const [nrc, setNrc] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!nrc || !birthday) {
      setError("All fields are required!");
      return;
    }

    if (birthday.length < 8) {
      setError("Enter a valid Birthday (e.g. 01/01/2000)");
      return;
    }

    setError("");
    console.log("Sign-up data:", { nrc, birthday });

    // ✅ pass data back to parent (App.tsx)
    onContinue({ nrc, birthday });
  };

  return (
    <Box flex={1} bg="white">
      {/* Header */}
      <HStack alignItems="center" px={4} pt={"55px"}>
        <Pressable onPress={onBack}>
          <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
        </Pressable>
        <Center flex={1}>
          <Text fontSize="32" fontWeight="bold" color="#7A83F4">
            NRC & Birthday
          </Text>
        </Center>
        <Box w={6} />
      </HStack>

      {/* Form */}
      <HStack flex={1} justifyContent="center" px={"28px"} pt={"54px"} bg={"white"}>
        <VStack space={4} width="100%">

          {/* NRC Number */}
          <FormControl>
            <Text fontSize="16" color="#7A83F4" mb={2} fontWeight="semibold">
              NRC Number
            </Text>
            <TextInput
              placeholder="12/PaKaTa(N)123456"
              value={nrc}
              onChangeText={setNrc}
              keyboardType="default" // allows both numbers + alphabets
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#7A83F4",
                borderRadius: 5,
                padding: 10,
              }}
            />
          </FormControl>

          {/* Birthday */}
          <FormControl>
            <Text fontSize="16" color="#7A83F4" mb={2} fontWeight="semibold">
              Birthday
            </Text>
            <TextInput
              placeholder="DD/MM/YYYY"
              value={birthday}
              onChangeText={setBirthday}
              keyboardType="numeric" // numbers only
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#7A83F4",
                borderRadius: 5,
                padding: 10,
              }}
            />
          </FormControl>

          {/* Error */}
          {error ? <Text color="red.500">{error}</Text> : null}

          {/* Continue */}
          <ContinueButton onPress={handleNext} />
        </VStack>
      </HStack>
    </Box>
  );
}
