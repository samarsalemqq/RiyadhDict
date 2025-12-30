import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ResultsScreen from "../screens/ResultsScreen";
import DetailsScreen from "../screens/DetailsScreen";
import MoreScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="MoreScreen" component={MoreScreen} />
      </Stack.Navigator>
  );
}