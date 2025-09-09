import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { 
  Center, 
  VStack,
  FormControl,  
  Button, 
  Text, 
  Box, 
  Icon, 
  Pressable, 
  HStack, 
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/LogIn_StackNavigator";
import ContinueButton from "../components/continue_button";
export default function SignUpScreen({navigation}: any) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    if (!name || !phone || !pin) {
      setError("All fields are required!");
      return;
    }

    if (phone.length < 10) {
      setError("Enter a valid phone number");
      return;
    }

    if (pin.length < 4) {
      setError("PIN must be at least 4 digits");
      return;
    }

    setError("");
    console.log("Sign-up data:", { name, phone, pin });
    // ✅ Save to backend or local storage here
  };

  return (
    <Box flex={1} bg="white">
      <HStack alignItems="center" px={4} pt={"55px"}  >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
          </Pressable>
          <Center flex={1}>
            <Text fontSize="32" fontWeight="bold" color="#7A83F4">
              Create Account
            </Text>
          </Center>
          <Box w={6} />
        </HStack>
      <HStack  flex={1} justifyContent="center" px={"28px"} pt={"54px"} bg={"white"} alignContent={"center"}>
        
        <VStack space={4} width="100%">

          <FormControl>
            <Text fontSize="16"  color="#7A83F4" mb={2}  fontFamily={"inter"} fontWeight={"semibold"}>
              Phone Number
            </Text>
            <TextInput
              placeholder="09xxxxxxxxx"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#7A83F4',
                borderRadius: 5,
                padding: 10,
               }}
            />
          </FormControl>

          <FormControl>
            <Text fontSize="16"  color="#7A83F4" mb={2}  fontFamily={"inter"} fontWeight={"semibold"}>
              Full Name
            </Text>
            <TextInput 
            placeholder="Enter your name" 
            value={name} onChangeText={setName} 
            keyboardType="default"
            style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#7A83F4',
                borderRadius: 5,
                padding: 10,
               }}
            />
          </FormControl>

          <FormControl>
            <Text fontSize="16"  color="#7A83F4" mb={2}  fontFamily={"inter"} fontWeight={"semibold"}>
              Create PIN
            </Text>
            <TextInput
              placeholder="Enter PIN"
              value={pin}
              onChangeText={setPin}
              keyboardType="number-pad"
              secureTextEntry
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#7A83F4',
                borderRadius: 5,
                padding: 10,
               }}
            />
          </FormControl>

          {error ? <Text color="red.500">{error}</Text> : null}

          <ContinueButton onPress={handleSignUp} />
        </VStack>
    
      </HStack>
    </Box>
  );
}
