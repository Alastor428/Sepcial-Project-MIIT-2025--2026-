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
import QRCode from "react-native-qrcode-svg";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import DoneButton from "../../../../components/done_button";

type User = {
  name: string;
  balance: number;
  userId: string;
};

type QRScreenNavigationProp = StackNavigationProp<RootStackParamList, "QR">;
type QRScreenRouteProp = RouteProp<RootStackParamList, "QR">;

const QRScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<QRScreenNavigationProp>();
  const route = useRoute<QRScreenRouteProp>();
  const currentAmount = route.params?.currentAmount; // optional
  const onDone = () => {
    // To go back to main screen
    navigation.navigate("HomeMain");
  };

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

  // Build the payload for the QR. Only include amount if provided.
  const qrPayload = currentAmount
    ? { ...user, amount: Number(currentAmount) }
    : user;

  return (
    <Box flex={1} bg="#fff">
      {/* Upper Section */}
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
              QR
            </Text>
          </Center>
          <Box w={6} />
        </HStack>
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
            {user.name} {" - " + user.userId}
          </Text>

          {currentAmount ? (
            <Text
              mt={0}
              textAlign="center"
              mb={2}
              fontSize="lg"
              color="#7A83F4"
              fontWeight="bold"
            >
              Amount : {currentAmount} Ks
            </Text>
          ) : null}

          <Text
            mt={0}
            textAlign="center"
            mb={6}
            fontSize="lg"
            color="#7A83F4"
            fontWeight="bold"
          >
            Scan to Pay Me
          </Text>

          <QRCode
            value={JSON.stringify(qrPayload)}
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
                borderRightColor={"#7A83F4"}
                borderRightWidth={2}
              >
                <Text color="#7A83F4" fontSize="md" fontWeight="bold" mr={4}>
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
      <HStack justifyContent="center" mb={20} mt={-20} w="100%">
        <DoneButton onPress={onDone} />
      </HStack>
    </Box>
  );
};

export default QRScreen;
