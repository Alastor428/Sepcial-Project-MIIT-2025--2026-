import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Spinner,
  Text,
  HStack,
  Icon,
  Pressable,
  Input,
} from "native-base";
import { TextInput } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import NextButton from "../../../../components/next_button";

type QRScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SetAmountScreen"
>;

type User = {
  name: string;
  balance: number;
  userId: string;
};

const SetAmountScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<QRScreenNavigationProp>();

  useEffect(() => {
    axios
      .get("http://192.168.99.96:5000/api/user/123/dashboard")
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner />
        <Text mt={2}>Loading Set Amount...</Text>
      </Center>
    );
  }

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box bg="#fff" pt={20} pb={2} px={8} alignItems="flex-start">
        <HStack alignItems="center" px={4} pt={2} pb={4} ml={-4}>
                        <Pressable onPress={() => navigation.goBack()}>
                          <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
                        </Pressable>
                        <Center flex={1}>
                          <Text fontSize="24" fontWeight="bold" color="#7A83F4">
                            Set Amount
                          </Text>
                        </Center>
                        <Box w={6} /> 
                      </HStack>
      </Box>

      {/* Input Section */}
      <Center flex={1} px={4}>
        <Box
          w="90%"
          alignItems="center"
          borderWidth={2}
          borderColor="#7A83F4"
          borderRadius={8}
          shadow={2}
          mt={-80}
          marginY={30}
          marginX={4}
          width={344}
          height={208}
          px={4}
          py={2}
          bg="#fff"
        >
          <HStack
            alignItems="left"
            justifyContent="space-between"
            width="100%"
            mb={5}
          >
            <Text fontSize="lg" color="#7A83F4" mr={3}>
              Amount
            </Text>
          </HStack>
          <HStack mb={10}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 0, // Removes outline
                fontSize: 18, // Use numeric font size instead of "lg"
                paddingVertical: 8,
                paddingHorizontal: 4,
                borderBottomColor: "#7A83F4",
                borderBottomWidth: 2,
              }}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
            />
            <Text fontSize="lg" color="#7A83F4" mr={3}>
              Ks
            </Text>
          </HStack>
          <Pressable onPress={() => navigation.navigate("QR")}>
            <NextButton />
          </Pressable>
        </Box>
      </Center>
    </Box>
  );
};

export default SetAmountScreen;
