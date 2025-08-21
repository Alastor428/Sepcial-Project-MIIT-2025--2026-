import React from "react";
import { Box, Center, Text, HStack, Icon, Pressable } from "native-base";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";
import DoneButton from "../../../../components/done_button";

type Props = StackScreenProps<RootStackParamList, "QR">;

export default function QRScreen({ navigation, route }: Props) {
  const { loggedInUser, currentAmount } = route.params;

  if (!loggedInUser) {
    return (
      <Center flex={1}>
        <Text>No user data available</Text>
        <Pressable
          mt={4}
          onPress={() => navigation.navigate("HomeMain", { loggedInUser })}
        >
          <Text color="#7A83F4" fontWeight="bold">
            Go Back Home
          </Text>
        </Pressable>
      </Center>
    );
  }

  const qrPayload = currentAmount
    ? { ...loggedInUser, amount: Number(currentAmount) }
    : loggedInUser;

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
              QR
            </Text>
          </Center>
          <Box w={6} />
        </HStack>
      </Box>

      {/* QR Code */}
      <HStack justifyContent="center" mt={4}>
        <Box width={328} height={486} bg="#fff" borderRadius={20} shadow={5}>
          <Text textAlign="center" fontSize="lg" color="#B9BDF0">
            {loggedInUser.name} - {loggedInUser.userId}
          </Text>

          {currentAmount && (
            <Text
              mt={0}
              textAlign="center"
              mb={2}
              fontSize="lg"
              color="#7A83F4"
              fontWeight="bold"
            >
              Amount: {currentAmount} Ks
            </Text>
          )}

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

          <HStack justifyContent="center" alignItems="center">
            <QRCode value={JSON.stringify(qrPayload)} size={200} />
          </HStack>

          <HStack justifyContent="center" alignItems="center" mt={10}>
            <Pressable
              onPress={() =>
                navigation.navigate("SetAmountScreen", {
                  loggedInUser,
                  currentAmount,
                })
              }
              borderRightColor="#7A83F4"
              borderRightWidth={2}
              mr={4}
            >
              <Text color="#7A83F4" fontSize="md" fontWeight="bold">
                Set Amount
              </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("SaveImage")}>
              <Text color="#7A83F4" fontSize="md" fontWeight="bold">
                Save Image
              </Text>
            </Pressable>
          </HStack>
        </Box>
      </HStack>

      <HStack justifyContent="center" mb={10} mt={-20} w="100%">
        <DoneButton
          onPress={() => navigation.navigate("HomeMain", { loggedInUser })}
        />
      </HStack>
    </Box>
  );
}
