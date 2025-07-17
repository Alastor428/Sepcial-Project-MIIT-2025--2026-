import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Box, HStack, Pressable, Icon, Text } from "native-base";
import HomeScreen from "../screens/HomeScreen";

function PlaceholderScreen({ route }) {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text fontSize={20}>{route.name} Screen</Text>
    </Box>
  );
}

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <Box
      flexDirection="row"
      h={16}
      bg="#fff"
      borderTopWidth={1}
      borderColor="#eee"
      alignItems="center"
      justifyContent="space-between"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let icon;
        if (route.name === "Home")
          icon = (
            <Icon
              as={Ionicons}
              name="home"
              size={6}
              color={isFocused ? "#7B93C7" : "#aaa"}
            />
          );
        if (route.name === "History")
          icon = (
            <Icon
              as={MaterialIcons}
              name="history"
              size={6}
              color={isFocused ? "#7B93C7" : "#aaa"}
            />
          );
        if (route.name === "Bank")
          icon = (
            <Icon
              as={FontAwesome5}
              name="university"
              size={5}
              color={isFocused ? "#7B93C7" : "#aaa"}
            />
          );
        if (route.name === "Profile")
          icon = (
            <Icon
              as={Ionicons}
              name="person"
              size={6}
              color={isFocused ? "#7B93C7" : "#aaa"}
            />
          );

        // Scan button
        if (route.name === "Scan") {
          return (
            <Box
              key={route.key}
              flex={1}
              alignItems="center"
              justifyContent="center"
              mx={3}
            >
              <Pressable
                alignItems="center"
                justifyContent="center"
                onPress={() => navigation.navigate(route.name)}
                style={{
                  marginTop: -44,
                  width: 60,
                  height: 60,
                  borderRadius: 32,
                  backgroundColor: "#fff",
                  borderWidth: 1.5,
                  borderColor: "#7B93C7",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Icon
                  as={MaterialIcons}
                  name="qr-code-scanner"
                  size={"38"}
                  color="#7B93C7"
                />
              </Pressable>
              <Text
                color={isFocused ? "#7B93C7" : "#aaa"}
                fontSize={12}
                fontWeight={isFocused ? "bold" : "normal"}
                mt={1}
              >
                Scan
              </Text>
            </Box>
          );
        }

        // Other tab buttons
        return (
          <Pressable
            key={route.key}
            flex={1}
            alignItems="center"
            justifyContent="center"
            onPress={() => navigation.navigate(route.name)}
            py={2}
            mx={3}
          >
            {icon}
            <Text color={isFocused ? "#7B93C7" : "#aaa"} fontSize={12}>
              {route.name}
            </Text>
          </Pressable>
        );
      })}
    </Box>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      id={undefined}
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={PlaceholderScreen} />
      <Tab.Screen name="Scan" component={PlaceholderScreen} />
      <Tab.Screen name="Bank" component={PlaceholderScreen} />
      <Tab.Screen name="Profile" component={PlaceholderScreen} />
    </Tab.Navigator>
  );
}
