import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  Center,
  Avatar,
  Divider,
  Spinner,
} from "native-base";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // <-- add this



interface ProfileScreenProps {
  loggedInUser: any; // data from previous login
  navigation: any; // navigation prop for logout
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ loggedInUser, navigation }) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch full profile from backend using loggedInUser.id
    axios
      .get(`http://192.168.99.96:5000/api/user/${loggedInUser.id}/profile`)
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [loggedInUser.id]);

  const handleLogout = async () => {
    try {
      // Clear any saved tokens
      await AsyncStorage.removeItem("authToken");
      // Reset navigation stack to LoginScreen
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner size="lg" />
        <Text mt={4}>Loading profile...</Text>
      </Center>
    );
  }

  const user = userData || loggedInUser; // fallback if backend fails

  return (
    <Box flex={1} bg="white" safeArea>
      {/* Profile Header */}
      <Box bg="#fff" p={6} borderBottomLeftRadius={30} borderBottomRightRadius={30}>
        <Center>
          <Box position="relative">
            <Avatar
              size="120"
              bg="#D9D9D9"
              source={{ uri: user?.avatar || "https://via.placeholder.com/150" }}
            />
            <Pressable
              position="absolute"
              bottom={0}
              right={0}
              bg="#fff"
              borderRadius="full"
              p={1}
              borderWidth={2}
              borderColor="white"
            >
              <Icon as={Ionicons} name="pencil" size={4} color="#7A83F4" />
            </Pressable>
          </Box>

          <Text mt={4} fontSize="20" fontWeight="700" color="#7A83F4">
            {user?.name || "No Name"}
          </Text>
          <Text fontSize="20" color="#B9BDF0" fontWeight="700">
            {user?.phone || "No Phone"}
          </Text>
        </Center>
      </Box>

      {/* Personal Info Box */}
      <Box
        mx={8}
        mt={6}
        borderWidth={1}
        borderColor="#7A83F4"
        borderRadius={10}
        shadow={1}
        bg="white"
      >
        <VStack space={0}>
          {/* ID Number */}
          <Pressable>
            <Box p={2} flexDirection="row" justifyContent="space-between" alignItems="center">
              <HStack alignItems="center" space={3}>
                <Text fontSize="20" fontWeight="700" color="#7A83F4">
                  ID Number
                </Text>
                <Text fontSize="20" color="#B9BDF0" fontWeight="700" ml={10}>
                  {user?.id || "N/A"}
                </Text>
              </HStack>
            </Box>
          </Pressable>

          <Divider bg="#B9BDF0" />

          {/* Gender */}
          <Pressable>
            <Box p={2} flexDirection="row" justifyContent="space-between" alignItems="center">
              <HStack alignItems="center" space={3}>
                <Text fontSize="20" fontWeight="700" color="#7A83F4">
                  Gender
                </Text>
                <Text fontSize="20" color="#B9BDF0" fontWeight="700" ml={20}>
                  {user?.gender || "N/A"}
                </Text>
              </HStack>
            </Box>
          </Pressable>

          <Divider bg="#B9BDF0" />

          {/* Employment */}
          <Pressable>
            <Box p={3} flexDirection="row" justifyContent="space-between" alignItems="center">
              <HStack alignItems="center" space={3}>
                <Text fontSize="20" fontWeight="700" color="#7A83F4">
                  Employment
                </Text>
                <Text fontSize="20" color="#B9BDF0" fontWeight="700" ml={5}>
                  {user?.employment || "N/A"}
                </Text>
              </HStack>
            </Box>
          </Pressable>

          <Divider bg="#B9BDF0" />

          {/* Date of Birth */}
          <Pressable>
            <Box p={4} flexDirection="row" justifyContent="space-between" alignItems="center">
              <HStack alignItems="center" space={3}>
                <Text fontSize="20" fontWeight="700" color="#7A83F4">
                  Date of Birth
                </Text>
              </HStack>
              <HStack alignItems="center">
                <Text fontSize="20" color="#7A83F4" fontWeight="700" ml={-30}>
                  {user?.dob || "View"}
                </Text>
                <Icon as={Ionicons} name="chevron-forward" size={5} color="#7A83F4" ml={1} />
              </HStack>
            </Box>
          </Pressable>

          <Divider bg="#B9BDF0" />

          {/* Setting */}
          <Pressable>
            <Box p={4} flexDirection="row" justifyContent="space-between" alignItems="center">
              <Text fontSize="20" fontWeight="700" color="#7A83F4">
                Setting
              </Text>
              <Icon as={Ionicons} name="chevron-forward" size={5} color="#7A83F4" />
            </Box>
          </Pressable>

          <Divider bg="#B9BDF0" />

          {/* Logout */}
          <Pressable onPress={handleLogout}>
            <Box p={6} flexDirection="row" justifyContent="space-between" alignItems="center">
              <Text fontSize="20" fontWeight="700" color="#7A83F4">
                Logout
              </Text>
              <Icon as={Ionicons} name="chevron-forward" size={5} color="#7A83F4" />
            </Box>
          </Pressable>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
