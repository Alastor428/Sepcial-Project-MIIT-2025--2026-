import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  Center,
  Button,
} from "native-base";
export default function BankAccountScreen() {
  const navigation = useNavigation();
  
  return (
    <Box flex={1} bg="#fff" safeArea>
      {/* Header Section */}
      <Box bg="#B9BDF0" pt={20} pb={20} px={6} borderBottomRadius={20} mt={-8}>
        <HStack alignItems="center">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-undo" size={8} color="#fff" mr={3} />
          </Pressable>
          <Center flex={1}>
            <Text
              color="#fff"
              fontSize={24}
              fontWeight="600"
              fontFamily="Inter"
              fontStyle="Bold"
            >
              Bank Account
            </Text>
          </Center>
          <Box w={6} />
        </HStack>
      </Box>
      
      {/* Logo Image */}
      {/* Description Text */}
      <Text
        fontSize={16}
        fontWeight="400"
        textAlign="center"
        mb={150}
        color="#B9BDF0"
        mt={180}
        px={10}
      >
        Easily Cash in/Cash out from your bank account
      </Text>
      
      {/* Link Bank Account Button */}
      <Center mb={8}>
        <Pressable onPress={()  => console.log("Link Bank Account Pressed") }>
          <Box 
          bg="#ffff"
          borderRadius={2}
          py={2}
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
            mr={1}
          />
          <Text
            color="#B9BDF0"
            fontSize={16}
            fontWeight="400"
            fontFamily="Inter"
          >
            Link Bank Account
          </Text>
          </Box>
          </Pressable>
      </Center>
      {/* Bottom Navigation */}
      <Box bg="#fff" borderTopWidth={1} borderTopColor="#B9BDF0" position="absolute" bottom={0} width="100%">
        <HStack justifyContent="space-around" py={3}>
          {/* Home */}
          <Pressable onPress={() => console.log("Home Pressed")} alignItems="center">
            <Icon as={Ionicons} name="home-outline" size={6} color="#7A83F4" />
            <Text fontSize={12} color="#7A83F4" mt={1}>
              Home
            </Text>
          </Pressable>
          {/* History */}
          <Pressable onPress={() => console.log("History Pressed")} alignItems="center">
            <Icon as={Ionicons} name="time-outline" size={6} color="#7A83F4" />
            <Text fontSize={12} color="#7A83F4" mt={1}>
              History
            </Text>
          </Pressable>
          {/* Scan - Active */}
          <Pressable onPress={() => console.log("Scan Pressed")} alignItems="center">
            <Icon as={Ionicons} name="scan" size={6} color="#7A83F4" />
            <Text fontSize={12} color="#7A83F4" fontWeight="600" mt={1}>
              Scan
            </Text>
          </Pressable>
          {/* Bank */}
          <Pressable onPress={() => console.log("Bank Pressed")} alignItems="center">
            <Icon as={Ionicons} name="business-outline" size={6} color="#7A83F4" />
            <Text fontSize={12} color="#7A83F4" mt={1}>
              Bank
            </Text>
          </Pressable>
          {/* Profile */}
          <Pressable onPress={() => console.log("Profile Pressed")} alignItems="center">
            <Icon as={Ionicons} name="person-outline" size={6} color="#7A83F4" />
            <Text fontSize={12} color="#7A83F4" mt={1}>
              Profile
            </Text>
          </Pressable>
        </HStack>
      </Box>
    </Box>
  );
}