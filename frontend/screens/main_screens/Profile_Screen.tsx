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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker"; 

interface ProfileScreenProps {
  loggedInUser: any;
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ loggedInUser, navigation }) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://172.16.206.192:5000/api/user/${loggedInUser.id}/profile`)
      .then((res) => {
        setUserData(res.data);
        setProfileImage(res.data.avatar || null); // ✅ Load avatar if exists
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [loggedInUser.id]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // ✅ Pick image from phone
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setProfileImage(selectedImage);
      const formData = new FormData();
      formData.append("avatar", {
        uri: selectedImage,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);

      try {
        await axios.post(
          `http://172.16.206.192:5000/api/user/${loggedInUser.id}/upload-avatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
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

  const user = userData || loggedInUser;

  return (
    <Box flex={1} bg="white" safeArea>
      {/* Profile Header */}
      <Box bg="#fff" p={6} borderBottomLeftRadius={30} borderBottomRightRadius={30}>
        <Center>
          <Box position="relative">
            <Avatar
              size="120"
              bg="#D9D9D9"
              source={{ uri: profileImage || "https://via.placeholder.com/150" }}
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
              onPress={pickImage} // ✅ open gallery
            >
              <Icon as={Ionicons} name="camera" size={5} color="#7A83F4" />
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

      {/* Info Section */}
      <Box mx={8} mt={6} shadow={4} bg="white">
        <VStack space={0}>
          <Pressable>
            <HStack alignItems="center" space={3} height={45} px={4}>
              <Text fontSize="20" fontWeight="700" color="#7A83F4">
                ID Number
              </Text>
              <Text fontSize="20" color="#B9BDF0" fontWeight="700" ml={10}>
                {user?.userId || "N/A"}
              </Text>
            </HStack>
          </Pressable>

          <Divider bg="#B9BDF0" opacity={0.2} />

          <Pressable>
            <HStack alignItems="center" space={3} height={45} px={4}>
              <Text fontSize="20" fontWeight="700" color="#7A83F4">
                Gender
              </Text>
              <Text fontSize="20" color="#B9BDF0" fontWeight="700" ml={20}>
                {user?.gender || "N/A"}
              </Text>
            </HStack>
          </Pressable>

          <Divider bg="#B9BDF0" opacity={0.2} />

          <Pressable>
            <HStack alignItems="center" space={3} height={45} px={4}>
              <Text fontSize="20" fontWeight="700" color="#7A83F4">
                Employment
              </Text>
              <Text fontSize="20" color="#B9BDF0" fontWeight="700" ml={5}>
                {user?.employment || "N/A"}
              </Text>
            </HStack>
          </Pressable>

          <Divider bg="#B9BDF0" opacity={0.2} />

          <Pressable>
            <HStack alignItems="center" space={3} height={45} px={4}>
              <Text fontSize="20" fontWeight="700" color="#7A83F4">
                Date of Birth
              </Text>
              <Text fontSize="20" color="#7A83F4" fontWeight="700" opacity={0.5} ml={4} mr={"24px"}>
                {user?.dob || "N/A"}
              </Text>
              <Icon as={Ionicons} name="chevron-forward" size={5} color="#7A83F4" />
            </HStack>
          </Pressable>

          <Divider bg="#B9BDF0" opacity={0.2} />

          <Pressable height={45} px={4}>
            <HStack>
              <Text fontSize="20" fontWeight="700" color="#7A83F4" mr={"210px"}>
                Setting
              </Text>
              <Icon as={Ionicons} name="chevron-forward" size={5} color="#7A83F4" mt={"10px"}/>
            </HStack>
          </Pressable>

          <Divider bg="#B9BDF0" opacity={0.2} />

          <Pressable onPress={handleLogout}>
            <HStack height={45} px={4}>
              <Text fontSize="20" fontWeight="700" color="#7A83F4" mr={"210px"}>
                Logout
              </Text>
              <Icon as={Ionicons} name="chevron-forward" size={5} color="#7A83F4" mt={"10px"}/>
            </HStack>
          </Pressable>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
