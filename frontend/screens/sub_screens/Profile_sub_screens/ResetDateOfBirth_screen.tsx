import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Text,
  Pressable,
  Icon,
  Center,
  HStack,
  Select,
  CheckIcon,
  VStack,
} from "native-base";
import NextButton from "../../../components/next_button";

const ResetDateOfBirthScreen = ({ navigation }: any) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

  const handleNext = () => {
    if (!day || !month || !year) {
      alert("Please select your complete date of birth.");
      return;
    }
    navigation.navigate("ResetPin");
  };

  return (
    <Box flex={1} bg="white">
      {/* Header */}
      <Box
        bg="white"
        p={4}
        flexDirection="row"
        mb={20}
        justifyContent="space-between"
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-undo" size={8} color="#7A83F4" mt="50px" />
        </Pressable>
        <HStack justifyContent="center">
          <Text fontSize="24" fontWeight="bold" color="#7A83F4" mt="50px" mr={20}>
            Reset Date of Birth
          </Text>
        </HStack>
      </Box>

      {/* Select Day, Month, Year */}
      <Center>
        <HStack space={3} justifyContent="center">
          {/* Day */}
          <Select
            selectedValue={day}
            minWidth="90"
            accessibilityLabel="Select Day"
            placeholder="Day"
            _selectedItem={{ bg: "#7A83F4", endIcon: <CheckIcon size={4} /> }}
            onValueChange={setDay}
          >
            {days.map((d) => (
              <Select.Item key={d} label={d} value={d} />
            ))}
          </Select>

          {/* Month */}
          <Select
            selectedValue={month}
            minWidth="120"
            accessibilityLabel="Select Month"
            placeholder="Month"
            _selectedItem={{ bg: "#7A83F4", endIcon: <CheckIcon size={4} /> }}
            onValueChange={setMonth}
          >
            {months.map((m) => (
              <Select.Item key={m} label={m} value={m} />
            ))}
          </Select>

          {/* Year */}
          <Select
            selectedValue={year}
            minWidth="100"
            accessibilityLabel="Select Year"
            placeholder="Year"
            _selectedItem={{ bg: "#7A83F4", endIcon: <CheckIcon size={4} /> }}
            onValueChange={setYear}
          >
            {years.map((y) => (
              <Select.Item key={y} label={y} value={y} />
            ))}
          </Select>
        </HStack>
      </Center>

      {/* Next Button */}
      <HStack justifyContent="center" py={10}>
        <NextButton onPress={handleNext} />
      </HStack>
    </Box>
  );
};

export default ResetDateOfBirthScreen;
