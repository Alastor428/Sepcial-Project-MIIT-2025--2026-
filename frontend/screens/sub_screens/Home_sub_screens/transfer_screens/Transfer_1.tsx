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
import SmallNextButton from "../../../../components/small_next_button";
import { PixelRatio } from "react-native";

export default function TransferScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box
        bg="#B8AEE0"
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
        pt={12}
        pb={8}
        px={6}
        height={180}
      >
        <HStack alignItems="center" height={26}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-undo" size={6} color="#fff" />
          </Pressable>
        </HStack>
        <Center w="100%" mt={-9} mb={4}>
                  <Text color="#fff" fontSize="3xl" fontWeight="bold">
                    Transfer
                  </Text>
                </Center>
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
          mt={-10}
          width={329}
          height={162}
          mb={10}
        >
          <Text color="#7A83F4" mb={2}>
            Transfer to Phone Number{" "}
            <Icon as={MaterialIcons} name="error-outline" size={4} color={"#7A83F4"}/>
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
              <Icon as={FontAwesome5} name="address-book" size={4} color={"#7A83F4"}/>
            </Pressable>
          </HStack>
          <Pressable>
            <SmallNextButton/>
          </Pressable>
        </Box>
      </Center>
    </Box>
  );
}
