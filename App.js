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
import AuthContext from "./contexts/AuthContext";
import notificationService from "./services/notificationService";
import apiService from "./services/apiService";
import authService from "./services/authService";

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

// Prevenir que la splash screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    currentTenantId: null,
  });

  // Función para inicializar la app
  useEffect(() => {
    async function prepare() {
      try {
        // Inicializar Google Sign In
        await authService.initializeGoogleSignIn();

        // Inicializar notificaciones push
        await notificationService.registerForPushNotifications();

        // Verificar si hay un tenant guardado
        const tenantId = await apiService.getCurrentTenantId();
        if (tenantId) {
          setAuthState((prev) => ({
            ...prev,
            currentTenantId: tenantId,
          }));
        }

        // Verificar si el usuario ya está autenticado
        const isAuthenticated = await authService.isAuthenticated();
        if (isAuthenticated) {
          // Opcional: obtener datos del usuario actual
          const currentUser = await authService.getCurrentGoogleUser();
          if (currentUser) {
            setAuthState((prev) => ({
              ...prev,
              isAuthenticated: true,
              user: currentUser,
            }));
          }
        }

        // Configurar manejadores de notificaciones
        const cleanupNotifications =
          notificationService.setupNotificationHandlers(
            (notification) => {
              console.log("Notificación recibida:", notification);
            },
            (response) => {
              // Manejar cuando el usuario toca una notificación
              const data = response.notification.request.content.data;
              console.log("Notificación presionada:", data);

              // Aquí se puede añadir lógica para navegar según el tipo de notificación
            }
          );

        // Simular un tiempo de carga mínimo
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return () => {
          cleanupNotifications();
        };
      } catch (e) {
        console.warn("Error durante la inicialización:", e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AuthContext.Provider
            value={{
              ...authState,
              setAuthState,
              login: (user) =>
                setAuthState({
                  isAuthenticated: true,
                  user,
                  currentTenantId: authState.currentTenantId,
                }),
              logout: () =>
                setAuthState({
                  isAuthenticated: false,
                  user: null,
                  currentTenantId: null,
                }),
              setTenantId: (tenantId) => {
                apiService.setTenantId(tenantId);
                setAuthState((prev) => ({
                  ...prev,
                  currentTenantId: tenantId,
                }));
              },
            }}
          >
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
                <Stack.Screen
                  name="EnterpriseList"
                  component={EnterpriseListScreen}
                />
                <Stack.Screen name="Queue" component={QueueScreen} />
                <Stack.Screen name="QrCam" component={QrCamScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </AuthContext.Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </View>
  );
}
