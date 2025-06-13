const API_BASE_URL = "https://api.tetoca.com/api/";

// Para el auth
const AUTH_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
};

// Para datos de empresas
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

// Endpoints para QR
const QR_ENDPOINTS = {
  validate: `${API_BASE_URL}/qr/validate`,
};

export {
  API_BASE_URL,
  AUTH_ENDPOINTS,
  ENTERPRISE_ENDPOINTS,
  CATEGORY_ENDPOINTS,
  QUEUE_ENDPOINTS,
  TICKET_ENDPOINTS,
  QR_ENDPOINTS,
};
