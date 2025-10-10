import React, { useState } from "react";
import { TextInput } from "react-native";
import {
  Center,
  VStack,
  FormControl,
  Text,
  Box,
  Icon,
  Pressable,
  HStack,
  ScrollView,
  Select,

} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ContinueButton from "../components/continue_button";

type NRCScreenProps = {
  onBack: () => void;
  signUpData: { name: string; phone: string; pin: string };
  onContinue: (data: { nrc: string; birthday: string; gender: string; job: string }) => void;
};

export default function NRCScreen({ onBack, signUpData, onContinue }: NRCScreenProps) {
  const [stateCode, setStateCode] = useState("");
  const [townshipCode, setTownshipCode] = useState("");
  const [citizenType, setCitizenType] = useState("");
  const [nrcNumber, setNrcNumber] = useState("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (
      !stateCode ||
      !townshipCode ||
      !citizenType ||
      !nrcNumber ||
      !day ||
      !month ||
      !year ||
      !gender ||
      !job
    ) {
      setError("All fields are required!");
      return;
    }

    const birthday = `${day}/${month}/${year}`;
    const fullNrc = `${stateCode}/${townshipCode}(${citizenType})${nrcNumber}`;

    setError("");
    console.log("Sign-up data:", { nrc: fullNrc, birthday, gender, job });

    onContinue({ nrc: fullNrc, birthday, gender, job });
  };

  return (
    <Box flex={1} bg="white">
      {/* Header */}
      <HStack alignItems="center" px={4} pt={55}>
        <Pressable onPress={onBack}>
          <Icon as={Ionicons} name="arrow-undo" size={7} color="#7A83F4" />
        </Pressable>
        <Center flex={1}>
          <Text fontSize={32} fontWeight="bold" color="#7A83F4">
            NRC & Birthday
          </Text>
        </Center>
        <Box w={6} />
      </HStack>

      {/* Scrollable Form */}
      <ScrollView px={28} pt={30}>
        <VStack space={5} width="100%">
          {/* NRC Fields */}
          <FormControl>
            <Text fontSize={16} color="#7A83F4" mb={2} fontWeight="semibold">
              NRC Number
            </Text>
            <HStack space={2}>
              {/* State Code */}
              <Select
                flex={1}
                selectedValue={stateCode}
                placeholder="State/Region"

                onValueChange={setStateCode}
              >
                <Select.Item label="1 - Kachin" value="1" />
                <Select.Item label="2 - Kayah" value="2" />
                <Select.Item label="3 - Kayin" value="3" />
                <Select.Item label="4 - Chin" value="4" />
                <Select.Item label="5 - Sagaing" value="5" />
                <Select.Item label="6 - Tanintharyi" value="6" />
                <Select.Item label="7 - Bago" value="7" />
                <Select.Item label="8 - Magway" value="8" />
                <Select.Item label="9 - Mandalay" value="9" />
                <Select.Item label="10 - Mon" value="10" />
                <Select.Item label="11 - Rakhine" value="11" />
                <Select.Item label="12 - Yangon" value="12" />
                <Select.Item label="13 - Shan" value="13" />
                <Select.Item label="14 - Ayeyarwady" value="14" />
              </Select>

              {/* Township */}
              <Select
                flex={1}
                selectedValue={townshipCode}
                placeholder="Township"

                onValueChange={setTownshipCode}
              >
                <Select.Item label="PaKaTa" value="PaKaTa" />
                <Select.Item label="LaMaNa" value="LaMaNa" />
                <Select.Item label="KaMaRa" value="KaMaRa" />
                <Select.Item label="MaTaSa" value="MaTaSa" />
                <Select.Item label="MaSaTa" value="MaSaTa" />
                <Select.Item label="KaPaTa" value="KaPaTa" />
                <Select.Item label="KaTaNa" value="KaTaNa" />
                <Select.Item label="SaPaBa" value="SaPaBa" />
                <Select.Item label="TaKaNa" value="TaKaNa" />
                <Select.Item label="WaMaNa" value="WaMaNa" />
                <Select.Item label="DaPaYa" value="DaPaYa" />
                <Select.Item label="BaMaNa" value="BaMaNa" />
                <Select.Item label="SaLaKa" value="SaLaKa" />
                <Select.Item label="KaLaNa" value="KaLaNa" />
                <Select.Item label="KaKaNa" value="KaKaNa" />
                <Select.Item label="HaPaNa" value="HaPaNa" />
                <Select.Item label="LaKaNa" value="LaKaNa" />
                <Select.Item label="MaKaNa" value="MaKaNa" />
                <Select.Item label="NaMaNa" value="NaMaNa" />
                <Select.Item label="PaNaKa" value="PaNaKa" />
              </Select>

              {/* Citizen Type */}
              <Select
                flex={1}
                selectedValue={citizenType}
                placeholder="Type"

                onValueChange={setCitizenType}
              >
                <Select.Item label="N (Citizen)" value="N" />
                <Select.Item label="A (Associate)" value="A" />
                <Select.Item label="P (Naturalized)" value="P" />
                <Select.Item label="F (Foreigner)" value="F" />
              </Select>
            </HStack>

            {/* NRC Number digits */}
            <TextInput
              placeholder="123456"
              value={nrcNumber}
              onChangeText={setNrcNumber}
              keyboardType="numeric"
              maxLength={6}
              style={{
                marginTop: 10,
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#7A83F4",
                borderRadius: 5,
                padding: 10,
              }}
            />
          </FormControl>

          {/* Birthday */}
          <FormControl>
            <Text fontSize={16} color="#7A83F4" mb={2} fontWeight="semibold">
              Birthday
            </Text>
            <HStack space={2}>
              {/* Day */}
              <Select
                flex={1}
                selectedValue={day}
                placeholder="Day"
                onValueChange={(val) => setDay(val)}
              >
                {[...Array(31)].map((_, i) => (
                  <Select.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
                ))}
              </Select>

              {/* Month */}
              <Select
                flex={1}
                selectedValue={month}
                placeholder="Month"
                onValueChange={(val) => setMonth(val)}
              >
                {[...Array(12)].map((_, i) => (
                  <Select.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
                ))}
              </Select>

              {/* Year */}
              <Select
                flex={1}
                selectedValue={year}
                placeholder="Year"
                onValueChange={(val) => setYear(val)}
              >
                {Array.from({ length: 50 }, (_, i) => 1980 + i).map((y) => (
                  <Select.Item key={y} label={`${y}`} value={`${y}`} />
                ))}
              </Select>
            </HStack>
          </FormControl>

          {/* Gender */}
          <FormControl>
            <Text fontSize={16} color="#7A83F4" mb={2} fontWeight="semibold">
              Gender
            </Text>
            <Select
              selectedValue={gender}
              placeholder="Select Gender"
              
              onValueChange={setGender}
            >
              <Select.Item label="Male" value="male" />
              <Select.Item label="Female" value="female" />
              <Select.Item label="Other" value="other" />
            </Select>
          </FormControl>

          {/* Job */}
          <FormControl>
            <Text fontSize={16} color="#7A83F4" mb={2} fontWeight="semibold">
              Job
            </Text>
            <TextInput
              placeholder="Enter your job"
              value={job}
              onChangeText={setJob}
              keyboardType="default"
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#7A83F4",
                borderRadius: 5,
                padding: 10,
              }}
            />
          </FormControl>

          {/* Error */}
          {error ? <Text color="red.500">{error}</Text> : null}

          {/* Continue */}
          <ContinueButton onPress={handleNext} />
        </VStack>
      </ScrollView>
    </Box>
  );
}
