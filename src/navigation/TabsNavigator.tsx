import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

import HomeIcon from "../../assets/homepage.svg";
import StarIcon from "../../assets/starrt.svg";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0E6B6D",
        tabBarInactiveTintColor: "rgba(0,0,0,0.45)",
        tabBarStyle: { height: 72, paddingTop: 8, paddingBottom: 10 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "700" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon width={20} height={20} fill={color} opacity={focused ? 1 : 0.7} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "المفضلة",
          tabBarIcon: ({ color, focused }) => (
            <StarIcon width={22} height={22} fill={color} opacity={focused ? 1 : 0.7} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
