import apiService from "./apiService";
import { ENTERPRISE_ENDPOINTS } from "./apiDefinition";
import { Enterprise } from "../models";

// Datos mock para usar durante el desarrollo
const mockEnterprises = [
  {
    id: "1",
    name: "Banco de Crédito del Perú",
    shortName: "BCP",
    type: "Entidad bancaria",
    logo: require("../assets/default-logo.png"),
    address: "Av. Independencia 123, Arequipa",
    schedule: "Lun - Vie: 9:00 - 18:00, Sáb: 9:00 - 13:00",
    phone: "+51 954 123 456",
    isAvailable: true,
    activeQueues: 3,
    queues: [
      {
        id: "1",
        name: "Operaciones en ventanilla",
        icon: "cash-outline",
        peopleWaiting: 12,
        avgTime: "15 min",
      },
      {
        id: "2",
        name: "Atención al cliente",
        icon: "people-outline",
        peopleWaiting: 8,
        avgTime: "20 min",
      },
      {
        id: "3",
        name: "Apertura de cuentas",
        icon: "document-text-outline",
        peopleWaiting: 5,
        avgTime: "25 min",
      },
    ],
  },
  {
    id: "2",
    name: "RENIEC",
    address: "Av. Dolores Prolongación 456, Arequipa",
    shortName: "RENIEC",
    type: "Entidad gubernamental",
    logo: require("../assets/default-logo.png"),
    schedule: "Lun - Vie: 8:00 - 17:00",
    phone: "+51 954 789 123",
    isAvailable: true,
    activeQueues: 2,
    queues: [
      {
        id: "4",
        name: "Trámites generales",
        icon: "document-outline",
        peopleWaiting: 20,
        avgTime: "35 min",
      },
      {
        id: "5",
        name: "DNI y pasaportes",
        icon: "card-outline",
        peopleWaiting: 15,
        avgTime: "25 min",
      },
    ],
  },
  // Más empresas mock...
];

// Variable para controlar si usamos datos mock o la API real
const USE_MOCK_DATA = true;

// Servicio para operaciones relacionadas con empresas
const enterpriseService = {
  // Obtener todas las empresas
  async getAllEnterprises() {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let debbug = new Enterprise(mockEnterprises[0]);
          console.log(debbug.logo);
          resolve(mockEnterprises.map((data) => new Enterprise(data)));
        }, 500); // Simulamos una demora de 500ms
      });
    }

    try {
      const response = await apiService.get(ENTERPRISE_ENDPOINTS.list);
      return response.data.map((data) => new Enterprise(data));
    } catch (error) {
      console.error("Error al obtener empresas:", error);
      throw error;
    }
  },

  // Obtener una empresa por ID
  async getEnterpriseById(enterpriseId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const enterprise = mockEnterprises.find((e) => e.id === enterpriseId);
          if (enterprise) {
            resolve(new Enterprise(enterprise));
          } else {
            reject(new Error("Empresa no encontrada"));
          }
        }, 300);
      });
    }

    try {
      const response = await apiService.get(
        ENTERPRISE_ENDPOINTS.detail(enterpriseId)
      );
      return new Enterprise(response.data);
    } catch (error) {
      console.error(`Error al obtener empresa ${enterpriseId}:`, error);
      throw error;
    }
  },

  // Buscar empresas por texto
  async searchEnterprises(searchText) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const results = mockEnterprises.filter(
            (e) =>
              e.name.toLowerCase().includes(searchText.toLowerCase()) ||
              e.address.toLowerCase().includes(searchText.toLowerCase())
          );
          resolve(results.map((data) => new Enterprise(data)));
        }, 300);
      });
    }

    try {
      const response = await apiService.get(ENTERPRISE_ENDPOINTS.search, {
        q: searchText,
      });
      return response.data.map((data) => new Enterprise(data));
    } catch (error) {
      console.error("Error al buscar empresas:", error);
      throw error;
    }
  },

  // Obtener empresas por categoría
  async getEnterprisesByCategory(categoryId) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // En modo mock, simplemente devolvemos todas las empresas
          resolve(mockEnterprises.map((data) => new Enterprise(data)));
        }, 300);
      });
    }

    try {
      const response = await apiService.get(
        ENTERPRISE_ENDPOINTS.byCategory(categoryId)
      );
      return response.data.map((data) => new Enterprise(data));
    } catch (error) {
      console.error(
        `Error al obtener empresas por categoría ${categoryId}:`,
        error
      );
      throw error;
    }
  },
};

export default enterpriseService;
