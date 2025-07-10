import apiService from "./apiService";
import { TICKET_ENDPOINTS, TENANT_ENDPOINTS } from "./apiDefinition";
import { Ticket } from "../models";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Variable para controlar si usamos datos mock o la API real
const USE_MOCK_DATA = false;

// Datos mock para usar durante el desarrollo (mantener para compatibilidad)
const mockTicket = {
  id: "123456",
  ticketId: "AB25",
  queueId: "1",
  enterpriseId: "1",
  enterpriseName: "Banco de Crédito del Perú",
  queueName: "Atención al Cliente",
  issueDate: "15 de Mayo, 2023",
  issueTime: "10:45 AM",
  status: "waiting",
  position: 8,
  currentTicket: "AB17",
  waitTime: "35 min",
  peopleTime: "4 min",
};

// Servicio para operaciones relacionadas con tickets
const ticketService = {
  // Crear un nuevo ticket (unirse a una cola)
  async joinQueue(queueId, tenantId = null) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            new Ticket({
              ...mockTicket,
              queueId,
              ticketId: `AB${Math.floor(Math.random() * 100)}`,
            })
          );
        }, 500);
      });
    }

    try {
      let response;

      // Obtener el token de notificaciones
      let pushToken = null;
      try {
        pushToken = await AsyncStorage.getItem("pushToken");
      } catch (error) {
        console.warn("No se pudo obtener el token de notificaciones:", error);
      }

      if (tenantId) {
        // Usar la API multitenant
        await apiService.setTenantId(tenantId);
        response = await apiService.post(
          TENANT_ENDPOINTS.joinQueue(tenantId, queueId),
          { pushToken }
        );
      } else {
        // Usar la API estándar
        response = await apiService.post(TICKET_ENDPOINTS.create(queueId), {
          pushToken,
        });
      }

      // Transformar la respuesta al formato esperado por el modelo Ticket
      const ticketData = transformApiTicketToModel(response);

      return new Ticket(ticketData);
    } catch (error) {
      console.error(`Error al unirse a la cola ${queueId}:`, error);
      throw error;
    }
  },

  // Obtener detalles de un ticket
  async getTicketDetails(ticketId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            new Ticket({
              ...mockTicket,
              ticketId,
            })
          );
        }, 300);
      });
    }

    try {
      const response = await apiService.get(
        TICKET_ENDPOINTS.getDetails(ticketId)
      );

      // Transformar la respuesta al formato esperado por el modelo Ticket
      const ticketData = transformApiTicketToModel(response);

      return new Ticket(ticketData);
    } catch (error) {
      console.error(`Error al obtener detalles del ticket ${ticketId}:`, error);
      throw error;
    }
  },

  // Pausar un ticket
  async pauseTicket(ticketId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            new Ticket({
              ...mockTicket,
              ticketId,
              status: "paused",
            })
          );
        }, 300);
      });
    }

    try {
      const response = await apiService.put(TICKET_ENDPOINTS.pause(ticketId));

      // Transformar la respuesta al formato esperado por el modelo Ticket
      const ticketData = transformApiTicketToModel(response);

      return new Ticket(ticketData);
    } catch (error) {
      console.error(`Error al pausar ticket ${ticketId}:`, error);
      throw error;
    }
  },

  // Reanudar un ticket pausado
  async resumeTicket(ticketId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            new Ticket({
              ...mockTicket,
              ticketId,
              status: "waiting",
            })
          );
        }, 300);
      });
    }

    try {
      const response = await apiService.put(TICKET_ENDPOINTS.resume(ticketId));

      // Transformar la respuesta al formato esperado por el modelo Ticket
      const ticketData = transformApiTicketToModel(response);

      return new Ticket(ticketData);
    } catch (error) {
      console.error(`Error al reanudar ticket ${ticketId}:`, error);
      throw error;
    }
  },

  // Cancelar un ticket
  async cancelTicket(ticketId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true); // Simulamos una cancelación exitosa
        }, 300);
      });
    }

    try {
      await apiService.delete(TICKET_ENDPOINTS.cancel(ticketId));
      return true;
    } catch (error) {
      console.error(`Error al cancelar ticket ${ticketId}:`, error);
      throw error;
    }
  },

  // Registrar token de notificaciones
  async registerPushToken(token) {
    try {
      await AsyncStorage.setItem("pushToken", token);
      return true;
    } catch (error) {
      console.error("Error al guardar token de notificaciones:", error);
      return false;
    }
  },
};

// Función para transformar la respuesta de la API al formato del modelo Ticket
function transformApiTicketToModel(apiResponse) {
  // Si es una respuesta de la API multitenant
  if (apiResponse.id && apiResponse.queueRegistration) {
    const {
      id,
      queueRegistration,
      turnStatus,
      orderNumber,
      generationDateTime,
    } = apiResponse;

    return {
      id: id.toString(),
      ticketId: `T-${orderNumber}`, // Generar un ID amigable
      queueId: queueRegistration.queue.id.toString(),
      enterpriseId: queueRegistration.queue.companyAgency?.id.toString() || "",
      enterpriseName: queueRegistration.queue.companyAgency?.name || "Agencia",
      queueName: queueRegistration.queue.name,
      issueDate: new Date(generationDateTime).toLocaleDateString(),
      issueTime: new Date(generationDateTime).toLocaleTimeString(),
      status:
        turnStatus.name === "EN_ESPERA"
          ? "waiting"
          : turnStatus.name === "PAUSADO"
          ? "paused"
          : turnStatus.name === "ATENDIDO"
          ? "attended"
          : "cancelled",
      position: orderNumber,
      currentTicket: `T-${orderNumber - 1}`, // Ejemplo, idealmente debería venir de la API
      waitTime: "Estimando...", // Idealmente debería venir de la API
      peopleTime: "Estimando...", // Idealmente debería venir de la API
    };
  }

  // Si es el formato estándar de la API
  return apiResponse;
}

export default ticketService;
