import React, { useEffect, useState } from "react";
import { Box, Center, Spinner, Text, HStack, Icon, Pressable, Input } from "native-base";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator"; 

type QRScreenNavigationProp = StackNavigationProp<RootStackParamList, "SetAmountScreen">;

type User = {
  name: string;
  balance: number;
  userId: string;
};

const SetAmountScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [amount, setAmount] = useState<string>(""); // Added state
  const [loading, setLoading] = useState<boolean>(true);
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
      {/* Upper Section */}
      <Box bg="#fff" pt={20} pb={0} px={8} alignItems="flex-start">
        <HStack height={26} alignItems="center">
          <Pressable onPress={() => navigation.navigate("QR")}>
            <Icon as={Ionicons} name="arrow-undo" size={6} color="#7A83F4" mr={2} />
          </Pressable>
        </HStack>
        <Center w="100%" mt={-10} mb={0}>
          <Text color="#7A83F4" fontSize="2xl" fontWeight="bold">
            Set Amount
          </Text>
        </Center>
      </Box>

      {/* Input Box */}
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        px={4}
        bg="#fff"
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        shadow={2}
        borderColor="#7A83F4"
        borderWidth={2}
        marginY={450}
        marginX={10}
        mt={65}
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
      >
        <HStack space={2} alignItems="center" w="90%" mt={-20}>
          <Text fontSize="lg" color="#7A83F4">
            Amount
          </Text>
          <Input
            variant="unstyled"
            placeholder="Enter Amount"
            fontSize="lg"
            value={amount}
            onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
            keyboardType="numeric"
            flex={1}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default SetAmountScreen;
