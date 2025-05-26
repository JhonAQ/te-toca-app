import 'react-native-gesture-handler';  // Debe ser el primer import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox, View } from 'react-native';

// Ignoramos warnings específicos, incluido el de useInsertionEffect
LogBox.ignoreLogs([
  'Unsupported top level event type "topInsetsChange" dispatched',
  'useInsertionEffect must not schedule updates'
]);

// Importamos las pantallas
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import NotificationScreen from './screens/NotificationScreen';

const Stack = createStackNavigator();

export default function App() {
  // Importante: Usamos una estructura anidada adecuada para los proveedores
  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator 
              initialRouteName="Welcome" 
              screenOptions={{ 
                headerShown: false,
                cardStyle: { backgroundColor: '#FFFFFF' },
                animationEnabled: false, // Deshabilitar animaciones puede ayudar
                detachInactiveScreens: false, // Evita problemas de desconexión de pantallas
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
    </View>
  );
}
