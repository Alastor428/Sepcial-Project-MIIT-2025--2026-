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
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";

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
      .get("http://192.168.68.107:5000/api/user/123/dashboard")
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
        <HStack height={26} alignItems="center">
          <Pressable onPress={() => navigation.navigate("QR")}>
            <Icon
              as={Ionicons}
              name="arrow-undo"
              size={6}
              color="#7A83F4"
              mr={2}
            />
          </Pressable>
        </HStack>
        <Center w="100%" mt={-10}>
          <Text color="#7A83F4" fontSize="2xl" fontWeight="bold">
            Set Amount
          </Text>
        </Center>
      </Box>

      {/* Input Section */}
      <Center flex={1} px={4}>
        <HStack
          w="90%"
          alignItems="center"
          borderWidth={2}
          borderColor="#7A83F4"
          borderRadius={20}
          px={4}
          py={2}
          bg="#fff"
        >
          <Text fontSize="lg" color="#7A83F4" mr={3}>
            Amount
          </Text>
          <Input
            flex={1}
            placeholder="Enter Amount"
            keyboardType="numeric"
            fontSize="lg"
            value={amount}
            onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
            borderWidth={0} // ✅ Removes outline
            _focus={{ borderWidth: 0 }} // ✅ Prevents error
          />
        </HStack>
      </Center>
    </Box>
  );
};

export default SetAmountScreen;
