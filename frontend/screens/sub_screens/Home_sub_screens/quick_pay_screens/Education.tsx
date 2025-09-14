// Education.tsx
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  ScrollView,
  Avatar,
  Center,
} from "native-base";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../../navigation/HomeScreen_StackNavigator";

type EducationScreenNavProp = StackNavigationProp<
  RootStackParamList,
  "EducationScreen"
>;

export default function EducationScreen() {
  const navigation = useNavigation<EducationScreenNavProp>();
  const [search, setSearch] = useState("");

  const institutions = [
    {
      id: 1,
      name: "Myanmar Institute of Information Technology University (MIIT)",
      type: "University",
      location: "Mandalay",
      logo: "https://miit-logo.png",
      screen: "MIITPayment",
    },
  ];

  const filteredInstitutions = institutions.filter(
    (institution) =>
      institution.name.toLowerCase().includes(search.toLowerCase()) ||
      institution.type.toLowerCase().includes(search.toLowerCase()) ||
      institution.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box bg="#fff" pt={24} pb={20} px={6} borderBottomRadius="2xl">
        <HStack alignItems="center">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              as={Ionicons}
              name="arrow-undo"
              size={8}
              color="#7A83F4"
              mr={4}
            />
          </Pressable>
          <Center flex={1}>
            <Text color="#7A83F4" fontSize="24" fontWeight="bold">
              Education
            </Text>
          </Center>
        </HStack>
      </Box>

      {/* Institutions */}
      <ScrollView px={3} mt={-3}>
        {filteredInstitutions.length > 0 ? (
          filteredInstitutions.map((institution) => (
            <Pressable
              key={institution.id}
              onPress={() =>
  navigation.navigate("MIITPayment", {
  loggedInUser: {
    sender: null,
    recipient: null,
    amount: 0,
    name: "loggedInUser.name", 
    userId: "loggedInUser.userId",   
    balance: 0,
  },
})

}

              borderRadius="md"
              bg="#fff"
              p={4}
              mb={3}
              shadow={4}
            >
              <HStack alignItems="center" space={4}>
                <Avatar
                  size="md"
                  source={{ uri: institution.logo }}
                  bg="#7A83F4"
                  _text={{ color: "#fff", fontWeight: "bold" }}
                >
                  {institution.name.charAt(0)}
                </Avatar>

                <VStack flex={1}>
                  <Text fontSize="12" fontWeight="bold" color="#7A83F4">
                    {institution.name}
                  </Text>
                  <HStack mt={1}>
                    <Text fontSize="xs" color="#7A83F4" mr={2} opacity={0.5}>
                      {institution.type}
                    </Text>
                    <Text fontSize="xs" color="#7A83F4" opacity={0.5}>
                      • {institution.location}
                    </Text>
                  </HStack>
                </VStack>

                <Icon
                  as={Ionicons}
                  name="chevron-forward"
                  size={5}
                  color="#7A83F4"
                />
              </HStack>
            </Pressable>
          ))
        ) : (
          <Box py={6} alignItems="center">
            <Icon
              as={MaterialCommunityIcons}
              name="school"
              size={10}
              color="#7A83F4"
              mb={2}
            />
            <Text color="gray.500">No institutions found</Text>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}
