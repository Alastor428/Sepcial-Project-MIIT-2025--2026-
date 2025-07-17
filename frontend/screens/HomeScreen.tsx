import React from "react";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  Center,
} from "native-base";

export default function HomeScreen({ navigation }) {
  return (
    <Box flex={1} bg="#fff">
      {/* Upper Section */}
      <Box
        bg="#7B93C7"
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        pt={16}
        pb={10}
        px={6}
        alignItems="flex-start"
      >
        <HStack height={46} alignItems="center" mb={2}>
          <Icon
            as={Ionicons}
            name="person-circle-outline"
            size={7}
            color="#fff"
            mr={2}
          />
          <Text color="#fff" fontSize={"lg"} fontWeight={"600"}>
            Account Name
          </Text>
        </HStack>
        <Center mt={5} w="100%">
          <Text color="#e0e6f7" fontSize="sm">
            Total Balance (Ks)
          </Text>
          <HStack alignItems="center" mt={1}>
            <Icon
              as={Ionicons}
              name="eye-outline"
              size={5}
              color="#fff"
              mr={1.5}
            />
            <Text color="#fff" fontSize={"2xl"} fontWeight={"bold"}>
              1,000.00
            </Text>
          </HStack>
          <Text color="#e0e6f7" fontSize="xs" mt={1}>
            User ID-123456789
          </Text>
        </Center>
      </Box>

      {/* Middle Section: 6 Function Buttons hee hee */}
      <VStack mt={2} flex={1} justifyContent="center" space={39}>
        <HStack space={70} justifyContent="center">
          <FunctionButton
            icon={
              <Icon
                as={MaterialIcons}
                name="compare-arrows"
                size={7}
                color="#7B93C7"
              />
            }
            label="Transfer"
            onPress={() => navigation.navigate("Transfer")}
          />
          <FunctionButton
            icon={
              <Icon
                as={MaterialIcons}
                name="qr-code"
                size={7}
                color="#7B93C7"
              />
            }
            label="QR"
            onPress={() => navigation.navigate("QR")}
          />
        </HStack>
        <HStack space={70} justifyContent="center">
          <FunctionButton
            icon={
              <Icon
                as={FontAwesome5}
                name="money-bill-wave"
                size={6}
                color="#7B93C7"
              />
            }
            label="Cash Out"
            onPress={() => navigation.navigate("CashOut")}
          />
          <FunctionButton
            icon={
              <Icon
                as={FontAwesome5}
                name="money-check-alt"
                size={6}
                color="#7B93C7"
              />
            }
            label="Cash In"
            onPress={() => navigation.navigate("CashIn")}
          />
        </HStack>
        <HStack space={70} justifyContent="center">
          <FunctionButton
            icon={<Icon as={Entypo} name="flash" size={6} color="#7B93C7" />}
            label="Quick pay"
            onPress={() => navigation.navigate("QuickPay")}
          />
          <FunctionButton
            icon={
              <Icon
                as={MaterialIcons}
                name="mobile-friendly"
                size={7}
                color="#7B93C7"
              />
            }
            label="Top-up"
            onPress={() => navigation.navigate("TopUp")}
          />
        </HStack>
      </VStack>
    </Box>
  );
}

function FunctionButton({ icon, label, onPress }) {
  return (
    <Pressable
      width={106}
      height={106}
      bg="#fff"
      borderRadius={20}
      borderWidth={1.5}
      borderColor="rgba(83, 111, 160, 0.5)"
      alignItems="center"
      justifyContent="center"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
      }}
      onPress={onPress}
    >
      {icon}
      <Text mt={2} color="#7B93C7" fontWeight={"600"} fontSize={"md"}>
        {label}
      </Text>
    </Pressable>
  );
}
