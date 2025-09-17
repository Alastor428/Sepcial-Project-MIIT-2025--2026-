import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  Center,
  Divider
} from "native-base";

const SettingsScreen = ({ navigation }) => {
  return (
    <Box flex={1} bg="white" safeArea>
      {/* Header with back button and title */}
      <Box bg="#ffff" p={4} flexDirection="row" alignItems="center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={8} color="#7A83F4" bg="#ffff" />
        </Pressable>
        <Text ml={20} fontSize="24" fontWeight="700" color="#7A83F4" fontFamily="inter" fontStyle="bold" left={5}>
          Settings
        </Text>
      </Box>
      
      {/* Main content */}
      <Center flex={5} px={10}>
        <VStack space={20} w="100%" mt={-20}>
          {/* Reset Username Button */}
          <Pressable 
            onPress={() => navigation.navigate("ResetUserName")}
            bg="white"
            borderRadius="20"
            p={7}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            shadow={4}
            borderWidth={1}
            borderColor="#7A83F4"
            _pressed={{ borderColor: "#7A83F4"}}
          >
            <Text fontSize="16" fontWeight="600" color="#7A83F4" fontFamily="inter" fontStyle="Semi-bold">
              Reset Username
            </Text>
            <Icon as={Ionicons} name="chevron-forward" size={6} color="#7A83F4" />
          </Pressable>
          
          {/* Reset Password Button */}
          <Pressable 
            onPress={() => navigation.navigate("ResetPassword")}
            bg="white"
            borderRadius="20"
            p={7}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            shadow={4}
            borderWidth={1}
            borderColor="#7A83F4"
            _pressed={{ borderColor: "#7A83F4"}}

          >
            <Text fontSize="16" fontWeight="600" color="#7A83F4" fontFamily="inter" fontStyle="semi-bold">
              Reset Password
            </Text>
            <Icon as={Ionicons} name="chevron-forward" size={6} color="#7A83F4" />
          </Pressable>
          
          {/* Reset Mobile Number Button */}
          <Pressable 
            onPress={() => navigation.navigate("ResetMobile")}
            bg="white"
            borderRadius="20"
            p={7}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            shadow={4}
            borderWidth={1}
             borderColor="#7A83F4"
            _pressed={{ borderColor: "#7A83F4"}}
          >
            <Text fontSize="16" fontWeight="600" color="#7A83F4" fontFamily="inter" fontStyle="#7A83F4">
              Reset Mobile Number
            </Text>
            <Icon as={Ionicons} name="chevron-forward" size={6} color="#7A83F4" />
          </Pressable>
          
          {/* Reset Date of Birth Button */}
          <Pressable 
            onPress={() => navigation.navigate("ResetDateOfBirth")}
            bg="white"
            borderRadius="20"
            p={7}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            shadow={4}
            borderWidth={1}
             borderColor="#7A83F4"
            _pressed={{ borderColor: "#7A83F4"}}
          >
            <Text fontSize="16" fontWeight="600" color="#7A83F4" fontFamily="inter" fontStyle="Semi-bold">
              Reset Date of Birth
            </Text>
            <Icon as={Ionicons} name="chevron-forward" size={6} color="#7A83F4" />
          </Pressable>
        </VStack>
      </Center>
      </Box>
  );
};

export default SettingsScreen;