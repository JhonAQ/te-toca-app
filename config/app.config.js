// Configuración global de la aplicación TeToca

export const APP_CONFIG = {
  // Configuración del modo mock
  MOCK: {
    USE_MOCK_DATA: true, // Cambiar a false para usar API real
    MOCK_DELAY: 800, // Delay simulado en ms para peticiones mock
    SHOW_MOCK_ALERTS: true, // Mostrar alertas indicando modo mock
    AUTO_LOGIN_EMAIL: "juan.perez@email.com", // Email por defecto para testing
    AUTO_LOGIN_PASSWORD: "123456", // Contraseña por defecto para testing
  },

  // Configuración de la API
  API: {
    BASE_URL: "http://localhost:3000/api",
    TIMEOUT: 10000, // 10 segundos
    RETRY_ATTEMPTS: 3,
  },

  // Configuración de notificaciones
  NOTIFICATIONS: {
    ENABLED: true,
    CHANNELS: {
      DEFAULT: "default",
      TICKETS: "tickets",
      QUEUE_UPDATES: "queue_updates",
    },
  },

  // Configuración de la aplicación
  APP: {
    NAME: "TeToca",
    VERSION: "1.0.0",
    ENVIRONMENT: __DEV__ ? "development" : "production",
  },

  // Configuración de features
  FEATURES: {
    QR_SCANNER: true,
    PUSH_NOTIFICATIONS: true,
    OFFLINE_MODE: false,
    ANALYTICS: false,
  },

  // Configuración de colores y tema
  THEME: {
    COLORS: {
      primary: "#883EF2",
      secondary: "#7379DD",
      dark: "#0D0426",
      light: "#FFFFFF",
      gray: "#BBBBBB",
    },
  },
};

export default APP_CONFIG;
