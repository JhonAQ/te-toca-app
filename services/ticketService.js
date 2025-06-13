import apiService from "./apiService";
import { TICKET_ENDPOINTS } from "./apiDefinition";
import { Ticket } from "../models";

// Variable para controlar si usamos datos mock o la API real
const USE_MOCK_DATA = true;

// Datos mock para usar durante el desarrollo
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
  async joinQueue(queueId) {
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
      const response = await apiService.post(TICKET_ENDPOINTS.create(queueId));
      return new Ticket(response.data);
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
      return new Ticket(response.data);
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
      return new Ticket(response.data);
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
      return new Ticket(response.data);
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
};

export default ticketService;
