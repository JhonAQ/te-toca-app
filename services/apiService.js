import axios from "axios";
import { API_BASE_URL } from "./apiDefinition";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

      // Agregar el tenantId si está disponible
      const tenantId = await AsyncStorage.getItem("currentTenantId");
      if (tenantId && config.url.includes("/tenant/")) {
        // Reemplaza el placeholder {tenantId} en la URL si existe
        config.url = config.url.replace("{tenantId}", tenantId);
      }
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
    return response;
  },
  async (error) => {
    // Manejo de errores como token expirado, etc.
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Token expirado o inválido
        await AsyncStorage.removeItem("authToken");
        // Podríamos usar un EventEmitter para notificar a la app que debe redirigir al login
        // EventEmitter.emit('AUTH_ERROR', { type: 'UNAUTHORIZED' });
      } else if (status === 403) {
        // Permiso denegado
        // EventEmitter.emit('AUTH_ERROR', { type: 'FORBIDDEN' });
      }
    }
    return Promise.reject(error);
  }
);

// Función genérica para realizar peticiones GET
const get = async (url, params = {}) => {
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
    errorMessage =
      error.response.data.message ||
      `Error ${error.response.status}: ${error.response.statusText}`;
    console.error("Error de respuesta API:", error.response.data);
  } else if (error.request) {
    // La solicitud fue realizada pero no se recibió respuesta
    errorMessage =
      "No se recibió respuesta del servidor. Verifica tu conexión a internet.";
    console.error("Error sin respuesta:", error.request);
  } else {
    // Algo ocurrió en la configuración de la solicitud
    errorMessage = error.message;
    console.error("Error de solicitud:", error.message);
  }

  // Aquí podrías mostrar un toast o alerta con el error
  console.error("Error API:", errorMessage);
};

// Configurar la URL del tenant actual para las peticiones
const setTenantId = async (tenantId) => {
  if (tenantId) {
    await AsyncStorage.setItem("currentTenantId", tenantId);
  } else {
    await AsyncStorage.removeItem("currentTenantId");
  }
};

// Obtener el tenant actual
const getCurrentTenantId = async () => {
  return await AsyncStorage.getItem("currentTenantId");
};

export default {
  get,
  post,
  put,
  delete: del,
  setTenantId,
  getCurrentTenantId,
};
