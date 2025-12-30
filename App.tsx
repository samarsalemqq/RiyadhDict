import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabsNavigator from "./src/navigation/TabsNavigator";
import MoreScreen from "./src/screens/MoreScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* التابات */}
        <Stack.Screen name="Tabs" component={TabsNavigator} />

        {/* صفحة المزيد */}
        <Stack.Screen name="MoreScreen" component={MoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
