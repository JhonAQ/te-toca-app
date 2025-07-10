// Utilidades para el manejo del modo mock

import { Alert } from "react-native";
import { MOCK_CONFIG } from "../services/apiService";

/**
 * Muestra una alerta informativa sobre el modo mock
 */
export const showMockModeAlert = () => {
  if (MOCK_CONFIG.USE_MOCK_DATA) {
    Alert.alert(
      "🚀 Modo Desarrollo",
      "La app está funcionando con datos mock.\n\n" +
        "Credenciales de prueba:\n" +
        "• Email: juan.perez@email.com\n" +
        "• Contraseña: 123456\n\n" +
        "Para usar el backend real, cambia USE_MOCK_DATA a false en apiService.js",
      [{ text: "Entendido", style: "default" }]
    );
  }
};

/**
 * Valida si estamos en modo mock
 */
export const isMockMode = () => {
  return MOCK_CONFIG.USE_MOCK_DATA;
};

/**
 * Obtiene el delay configurado para modo mock
 */
export const getMockDelay = () => {
  return MOCK_CONFIG.MOCK_DELAY || 800;
};

/**
 * Logger para modo mock
 */
export const mockLogger = {
  info: (message, data = {}) => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log(`🔄 Mock: ${message}`, data);
    }
  },
  error: (message, error = {}) => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.error(`❌ Mock Error: ${message}`, error);
    }
  },
  warn: (message, data = {}) => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.warn(`⚠️ Mock Warning: ${message}`, data);
    }
  },
};

/**
 * Simula un error de red con probabilidad configurable
 */
export const simulateNetworkError = (
  probability = 0.1,
  errorType = "NETWORK_ERROR"
) => {
  if (Math.random() < probability) {
    const errors = {
      NETWORK_ERROR: {
        response: {
          status: 500,
          data: { error: "Error de red simulado" },
        },
      },
      TIMEOUT_ERROR: {
        response: {
          status: 408,
          data: { error: "Timeout simulado" },
        },
      },
      UNAUTHORIZED_ERROR: {
        response: {
          status: 401,
          data: { error: "No autorizado" },
        },
      },
      NOT_FOUND_ERROR: {
        response: {
          status: 404,
          data: { error: "Recurso no encontrado" },
        },
      },
    };

    throw errors[errorType] || errors.NETWORK_ERROR;
  }
};

/**
 * Genera datos de prueba dinámicos
 */
export const generateMockData = {
  // Genera un ID único
  id: () => Math.random().toString(36).substr(2, 9),

  // Genera un email random
  email: () => {
    const names = ["juan", "maria", "carlos", "ana", "luis", "sofia"];
    const domains = ["email.com", "test.com", "mock.com"];
    const name = names[Math.floor(Math.random() * names.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${name}.${Math.random().toString(36).substr(2, 3)}@${domain}`;
  },

  // Genera un nombre random
  name: () => {
    const firstNames = [
      "Juan",
      "María",
      "Carlos",
      "Ana",
      "Luis",
      "Sofía",
      "Pedro",
      "Carmen",
    ];
    const lastNames = [
      "García",
      "Rodríguez",
      "López",
      "Martínez",
      "González",
      "Pérez",
    ];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  },

  // Genera un teléfono random
  phone: () => {
    return `9${Math.floor(Math.random() * 90000000) + 10000000}`;
  },

  // Genera fecha/hora random
  dateTime: () => {
    const now = new Date();
    const randomDays = Math.floor(Math.random() * 30);
    const randomDate = new Date(
      now.getTime() - randomDays * 24 * 60 * 60 * 1000
    );
    return randomDate.toISOString();
  },

  // Genera tiempo de espera random
  waitTime: () => {
    const minutes = Math.floor(Math.random() * 60) + 5;
    return `${minutes} min`;
  },

  // Genera número de personas random
  peopleCount: () => {
    return Math.floor(Math.random() * 50) + 1;
  },
};

/**
 * Validador de datos mock
 */
export const validateMockData = {
  user: (user) => {
    return user && user.id && user.email && user.name;
  },

  enterprise: (enterprise) => {
    return enterprise && enterprise.id && enterprise.name && enterprise.address;
  },

  queue: (queue) => {
    return queue && queue.id && queue.name && queue.enterpriseId;
  },

  ticket: (ticket) => {
    return ticket && ticket.id && ticket.queueId && ticket.enterpriseId;
  },
};

/**
 * Utilidad para resetear datos mock (útil para testing)
 */
export const resetMockData = () => {
  if (MOCK_CONFIG.USE_MOCK_DATA) {
    // Aquí podrías resetear arrays de datos si fuera necesario
    mockLogger.info("Datos mock reseteados");
  }
};

export default {
  showMockModeAlert,
  isMockMode,
  getMockDelay,
  mockLogger,
  simulateNetworkError,
  generateMockData,
  validateMockData,
  resetMockData,
};
