import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, View, Platform } from "react-native";
import colors from "./constants/colors";
import { useEffect, useCallback, useState } from "react";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TicketScreen from "./screens/TicketScreen";
import CategoryScreen from "./screens/CategoryScreen";
import EnterpriseScreen from "./screens/EnterpriseScreen";
import EnterpriseListScreen from "./screens/EnterpriseListScreen";
import QueueScreen from "./screens/QueueScreen";
import QrCamScreen from "./screens/QrCamScreen";

const Stack = createStackNavigator();

// Ignorar warnings específicos para web
LogBox.ignoreLogs([
  'Unsupported top level event type "topInsetsChange" dispatched',
  "useInsertionEffect must not schedule updates",
  "expo-splash-screen",
  "expo-camera",
  "AsyncStorage has been extracted from react-native",
]);

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Para web, simplemente marcamos como listo sin splash screen
        if (Platform.OS === "web") {
          setIsReady(true);
          return;
        }

        // Aquí podrías agregar preparación específica si fuera necesario
        setIsReady(true);
      } catch (e) {
        console.warn(e);
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return <View style={{ flex: 1, backgroundColor: colors.dark1 }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              animationEnabled: true,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen
              name="EnterpriseList"
              component={EnterpriseListScreen}
            />
            <Stack.Screen name="Enterprise" component={EnterpriseScreen} />
            <Stack.Screen name="Queue" component={QueueScreen} />
            <Stack.Screen name="QrCam" component={QrCamScreen} />
            <Stack.Screen name="Ticket" component={TicketScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
