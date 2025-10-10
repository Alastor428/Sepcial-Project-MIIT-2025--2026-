import React, { useState } from "react";
import { Dimensions } from "react-native";
import { Box, Text, Button, HStack, VStack, ScrollView } from "native-base";

const { width } = Dimensions.get("window");

// Normalize values into graph height
const normalizeData = (data: number[], maxHeight: number) => {
  const max = Math.max(...data);
  return data.map((v) => (v / max) * maxHeight);
};

// Sample inflow/outflow datasets
const sampleData = {
  2024: {
    Jan: {
      inflow: [120, 150, 180, 200, 170, 210, 230],
      outflow: [80, 100, 120, 160, 140, 180, 190],
    },
    Feb: {
      inflow: [200, 180, 150, 170, 160, 190, 210],
      outflow: [150, 130, 120, 110, 140, 160, 170],
    },
    Mar: {
      inflow: [300, 320, 280, 310, 330, 340, 360],
      outflow: [220, 240, 200, 230, 250, 260, 270],
    },
  },
  2025: {
    Jan: {
      inflow: [220, 250, 280, 300, 270, 310, 330],
      outflow: [180, 200, 220, 260, 240, 280, 290],
    },
    Feb: {
      inflow: [260, 240, 210, 230, 220, 250, 270],
      outflow: [200, 180, 170, 160, 190, 210, 220],
    },
    Mar: {
      inflow: [400, 420, 380, 410, 430, 440, 460],
      outflow: [320, 340, 300, 330, 350, 360, 370],
    },
  },
};

const HistoryScreen = () => {
  const [view, setView] = useState<"daily" | "monthly" | "yearly">("daily");
  const [selectedYear, setSelectedYear] =
    useState<keyof typeof sampleData>(2025);
  const [selectedMonth, setSelectedMonth] =
    useState<keyof typeof sampleData[2025]>("Jan");

  const graphHeight = 150;

  // Choose dataset based on view
  let dataset: { inflow: number[]; outflow: number[]; labels: string[] };

  if (view === "daily") {
    const data = sampleData[selectedYear][selectedMonth];
    dataset = {
      inflow: data.inflow,
      outflow: data.outflow,
      labels: Array.from({ length: data.inflow.length }, (_, i) => `${i + 1}`),
    };
  } else if (view === "monthly") {
    const months = Object.keys(sampleData[selectedYear]);
    dataset = {
      inflow: months.map((m) =>
        sampleData[selectedYear][m as keyof typeof sampleData[2025]].inflow.reduce(
          (a, b) => a + b,
          0
        )
      ),
      outflow: months.map((m) =>
        sampleData[selectedYear][m as keyof typeof sampleData[2025]].outflow.reduce(
          (a, b) => a + b,
          0
        )
      ),
      labels: months,
    };
  } else {
    // FIX: convert Object.keys (string[]) → number[] before casting
    const years = Object.keys(sampleData).map((y) => Number(y)) as (keyof typeof sampleData)[];
    dataset = {
      inflow: years.map((y) =>
        Object.values(sampleData[y]).reduce(
          (acc, m) => acc + m.inflow.reduce((a, b) => a + b, 0),
          0
        )
      ),
      outflow: years.map((y) =>
        Object.values(sampleData[y]).reduce(
          (acc, m) => acc + m.outflow.reduce((a, b) => a + b, 0),
          0
        )
      ),
      labels: years.map(String), // convert back to string for labels
    };
  }

  const inflowHeights = normalizeData(dataset.inflow, graphHeight);
  const outflowHeights = normalizeData(dataset.outflow, graphHeight);

  return (
    <ScrollView flex={1} bg="white" p={4}>
      <VStack space={4}>
        {/* View Toggle */}
        <HStack space={3} justifyContent="center">
          <Button
            onPress={() => setView("daily")}
            variant={view === "daily" ? "solid" : "outline"}
          >
            Daily
          </Button>
          <Button
            onPress={() => setView("monthly")}
            variant={view === "monthly" ? "solid" : "outline"}
          >
            Monthly
          </Button>
          <Button
            onPress={() => setView("yearly")}
            variant={view === "yearly" ? "solid" : "outline"}
          >
            Yearly
          </Button>
        </HStack>

        {/* Controls for Daily/Monthly */}
        {view === "daily" && (
          <HStack justifyContent="center" space={2}>
            {Object.keys(sampleData[selectedYear]).map((m) => (
              <Button
                key={m}
                size="sm"
                onPress={() =>
                  setSelectedMonth(m as keyof typeof sampleData[2025])
                }
                variant={selectedMonth === m ? "solid" : "outline"}
              >
                {m}
              </Button>
            ))}
          </HStack>
        )}
        {view === "monthly" && (
          <HStack justifyContent="center" space={2}>
            {Object.keys(sampleData)
              .map((y) => Number(y))
              .map((y) => (
                <Button
                  key={y}
                  size="sm"
                  onPress={() =>
                    setSelectedYear(y as keyof typeof sampleData)
                  }
                  variant={selectedYear === y ? "solid" : "outline"}
                >
                  {y}
                </Button>
              ))}
          </HStack>
        )}

        {/* Inflow Graph */}
        <Box>
          <Text bold fontSize="lg" mb={2}>
            Inflow Data ({view})
          </Text>
          <HStack
            alignItems="flex-end"
            space={2}
            justifyContent="center"
            h={graphHeight + 20}
          >
            {inflowHeights.map((h, i) => (
              <Box
                key={i}
                w={width / dataset.labels.length / 2}
                h={h}
                bg="green.400"
                rounded="md"
              />
            ))}
          </HStack>
          <HStack justifyContent="center" space={2}>
            {dataset.labels.map((label, i) => (
              <Text
                key={i}
                fontSize="xs"
                w={width / dataset.labels.length / 2}
                textAlign="center"
              >
                {label}
              </Text>
            ))}
          </HStack>
        </Box>

        {/* Outflow Graph */}
        <Box>
          <Text bold fontSize="lg" mb={2}>
            Outflow Data ({view})
          </Text>
          <HStack
            alignItems="flex-end"
            space={2}
            justifyContent="center"
            h={graphHeight + 20}
          >
            {outflowHeights.map((h, i) => (
              <Box
                key={i}
                w={width / dataset.labels.length / 2}
                h={h}
                bg="red.400"
                rounded="md"
              />
            ))}
          </HStack>
          <HStack justifyContent="center" space={2}>
            {dataset.labels.map((label, i) => (
              <Text
                key={i}
                fontSize="xs"
                w={width / dataset.labels.length / 2}
                textAlign="center"
              >
                {label}
              </Text>
            ))}
          </HStack>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default HistoryScreen;
