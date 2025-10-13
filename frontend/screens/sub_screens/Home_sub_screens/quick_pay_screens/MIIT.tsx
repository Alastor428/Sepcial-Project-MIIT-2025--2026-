import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Spinner,
  Center,
  VStack,
  Pressable,
  Icon,
  Divider,
  ScrollView,
  Image,
} from "native-base";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ContinueButton from "../../../../components/continue_button";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";

const miitLogo = require("../../../../assets/miit-logo.png");

type MIITPaymentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MIITPayment"
>;

export default function MIITPaymentScreen() {
  const navigation = useNavigation<MIITPaymentScreenNavigationProp>();
  const route = useRoute<any>();
  const { loggedInUser, selectedInstitution } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [semester, setSemester] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner />
        <Text mt={2}>
          Loading {selectedInstitution?.name || "Institution"} Payment Page...
        </Text>
      </Center>
    );
  }

  const handleSubmit = () => {
    if (!studentName || !studentId || !amount) {
      alert("Please fill all required fields");
      return;
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (numericAmount > loggedInUser.balance) {
      alert("Insufficient balance. Please enter a lower amount.");
      return;
    }

    setAmount("");

    // Navigate to QuickPayPinScreen with correct transactionData
    navigation.navigate("QuickPayPinScreen", {
  transactionData: {
    sender: {
      name: studentName,         // renamed
      userId: studentId,         // renamed
      balance: loggedInUser.balance,
      pin: loggedInUser.pin || "",
    },
    recipient: {
      userId: selectedInstitution?.id.toString() || "0",
      name: selectedInstitution?.name || "Unknown Institution",
      balance: 0,                // dummy for type
      pin: "",                    // dummy for type
    },
    amount: numericAmount,
  },
});

  };

  return (
    <Box flex={1} bg="#FFF">
      {/* Header */}
      <Box bg="#fff" pt={12} pb={4} px={4}>
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
            <Image
              source={
                selectedInstitution?.logo
                  ? { uri: selectedInstitution.logo }
                  : miitLogo
              }
              alt="Institution Logo"
              width={16}
              height={16}
              resizeMode="contain"
            />
            <Text color="#7A83F4" fontSize="xl" fontWeight="bold" mt={2}>
              {selectedInstitution?.name || "Education"} Payment
            </Text>
          </Center>

          <Box w={8} />
        </HStack>
      </Box>

      {/* Form */}
      <ScrollView px={4} mt={4}>
        <Box bg="#fff" p={5} mb={90}>
          <VStack space={5}>
            <FormField
              label="Student Name"
              value={studentName}
              onChangeText={setStudentName}
              placeholder="Enter Student Name"
            />

            <FormField
              label="Student ID"
              value={studentId}
              onChangeText={setStudentId}
              placeholder="Enter Student ID"
            />

            <FormField
              label="Contact Number"
              value={contactNumber}
              onChangeText={setContactNumber}
              placeholder="Enter Contact Number"
              keyboardType="phone-pad"
            />

            <FormField
              label="Semester"
              value={semester}
              onChangeText={setSemester}
              placeholder="Enter Semester"
            />

            <FormField
              label="Amount"
              value={amount}
              onChangeText={(text) =>
                setAmount(text.replace(/[^0-9]/g, ""))
              }
              placeholder="Enter Amount"
              keyboardType="numeric"
            />

            <ContinueButton onPress={handleSubmit} />
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}

// Reusable input field component
type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "phone-pad" | "email-address";
};

const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: FormFieldProps) => (
  <VStack>
    <Text fontSize="sm" fontWeight="bold" mb={1} color="#7A83F4">
      {label}
    </Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={{
        borderWidth: 1,
        borderColor: "#7a83f4",
        borderRadius: 12,
        padding: 10,
        backgroundColor: "#F9FAFB",
        color: "#000",
      }}
    />
  </VStack>
);
