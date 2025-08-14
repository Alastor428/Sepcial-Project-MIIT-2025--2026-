import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  Input,
  View,
} from "native-base";

export default function CashInScreen() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");

  function handleKeyPress(key: string) {
    if (key === "back") {
      setAmount((prev) => prev.slice(0, -1));
    } else {
      setAmount((prev) => prev + key);
    }
  }

  const handleSubmit = () => {
    console.log("Submitting:", amount);
  };

  return (
    <Box flex={1} bg="#7B93C7" px={6} pt={16} pb={10}>
      {/* Header */}
      <HStack alignItems="center" mb={2}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={6} color="#fff" mr={4} />
        </Pressable>
        <Text color="#fff" fontSize="xl" fontWeight="bold">
          Cash In
        </Text>
      </HStack>

      {/* Bank Info Card */}
      <Box
        mt={6}
        p={4}
        borderWidth={1}
        borderColor="#7B93C7"
        borderRadius={12}
        bg="#fff"
      >
        <HStack alignItems="center" mb={2}>
          <Icon
            as={MaterialIcons}
            name="account-balance"
            size={4}
            mr={1}
            color="#2f3e5c"
          />
          <Text fontSize="md" fontWeight="bold" color="#2f3e5c">
            Bank Account Name
          </Text>
        </HStack>
        <Text color="#999" fontSize="xs" mt={1}>
          ID: ******123
        </Text>
        <Text fontSize="sm" color="#555" mt={2}>
          Request Amount
        </Text>
        <HStack
          alignItems="center"
          borderBottomWidth={1}
          borderColor="#ccc"
          mt={1}
          pb={1}
        >
          <Input
            flex={1}
            value={amount}
            placeholder="Enter Amount"
            fontSize="lg"
            variant="unstyled"
            isReadOnly
          />
          <Text fontSize="md" fontWeight="bold" color="#2d3e5c">
            Ks
          </Text>
        </HStack>
        <Text mt={3} color="#999" fontSize="xs">
          Total Balance: 500000.00 Ks
        </Text>
      </Box>
      <HStack space={2} alignItems="center" w="90%" mt={-20}>
        <Text fontSize="lg" color="#7A83F4">
          Amount
        </Text>
        <Input
        variant="unstyled"
        placeholder="EnterAmount"
        fontSize="lg"
        value={amount}
        onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g,""))}
        keyboardType="numeric"
        flex={1}
        />
      </HStack>
    </Box>
  );
}

function KeypadButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <View style={{ width: "24%", aspectRatio: 1 }}>
      <Pressable
        bg="#F3F3F3"
        borderRadius={12}
        justifyContent="center"
        alignItems="center"
        flex={1}
        onPress={onPress}
      >
        {label === "back" ? (
          <Icon as={Ionicons} name="backspace" size={5} color="#333" />
        ) : (
          <Text fontSize="xl" color="#333">
            {label}
          </Text>
        )}
      </Pressable>
    </View>
  );
}
