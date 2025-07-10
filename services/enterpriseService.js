import apiService, { MOCK_CONFIG, createMockResponse } from "./apiService";
import { ENTERPRISE_ENDPOINTS, TENANT_ENDPOINTS } from "./apiDefinition";
import { Enterprise } from "../models";
import { mockEnterprises, searchInArray } from "./mockData";

// Servicio para operaciones relacionadas con empresas
const enterpriseService = {
  // Obtener todas las empresas
  async getAllEnterprises() {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get All Enterprises");

      return createMockResponse(() => {
        return mockEnterprises.map((data) => new Enterprise(data));
      });
    }

    try {
      const response = await apiService.get(ENTERPRISE_ENDPOINTS.list);
      const enterprises = response.data || response;
      return enterprises.map((data) => new Enterprise(data));
    } catch (error) {
      console.error("Error al obtener empresas:", error);
      throw error;
    }
  },

  // Obtener una empresa por ID
  async getEnterpriseById(enterpriseId) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get Enterprise By ID:", enterpriseId);

      return createMockResponse(() => {
        const enterprise = mockEnterprises.find((e) => e.id === enterpriseId);
        if (!enterprise) {
          throw {
            response: {
              status: 404,
              data: { error: "Empresa no encontrada" },
            },
          };
        }
        return new Enterprise(enterprise);
      }, 500);
    }

    try {
      const response = await apiService.get(
        ENTERPRISE_ENDPOINTS.detail(enterpriseId)
      );
      return new Enterprise(response);
    } catch (error) {
      console.error(`Error al obtener empresa ${enterpriseId}:`, error);
      throw error;
    }
  },

  // Buscar empresas por texto
  async searchEnterprises(searchText) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Search Enterprises:", searchText);

      return createMockResponse(() => {
        const results = searchInArray(
          mockEnterprises,
          searchText,
          ["name", "address", "type"]
        );
        return results.map((data) => new Enterprise(data));
      }, 600);
    }

    try {
      const response = await apiService.get(ENTERPRISE_ENDPOINTS.search, {
        q: searchText,
      });

      const results = response.data || response;
      return results.map((data) => new Enterprise(data));
    } catch (error) {
      console.error("Error al buscar empresas:", error);
      throw error;
    }
  },

  // Obtener empresas por categoría
  async getEnterprisesByCategory(categoryId) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get Enterprises By Category:", categoryId);

      return createMockResponse(() => {
        // En modo mock, filtrar por tipo o devolver todas
        let filteredEnterprises = mockEnterprises;

        // Simular filtrado por categoría
        if (categoryId === "1") {
          // Documentos
          filteredEnterprises = mockEnterprises.filter((e) =>
            e.name.includes("RENIEC") || e.name.includes("SUNAT")
          );
        } else if (categoryId === "6") {
          // Salud
          filteredEnterprises = mockEnterprises.filter((e) =>
            e.name.includes("Hospital")
          );
        } else if (categoryId === "5") {
          // Empresas/Bancario
          filteredEnterprises = mockEnterprises.filter((e) =>
            e.name.includes("Banco")
          );
        }

        return filteredEnterprises.map((data) => new Enterprise(data));
      });
    }

    try {
      const response = await apiService.get(
        ENTERPRISE_ENDPOINTS.byCategory(categoryId)
      );

      const enterprises = response.data || response;
      return enterprises.map((data) => new Enterprise(data));
    } catch (error) {
      console.error(
        `Error al obtener empresas por categoría ${categoryId}:`,
        error
      );
      throw error;
    }
  },

  // Obtener agencias de un tenant específico
  async getAgenciesByTenant(tenantId) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get Agencies By Tenant:", tenantId);

      return createMockResponse(async () => {
        await apiService.setTenantId(tenantId);

        // Filtrar por tenantId
        const agencies = mockEnterprises.filter((e) => e.tenantId === tenantId);
        return agencies.map((data) => new Enterprise(data));
      });
    }

    try {
      await apiService.setTenantId(tenantId);

      const response = await apiService.get(
        TENANT_ENDPOINTS.agencies(tenantId)
      );

      const agencies = response.content || response;
      return agencies.map((data) => new Enterprise(data));
    } catch (error) {
      console.error(`Error al obtener agencias del tenant ${tenantId}:`, error);
      throw error;
    }
  },

  // Obtener detalles de una agencia en un tenant específico
  async getAgencyDetail(tenantId, agencyId) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get Agency Detail:", { tenantId, agencyId });

      return createMockResponse(async () => {
        await apiService.setTenantId(tenantId);

        const enterprise = mockEnterprises.find(
          (e) => e.id === agencyId && e.tenantId === tenantId
        );

        if (!enterprise) {
          throw {
            response: {
              status: 404,
              data: { error: "Agencia no encontrada" },
            },
          };
        }

        return new Enterprise(enterprise);
      });
    }

    try {
      await apiService.setTenantId(tenantId);

      const response = await apiService.get(
        TENANT_ENDPOINTS.agencyDetail(tenantId, agencyId)
      );

      return new Enterprise(response);
    } catch (error) {
      console.error(
        `Error al obtener agencia ${agencyId} del tenant ${tenantId}:`,
        error
      );
      throw error;
    }
  },
};

export default enterpriseService;