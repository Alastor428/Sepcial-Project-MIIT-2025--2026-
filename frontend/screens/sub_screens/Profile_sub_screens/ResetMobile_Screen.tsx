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
  Button,
  Input
} from "native-base";

const ResetMobileNumberScreen = ({ navigation }) => {
  return (
    <Box flex={1} bg="white" safeArea>
      {/* Header with back button and title */}
      <Box bg="#ffff" p={4} flexDirection="row" alignItems="center" justifyContent="space-between">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={8} color="#7A83F4" bg="#ffff" />
        </Pressable>
      </Box>
      
      {/* Main content */}
      <Center flex={1} px={30} pt={-100} pb={300}>
        {/* Input field for username */}
         <Text fontSize="24" fontWeight="700" color="#7A83F4" fontFamily="inter" fontStyle="bold" left={-20}>
          Reset Mobile Number
        </Text>
        <Box w="100%" mb={20}>
          <Input
            fontSize="18"
            fontWeight="400"
            color="#7A83F4"
            fontFamily="inter"
            bg="#ffff"
            borderRadius="20"
            p={3}
            borderWidth={1}
            borderColor="#7A83F4"
            _focus={{ borderColor: "#7A83F4", bg: "#F5F5F5" }}
          />
        </Box>
        
        {/* Next Button */}
        <Button 
          bg="#7A83F4" 
          borderRadius="10" 
          py={1}
          borderWidth={1}
          borderColor="#7A83F4"
          _pressed={{ bg: "#5A63D4" }}
          w="100%"
          mt={5}
        >
          <Text fontSize="24" fontWeight="700" color="white" fontFamily="inter" fontStyle="bold">
            Next
          </Text>
        </Button>
      </Center>
    </Box>
  );
};

export default ResetMobileNumberScreen;