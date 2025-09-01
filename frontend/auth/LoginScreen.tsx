import React, { useState } from "react";
import { Box, Input, Button, Text, Center } from "native-base";
import { TextInput } from "react-native";
import axios from "axios";

type LoginScreenProps = {
  setLoggedInUser: (user: any) => void;
};

export default function LoginScreen({ setLoggedInUser }: LoginScreenProps) {
  const [phone, setPhone] = useState("09");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!phone || !pin) {
      setError("Please enter phone and PIN");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.99.96:5000/api/user/login",
        { phone, pin }
      );
      setLoggedInUser(response.data);
      setError("");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid phone or PIN");
    }
  };

  return (
    <Center flex={1} px={6}>
      <Text fontSize="2xl" mb={6} fontWeight="bold">
        Login
      </Text>

      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={{
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 8,
          color: "black",
          width: "100%",
        }}
        keyboardType="phone-pad"
      />

      <TextInput
        placeholder="PIN"
        value={pin}
        onChangeText={setPin}
        style={{
          marginBottom: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 8,
          color: "black",
          width: "100%",
        }}
        secureTextEntry
      />

      {error ? (
        <Text color="red.500" mb={3}>
          {error}
        </Text>
      ) : null}

      <Button mt={4} width="100%" onPress={handleLogin}>
        Login
      </Button>
    </Center>
  );
}
