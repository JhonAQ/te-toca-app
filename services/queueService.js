import apiService, { MOCK_CONFIG, createMockResponse } from "./apiService";
import { QUEUE_ENDPOINTS, TENANT_ENDPOINTS } from "./apiDefinition";
import { Queue } from "../models";
import { mockQueuesByEnterprise } from "./mockData";

// Servicio para operaciones relacionadas con colas
const queueService = {
  // Obtener todas las colas de una empresa
  async getQueuesByEnterprise(enterpriseId) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get Queues By Enterprise:", enterpriseId);

      return createMockResponse(
        () => {
          const queues = mockQueuesByEnterprise[enterpriseId] || [];
          return queues.map((data) => new Queue(data));
        },
        600
      );
    }

    try {
      const response = await apiService.get(
        QUEUE_ENDPOINTS.listByEnterprise(enterpriseId)
      );

      const queues = response.data || response;
      return queues.map((data) => new Queue(data));
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
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get Queue Details:", queueId);

      return createMockResponse(
        () => {
          // Buscar en todas las empresas
          for (const enterpriseId in mockQueuesByEnterprise) {
            const queue = mockQueuesByEnterprise[enterpriseId].find(
              (q) => q.id === queueId
            );
            if (queue) {
              return new Queue(queue);
            }
          }

          throw {
            response: {
              status: 404,
              data: { error: "Cola no encontrada" },
            },
          };
        },
        400
      );
    }

    try {
      const response = await apiService.get(QUEUE_ENDPOINTS.detail(queueId));
      return new Queue(response);
    } catch (error) {
      console.error(`Error al obtener detalles de cola ${queueId}:`, error);
      throw error;
    }
  },

  // Obtener colas por agencia en un tenant específico
  async getQueuesByAgency(tenantId, agencyId) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get Queues By Agency:", { tenantId, agencyId });

      return createMockResponse(async () => {
        await apiService.setTenantId(tenantId);

        // En modo mock, usar datos existentes filtrando por enterpriseId
        const queues = mockQueuesByEnterprise[agencyId] || [];
        return queues.map((data) => new Queue(data));
      });
    }

    try {
      await apiService.setTenantId(tenantId);

      const agencyResponse = await apiService.get(
        TENANT_ENDPOINTS.agencyDetail(tenantId, agencyId)
      );

      const queues = agencyResponse.queues || [];
      return queues.map((data) => new Queue(data));
    } catch (error) {
      console.error(
        `Error al obtener colas para la agencia ${agencyId} del tenant ${tenantId}:`,
        error
      );
      throw error;
    }
  },
};

export default queueService;