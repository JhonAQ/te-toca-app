import 'react-native-gesture-handler';  // Debe ser el primer import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';

// Ignorar advertencias específicas que podrían estar relacionadas con el error
LogBox.ignoreLogs(['Unsupported top level event type "topInsetsChange" dispatched']);

// Importamos las pantallas
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import NotificationScreen from './screens/NotificationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator 
            initialRouteName="Welcome" 
            screenOptions={{ 
              headerShown: false,
              cardStyle: { backgroundColor: '#FFFFFF' },
              // Importante: Eliminamos las propiedades problemáticas
              safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 },
              gestureEnabled: false // Deshabilitar gestos para evitar problemas relacionados
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
