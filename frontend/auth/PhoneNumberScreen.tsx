import React, { useState } from "react";
import {
  Text,
  Center, 
  VStack,
  HStack,
  Button
} from "native-base";
import { Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/LogIn_StackNavigator";
import SignInButton from "../components/Sign _In";
import { Image } from "native-base";

type PhoneNumberScreenProps = {
  onPhoneSubmit: (phone: string) => void;
};

type PhoneScreenNavProp = NativeStackNavigationProp<
  AuthStackParamList,
  "PhoneNumber"
>;

export default function PhoneNumberScreen({
  onPhoneSubmit,
}: PhoneNumberScreenProps) {
  const [phone, setPhone] = useState("09");
  const [error, setError] = useState("");
  const navigation = useNavigation<PhoneScreenNavProp>(); // ✅ typed navigation

  const handleContinue = () => {
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setError("");
    onPhoneSubmit(phone);
  };
const PhoneNumberScreen = () => {
  const navigation = useNavigation();

  return (
    <Button onPress={() => navigation.navigate("SignUp" as never)}>
      Go to Sign Up
    </Button>
  );
};
  return (
    <Center flex={1} px={6} bg="white">
      <VStack space={6} alignItems="center" w="100%" mt={-20}>
        <Image
          source={require("../assets/nexo_logo.png")}
          alt="Nexo Wallet Logo"
          size="xl"
          resizeMode="contain"
          mb={-10}
          mt={-20}
        />
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="#7A83F4"
          mb={4}
          fontFamily={"inter"}
        >
          Nexo Wallet
        </Text>

        <Text
          fontSize="18"
          color="grey"
          fontFamily={"inter"}
          alignSelf={"flex-start"}
          mb={-5}
        >
          Enter Phone Number
        </Text>

        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            if (error) setError("");
          }}
          style={{
            borderWidth: 1,
            borderColor: error ? "#ef4444" : "#7A83F4",
            padding: 15,
            borderRadius: 8,
            color: "black",
            width: "100%",
            fontSize: 16,
          }}
          keyboardType="phone-pad"
          maxLength={11}
        />

        {error ? (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        ) : null}

        <SignInButton onPress={handleContinue} />

        <HStack mt={-4}>
          <Text fontSize="18" color="grey" fontFamily={"inter"}>
            Haven’t an Account?
          </Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text
              fontSize="18"
              color="#7A83F4"
              fontFamily={"inter"}
              fontWeight={"bold"}
              fontStyle={"italic"}
              ml={2}
              textDecorationLine={"underline"}
            >
              Sign Up
            </Text>
          </Pressable>
        </HStack>
      </VStack>
    </Center>
  );
}

