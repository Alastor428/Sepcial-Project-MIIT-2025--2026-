// CashOutScreen.tsx
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  Center,
  Spinner,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ContinueButton from "../../../../components/continue_button";
import ContactPicker from "../../../../components/contacts";
import TransferConfirmModal from "../../../../components/transfer_comfirm_modal";

export default function CashOutScreen({ navigation, route }: any) {
  const [mode, setMode] = useState<"agent" | "bank">("agent"); // toggle mode
  const [user, setUser] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // Default values to prevent undefined errors
  const { recipient = {}, loggedInUser = {} } = route.params || {};

  // Fetch user only in bank mode
  useEffect(() => {
    if (mode === "bank") {
      axios
        .get("http://192.168.99.96:5000/api/user/123456789/dashboard")
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Backend error:", err));
    }
  }, [mode]);

  const onTransferPress = () => {
    const numericAmount = parseFloat(amount);

    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (mode === "bank" && user && numericAmount > user.balance) {
      alert("Insufficient balance. Please enter a lower amount.");
      setAmount("");
      return;
    }

  };

  const handleConfirm = () => {
    navigation.navigate("EnterPin", { amount });
  };

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box bg="#B9BDF0" height={180} borderBottomRadius={20}>
        <HStack alignItems="center" px={4} py={"15%"}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-undo" size="7" color="#fff" />
          </Pressable>
          <Text
            fontSize="32"
            fontWeight="bold"
            fontStyle={"inter"}
            color="#fff"
            mx={"auto"}
          >
            Cash Out
          </Text>
        </HStack>

        {/* Mode Toggle */}
        <HStack justifyContent="center" my={"-10%"}>
          <Pressable onPress={() => setMode("agent")}>
            <Box
              bg={mode === "agent" ? "#fff" : "#B9BDF0"}
              width={160}
              height={44}
              borderRadius={40}
              justifyContent="center"
              alignItems="center"
            >
              <Text
                fontSize="20"
                fontWeight="bold"
                color={mode === "agent" ? "#7A83F4" : "#fff"}
              >
                Agent
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => setMode("bank")}>
            <Box
              bg={mode === "bank" ? "#fff" : "#B9BDF0"}
              width={160}
              height={44}
              borderRadius={40}
              justifyContent="center"
              alignItems="center"
            >
              <Text
                fontSize="20"
                fontWeight="bold"
                color={mode === "bank" ? "#7A83F4" : "#fff"}
              >
                Bank Account
              </Text>
            </Box>
          </Pressable>
        </HStack>
      </Box>

      {/* Agent Mode */}
      {mode === "agent" && (
        <Center mt={-5}>
          <Box
            bg="#fff"
            px={6}
            py={4}
            borderRadius={10}
            shadow={2}
            w="80%"
            alignItems="center"
            mt={"50px"}
            height={68}
            mb={"20px"}
          >
            <HStack borderBottomWidth={1} borderColor="#7A83F4" alignItems="center">
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 18,
                  paddingVertical: 8,
                  paddingHorizontal: 4,
                  marginRight: 8,
                }}
                placeholder="Enter Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ""))}
              />
              <ContactPicker onSelect={(num) => setPhoneNumber(num)} />
            </HStack>
          </Box>

          <ContinueButton
            onPress={async () => {
              if (!phoneNumber) {
                alert("Please enter a phone number.");
                return;
              }
              try {
                const res = await axios.get(
                  `http://192.168.99.96:5000/api/user/check/${phoneNumber}`
                );

                if (res.data?.valid && res.data?.user) {
                  navigation.navigate("TransferAmountScreen", {
                    recipient: res.data.user,
                    sender: loggedInUser,
                    loggedInUser: loggedInUser,
                  });
                } else {
                  alert("No account found for this phone number.");
                }
              } catch (error: any) {
                alert("Error connecting to server. Please try again.");
              }
            }}
          />
        </Center>
      )}

      {/* Bank Mode */}
      {mode === "bank" && (
        <>
          {!user ? (
            <Center flex={1}>
              <Spinner size="lg" />
              <Text mt={4}>Loading...</Text>
            </Center>
          ) : (
            <>
              <HStack justifyContent="center">
                <Box
                  width={328}
                  height={256}
                  bg={"#fff"}
                  borderRadius={20}
                  shadow={5}
                  mt={31}
                  mb={10}
                >
                  {/* User Info */}
                  <HStack
                    px={4}
                    pt={4}
                    bg={"#7a83f4"}
                    borderTopLeftRadius={20}
                    borderTopRightRadius={20}
                    justifyContent={"center"}
                    height={104}
                  >
                    <VStack justifyContent={"center"} alignItems={"center"}>
                      <HStack mb={2}>
                        <Icon
                          as={Ionicons}
                          name="person-circle-outline"
                          size={7}
                          color="#fff"
                        />
                        <Text color="#fff" fontSize={20}>
                          {user?.name || "Loading..."}
                        </Text>
                      </HStack>
                      <Text color="#fff" fontSize={14} opacity={0.5}>
                        ID - {user?.userId || "-"}
                      </Text>
                    </VStack>
                  </HStack>

                  {/* Amount Input */}
                  <HStack justifyContent={"center"} alignItems={"center"}>
                    <Text
                      fontSize={16}
                      color={"#7A83F4"}
                      mt={14}
                      fontWeight={"medium"}
                    >
                      Transfer Amount
                    </Text>
                  </HStack>
                  <HStack
                    width={"80%"}
                    style={{ justifyContent: "center" }}
                    mx={"auto"}
                  >
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

                  {/* Balance */}
                  <HStack justifyContent={"center"} alignItems={"center"}>
                    <Text fontSize={14} color={"#7A83F4"} mt={23} opacity={0.5}>
                      Total Balance (Ks): {user?.balance || 0} Ks
                    </Text>
                  </HStack>
                </Box>
              </HStack>

              <HStack justifyContent="center">
                <ContinueButton onPress={handleConfirm} />
              </HStack>
            </>
          )}
        </>
      )}
    </Box>
  );
}
