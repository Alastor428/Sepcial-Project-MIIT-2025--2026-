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
      <Box
      w="90%"
          alignItems="center"
          borderWidth={2}
          borderColor="#7A83F4"
          borderRadius={16}
          shadow={2}
          marginY={90}
          marginX={"auto"}
          mt={-80}
          mb={10}
          px={4}
          py={2}
          bg="#fff"
          width={"344"}
          height={"208"}>
        <HStack
          w="336"
          alignItems="left"
          px={4}
          py={2}
          bg="#fff"
          mb={4}
        >
          <Text fontSize="lg" color="#7A83F4" mr={3}>
            Amount
          </Text>
        </HStack>
        <HStack
        w="90%"
        alignItems="center"
        px={4}
        py={2}
        bg="#fff"
        mx="auto"
        mb={4}>
          <TextInput
            style={{
              flex: 1,
              borderWidth: 0, // Removes outline
              fontSize: 18, // Use numeric font size instead of "lg"
              paddingVertical: 8,
              paddingHorizontal: 4,
              borderBottomColor: "#7A83F4",
              borderBottomWidth: 2,
              marginLeft: -30,
            }}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
          />
          <Text style={{ fontSize: 18, color: "#7A83F4", marginLeft: 10,marginRight:-30 }}>Ks</Text>
        </HStack>
        <Pressable onPress={() => navigation.navigate("QR")}>
            <NextButton/>
          </Pressable>
      </Box>
      </Center>
    </Box>
  );
};

export default SetAmountScreen;
