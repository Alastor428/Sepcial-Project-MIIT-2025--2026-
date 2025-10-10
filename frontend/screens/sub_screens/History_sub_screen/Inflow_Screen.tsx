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
  ScrollView,
  Divider,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Scan: undefined;
  Bank: undefined;
  Profile: undefined;
};

const InflowScreen = () => {
  const navigation = useNavigation();
  const inflows = [
    { user: "User1", date: "20/7 12:00:31", amount: "+100.00Ks" },
    { user: "User2", date: "21/7 12:00:31", amount: "+100.00Ks" },
    { user: "User3", date: "22/7 12:00:31", amount: "+100.00Ks" },
    { user: "User4", date: "23/7 12:00:31", amount: "+100.00Ks" },
    { user: "User5", date: "24/7 12:00:31", amount: "+100.00Ks" },
  ];

  return (
    <Box flex={1} bg="white" safeArea>
      {/* Tabs with borders */}
      <HStack justifyContent="center" p={15}>
        <Box 
        w="30%"
          borderWidth={2} 
          borderColor="#7A83F4" 
          borderRadius="2" 
          p={2}
          mr={2}
          pt={3}
        >
          <Pressable>
            <Text fontSize="18" 
            color="#7A83F4" 
            fontWeight="600" 
            fontFamily="inter" 
            fontStyle="semi bold">
              Graph
              </Text>
          </Pressable>
        </Box>
        
        <Box 
          w="30%"
          borderWidth={2} 
          borderColor="#7A83F4" 
          borderRadius="2" 
          p={2}
          mx={2}
          pt={2}
          bg="#7A83F4"
          ml={-4}
        >
          <Pressable>
            <Text fontSize="18" 
            color="#ffff"
            fontWeight="600" 
            fontFamily="inter" 
            fontStyle="semi bold"
            >
              Inflow
              </Text>
          </Pressable>
        </Box>
        
        <Box 
          w="30%"
          borderWidth={2} 
          borderColor="#7A83F4" 
          borderRadius="2" 
          p={2}
          ml={-4}
          pt={2}
        >
          <Pressable>
            <Text fontSize="18" 
            color="#7A83F4"
             fontWeight="600" 
            fontFamily="inter" 
            fontStyle="semi bold"
            >
              Outflow
              </Text>
          </Pressable>
        </Box>
      </HStack>
      
      {/* Month Selector */}
      <HStack justifyContent="center" p={2}>
        <Text fontSize="16" 
        fontWeight="400"
        fontStyle="regular"
        >
          {"< < August >>"}
          </Text>
      </HStack>
      
      {/* Inflow Card */}
      <ScrollView>
        <Box
          bg="#7A83F4"
          p={4}
          mx={10}
          borderRadius="10"
          shadow={3}
          mb={30}
        >
          <HStack justifyContent="space-between" alignItems="center">
            <HStack space={2} alignItems="center">
              <Icon as={Ionicons} name="wallet-outline" size={6} color="white" />
              <Text color="white"
              fontFamily="inter"
              fontSize="16"
              fontWeight="700"
              fontStyle="bold"
              >
                NexoWallet
                </Text>
            </HStack>
          </HStack>
          
          <HStack justifyContent="space-between" alignItems="center">
            <Text 
            mt={2} 
            color="white"
             fontSize="16"
             fontWeight="600"
             fontStyle="semi bold"
             fontFamily="inter"
             >
              InFlow
            </Text>
            <Text 
            color="#B9BDF0" 
             fontSize="16"
              fontWeight="600"
             fontStyle="semi bold"
             fontFamily="inter"
             >+1000.00Ks
             </Text>
          </HStack>
          </Box>
          </ScrollView>
          <ScrollView>
            <Box
          bg="#ffff"
          p={4}
          mx={10}
          borderRadius="10"
          shadow={3}
          mb={1000}
          pb={150}
        >
          <VStack mt={5} space={3}>
            {inflows.map((item, index) => (
              <Box
                key={index}
                bg="white"
                borderRadius="2"
                p={4}
                shadow={2}
                w={-250}
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <VStack flex={1}>
                    <Text 
                      fontSize="12"
                      fontFamily="inter"
                      fontWeight="600"
                      color="#7A83F4"
                    >
                      Transfer from {item.user}
                    </Text>
                    <Text 
                      fontSize="12"
                      color="#B9BDF0"
                      fontFamily="inter"
                      fontWeight="500"
                      mt={1}
                    >
                      {item.date}
                    </Text>
                  </VStack>
                  <Text 
                    fontSize="12"
                    fontWeight="700"
                    color="#7A83F4"
                  >
                    {item.amount}
                  </Text>
                </HStack>
              </Box>
            ))}
          </VStack>
          </Box>
        </ScrollView>
        </Box>
  );
};

export default InflowScreen;