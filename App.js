import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, View, Alert } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import colors from "./constants/colors";
import { useEffect, useCallback, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import notificationService from "./services/notificationService";
import apiService, { MOCK_CONFIG } from "./services/apiService";
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
        // Mostrar alerta si está en modo mock
        if (MOCK_CONFIG.USE_MOCK_DATA) {
          console.log("🚀 TeToca App iniciando en MODO MOCK");
          console.log(
            "📱 Para usar el backend real, cambia MOCK_CONFIG.USE_MOCK_DATA a false"
          );
          console.log("🔑 Credenciales de prueba:");
          console.log("   Email: juan.perez@email.com");
          console.log("   Contraseña: 123456");
        }

        // Inicializar servicios de autenticación
        await authService.initializeGoogleSignIn();

        // Inicializar notificaciones push (solo si no es mock)
        if (!MOCK_CONFIG.USE_MOCK_DATA) {
          await notificationService.registerForPushNotifications();
        } else {
          console.log("🔔 Notificaciones push deshabilitadas en modo mock");
        }

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
          try {
            const currentUser = await authService.getCurrentUser();
            if (currentUser) {
              setAuthState((prev) => ({
                ...prev,
                isAuthenticated: true,
                user: currentUser,
              }));
            }
          } catch (error) {
            console.log("Usuario no válido, redirigiendo al login");
            await authService.logout();
          }
        }

        // Configurar manejadores de notificaciones (solo si no es mock)
        let cleanupNotifications = () => {};
        if (!MOCK_CONFIG.USE_MOCK_DATA) {
          cleanupNotifications = notificationService.setupNotificationHandlers(
            (notification) => {
              console.log("Notificación recibida:", notification);
            },
            (response) => {
              const data = response.notification.request.content.data;
              console.log("Notificación presionada:", data);
            }
          );
        }

        // Simular tiempo de carga mínimo
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return () => {
          cleanupNotifications();
        };
      } catch (e) {
        console.warn("Error durante la inicialización:", e);

        if (MOCK_CONFIG.USE_MOCK_DATA) {
          console.log("⚠️ Error en modo mock, continuando...");
        }
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();

      // Mostrar alerta de modo mock solo una vez
      if (MOCK_CONFIG.USE_MOCK_DATA) {
        setTimeout(() => {
          Alert.alert(
            "🚀 Modo Desarrollo",
            "La app está funcionando con datos mock.\n\nCredenciales de prueba:\n• Email: juan.perez@email.com\n• Contraseña: 123456",
            [{ text: "Entendido", style: "default" }]
          );
        }, 1000);
      }
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
              logout: async () => {
                try {
                  await authService.logout();
                  setAuthState({
                    isAuthenticated: false,
                    user: null,
                    currentTenantId: null,
                  });
                } catch (error) {
                  console.error("Error durante logout:", error);
                  // Limpiar estado local aunque falle la API
                  setAuthState({
                    isAuthenticated: false,
                    user: null,
                    currentTenantId: null,
                  });
                }
              },
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
