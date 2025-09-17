import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Text,
  Pressable,
  Icon,
  Center,
  Button,
  HStack,
} from "native-base";
import { TextInput } from "react-native";
import NextButton from "../../../components/next_button";

const ResetUsernameScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  const handleNext = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    navigation.navigate("ConfirmUsername", { newName: name });
  };

  return (
    <Box flex={1} bg="white">
      <Box
        bg="white"
        p={4}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={8} color="#7A83F4"  mt={"50px"}/>
        </Pressable>
      </Box>

        <HStack justifyContent={"center"} py={10}>
          <Text fontSize="24" fontWeight="700" color="#7A83F4" mb={6}>
          Reset Username
        </Text>
        </HStack>

        <Center>
          <HStack justifyContent={"center"} width={"326px"} height={"56px"} backgroundColor= {"white"}
              borderWidth={1} 
              borderColor= {"#7A83F4"}
              borderRadius= {10} >
          
          <TextInput
            placeholder="Enter your new username"
            value={name}
            onChangeText={setName}
            keyboardType="default"
            style={{
              
              padding: 12,
              fontSize: 16,
            }}
          />
        
        </HStack>
        </Center>

        <HStack justifyContent={"center"} py={10}>
            <NextButton onPress={()=> navigation.navigate("PinEntryScreen")}/>
      </HStack>
    </Box>
  );
};

export default ResetUsernameScreen;
