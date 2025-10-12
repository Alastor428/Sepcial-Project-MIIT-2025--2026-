import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import {
  Box,
  VStack,
  HStack,
  Text,
  ScrollView,
  Pressable,
  Center,
  IconButton,
  Spinner,
} from "native-base";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { transactionAPI } from "../../services/api";

const screenWidth = Dimensions.get("window").width;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = [2024, 2025];
const daysInMonth = 30;

// --- Generate daily sample data ---
const generateDailyData = () => {
  const inflow: number[] = [];
  const outflow: number[] = [];
  for (let d = 0; d < daysInMonth; d++) {
    inflow.push(Math.floor(Math.random() * 500 + 50));
    outflow.push(Math.floor(Math.random() * 500 + 50));
  }
  return { inflow, outflow };
};

// --- Sample Data ---
const sampleData: Record<
  number,
  Record<string, { inflow: number[]; outflow: number[] }>
> = {};
years.forEach((y) => {
  sampleData[y] = {};
  monthNames.forEach((m) => {
    sampleData[y][m] = generateDailyData();
  });
});

interface HistoryScreenProps {
  loggedInUser?: any;
}

export default function HistoryScreen({ loggedInUser }: HistoryScreenProps) {
  const [tab, setTab] = useState<"Graph" | "Inflow" | "Outflow">("Graph");
  const [selectedYearIndex, setSelectedYearIndex] = useState(
    years.indexOf(new Date().getFullYear())
  );
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    new Date().getMonth()
  );
  const [liveData, setLiveData] = useState(sampleData);
  const [realTransactions, setRealTransactions] = useState<any[]>([]);
  const [monthlySummary, setMonthlySummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const selectedYear = years[selectedYearIndex];
  const selectedMonth = monthNames[selectedMonthIndex];

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(122, 131, 244, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
    propsForDots: { r: "3", strokeWidth: "2", stroke: "#7A83F4" },
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // Fetch real transaction data
  const fetchTransactionData = async () => {
    if (!loggedInUser?.userId) return;

    setLoading(true);
    try {
      // Fetch transaction history
      const transactions = await transactionAPI.getHistory(
        loggedInUser.userId,
        selectedYear,
        selectedMonthIndex + 1
      );
      setRealTransactions(transactions);

      // Fetch monthly summary for charts
      const summary = await transactionAPI.getMonthlySummary(
        loggedInUser.userId,
        selectedYear,
        selectedMonthIndex + 1
      );
      setMonthlySummary(summary);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use real data if available, otherwise fallback to sample data
  const inflowDaily =
    monthlySummary?.inflow || liveData[selectedYear][selectedMonth].inflow;
  const outflowDaily =
    monthlySummary?.outflow || liveData[selectedYear][selectedMonth].outflow;

  const labelsDaily = Array.from({ length: daysInMonth }, (_, i) =>
    i % 2 === 0 ? `${i + 1}` : ""
  );

  const totalInflow =
    monthlySummary?.totalInflow || inflowDaily.reduce((a, b) => a + b, 0);
  const totalOutflow =
    monthlySummary?.totalOutflow || outflowDaily.reduce((a, b) => a + b, 0);

  // Fetch data when component mounts or when month/year changes
  useEffect(() => {
    fetchTransactionData();
  }, [selectedYear, selectedMonthIndex, loggedInUser?.userId]);

  // --- Month Navigation ---
  const handleMonthChange = (direction: "prev" | "next") => {
    let newMonth = selectedMonthIndex;
    let newYear = selectedYearIndex;
    if (direction === "prev") {
      if (newMonth === 0 && newYear > 0) {
        newMonth = 11;
        newYear -= 1;
      } else if (newMonth > 0) newMonth -= 1;
    } else {
      if (newMonth === currentMonth && years[newYear] === currentYear) return;
      if (newMonth === 11 && newYear < years.length - 1) {
        newMonth = 0;
        newYear += 1;
      } else if (newMonth < 11) newMonth += 1;
    }
    if (years[newYear] === currentYear && newMonth > currentMonth) return;
    setSelectedMonthIndex(newMonth);
    setSelectedYearIndex(newYear);
  };

  // Process real transaction data
  const processTransactionData = () => {
    const inflowTransactions = realTransactions.filter(
      (t) => t.type === "inflow"
    );
    const outflowTransactions = realTransactions.filter(
      (t) => t.type === "outflow"
    );

    return {
      inflow: inflowTransactions.map((t) => ({
        user: t.otherParty,
        amount: `+${t.amount.toFixed(2)} Ks`,
        date: t.date,
        time: t.time,
        description: t.description,
      })),
      outflow: outflowTransactions.map((t) => ({
        user: t.otherParty,
        amount: `-${t.amount.toFixed(2)} Ks`,
        date: t.date,
        time: t.time,
        description: t.description,
      })),
    };
  };

  const transactionData = processTransactionData();
  const dataToShow =
    tab === "Inflow" ? transactionData.inflow : transactionData.outflow;

  const totalAmount =
    tab === "Inflow"
      ? `+${transactionData.inflow
          .reduce(
            (sum, item) =>
              sum + parseFloat(item.amount.replace("+", "").replace(" Ks", "")),
            0
          )
          .toFixed(2)} Ks`
      : `-${transactionData.outflow
          .reduce(
            (sum, item) =>
              sum + parseFloat(item.amount.replace("-", "").replace(" Ks", "")),
            0
          )
          .toFixed(2)} Ks`;

  return (
    <Box flex={1} bg="white">
      <Box bg={"#B9BDF0"} pt={4} pb={2} height={304} borderBottomRadius={30}>
        <HStack mt={59} alignItems="center">
          <Text
            flex={1}
            textAlign="center"
            fontSize="32"
            fontWeight="bold"
            color="#fff"
            mt={4}
            mb={2}
            fontFamily={"inter"}
          >
            History
          </Text>
        </HStack>
        {/* Tabs */}
        <Center mt={60}>
          <HStack justifyContent="center" space={6}>
            {["Graph", "Inflow", "Outflow"].map((label) => (
              <Pressable key={label} onPress={() => setTab(label as any)}>
                <Text
                  px={4}
                  py={2}
                  borderRadius="md"
                  bg={tab === label ? "#fff" : "transparent"}
                  color={tab === label ? "#7a83f4" : "#fff"}
                  fontWeight="bold"
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </HStack>
        </Center>
      </Box>

      <ScrollView mt={6} px={4}>
        {/* Year Selector Bar (Graph Tab only) */}
        {tab === "Graph" && (
          <HStack justifyContent="center" mb={3} space={3}>
            {years.map((y, idx) => (
              <Pressable key={y} onPress={() => setSelectedYearIndex(idx)}>
                <Text
                  px={4}
                  py={2}
                  borderRadius="md"
                  bg={selectedYearIndex === idx ? "#7A83F4" : "transparent"}
                  color={selectedYearIndex === idx ? "white" : "#7A83F4"}
                  fontWeight="bold"
                >
                  {y}
                </Text>
              </Pressable>
            ))}
          </HStack>
        )}

        {/* Month Navigation */}
        <HStack justifyContent="center" alignItems="center" mb={4}>
          <IconButton
            icon={<Ionicons name="chevron-back" size={20} color="#7A83F4" />}
            onPress={() => handleMonthChange("prev")}
          />
          <Text mx={3} fontSize="lg" fontWeight="bold" color="#7A83F4">
            {selectedMonth} {selectedYear}
          </Text>
          <IconButton
            icon={<Ionicons name="chevron-forward" size={20} color="#7A83F4" />}
            onPress={() => handleMonthChange("next")}
          />
        </HStack>

        {/* Wallet Card */}
        <Box bg="#7A83F4" borderRadius="xl" p={4} mb={4} shadow={2}>
          <HStack alignItems="center" space={3}>
            <Ionicons name="wallet" size={24} color="white" />
            <VStack>
              <Text color="white" bold fontSize="md">
                NexoWallet
              </Text>
              <Text color="white">{tab}</Text>
            </VStack>
            <Box flex={1} />
            {tab === "Graph" ? (
              <VStack alignItems="flex-end">
                <Text color="#fff" bold fontSize="md">
                  +{totalInflow} Ks
                </Text>
                <Text color="#fff" bold fontSize="md">
                  -{totalOutflow} Ks
                </Text>
              </VStack>
            ) : (
              <Text color="white" bold fontSize="md">
                {totalAmount}
              </Text>
            )}
          </HStack>
        </Box>

        {/* Graph */}
        {tab === "Graph" && (
          <>
            <Text bold fontSize="lg" mb={2} color="#7a83f4">
              Inflow
            </Text>
            <LineChart
              data={{
                labels: labelsDaily,
                datasets: [
                  {
                    data: inflowDaily,
                    color: (o = 1) => `rgba(0,200,102,${o})`,
                    strokeWidth: 3,
                  },
                ],
              }}
              width={screenWidth - 40}
              height={220}
              yAxisLabel="Ks "
              chartConfig={{
                ...chartConfig,
                color: (o = 1) => `rgba(0,200,102,${o})`,
              }}
              bezier
              style={{ borderRadius: 12, marginBottom: 20 }}
            />
            <Text bold fontSize="lg" mb={2} color="#7a83f4">
              Outflow
            </Text>
            <LineChart
              data={{
                labels: labelsDaily,
                datasets: [
                  {
                    data: outflowDaily,
                    color: (o = 1) => `rgba(255,99,132,${o})`,
                    strokeWidth: 3,
                  },
                ],
              }}
              width={screenWidth - 40}
              height={220}
              yAxisLabel="Ks "
              chartConfig={{
                ...chartConfig,
                color: (o = 1) => `rgba(255,99,132,${o})`,
              }}
              bezier
              style={{ borderRadius: 12, marginBottom: 20 }}
            />
          </>
        )}

        {/* Transaction List */}
        {tab !== "Graph" &&
          (loading ? (
            <Center py={8}>
              <Spinner size="lg" color="#7A83F4" />
              <Text mt={4} color="#7A83F4">
                Loading transactions...
              </Text>
            </Center>
          ) : (
            <VStack space={3}>
              {dataToShow.length > 0 ? (
                dataToShow.map((item, idx) => (
                  <Box
                    key={idx}
                    borderWidth={1}
                    borderColor="#7A83F4"
                    borderRadius="lg"
                    p={3}
                    mb={3}
                  >
                    <HStack justifyContent="space-between" mb={1}>
                      <Text bold color="#666">
                        {item.description ||
                          (tab === "Inflow"
                            ? `Transfer from ${item.user}`
                            : `Transfer to ${item.user}`)}
                      </Text>
                      <Text
                        bold
                        color={tab === "Inflow" ? "#7a84f3" : "#7a83f4"}
                      >
                        {item.amount}
                      </Text>
                    </HStack>
                    <Text color="#888">
                      {item.date} {item.time}
                    </Text>
                  </Box>
                ))
              ) : (
                <Center py={8}>
                  <Text color="#888">No transactions found for this month</Text>
                </Center>
              )}
            </VStack>
          ))}
      </ScrollView>
    </Box>
  );
}
