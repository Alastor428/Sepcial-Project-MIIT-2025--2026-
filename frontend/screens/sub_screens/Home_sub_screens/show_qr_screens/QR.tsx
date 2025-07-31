import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Spinner,
  Text,
  HStack,
  Icon,
  InputLeftAddon,
  ChevronLeftIcon,
} from "native-base";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";

type User = {
  name: string;
  balance: number;
  userId: string;
};

type QRScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const QRScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
        <Text mt={2}>Loading QR Code...</Text>
      </Center>
    );
  }

  if (!user) {
    return (
      <Center flex={1}>
        <Text color="red.500">Failed to load user data.</Text>
      </Center>
    );
  }

  return (
    <Box flex={1} bg="#fff">
      {/* Upper Section */}
      <Box
        bg="#B9BDF0"
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
        pt={20}
        pb={16}
        px={8}
        alignItems="flex-start"
      >
        <HStack height={26} alignItems="center">
          <Pressable onPress={() => navigation.navigate("HomeMain")}>
            <Icon
              as={Ionicons}
              name="arrow-undo"
              size={6}
              color="#fff"
              mr={2}
            />
          </Pressable>
        </HStack>
        <Center w="100%" mt={-10} mb={4}>
          <Text color="#fff" fontSize="3xl" fontWeight="bold">
            QR
          </Text>
        </Center>
      </Box>
      {/* QR Code Section */}
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        px={4}
        bg="#fff"
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        shadow={2}
        borderColor={"#7A83F4"}
        borderWidth={2}
        marginY={40}
        marginX={10}
        mt={10}
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
      >
        <Center flex={1}>
          <Text
            mt={-30}
            textAlign="center"
            mb={15}
            fontSize="lg"
            color="#B9BDF0"
          >
            {user.name}
            {" - " + user.userId}
          </Text>
          <Text
            mt={0}
            textAlign="center"
            mb={6}
            fontSize="lg"
            color="#7A83F4"
            fontWeight={"bold"}
          >
            Scan to Pay Me
          </Text>
          <QRCode
            value={JSON.stringify(user)}
            size={200}
            color="black"
            backgroundColor="white"
          />
          <Box mt={-6} px={4} py={2} borderRadius={10}>
            <HStack>
              <Pressable
                onPress={() => navigation.navigate("SetAmountScreen")}
                mt={10}
                mr={2}
              >
                <Text color="#7A83F4" fontSize="md" fontWeight="bold">
                  Set Amount
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("SaveImage")}
                mt={10}
                ml={2}
              >
                <Text color="#7A83F4" fontSize="md" fontWeight="bold">
                  Save Image
                </Text>
              </Pressable>
            </HStack>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default QRScreen;
