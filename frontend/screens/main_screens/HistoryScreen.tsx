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
} from "native-base";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
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
const sampleData: Record<number, Record<string, { inflow: number[], outflow: number[] }>> = {};
years.forEach((y) => {
  sampleData[y] = {};
  monthNames.forEach((m) => {
    sampleData[y][m] = generateDailyData();
  });
});

export default function HistoryScreen() {
  const [tab, setTab] = useState<"Graph" | "Inflow" | "Outflow">("Graph");
  const [selectedYearIndex, setSelectedYearIndex] = useState(years.indexOf(new Date().getFullYear()));
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
  const [liveData, setLiveData] = useState(sampleData);

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

  const inflowDaily = liveData[selectedYear][selectedMonth].inflow;
  const outflowDaily = liveData[selectedYear][selectedMonth].outflow;

  const labelsDaily = Array.from({ length: daysInMonth }, (_, i) =>
    i % 2 === 0 ? `${i + 1}` : ""
  );

  const totalInflow = inflowDaily.reduce((a, b) => a + b, 0);
  const totalOutflow = outflowDaily.reduce((a, b) => a + b, 0);

  // --- Real-time update ---
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        newData[selectedYear][selectedMonth].inflow = newData[selectedYear][selectedMonth].inflow.map(v => Math.max(v + Math.floor(Math.random() * 50 - 25), 0));
        newData[selectedYear][selectedMonth].outflow = newData[selectedYear][selectedMonth].outflow.map(v => Math.max(v + Math.floor(Math.random() * 50 - 25), 0));
        return newData;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [selectedYear, selectedMonth]);

  // --- Month Navigation ---
  const handleMonthChange = (direction: "prev" | "next") => {
    let newMonth = selectedMonthIndex;
    let newYear = selectedYearIndex;
    if (direction === "prev") {
      if (newMonth === 0 && newYear > 0) { newMonth = 11; newYear -= 1; }
      else if (newMonth > 0) newMonth -= 1;
    } else {
      if (newMonth === currentMonth && years[newYear] === currentYear) return;
      if (newMonth === 11 && newYear < years.length - 1) { newMonth = 0; newYear += 1; }
      else if (newMonth < 11) newMonth += 1;
    }
    if (years[newYear] === currentYear && newMonth > currentMonth) return;
    setSelectedMonthIndex(newMonth);
    setSelectedYearIndex(newYear);
  };

  // --- Random Transactions with Hour ---
  const generateRandomData = (type: "Inflow" | "Outflow") => {
    const items = [];
    const numItems = Math.floor(Math.random() * 6) + 3;
    for (let i = 0; i < numItems; i++) {
      const user = `User${Math.floor(Math.random() * 9 + 1)}`;
      const amount = (Math.random() * 1000 + 100).toFixed(2);
      const day = Math.floor(Math.random() * 28) + 1;
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      const time = `${hour.toString().padStart(2,"0")}:${minute.toString().padStart(2,"0")}`;
      items.push({ user, amount: `${type === "Inflow" ? "+" : "-"}${amount} Ks`, date: `${day}/${selectedMonthIndex + 1}`, time });
    }
    return items;
  };

  const [inflowData, setInflowData] = useState(generateRandomData("Inflow"));
  const [outflowData, setOutflowData] = useState(generateRandomData("Outflow"));

  useEffect(() => {
    setInflowData(generateRandomData("Inflow"));
    setOutflowData(generateRandomData("Outflow"));
  }, [selectedMonthIndex, selectedYearIndex]);

  const dataToShow = tab === "Inflow" ? inflowData : outflowData;

  const totalAmount =
    tab === "Inflow"
      ? `+${inflowData.reduce((sum, item) => sum + parseFloat(item.amount.replace("+","").replace(" Ks","")),0).toFixed(2)} Ks`
      : `-${outflowData.reduce((sum, item) => sum + parseFloat(item.amount.replace("-","").replace(" Ks","")),0).toFixed(2)} Ks`;

  return (
    <Box flex={1} bg="white"  >
      <Box  bg={"#B9BDF0"} pt={4} pb={2} height={304} borderBottomRadius={20} >
        <HStack mt={59} alignItems="center" >
        <Text flex={1} textAlign="center" 
        fontSize="32" fontWeight="bold" 
        color="#fff" mt={4} mb={2} fontFamily={"inter"}>
          History
          </Text>
      </HStack>
      {/* Tabs */}
      <Center mt={60 }>
        <HStack justifyContent="center" space={6}>
          {["Graph","Inflow","Outflow"].map((label) => (
            <Pressable key={label} onPress={() => setTab(label as any)}>
              <Text
                px={4} py={2}
                borderRadius="md"
                bg={tab === label ? "#fff" : "transparent"}
                color={tab === label ? "#7a83f4" : "#fff"}
                fontWeight="bold"
              >{label}</Text>
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
                  px={4} py={2}
                  borderRadius="md"
                  bg={selectedYearIndex === idx ? "#7A83F4" : "transparent"}
                  color={selectedYearIndex === idx ? "white" : "#7A83F4"}
                  fontWeight="bold"
                >{y}</Text>
              </Pressable>
            ))}
          </HStack>
        )}

        {/* Month Navigation */}
        <HStack justifyContent="center" alignItems="center" mb={4}>
          <IconButton icon={<Ionicons name="chevron-back" size={20} color="#7A83F4" />} onPress={()=>handleMonthChange("prev")}/>
          <Text mx={3} fontSize="lg" fontWeight="bold" color="#7A83F4">{selectedMonth} {selectedYear}</Text>
          <IconButton icon={<Ionicons name="chevron-forward" size={20} color="#7A83F4" />} onPress={()=>handleMonthChange("next")}/>
        </HStack>

        {/* Wallet Card */}
        <Box bg="#7A83F4" borderRadius="xl" p={4} mb={4} shadow={2}>
          <HStack alignItems="center" space={3}>
            <Ionicons name="wallet" size={24} color="white"/>
            <VStack>
              <Text color="white" bold fontSize="md">NexoWallet</Text>
              <Text color="white">{tab}</Text>
            </VStack>
            <Box flex={1}/>
            {tab === "Graph" ? (
              <VStack alignItems="flex-end">
                <Text color="#fff" bold fontSize="md">+{totalInflow} Ks</Text>
                <Text color="#fff" bold fontSize="md">-{totalOutflow} Ks</Text>
              </VStack>
            ) : (
              <Text color="white" bold fontSize="md">{totalAmount}</Text>
            )}
          </HStack>
        </Box>

        {/* Graph */}
        {tab==="Graph" && <>
          <Text bold fontSize="lg" mb={2} color="#7a83f4">Inflow</Text>
          <LineChart
            data={{ labels: labelsDaily, datasets:[{ data: inflowDaily, color:(o=1)=>`rgba(0,200,102,${o})`, strokeWidth:3 }] }}
            width={screenWidth-40} height={220} yAxisLabel="Ks "
            chartConfig={{...chartConfig, color:(o=1)=>`rgba(0,200,102,${o})`}}
            bezier style={{ borderRadius:12, marginBottom:20 }}
          />
          <Text bold fontSize="lg" mb={2} color="#7a83f4">Outflow</Text>
          <LineChart
            data={{ labels: labelsDaily, datasets:[{ data: outflowDaily, color:(o=1)=>`rgba(255,99,132,${o})`, strokeWidth:3 }] }}
            width={screenWidth-40} height={220} yAxisLabel="Ks "
            chartConfig={{...chartConfig, color:(o=1)=>`rgba(255,99,132,${o})`}}
            bezier style={{ borderRadius:12 }}
          />
        </>}

        {/* Transaction List */}
        {tab!=="Graph" && <VStack space={3}>
          {dataToShow.map((item, idx)=>(
            <Box key={idx} borderWidth={1} borderColor="#7A83F4" borderRadius="lg" p={3} mb={3}>
              <HStack justifyContent="space-between" mb={1}>
                <Text bold color="#666">{tab==="Inflow"?`Transfer from ${item.user}`:`Transfer to ${item.user}`}</Text>
                <Text bold color={tab==="Inflow"? "#7a84f3":"#7a83f4"}>{item.amount}</Text>
              </HStack>
              <Text color="#888">{item.date} {item.time}</Text>
            </Box>
          ))}
        </VStack>}
      </ScrollView>
    </Box>
  );
}
