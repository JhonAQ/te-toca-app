import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";
import ticketService from "./ticketService";

// Configurar notificaciones para que aparezcan incluso cuando la app está en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Servicio para gestionar notificaciones push
const notificationService = {
  // Registrar la app para recibir notificaciones push
  async registerForPushNotifications() {
    if (!Device.isDevice) {
      alert("Las notificaciones push no funcionan en el simulador/emulador");
      return null;
    }

    try {
      // Verificar y solicitar permisos
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("No se pudieron obtener permisos para las notificaciones push");
        return null;
      }

      // Obtener token de Expo
      const projectId = Constants.expoConfig?.extra?.eas?.projectId;

      let token;
      if (Platform.OS === "android") {
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
      } else {
        token = (await Notifications.getDevicePushTokenAsync()).data;
      }

      // Configuraciones específicas para Android
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      // Registrar el token en nuestro servicio
      await ticketService.registerPushToken(token);

      return token;
    } catch (error) {
      console.error("Error al registrar para notificaciones push:", error);
      return null;
    }
  },

  // Enviar una notificación local (para pruebas)
  async sendLocalNotification(title, body, data = {}) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: null, // Inmediatamente
    });
  },

  // Configurar manejadores de notificaciones
  setupNotificationHandlers(onNotificationReceived, onNotificationResponse) {
    // Manejador para notificaciones recibidas mientras la app está abierta
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        if (onNotificationReceived) {
          onNotificationReceived(notification);
        }
      }
    );

    // Manejador para cuando el usuario interactúa con una notificación
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (onNotificationResponse) {
          onNotificationResponse(response);
        }
      });

    // Devolver función para limpiar los listeners
    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  },
};

export default notificationService;
