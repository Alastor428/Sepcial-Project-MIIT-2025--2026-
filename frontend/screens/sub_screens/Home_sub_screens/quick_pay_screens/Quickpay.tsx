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
  Input,
  ScrollView,
  Center,
} from "native-base";

export default function QuickPayScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");

  return (
    <Box flex={1} bg="#fff">
      {/* Header */}
      <Box bg="#B9BDF0" pt={20} pb={20} px={6} borderBottomRadius="20">
        <HStack alignItems="center">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} name="arrow-undo" size={7} color="#fff" mr={8} />
          </Pressable>
          <Center flex={1}>
            <Text color="#fff" fontSize="32" fontWeight="600">
              Quick Pay
            </Text>
          </Center>
          <Box w={6} />
        </HStack>
      </Box>

      {/* Search Input */}
      <VStack px={4} mt={4}>
        <Input
          placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
          borderRadius="md"
          bg="#fff"
          borderColor="#B9BDF0"
          fontSize="md"
          px={3}
          py={2}
          InputLeftElement={
            <Icon as={Ionicons} name="search" size={5} ml={3} color="gray.400" />
          }
        />
      </VStack>

      {/* Categories */}
      <ScrollView px={8} mt={4} pt={4}>
        <Text fontSize="20" fontWeight="bold" mb={3}>
          Categories
        </Text>

        {/* Education Category */}
        <Pressable
          onPress={() => navigation.navigate("EducationScreen")}
          borderRadius="md"
          bg="#fff"
          p={14}
          mb={41}
        >
          <HStack alignItems="center" justifyContent="space-between" shadow={"4"}>
            <HStack alignItems="center" space={3}>
              <Box
                bg="#7A83F4"
                borderRadius="full"
                p={2}
                alignItems="center"
                justifyContent="center"
                shadow={"4"}
              
              >
                <Icon
                  as={MaterialCommunityIcons}
                  name="school"
                  size={6}
                  color="#ffff"
                />
              </Box>
              <VStack>
                <Text fontSize="16" fontWeight="bold" color="#7A83F4">
                  Education
                </Text>
                <Text fontSize="12" color="#7A83F4" opacity={0.5}>
                  MIT, ILBC, GUSTO College, Technological University
                </Text>
              </VStack>
            </HStack>

            <Icon
              as={Ionicons}
              name="chevron-forward"
              size={6}
              color="#7A83F4"
            />
          </HStack>
        </Pressable>
      </ScrollView>
    </Box>
  );
}
