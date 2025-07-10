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
  // Login con email y contraseña
  async login(email, password) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
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

      // Crear y devolver el usuario
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        phone: response.user.phone,
        profilePicture: response.user.profilePicture,
      };

      return new User(userData);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  },

  // Registro con email y contraseña
  async register(userData) {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockToken = "mock_token_123456789";
          AsyncStorage.setItem("authToken", mockToken);
          resolve(new User({ ...mockUser, ...userData }));
        }, 500);
      });
    }

    try {
      const response = await apiService.post(AUTH_ENDPOINTS.register, userData);

      // Guardar el token de autenticación
      await AsyncStorage.setItem("authToken", response.token);

      // Crear y devolver el usuario
      const userResponse = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        phone: response.user.phone,
        profilePicture: response.user.profilePicture,
      };

      return new User(userResponse);
    } catch (error) {
      console.error("Error al registrarse:", error);
      throw error;
    }
  },

  // Cerrar sesión
  async logout() {
    try {
      // Llamar al endpoint de logout si existe
      if (!USE_MOCK_DATA) {
        await apiService.post(AUTH_ENDPOINTS.logout);
      }

      // Limpiar storage local
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("currentTenantId");
      return true;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Limpiar storage local aunque falle la API
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("currentTenantId");
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

  // Obtener usuario actual
  async getCurrentUser() {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) return null;

      if (USE_MOCK_DATA) {
        return new User(mockUser);
      }

      const response = await apiService.get(USER_ENDPOINTS.profile);
      return new User(response);
    } catch (error) {
      console.error("Error al obtener usuario actual:", error);
      return null;
    }
  },

  // Métodos obsoletos para compatibilidad (ahora vacíos)
  async initializeGoogleSignIn() {
    console.warn("Google Sign In ya no es compatible");
    return true;
  },

  async loginWithGoogle() {
    throw new Error("Google Sign In ya no es compatible. Usa login con email/contraseña.");
  },

  async loginWithGoogleAuthSession() {
    throw new Error("Google Sign In ya no es compatible. Usa login con email/contraseña.");
  },

  async isGoogleSignedIn() {
    return false;
  },

  async getCurrentGoogleUser() {
    return null;
  },
};

export default authService;