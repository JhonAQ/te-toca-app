import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import colors from "./constants/colors";
import { useEffect, useCallback, useState } from "react";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TicketScreen from "./screens/TicketScreen";
import CategoryScreen from "./screens/CategoryScreen";
import EnterpriseScreen from "./screens/EnterpriseScreen";
import EnterpriseListScreen from "./screens/EnterpriseListScreen";
import QrCamScreen from "./screens/QrCamScreen";
import QueueScreen from "./screens/QueueScreen";

LogBox.ignoreLogs([
  'Unsupported top level event type "topInsetsChange" dispatched',
  "useInsertionEffect must not schedule updates",
]);

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: colors.dark1 },
                animationEnabled: true,
                detachInactiveScreens: false,
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Ticket" component={TicketScreen} />
              <Stack.Screen name="Category" component={CategoryScreen} />
              <Stack.Screen name="Enterprise" component={EnterpriseScreen} />
              <Stack.Screen name="EnterpriseList" component={EnterpriseListScreen} />
              <Stack.Screen name="Queue" component={QueueScreen} />
              <Stack.Screen name="QrCam" component={QrCamScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </View>
  );
}
