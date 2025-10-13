import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Box, VStack, Text, Pressable, Icon, HStack } from "native-base";

export default function BankAccountScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { loggedInUser } = route.params || {}; // received from login

  const [linkedAccount, setLinkedAccount] = useState<string | null>(null);

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box
        bg="#B9BDF0"
        borderBottomRadius={30}
        height={304}
        pt={4}
        pb={2}
        alignItems="center"
      >
        <HStack alignItems="center" mt={75}>
          <Text
            flex={1}
            textAlign="center"
            color="#fff"
            fontSize={32}
            fontWeight="bold"
          >
            Bank Account
          </Text>
        </HStack>
      </Box>

      {/* Main Content */}
      <VStack
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        px={10}
        mt={8}
        mb={40}
        space={6}
      >
        <Text
          fontSize={16}
          fontWeight="400"
          textAlign="center"
          color="#B9BDF0"
        >
          Easily Cash in/Cash out from your bank account
        </Text>

        {linkedAccount && (
          <Text fontSize={18} fontWeight="500" color="#7A83F4">
            Linked Account: {linkedAccount}
          </Text>
        )}

        <Pressable
          onPress={() =>
            navigation.navigate("LinkBankAccount", { loggedInUser })
          }
        >
          <Box
            bg="#fff"
            borderRadius={10}
            py={3}
            px={10}
            flexDirection="row"
            alignItems="center"
            borderWidth={1}
            borderColor="#7A83F4"
          >
            <Icon
              as={Ionicons}
              name="add-circle-outline"
              size={8}
              color="#B9BDF0"
              mr={2}
            />
            <Text color="#B9BDF0" fontSize={16} fontWeight="400">
              Link Bank Account
            </Text>
          </Box>
        </Pressable>
      </VStack>
    </Box>
  );
}
