import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { Box, HStack, Text, Pressable, Icon, Center } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ContinueButton from "../../../../components/continue_button";
import ContactPicker from "../../../../components/contacts";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";

type TopUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TopUpScreen"
>;

export default function TopUpScreen({ route }: any) {
  const navigation = useNavigation<TopUpScreenNavigationProp>();
  const loggedInUser = route.params.loggedInUser;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  const presetAmounts = [1000, 2000, 3000, 5000, 10000, 20000];

  const handlePresetPress = (value: number) => setAmount(value);

  const handleContinue = () => {
    if (!phoneNumber) return alert("Please enter a phone number");
    if (!amount) return alert("Please enter an amount");

    // Navigate to TopUpPinScreen with required recipient.name
    navigation.navigate("TopUpPinScreen", {
      sender: loggedInUser,
      recipient: {
        userId: "topup",
        name: phoneNumber, // always a string
      },
      amount: Number(amount),
      phoneNumber,
    });
  };

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box
        bg="#B9BDF0"
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
        pt={12}
        pb={8}
        px={6}
        height={180}
      >
        <HStack alignItems="center" px={4} pt={2} pb={4} ml={-4}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-undo" size={7} color="#fff" />
          </Pressable>
          <Center flex={1}>
            <Text fontSize="32" fontWeight="bold" color="#fff">
              Top Up
            </Text>
          </Center>
          <Box w={6} />
        </HStack>
      </Box>

      {/* Phone Number Input */}
      <HStack justifyContent="center" mt="44px" mx="auto" width="328px">
        <TextInput
          style={{
            flex: 1,
            fontSize: 18,
            paddingVertical: 8,
            paddingHorizontal: 4,
            borderColor: "#7A83F4",
            borderWidth: 2,
            borderRadius: 8,
          }}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <ContactPicker onSelect={(num) => setPhoneNumber(num)} />
      </HStack>

      {/* Preset Amount Buttons */}
      <HStack flexWrap="wrap" justifyContent="center" mt={4} mx="4%">
        {presetAmounts.map((amt) => (
          <Pressable
            key={amt}
            onPress={() => handlePresetPress(amt)}
            style={{
              borderWidth: 2,
              borderColor: "#7A83F4",
              width: 100,
              height: 42,
              margin: 6,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              backgroundColor: amt === amount ? "#7A83F4" : "#fff",
            }}
          >
            <Text color={amt === amount ? "#fff" : "#7A83F4"}>{amt} Ks</Text>
          </Pressable>
        ))}
      </HStack>

      {/* Manual Amount Input */}
      <HStack justifyContent="center" mt="20px" mx="auto" width="328px">
        <TextInput
          style={{
            flex: 1,
            fontSize: 18,
            paddingVertical: 8,
            paddingHorizontal: 4,
            borderColor: "#7A83F4",
            borderWidth: 2,
            borderRadius: 8,
          }}
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={amount ? String(amount) : ""}
          onChangeText={(text) =>
            setAmount(Number(text.replace(/[^0-9]/g, "")))
          }
        />
        <Text style={{ marginLeft: 8, fontSize: 18, color: "#7A83F4" }}>Ks</Text>
      </HStack>

      {/* Continue Button */}
      <Center mt="32px">
        <ContinueButton onPress={handleContinue} />
      </Center>
    </Box>
  );
}
