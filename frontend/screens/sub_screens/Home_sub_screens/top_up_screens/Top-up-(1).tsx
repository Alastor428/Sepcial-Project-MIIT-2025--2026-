import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { TextInput } from "react-native";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  Center,
  Spinner,
} from "native-base";
import axios from "axios";
import ContinueButton from "../../../../components/continue_button";
import ContactPicker from "../../../../components/contacts";
import TopUpPinScreen from "./top-up-pin-screen";

export default function TopUpScreen() {
  const navigation = useNavigation();
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (pin.length === 6 && amount) {
      console.log("PIN:", pin);
      console.log("Amount:", amount);
      // Proceed to next step
    }
  };

  return (
    <Box flex={1} bg="#fff"  >
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
                            Top Up
                          </Text>
                        </Center>
                        <Box w={6} /> 
                      </HStack>
      </Box>
       <HStack justifyContent="center" mt="44px" mx="auto" height="38px" width="328px" justifyItems={"center"} alignItems="center">
  <TextInput
    style={{
      flex: 1,
      fontSize: 18,
      paddingVertical: 8,
      paddingHorizontal: 4,
      borderColor: "#7A83F4",
      borderWidth: 2,
      marginRight: 8,
    }}
    placeholder="Enter Phone Number"
    keyboardType="phone-pad"
    value={amount}
    onChangeText={setAmount}
    
  />

  {/* ✅ Contact picker fills TextInput */}
  <ContactPicker onSelect={(num) => setAmount(num)} />
</HStack>
<HStack justifyContent="left" mt="20px" mx="10%">
  <Text fontSize="20" color="#7A83F4" fontWeight="medium" fontStyle={"inter"}>
    Amount
  </Text>
</HStack>
    <HStack>
      <Pressable
        style={{
          borderWidth: 2, 
          borderColor: "#7A83F4",
          width: 100,
          height: 42,}}
        mt="25px"
        ml={"33px"}
        alignItems="center"><Text mt={2} color={"#7A83F4"}>1000ks</Text></Pressable>
        <Pressable
        style={{
          borderWidth: 2, 
          borderColor: "#7A83F4",
          width: 100,
          height: 42,}}
        mt="25px"  
        ml={"12px"}       
        alignItems="center"><Text mt={2} color={"#7A83F4"} >2000ks</Text></Pressable>
        <Pressable
        style={{
          borderWidth: 2, 
          borderColor: "#7A83F4",
          width: 100,
          height: 42,}}
        mt="25px"  
        ml={"12px"}       
        alignItems="center"><Text mt={2} color={"#7A83F4"} >3000ks</Text></Pressable>
    </HStack>
    <HStack>
      <Pressable
        style={{
          borderWidth: 2, 
          borderColor: "#7A83F4",
          width: 100,
          height: 42,}}
        mt="14px"
        ml={"33px"}
        alignItems="center"><Text mt={2} color={"#7A83F4"}>5000ks</Text></Pressable>
        <Pressable
        style={{
          borderWidth: 2, 
          borderColor: "#7A83F4",
          width: 100,
          height: 42,}}
        mt="14px"  
        ml={"12px"}       
        alignItems="center"><Text mt={2} color={"#7A83F4"} >10000ks</Text></Pressable>
        <Pressable
        style={{
          borderWidth: 2, 
          borderColor: "#7A83F4",
          width: 100,
          height: 42,}}
        mt="14px"  
        ml="12px"       
        alignItems="center"><Text mt={2} color={"#7A83F4"} >20000ks</Text></Pressable>
    </HStack>
    <Center mt={"32px"}><ContinueButton onPress={() => navigation.navigate("TopUpPinScreen", { amount })} /></Center>

    </Box>
  );
}
