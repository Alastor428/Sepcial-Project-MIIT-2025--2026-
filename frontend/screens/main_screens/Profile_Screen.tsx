import React, { useEffect, useState, useRef } from "react";
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
  Button,
  AlertDialog,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Updates from "expo-updates";
import { userAPI } from "../../services/api";

interface ProfileScreenProps {
  loggedInUser: any;
  setLoggedInUser?: (user: any) => void;
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  loggedInUser,
  setLoggedInUser,
  navigation,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const cancelRef = useRef(null);

  // Fetch user data
  useEffect(() => {
    if (!loggedInUser?.userId) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getDashboard(loggedInUser.userId);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [loggedInUser]);

  // Logout function
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
      setProfileImage(null);
      if (setLoggedInUser) setLoggedInUser(null);

      // Reload the app
      await Updates.reloadAsync();
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // Pick image
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

  if (!user) {
    return (
      <Center flex={1}>
        <Text>No profile data found.</Text>
      </Center>
    );
  }

  return (
    <Box flex={1} bg="white">
      {/* Header */}
      <Box
        bg="#B9BDF0"
        p={6}
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        height={304}
      >
        <Center mt={10}>
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
              onPress={pickImage}
            >
              <Icon as={Ionicons} name="camera" size={5} color="#7A83F4" />
            </Pressable>
          </Box>

          <Text mt={4} fontSize="20" fontWeight="700" color="#fff">
            {user?.name || "No Name"}
          </Text>
          <Text fontSize="20" color="#fff" fontWeight="700">
            {user?.phone || "No Phone"}
          </Text>
        </Center>
      </Box>

      {/* Info Section */}
      <Box mx={8} mt={6} shadow={4} bg="white" borderRadius={8}>
        <VStack space={0}>
          <ProfileRow label="ID Number" value={user?.userId} />
          <ProfileRow label="Gender" value={user?.gender} />
          <ProfileRow label="Employment" value={user?.employment} />
          <ProfileRow label="Date of Birth" value={user?.dob} />
          <ProfileRow label="NRC" value={user?.NRC || user?.nrc} />

          <Divider bg="#B9BDF0" opacity={0.2} />

          <Pressable height={45} px={4} onPress={() => navigation.navigate("Setting")}>
            <HStack>
              <Text fontSize="20" fontWeight="700" color="#7A83F4" mr={"210px"}>
                Setting
              </Text>
              <Icon as={Ionicons} name="chevron-forward" size={5} color="#7A83F4" mt={"10px"} />
            </HStack>
          </Pressable>

          <Divider bg="#B9BDF0" opacity={0.2} />

          <Pressable onPress={() => setShowLogoutConfirm(true)}>
            <HStack height={45} px={4}>
              <Text fontSize="20" fontWeight="700" color="#7A83F4" mr={"206px"}>
                Log Out
              </Text>
              <Icon as={Ionicons} name="chevron-forward" size={5} color="#7A83F4" mt={"10px"} />
            </HStack>
          </Pressable>
        </VStack>
      </Box>

      {/* Logout Confirmation */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Confirm Logout</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to log out? 
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button
              ref={cancelRef}
              onPress={() => setShowLogoutConfirm(false)}
              backgroundColor="#7A83F4"
            >
              Cancel
            </Button>
            <Button
              onPress={handleLogout}
              ml={3}
              backgroundColor="#7A83F4"
            >
              Log Out
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

function ProfileRow({ label, value }: { label: string; value?: string }) {
  return (
    <>
      <Pressable>
        <HStack alignItems="center" space={3} height={45} px={4}>
          <Text fontSize="20" fontWeight="700" color="#7A83F4">
            {label}
          </Text>
          <Text fontSize="20" color="#B9BDF0" fontWeight="700" ml={10}>
            {value || "N/A"}
          </Text>
        </HStack>
      </Pressable>
      <Divider bg="#B9BDF0" opacity={0.2} />
    </>
  );
}

export default ProfileScreen;
