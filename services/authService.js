import apiService from "./apiService";
import { AUTH_ENDPOINTS } from "./apiDefinition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models";

// Variable para controlar si usamos datos mock o la API real
const USE_MOCK_DATA = false;

// Datos mock para pruebas
const mockUser = {
  id: "1",
  name: "Usuario de Prueba",
  email: "usuario@ejemplo.com",
  phone: "987654321",
  profilePicture: null,
};

// Servicio para operaciones de autenticación
const authService = {
  // Login de usuario con email/password
  async login(email, password) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Token falso para pruebas
          const mockToken = "mock_token_123456789";
          AsyncStorage.setItem("authToken", mockToken);
          resolve(new User(mockUser));
        }, 500);
      });
    }

    try {
      const response = await apiService.post(AUTH_ENDPOINTS.login, {
        email,
        password,
      });

      // Guardar el token de autenticación
      await AsyncStorage.setItem("authToken", response.token);

      // Devolver los datos del usuario
      return new User(response.user);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  },

  // Registro de usuario
  async register(userData) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, message: "Usuario registrado con éxito" });
        }, 500);
      });
    }

    try {
      const response = await apiService.post(AUTH_ENDPOINTS.register, userData);
      return response;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  },

  // Login con OAuth (Google, Facebook, etc.)
  async loginWithOAuth(provider, token) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockToken = "mock_oauth_token_123456789";
          AsyncStorage.setItem("authToken", mockToken);
          resolve(new User(mockUser));
        }, 500);
      });
    }

    try {
      const response = await apiService.post(AUTH_ENDPOINTS.oauth, {
        provider,
        token,
      });

      // Guardar el token de autenticación
      await AsyncStorage.setItem("authToken", response.token);

      // Devolver los datos del usuario
      return new User(response.user);
    } catch (error) {
      console.error(`Error al iniciar sesión con ${provider}:`, error);
      throw error;
    }
  },

  // Cerrar sesión
  async logout() {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("currentTenantId");
      return true;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      return false;
    }
  },

  // Verificar si el usuario está autenticado
  async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return token !== null;
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      return false;
    }
  },

  // Recuperar contraseña
  async forgotPassword(email) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Se ha enviado un correo de recuperación",
          });
        }, 500);
      });
    }

    try {
      const response = await apiService.post(AUTH_ENDPOINTS.forgotPassword, {
        email,
      });
      return response;
    } catch (error) {
      console.error("Error al solicitar recuperación de contraseña:", error);
      throw error;
    }
  },
};

export default authService;
