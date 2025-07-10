// Definición de endpoints para la API de TeToca - Aplicación Cliente

// URL base de la API
export const API_BASE_URL = "http://localhost:3000/api";

// Endpoints para autenticación de usuarios (clientes)
export const AUTH_ENDPOINTS = {
  login: "/auth/user/login", // POST - Login con email/contraseña
  register: "/auth/user/register", // POST - Registro de nuevo usuario
  logout: "/auth/user/logout", // POST - Cerrar sesión
  refreshToken: "/auth/refresh", // POST - Renovar token
  forgotPassword: "/auth/forgot-password", // POST - Recuperar contraseña
  resetPassword: "/auth/reset-password", // POST - Resetear contraseña
};

// Endpoints para empresas/tenants (público)
export const ENTERPRISE_ENDPOINTS = {
  list: "/public/companies", // GET - Lista de todas las empresas
  detail: (id) => `/public/companies/${id}`, // GET - Detalles de una empresa específica
  search: "/public/companies/search", // GET - Buscar empresas por nombre
  byCategory: (categoryId) => `/public/categories/${categoryId}/companies`, // GET - Empresas por categoría
  nearby: "/public/companies/nearby", // GET - Empresas cercanas (requiere ubicación)
};

// Endpoints para categorías (público)
export const CATEGORY_ENDPOINTS = {
  list: "/public/categories", // GET - Lista de todas las categorías
  detail: (id) => `/public/categories/${id}`, // GET - Detalles de una categoría
};

// Endpoints para colas (público)
export const QUEUE_ENDPOINTS = {
  listByEnterprise: (enterpriseId) =>
    `/public/companies/${enterpriseId}/queues`, // GET - Colas por empresa
  detail: (queueId) => `/public/queues/${queueId}`, // GET - Detalles de una cola
  status: (queueId) => `/public/queues/${queueId}/status`, // GET - Estado actual de una cola
  waitTimes: (queueId) => `/public/queues/${queueId}/wait-times`, // GET - Tiempos de espera
};

// Endpoints para tickets (autenticado)
export const TICKET_ENDPOINTS = {
  create: (queueId) => `/queues/${queueId}/join`, // POST - Unirse a una cola
  getDetails: (ticketId) => `/tickets/${ticketId}`, // GET - Detalles de un ticket
  pause: (ticketId) => `/tickets/${ticketId}/pause`, // PUT - Pausar ticket
  resume: (ticketId) => `/tickets/${ticketId}/resume`, // PUT - Reanudar ticket
  cancel: (ticketId) => `/tickets/${ticketId}/cancel`, // DELETE - Cancelar ticket
  myTickets: "/user/tickets", // GET - Tickets del usuario actual
  history: "/user/tickets/history", // GET - Historial de tickets
  current: "/user/tickets/current", // GET - Tickets activos
};

// Endpoints para perfil de usuario (autenticado)
export const USER_ENDPOINTS = {
  profile: "/user/profile", // GET - Perfil del usuario
  updateProfile: "/user/profile", // PUT - Actualizar perfil
  notifications: "/user/notifications", // GET - Notificaciones del usuario
  markNotificationRead: (notificationId) =>
    `/user/notifications/${notificationId}/read`, // PUT - Marcar notificación como leída
  registerPushToken: "/user/push-token", // POST - Registrar token de notificaciones
  preferences: "/user/preferences", // GET/PUT - Preferencias del usuario
  favorites: "/user/favorites", // GET - Empresas favoritas
  addFavorite: "/user/favorites", // POST - Agregar empresa a favoritos
  removeFavorite: (enterpriseId) => `/user/favorites/${enterpriseId}`, // DELETE - Remover de favoritos
};

// Endpoints específicos para el manejo de tenant (multitenant)
export const TENANT_ENDPOINTS = {
  companies: (tenantId) => `/tenant/${tenantId}/public/companies`,
  companyDetail: (tenantId, companyId) =>
    `/tenant/${tenantId}/public/companies/${companyId}`,
  joinQueue: (tenantId, queueId) =>
    `/tenant/${tenantId}/queues/${queueId}/join`,
  queuesByCompany: (tenantId, companyId) =>
    `/tenant/${tenantId}/public/companies/${companyId}/queues`,
  queueStatus: (tenantId, queueId) =>
    `/tenant/${tenantId}/public/queues/${queueId}/status`,
};

// Endpoints para reportes y analytics (opcional)
export const ANALYTICS_ENDPOINTS = {
  queueStats: (queueId) => `/analytics/queues/${queueId}/stats`, // GET - Estadísticas de cola
  enterpriseStats: (enterpriseId) =>
    `/analytics/companies/${enterpriseId}/stats`, // GET - Estadísticas de empresa
  userStats: "/analytics/user/stats", // GET - Estadísticas del usuario
};

// Endpoints para ubicación y mapas (opcional)
export const LOCATION_ENDPOINTS = {
  nearby: "/location/nearby", // GET - Empresas cercanas
  directions: (enterpriseId) => `/location/directions/${enterpriseId}`, // GET - Direcciones a una empresa
};
