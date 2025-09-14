import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Box, Pressable, Icon, Text } from "native-base";
import HomeScreen_StackNavigator from "./HomeScreen_StackNavigator";
import ProfileScreen from "../screens/main_screens/Profile_Screen";

type BottomTabParamList = {
  Home: undefined;
  History: undefined;
  Scan: undefined;
  Bank: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

function PlaceholderScreen({ route }: any) {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text fontSize={20}>{route.name} Screen</Text>
    </Box>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
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
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let icon: any;

        switch (route.name) {
          case "Home":
            icon = <Icon as={Ionicons} name="home" size={6} color={isFocused ? "#7B93C7" : "#aaa"} />;
            break;
          case "History":
            icon = <Icon as={MaterialIcons} name="history" size={6} color={isFocused ? "#7B93C7" : "#aaa"} />;
            break;
          case "Scan":
            icon = (
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
                <Icon as={MaterialIcons} name="qr-code-scanner" size={8} color="#7B93C7" />
              </Pressable>
            );
            break;
          case "Bank":
            icon = <Icon as={FontAwesome5} name="university" size={5} color={isFocused ? "#7B93C7" : "#aaa"} />;
            break;
          case "Profile":
            icon = <Icon as={Ionicons} name="person" size={6} color={isFocused ? "#7B93C7" : "#aaa"} />;
            break;
        }

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

interface BottomTabProps {
  loggedInUser: any;
}

export default function BottomTabNavigator({ loggedInUser }: BottomTabProps) {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home">
        {() => <HomeScreen_StackNavigator loggedInUser={loggedInUser} />}
      </Tab.Screen>
      <Tab.Screen name="History" component={PlaceholderScreen} />
      <Tab.Screen name="Scan" component={PlaceholderScreen} />
      <Tab.Screen name="Bank" component={PlaceholderScreen} />
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} loggedInUser={loggedInUser} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
