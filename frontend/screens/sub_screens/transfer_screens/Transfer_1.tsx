// TransferScreen.tsx
import React, { useState } from "react";
import {
  Box,
  Text,
  HStack,
  Input,
  Icon,
  Pressable,
  Center,
} from "native-base";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function TransferScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box
        bg="#B8AEE0"
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        pt={12}
        pb={8}
        px={6}
      >
        <HStack alignItems="center" space={3}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-back" size={6} color="#fff" />
          </Pressable>
          <Text color="#fff" fontSize="2xl" fontWeight="bold">
            Transfer
          </Text>
        </HStack>
      </Box>

      {/* Input Section */}
      <Center mt={-10}>
        <Box
          bg="#fff"
          px={6}
          py={4}
          borderRadius={20}
          shadow={2}
          w="80%"
          alignItems="center"
        >
          <Text color="#6A5ACD" mb={2}>
            Transfer to Phone Number{" "}
            <Icon as={MaterialIcons} name="error-outline" size={4} />
          </Text>
          <HStack
            borderBottomWidth={1}
            borderColor="#ccc"
            alignItems="center"
            mb={4}
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
            <Icon as={FontAwesome5} name="address-book" size={4} />
          </HStack>
          <Pressable
            bg="#6A5ACD"
            px={6}
            py={2}
            borderRadius={8}
            onPress={() => {
              console.log("Proceeding with:", phoneNumber);
            }}
          >
            <Text color="#fff" fontWeight="bold">
              Next
            </Text>
          </Pressable>
        </Box>
      </Center>
    </Box>
  );
}
