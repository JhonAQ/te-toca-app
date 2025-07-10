import apiService from "./apiService";
import { AUTH_ENDPOINTS } from "./apiDefinition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Crypto from "expo-crypto";

// Variable para controlar si usamos datos mock o la API real
const USE_MOCK_DATA = false;

// Configuración de Google OAuth
const GOOGLE_CLIENT_ID = "837328308262-k6dn6obej6r9b12qanp34n5c199kqvg6.apps.googleusercontent.com";

// Necesario para que funcione correctamente con Expo
WebBrowser.maybeCompleteAuthSession();

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
  // Inicializar Google Sign In (ahora solo prepara la configuración)
  async initializeGoogleSignIn() {
    try {
      console.log("Google Sign In inicializado correctamente");
      return true;
    } catch (error) {
      console.error("Error al configurar Google Sign In:", error);
      return false;
    }
  },

  // Login con Google usando AuthSession (método principal)
  async loginWithGoogle() {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockToken = "mock_google_token_123456789";
          AsyncStorage.setItem("authToken", mockToken);
          resolve(new User(mockUser));
        }, 500);
      });
    }

    try {
      // Crear el redirectUri
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'tetoca',
        useProxy: true,
      });

      console.log("Redirect URI:", redirectUri);

      // Configurar la request de autenticación
      const request = new AuthSession.AuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        scopes: ['openid', 'profile', 'email'],
        redirectUri,
        responseType: AuthSession.ResponseType.Code,
        extraParams: {},
        additionalParameters: {},
      });

      // Iniciar el flujo de autenticación
      const result = await request.promptAsync({
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      });

      console.log("Resultado de autenticación:", result);

      if (result.type === 'success') {
        // Intercambiar el código por un token
        const tokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId: GOOGLE_CLIENT_ID,
            code: result.params.code,
            redirectUri,
            extraParams: {},
          },
          {
            tokenEndpoint: 'https://oauth2.googleapis.com/token',
          }
        );

        console.log("Token response:", tokenResponse);

        // Obtener información del usuario
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.accessToken}`,
          },
        });

        const userInfo = await userInfoResponse.json();
        console.log("Información del usuario:", userInfo);

        // Enviar el token al backend
        const response = await apiService.post(AUTH_ENDPOINTS.oauth, {
          provider: 'google',
          token: tokenResponse.accessToken,
          user: {
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
          }
        });

        // Guardar el token de autenticación del backend
        await AsyncStorage.setItem("authToken", response.token);

        // Crear y devolver el usuario
        const userData = {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          profilePicture: userInfo.picture,
        };

        return new User(userData);
      } else if (result.type === 'cancel') {
        throw new Error('Autenticación cancelada por el usuario');
      } else {
        throw new Error('Error en la autenticación');
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      throw error;
    }
  },

  // Método alternativo (ahora es el mismo que el principal)
  async loginWithGoogleAuthSession() {
    return this.loginWithGoogle();
  },

  // Cerrar sesión
  async logout() {
    try {
      // Limpiar storage local
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

  // Verificar si está autenticado en Google (simplificado)
  async isGoogleSignedIn() {
    try {
      return await this.isAuthenticated();
    } catch (error) {
      console.error("Error al verificar estado de Google Sign In:", error);
      return false;
    }
  },

  // Obtener usuario actual (desde AsyncStorage o API)
  async getCurrentGoogleUser() {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) return null;

      // Aquí podrías hacer una llamada a la API para obtener los datos del usuario
      // Por ahora retornamos null para que se maneje en la app
      return null;
    } catch (error) {
      console.error("Error al obtener usuario actual:", error);
      return null;
    }
  },
};

export default authService;
