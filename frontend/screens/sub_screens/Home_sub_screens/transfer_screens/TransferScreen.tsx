import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Spinner,
  Input,
  Icon,
  Center,
  Pressable,
} from "native-base";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import SmallNextButton from "../../../../components/small_next_button";
import axios from "axios";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";

type User = {
  name: string;
  balance: number;
  userId: string;
};

type TransferScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type TransferScreenRouteProp = RouteProp<RootStackParamList, "Transfer">;

const TransferScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<TransferScreenNavigationProp>();
  const route = useRoute<TransferScreenRouteProp>();
  const { loggedInUser } = route.params; // ✅ get logged-in user from params

  useEffect(() => {
    if (!loggedInUser?.userId) return;

    axios
      .get(
        `http://192.168.99.96:5000/api/user/${loggedInUser.userId}/dashboard`
      )
      .then((res) => {
        setUser(res.data);
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
        <Text mt={2}>Loading Transfer Page...</Text>
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
              Transfer
            </Text>
          </Center>
          <Box w={6} />
        </HStack>
      </Box>

      {/* Input Section */}
      <Center mt={-5}>
        <Box
          bg="#fff"
          px={6}
          py={4}
          borderRadius={20}
          shadow={2}
          w="80%"
          alignItems="center"
          mt={-10}
          width={329}
          height={162}
          mb={10}
        >
          <Text color="#7A83F4" mb={2}>
            Transfer to Phone Number{" "}
            <Icon
              as={MaterialIcons}
              name="error-outline"
              size={4}
              color="#7A83F4"
            />
          </Text>

          <HStack
            borderBottomWidth={1}
            borderColor="#7A83F4"
            alignItems="center"
            mb={5}
            mt={2}
          >
            <Input
              value={phoneNumber}
              onChangeText={(text) =>
                setPhoneNumber(text.replace(/[^0-9]/g, ""))
              }
              variant="unstyled"
              placeholder="Enter phone number"
              fontSize="md"
              keyboardType="numeric"
              width="85%"
            />
            <Pressable>
              <Icon
                as={FontAwesome5}
                name="address-book"
                size={4}
                color="#7A83F4"
              />
            </Pressable>
          </HStack>

          <SmallNextButton
            onPress={async () => {
              if (phoneNumber) {
                try {
                  const res = await axios.get(
                    `http://192.168.99.96:5000/api/user/check/${phoneNumber}`
                  );

                  if (res.data.valid) {
                    navigation.navigate("TransferAmountScreen", {
                      recipient: res.data.user,
                      sender: user,
                      loggedInUser: user,
                    });
                  } else {
                    alert("No account found for this phone number.");
                  }
                } catch (error: any) {
                  alert("Error connecting to server. Please try again.");
                }
              } else {
                alert("Please enter a phone number.");
              }
            }}
          />
        </Box>
      </Center>
    </Box>
  );
};

export default TransferScreen;
