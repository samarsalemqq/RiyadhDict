import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabsNavigator from "./src/navigation/TabsNavigator";
import MoreScreen from "./src/screens/MoreScreen";
import SettingsScreen from "./src/screens/SettingsScreen"; 
import SearchResultsScreen from "./src/screens/SearchResultsScreen";
import WordOfTheDayCard from "./components/WordOfTheDayCard";
import WordDetailsScreen from "./src/screens/WordDetailsScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* التابات */}
        <Stack.Screen name="Tabs" component={TabsNavigator} />

        {/* صفحة المزيد */}
        <Stack.Screen name="MoreScreen" component={MoreScreen} />

        {/* صفحة الإعدادات */}
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />

         {/* صفحة نتائج البحث */}
        <Stack.Screen name="Results" component={SearchResultsScreen}/>

          {/* صفحة التفاصيل للكلمة بعد البحث */}
        <Stack.Screen name="WordDetails" component={WordDetailsScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
