import axios from "axios";
import { API_BASE_URL } from "./apiDefinition";
import AsyncStorage from "@react-native-async-storage/async-storage";

// CONFIGURACIÓN GLOBAL PARA MODO MOCK
export const MOCK_CONFIG = {
  USE_MOCK_DATA: true, // Cambiar a false cuando el backend esté listo
  MOCK_DELAY: 800, // Simular delay de red en milisegundos
};

// Crear una instancia de axios con configuración común
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para agregar token de autenticación a las peticiones
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Agregar el tenantId si está disponible y es una ruta de tenant
      const tenantId = await AsyncStorage.getItem("currentTenantId");
      if (tenantId && config.url.includes("/tenant/")) {
        // Reemplaza el placeholder {tenantId} en la URL si existe
        config.url = config.url.replace("{tenantId}", tenantId);
      }

      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    } catch (error) {
      console.error("Error al obtener el token o tenantId:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    // Manejo de errores como token expirado, etc.
    if (error.response) {
      const { status, data } = error.response;

      console.error(`API Error: ${status} ${error.config.url}`, data);

      if (status === 401) {
        // Token expirado o inválido
        await AsyncStorage.removeItem("authToken");
        // Aquí podrías emitir un evento para redirigir al login
      } else if (status === 403) {
        // Permiso denegado
        console.error("Acceso denegado:", data);
      } else if (status === 404) {
        // Recurso no encontrado
        console.error("Recurso no encontrado:", data);
      } else if (status === 500) {
        // Error interno del servidor
        console.error("Error interno del servidor:", data);
      }
    } else if (error.request) {
      // Error de red o conexión
      console.error("Error de conexión:", error.request);
    } else {
      // Error en la configuración de la petición
      console.error("Error de configuración:", error.message);
    }

    return Promise.reject(error);
  }
);

// Función helper para simular respuestas de API
export const createMockResponse = async (
  data,
  delay = MOCK_CONFIG.MOCK_DELAY
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Función genérica para realizar peticiones GET
const get = async (url, params = {}) => {
  if (MOCK_CONFIG.USE_MOCK_DATA) {
    console.log(`Mock GET: ${url}`, params);
    // Los servicios individuales manejarán sus propios datos mock
    throw new Error("Mock data should be handled by individual services");
  }

  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Función genérica para realizar peticiones POST
const post = async (url, data = {}) => {
  if (MOCK_CONFIG.USE_MOCK_DATA) {
    console.log(`Mock POST: ${url}`, data);
    // Los servicios individuales manejarán sus propios datos mock
    throw new Error("Mock data should be handled by individual services");
  }

  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Función genérica para realizar peticiones PUT
const put = async (url, data = {}) => {
  if (MOCK_CONFIG.USE_MOCK_DATA) {
    console.log(`Mock PUT: ${url}`, data);
    // Los servicios individuales manejarán sus propios datos mock
    throw new Error("Mock data should be handled by individual services");
  }

  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Función genérica para realizar peticiones DELETE
const del = async (url) => {
  if (MOCK_CONFIG.USE_MOCK_DATA) {
    console.log(`Mock DELETE: ${url}`);
    // Los servicios individuales manejarán sus propios datos mock
    throw new Error("Mock data should be handled by individual services");
  }

  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Función para manejar errores de API de manera centralizada
const handleApiError = (error) => {
  let errorMessage = "Ocurrió un error en la comunicación con el servidor";

  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    const { status, data } = error.response;

    switch (status) {
      case 400:
        errorMessage = data.error || "Solicitud incorrecta";
        break;
      case 401:
        errorMessage = data.error || "No autorizado";
        break;
      case 403:
        errorMessage = data.error || "Acceso denegado";
        break;
      case 404:
        errorMessage = data.error || "Recurso no encontrado";
        break;
      case 409:
        errorMessage = data.error || "Conflicto en los datos";
        break;
      case 500:
        errorMessage = data.error || "Error interno del servidor";
        break;
      default:
        errorMessage =
          data.error || `Error ${status}: ${error.response.statusText}`;
    }
  } else if (error.request) {
    // La solicitud fue realizada pero no se recibió respuesta
    errorMessage =
      "No se recibió respuesta del servidor. Verifica tu conexión a internet.";
  } else {
    // Algo ocurrió en la configuración de la solicitud
    errorMessage = error.message;
  }

  console.error("Error API:", errorMessage);
};

// Configurar la URL del tenant actual para las peticiones
const setTenantId = async (tenantId) => {
  if (tenantId) {
    await AsyncStorage.setItem("currentTenantId", tenantId);
    console.log("Tenant ID configurado:", tenantId);
  } else {
    await AsyncStorage.removeItem("currentTenantId");
    console.log("Tenant ID removido");
  }
};

// Obtener el tenant actual
const getCurrentTenantId = async () => {
  const tenantId = await AsyncStorage.getItem("currentTenantId");
  return tenantId;
};

// Configurar el token de autenticación
const setAuthToken = async (token) => {
  if (token) {
    await AsyncStorage.setItem("authToken", token);
    console.log("Token de autenticación configurado");
  } else {
    await AsyncStorage.removeItem("authToken");
    console.log("Token de autenticación removido");
  }
};

// Obtener el token de autenticación actual
const getAuthToken = async () => {
  const token = await AsyncStorage.getItem("authToken");
  return token;
};

export default {
  get,
  post,
  put,
  delete: del,
  setTenantId,
  getCurrentTenantId,
  setAuthToken,
  getAuthToken,
  // Exportar configuración mock
  MOCK_CONFIG,
  createMockResponse,
};
