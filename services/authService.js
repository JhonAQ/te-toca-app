import apiService, { MOCK_CONFIG, createMockResponse } from "./apiService";
import { AUTH_ENDPOINTS } from "./apiDefinition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models";
import { mockUsers, generateId } from "./mockData";

// Servicio para operaciones de autenticación
const authService = {
  // Login con email y contraseña
  async login(email, password) {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Login:", { email, password });

      return createMockResponse(async () => {
        // Simular validación de credenciales
        const user = mockUsers.find((u) => u.email === email);

        if (!user || password !== "123456") {
          throw {
            response: {
              status: 401,
              data: { error: "Credenciales inválidas" },
            },
          };
        }

        const mockToken = `mock_token_${generateId()}`;
        await AsyncStorage.setItem("authToken", mockToken);

        return new User(user);
      });
    }

    try {
      const response = await apiService.post(AUTH_ENDPOINTS.login, {
        email,
        password,
      });

      await AsyncStorage.setItem("authToken", response.token);

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
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Register:", userData);

      return createMockResponse(async () => {
        // Simular validación de email único
        const existingUser = mockUsers.find((u) => u.email === userData.email);

        if (existingUser) {
          throw {
            response: {
              status: 409,
              data: { error: "Ya existe una cuenta con este email" },
            },
          };
        }

        const newUser = {
          id: generateId(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone || "",
          profilePicture: null,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Agregar usuario a datos mock
        mockUsers.push(newUser);

        const mockToken = `mock_token_${generateId()}`;
        await AsyncStorage.setItem("authToken", mockToken);

        return new User(newUser);
      });
    }

    try {
      const response = await apiService.post(AUTH_ENDPOINTS.register, userData);

      await AsyncStorage.setItem("authToken", response.token);

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
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Logout");

      return createMockResponse(async () => {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("currentTenantId");
        return true;
      }, 300);
    }

    try {
      await apiService.post(AUTH_ENDPOINTS.logout);
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("currentTenantId");
      return true;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
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
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Get Current User");

      return createMockResponse(async () => {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) return null;

        // Retornar el primer usuario de los datos mock
        return new User(mockUsers[0]);
      }, 200);
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) return null;

      const response = await apiService.get(USER_ENDPOINTS.profile);
      return new User(response);
    } catch (error) {
      console.error("Error al obtener usuario actual:", error);
      return null;
    }
  },

  // Métodos obsoletos para compatibilidad
  async initializeGoogleSignIn() {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      console.log("🔄 Mock Initialize Google Sign In");
      return true;
    }
    console.warn("Google Sign In ya no es compatible");
    return true;
  },

  async loginWithGoogle() {
    throw new Error(
      "Google Sign In ya no es compatible. Usa login con email/contraseña."
    );
  },

  async loginWithGoogleAuthSession() {
    throw new Error(
      "Google Sign In ya no es compatible. Usa login con email/contraseña."
    );
  },

  async isGoogleSignedIn() {
    return false;
  },

  async getCurrentGoogleUser() {
    return null;
  },
};

export default authService;
