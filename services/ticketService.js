import apiService, { MOCK_CONFIG, createMockResponse } from "./apiService";
import { TICKET_ENDPOINTS, TENANT_ENDPOINTS } from "./apiDefinition";
import { Ticket } from "../models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  mockTickets,
  mockQueuesByEnterprise,
  mockEnterprises,
  generateId,
  generateTicketNumber,
} from "./mockData";

// Servicio para operaciones relacionadas con tickets
const ticketService = {
  // Crear un nuevo ticket (unirse a una cola)
  async joinQueue(queueId, tenantId = null) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Join Queue:", { queueId, tenantId });

      return createMockResponse(async () => {
        // Buscar información de la cola
        let queueInfo = null;
        let enterpriseInfo = null;

        for (const enterpriseId in mockQueuesByEnterprise) {
          const queue = mockQueuesByEnterprise[enterpriseId].find(
            (q) => q.id === queueId
          );
          if (queue) {
            queueInfo = queue;
            enterpriseInfo = mockEnterprises.find((e) => e.id === enterpriseId);
            break;
          }
        }

        if (!queueInfo) {
          throw {
            response: {
              status: 404,
              data: { error: "Cola no encontrada" },
            },
          };
        }

        // Crear nuevo ticket
        const newTicket = {
          id: generateId(),
          number: generateTicketNumber(queueId),
          queueId: queueId,
          enterpriseId: queueInfo.enterpriseId,
          enterpriseName: enterpriseInfo?.name || "Empresa",
          queueName: queueInfo.name,
          customerName: "Usuario Actual",
          customerPhone: "987654321",
          customerEmail: "usuario@email.com",
          serviceType: queueInfo.description || queueInfo.name,
          priority: "normal",
          status: "waiting",
          position: queueInfo.peopleWaiting + 1,
          estimatedWaitTime:
            queueInfo.averageWaitTime * (queueInfo.peopleWaiting + 1),
          actualWaitTime: 0,
          serviceTime: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          calledAt: null,
          completedAt: null,
          cancelledAt: null,
          skippedAt: null,
          notes: "",
          reason: "",
        };

        // Agregar ticket a datos mock
        mockTickets.push(newTicket);

        // Actualizar contador de personas en espera
        queueInfo.peopleWaiting += 1;

        return new Ticket(newTicket);
      }, 800);
    }

    try {
      let response;

      let pushToken = null;
      try {
        pushToken = await AsyncStorage.getItem("pushToken");
      } catch (error) {
        console.warn("No se pudo obtener el token de notificaciones:", error);
      }

      if (tenantId) {
        await apiService.setTenantId(tenantId);
        response = await apiService.post(
          TENANT_ENDPOINTS.joinQueue(tenantId, queueId),
          { pushToken }
        );
      } else {
        response = await apiService.post(TICKET_ENDPOINTS.create(queueId), {
          pushToken,
        });
      }

      const ticketData = transformApiTicketToModel(response);
      return new Ticket(ticketData);
    } catch (error) {
      console.error(`Error al unirse a la cola ${queueId}:`, error);
      throw error;
    }
  },

  // Obtener detalles de un ticket
  async getTicketDetails(ticketId) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get Ticket Details:", ticketId);

      return createMockResponse(() => {
        const ticket = mockTickets.find((t) => t.id === ticketId);

        if (!ticket) {
          throw {
            response: {
              status: 404,
              data: { error: "Ticket no encontrado" },
            },
          };
        }

        return new Ticket(ticket);
      }, 300);
    }

    try {
      const response = await apiService.get(
        TICKET_ENDPOINTS.getDetails(ticketId)
      );

      const ticketData = transformApiTicketToModel(response);
      return new Ticket(ticketData);
    } catch (error) {
      console.error(`Error al obtener detalles del ticket ${ticketId}:`, error);
      throw error;
    }
  },

  // Pausar un ticket
  async pauseTicket(ticketId) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Pause Ticket:", ticketId);

      return createMockResponse(() => {
        const ticket = mockTickets.find((t) => t.id === ticketId);

        if (!ticket) {
          throw {
            response: {
              status: 404,
              data: { error: "Ticket no encontrado" },
            },
          };
        }

        // Actualizar estado del ticket
        ticket.status = "paused";
        ticket.updatedAt = new Date().toISOString();

        return new Ticket(ticket);
      }, 400);
    }

    try {
      const response = await apiService.put(TICKET_ENDPOINTS.pause(ticketId));
      const ticketData = transformApiTicketToModel(response);
      return new Ticket(ticketData);
    } catch (error) {
      console.error(`Error al pausar ticket ${ticketId}:`, error);
      throw error;
    }
  },

  // Reanudar un ticket pausado
  async resumeTicket(ticketId) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Resume Ticket:", ticketId);

      return createMockResponse(() => {
        const ticket = mockTickets.find((t) => t.id === ticketId);

        if (!ticket) {
          throw {
            response: {
              status: 404,
              data: { error: "Ticket no encontrado" },
            },
          };
        }

        // Actualizar estado del ticket
        ticket.status = "waiting";
        ticket.updatedAt = new Date().toISOString();

        return new Ticket(ticket);
      }, 400);
    }

    try {
      const response = await apiService.put(TICKET_ENDPOINTS.resume(ticketId));
      const ticketData = transformApiTicketToModel(response);
      return new Ticket(ticketData);
    } catch (error) {
      console.error(`Error al reanudar ticket ${ticketId}:`, error);
      throw error;
    }
  },

  // Cancelar un ticket
  async cancelTicket(ticketId) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Cancel Ticket:", ticketId);

      return createMockResponse(() => {
        const ticketIndex = mockTickets.findIndex((t) => t.id === ticketId);

        if (ticketIndex === -1) {
          throw {
            response: {
              status: 404,
              data: { error: "Ticket no encontrado" },
            },
          };
        }

        const ticket = mockTickets[ticketIndex];

        // Actualizar estado del ticket
        ticket.status = "cancelled";
        ticket.cancelledAt = new Date().toISOString();
        ticket.updatedAt = new Date().toISOString();

        // Reducir contador de personas en espera
        for (const enterpriseId in mockQueuesByEnterprise) {
          const queue = mockQueuesByEnterprise[enterpriseId].find(
            (q) => q.id === ticket.queueId
          );
          if (queue && queue.peopleWaiting > 0) {
            queue.peopleWaiting -= 1;
            break;
          }
        }

        return true;
      }, 500);
    }

    try {
      await apiService.delete(TICKET_ENDPOINTS.cancel(ticketId));
      return true;
    } catch (error) {
      console.error(`Error al cancelar ticket ${ticketId}:`, error);
      throw error;
    }
  },

  // Obtener tickets del usuario actual
  async getMyTickets() {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get My Tickets");

      return createMockResponse(() => {
        // Retornar tickets activos del usuario
        const activeTickets = mockTickets.filter(
          (t) =>
            t.status === "waiting" ||
            t.status === "called" ||
            t.status === "paused"
        );

        return activeTickets.map((data) => new Ticket(data));
      }, 600);
    }

    try {
      const response = await apiService.get(TICKET_ENDPOINTS.myTickets);
      const tickets = response.data || response;
      return tickets.map((data) => new Ticket(transformApiTicketToModel(data)));
    } catch (error) {
      console.error("Error al obtener mis tickets:", error);
      throw error;
    }
  },

  // Registrar token de notificaciones
  async registerPushToken(token) {
    try {
      await AsyncStorage.setItem("pushToken", token);

      if (MOCK_CONFIG.USE_MOCK_DATA) {
        console.log("🔄 Mock Register Push Token:", token);
        return true;
      }

      // Si no es modo mock, enviar al backend
      await apiService.post(USER_ENDPOINTS.registerPushToken, { token });
      return true;
    } catch (error) {
      console.error("Error al registrar token de notificaciones:", error);
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
      ticketId: `T-${orderNumber}`,
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
      currentTicket: `T-${orderNumber - 1}`,
      waitTime: "Estimando...",
      peopleTime: "Estimando...",
    };
  }

  // Si es el formato estándar de la API
  return apiResponse;
}

export default ticketService;
