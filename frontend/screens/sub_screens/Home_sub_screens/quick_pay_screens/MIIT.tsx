import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Spinner,
  Center,
  Input,
  VStack,
  Pressable,
  Icon,
  Button,
  Divider,
  ScrollView,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import axios from "axios";

type MIITPaymentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MIITPayment"
>;

type MIITPaymentScreenRouteProp = RouteProp<RootStackParamList, "MIITPayment">;

type User = {
  name: string;
  balance: number;
  userId: string;
  pin: string;
};

const MIITPaymentScreen: React.FC = () => {
  const navigation = useNavigation<MIITPaymentScreenNavigationProp>();
  const route = useRoute<MIITPaymentScreenRouteProp>();
  const { loggedInUser } = route.params;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [studentName, setStudentName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [semester, setSemester] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!loggedInUser?.userId) return;

    axios
      .get(`http://192.168.99.96:5000/api/users/${loggedInUser.userId}`)
      .then((res) => {
        setUser(res.data);
        setStudentName(res.data.name); // auto-fill from backend
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend error:", err);
        setLoading(false);
      });
  }, [loggedInUser]);

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner />
        <Text mt={2}>Loading MIIT Payment Page...</Text>
      </Center>
    );
  }

  if (!user) {
    return (
      <Center flex={1}>
        <Text>No user data available.</Text>
      </Center>
    );
  }

  const handleSubmit = () => {
    if (!studentName || !amount) {
      alert("Please fill all required fields");
      return;
    }

    navigation.navigate("QuickPayPinScreen", {
      transactionData: {
        sender: user, 
        recipient: {
          userId: "quickpay-provider",
          name: "MIIT University",
          balance: 0,
          pin: "",
        },
        amount: Number(amount),
      },
    });
  };

  return (
    <Box flex={1} bg="#F5F6FA">
      {/* Header */}
      <Box bg="#fff" pt={12} pb={4} px={4} borderBottomRadius="2xl" shadow={2}>
        <HStack alignItems="center">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              as={Ionicons}
              name="arrow-undo"
              size={8}
              color="#7A83F4"
              mr={4}
            />
          </Pressable>
          <Center flex={1}>
            <Text color="#7A83F4" fontSize="22" fontWeight="bold">
              MIIT Payment
            </Text>
          </Center>
          <Box w={8} />
        </HStack>
      </Box>

      {/* Form */}
      <ScrollView px={4} mt={4}>
        <Box bg="#fff" p={5} borderRadius="2xl" shadow={3}>
          <VStack space={5}>
            {/* Student Name */}
            <VStack>
              <Text fontSize="sm" fontWeight="bold" mb={1} color="#7A83F4">
                Student Name
              </Text>
              <Input
                value={studentName}
                onChangeText={setStudentName}
                placeholder="Enter Student Name"
                borderRadius="lg"
                bg="#F9FAFB"
                borderColor="#E2E8F0"
                fontSize="md"
                px={3}
                py={2}
              />
            </VStack>

            {/* Contact Number */}
            <VStack>
              <Text fontSize="sm" fontWeight="bold" mb={1} color="#7A83F4">
                Contact Number
              </Text>
              <Input
                value={contactNumber}
                onChangeText={setContactNumber}
                placeholder="Enter Contact Number"
                keyboardType="phone-pad"
                borderRadius="lg"
                bg="#F9FAFB"
                borderColor="#E2E8F0"
                fontSize="md"
                px={3}
                py={2}
              />
            </VStack>

            {/* Semester */}
            <VStack>
              <Text fontSize="sm" fontWeight="bold" mb={1} color="#7A83F4">
                Semester
              </Text>
              <Input
                value={semester}
                onChangeText={setSemester}
                placeholder="Enter Semester"
                borderRadius="lg"
                bg="#F9FAFB"
                borderColor="#E2E8F0"
                fontSize="md"
                px={3}
                py={2}
              />
            </VStack>

            <Divider my={2} />

            {/* Amount */}
            <VStack>
              <Text fontSize="sm" fontWeight="bold" mb={1} color="#7A83F4">
                Amount
              </Text>
              <Input
                value={amount}
                onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ""))}
                placeholder="Enter Amount"
                keyboardType="numeric"
                borderRadius="lg"
                bg="#F9FAFB"
                borderColor="#E2E8F0"
                fontSize="md"
                px={3}
                py={2}
              />
            </VStack>

            {/* Submit Button */}
            <Button
              bg="#7A83F4"
              py={4}
              borderRadius="2xl"
              shadow={3}
              _pressed={{ bg: "#5A63D4" }}
              onPress={handleSubmit}
              mt={4}
            >
              <Text color="#fff" fontSize="md" fontWeight="bold">
                Continue
              </Text>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default MIITPaymentScreen;
