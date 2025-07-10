// Definición de endpoints para la API de TeToca

// URL base de la API
const API_BASE_URL = "https://localhost:8080/api";

// Endpoints para autenticación
export const AUTH_ENDPOINTS = {
  oauth: "/auth/oauth", // POST - Autenticación OAuth (Google, Facebook, etc.)
};

// Endpoints para empresas
const ENTERPRISE_ENDPOINTS = {
  list: `${API_BASE_URL}/enterprises`,
  detail: (id) => `${API_BASE_URL}/enterprises/${id}`,
  search: `${API_BASE_URL}/enterprises/search`,
  byCategory: (categoryId) =>
    `${API_BASE_URL}/categories/${categoryId}/enterprises`,
};

// Endpoints para categorías
const CATEGORY_ENDPOINTS = {
  list: `${API_BASE_URL}/categories`,
};

// Endpoints para colas
const QUEUE_ENDPOINTS = {
  listByEnterprise: (enterpriseId) =>
    `${API_BASE_URL}/enterprises/${enterpriseId}/queues`,
  detail: (queueId) => `${API_BASE_URL}/queues/${queueId}`,
};

// Endpoints para tickets
const TICKET_ENDPOINTS = {
  create: (queueId) => `${API_BASE_URL}/queues/${queueId}/join`,
  getDetails: (ticketId) => `${API_BASE_URL}/tickets/${ticketId}`,
  pause: (ticketId) => `${API_BASE_URL}/tickets/${ticketId}/pause`,
  resume: (ticketId) => `${API_BASE_URL}/tickets/${ticketId}/resume`,
  cancel: (ticketId) => `${API_BASE_URL}/tickets/${ticketId}/cancel`,
};

// Endpoints específicos para el manejo de tenant
const TENANT_ENDPOINTS = {
  agencies: (tenantId) => `${API_BASE_URL}/tenant/${tenantId}/public/agencies`,
  agencyDetail: (tenantId, agencyId) =>
    `${API_BASE_URL}/tenant/${tenantId}/public/agencies/${agencyId}`,
  joinQueue: (tenantId, queueId) =>
    `${API_BASE_URL}/tenant/${tenantId}/queues/${queueId}/join`,
};

export {
  API_BASE_URL,
  ENTERPRISE_ENDPOINTS,
  CATEGORY_ENDPOINTS,
  QUEUE_ENDPOINTS,
  TICKET_ENDPOINTS,
  TENANT_ENDPOINTS,
};