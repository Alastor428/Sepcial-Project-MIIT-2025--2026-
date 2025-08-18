import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Spinner,
  Text,
  HStack,
  Icon,
  Pressable,
} from "native-base";
import { TextInput } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import NextButton from "../../../../components/next_button";

type SetAmountNavProp = StackNavigationProp<
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
  const navigation = useNavigation<SetAmountNavProp>();

  useEffect(() => {
    let mounted = true;
    axios
      .get("http://192.168.68.112:5000/api/user/123/dashboard")
      .then((res) => {
        if (mounted) {
          setUser(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Backend error:", err);
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const onNext = () => {
    // I will update this amount section with backend after midtern
    navigation.navigate({
      name: "QR",
      params: { currentAmount: amount || undefined },
      merge: true,
    });
  };

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

          <HStack mb={10} alignItems="center">
            <TextInput
              style={{
                flex: 1,
                borderWidth: 0,
                fontSize: 18,
                paddingVertical: 8,
                paddingHorizontal: 4,
                borderBottomColor: "#7A83F4",
                borderBottomWidth: 2,
              }}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => {
                // allow digits + one dot
                const cleaned = text.replace(/[^0-9.]/g, "");
                const parts = cleaned.split(".");
                const normalized =
                  parts.length > 2
                    ? parts[0] + "." + parts.slice(1).join("")
                    : cleaned;
                setAmount(normalized);
              }}
            />
            <Text fontSize="lg" color="#7A83F4" ml={2}>
              Ks
            </Text>
          </HStack>

          <NextButton onPress={onNext} />
        </Box>
      </Center>
    </Box>
  );
};

export default SetAmountScreen;
