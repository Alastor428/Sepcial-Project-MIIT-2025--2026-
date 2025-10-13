import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Box, Center, Text, Pressable } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // Logged-in user (from params)
  const loggedInUser = route?.params?.loggedInUser ?? null;

  // 🔹 Animated value for scan line
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  useEffect(() => {
    startScanLineAnimation();
  }, []);

  const startScanLineAnimation = () => {
    scanAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    alert(`QR Scanned: ${data}`);

    const sender = loggedInUser || {
      name: "Demo Sender",
      balance: 5000,
      userId: "U001",
      pin: "1234",
    };

    navigation.navigate("TransferAmountScreen", {
      sender,
      loggedInUser: sender,
      scannedData: data,
    });
  };

  if (!permission) {
    return (
      <Center flex={1}>
        <Text>Requesting camera permission...</Text>
      </Center>
    );
  }

  if (!permission.granted) {
    return (
      <Center flex={1}>
        <Text color="gray.600" fontSize="lg" mb={4}>
          Camera permission not granted.
        </Text>
        <Pressable onPress={requestPermission}>
          <Box bg="#7A83F4" px={5} py={2} borderRadius={10}>
            <Text color="#fff">Grant Permission</Text>
          </Box>
        </Pressable>
      </Center>
    );
  }

  // 🔹 Animation for moving scan line vertically
  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220], // vertical movement range
  });

  return (
    <Box flex={1} bg="#000">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />

      {/* Overlay Header */}
      <Box style={styles.overlay}>
        <Box
          bg="#b9bdf0"
          pt={12}
          height={304}
          px={6}
          borderBottomLeftRadius={20}
          borderBottomRightRadius={20}
        >
          <Center mt={65}>
            <Text fontSize="32" color="#fff" fontWeight="bold">
              Scan QR Code
            </Text>
          </Center>
        </Box>

        {/* 🔹 QR Scan Frame */}
        <Center flex={1}>
          <Box
            w={260}
            h={260}
            borderWidth={3}
            borderColor="#7A83F4"
            borderRadius={15}
            overflow="hidden"
          >
            {/* 🔹 Animated Scan Line */}
            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [{ translateY }],
                },
              ]}
            />
          </Box>
        </Center>

        {scanned && (
          <Center position="absolute" bottom={20} w="100%">
            <Pressable onPress={() => setScanned(false)}>
              <Box bg="#7A83F4" px={5} py={2} borderRadius={10}>
                <Text color="#fff">Tap to Scan Again</Text>
              </Box>
            </Pressable>
          </Center>
        )}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
  },
  scanLine: {
    width: "100%",
    height: 3,
    backgroundColor: "#7A83F4",
    opacity: 0.8,
  },
});
