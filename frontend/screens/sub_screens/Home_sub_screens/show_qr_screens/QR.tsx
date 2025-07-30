import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Box, Center, Spinner, Text, HStack, Icon } from "native-base";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

type User = {
  name: string;
  balance: number;
  userId: string;
};

const QRScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://192.168.68.111:5000/api/user/123/dashboard")
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
        pt={16}
        pb={10}
        px={6}
        alignItems="flex-start"
      >
        <HStack height={32} alignItems="center" mb={2}>
          <Icon
            as={Ionicons}
            name="Backspace-arrow-outline"
            size={7}
            color="#fff"
            mr={2}
          />
        </HStack>
        <Center mt={5} w="100%">
          <Text color="#fff" fontSize="2xl" fontWeight="bold">
            QR
          </Text>
        </Center>
      </Box>
      {/* QR Code Section */}
      <Center flex={1}>
        <QRCode
          value={JSON.stringify(user)}
          size={200}
          color="black"
          backgroundColor="white"
        />
        <Text mt={4} textAlign="center">
          Scan this QR to share your info
        </Text>
      </Center>
    </Box>
  );
};

export default QRScreen;
