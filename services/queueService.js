import apiService from "./apiService";
import { QUEUE_ENDPOINTS } from "./apiDefinition";
import { Queue } from "../models";

// Variable para controlar si usamos datos mock o la API real
const USE_MOCK_DATA = true;

// Datos mock para usar durante el desarrollo
const mockQueuesByEnterprise = {
  1: [
    {
      id: "1",
      name: "Operaciones en ventanilla",
      icon: "cash-outline",
      peopleWaiting: 12,
      avgTime: "15 min",
      enterpriseId: "1",
    },
    {
      id: "2",
      name: "Atención al cliente",
      icon: "people-outline",
      peopleWaiting: 8,
      avgTime: "20 min",
      enterpriseId: "1",
    },
    {
      id: "3",
      name: "Apertura de cuentas",
      icon: "document-text-outline",
      peopleWaiting: 5,
      avgTime: "25 min",
      enterpriseId: "1",
    },
    {
      id: "4",
      name: "Préstamos y créditos",
      icon: "card-outline",
      peopleWaiting: 3,
      avgTime: "30 min",
      enterpriseId: "1",
    },
  ],
  2: [
    {
      id: "5",
      name: "Trámites generales",
      icon: "document-outline",
      peopleWaiting: 20,
      avgTime: "35 min",
      enterpriseId: "2",
    },
    {
      id: "6",
      name: "DNI y pasaportes",
      icon: "card-outline",
      peopleWaiting: 15,
      avgTime: "25 min",
      enterpriseId: "2",
    },
  ],
  // Más colas mock...
};

// Servicio para operaciones relacionadas con colas
const queueService = {
  // Obtener todas las colas de una empresa
  async getQueuesByEnterprise(enterpriseId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const queues = mockQueuesByEnterprise[enterpriseId] || [];
          resolve(queues.map((data) => new Queue(data)));
        }, 300);
      });
    }

    try {
      const response = await apiService.get(
        QUEUE_ENDPOINTS.listByEnterprise(enterpriseId)
      );
      return response.data.map((data) => new Queue(data));
    } catch (error) {
      console.error(
        `Error al obtener colas para empresa ${enterpriseId}:`,
        error
      );
      throw error;
    }
  },

  // Obtener detalle de una cola específica
  async getQueueDetails(queueId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Buscar en todas las empresas
          for (const enterpriseId in mockQueuesByEnterprise) {
            const queue = mockQueuesByEnterprise[enterpriseId].find(
              (q) => q.id === queueId
            );
            if (queue) {
              resolve(new Queue(queue));
              return;
            }
          }
          reject(new Error("Cola no encontrada"));
        }, 200);
      });
    }

    try {
      const response = await apiService.get(QUEUE_ENDPOINTS.detail(queueId));
      return new Queue(response.data);
    } catch (error) {
      console.error(`Error al obtener detalles de cola ${queueId}:`, error);
      throw error;
    }
  },
};

export default queueService;
