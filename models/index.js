// Modelos que representan la estructura de datos de la aplicación

// Modelo de usuario
export class User {
  constructor(data = {}) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.email = data.email || "";
    this.phone = data.phone || "";
    this.profilePicture = data.profilePicture || null;
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }
}

// Modelo de empresa/tenant
export class Enterprise {
  constructor(data = {}) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.shortName = data.shortName || "";
    this.type = data.type || "";
    this.logo = data.logo || null;
    this.address = data.address || "";
    this.schedule = data.schedule || "";
    this.phone = data.phone || "";
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.activeQueues = data.activeQueues || 0;
    this.queues = data.queues || [];
    this.tenantId = data.tenantId || "";
    this.settings = data.settings || {};
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }
}

// Modelo de categoría
export class Category {
  constructor(data = {}) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.iconName = data.iconName || "";
    this.color = data.color || "#4b7bec";
    this.isActive = data.isActive !== undefined ? data.isActive : true;
  }
}

// Modelo de cola
export class Queue {
  constructor(data = {}) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.description = data.description || "";
    this.icon = data.icon || "document-text-outline";
    this.category = data.category || "";
    this.priority = data.priority || "medium"; // low, medium, high
    this.peopleWaiting = data.peopleWaiting || data.waitingCount || 0;
    this.avgTime = data.avgTime || data.averageWaitTime || "0 min";
    this.enterpriseId = data.enterpriseId || data.tenantId || "";
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.totalProcessedToday = data.totalProcessedToday || 0;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }
}

// Modelo de ticket
export class Ticket {
  constructor(data = {}) {
    this.id = data.id || "";
    this.number = data.number || data.ticketId || "";
    this.queueId = data.queueId || "";
    this.enterpriseId = data.enterpriseId || data.tenantId || "";
    this.enterpriseName = data.enterpriseName || data.tenantName || "";
    this.queueName = data.queueName || "";
    this.customerName = data.customerName || "";
    this.customerPhone = data.customerPhone || "";
    this.customerEmail = data.customerEmail || "";
    this.serviceType = data.serviceType || "";
    this.priority = data.priority || "normal"; // normal, priority
    this.status = data.status || "waiting"; // waiting, called, in_progress, completed, cancelled, skipped
    this.position = data.position || 0;
    this.estimatedWaitTime = data.estimatedWaitTime || 0;
    this.actualWaitTime = data.actualWaitTime || 0;
    this.serviceTime = data.serviceTime || 0;
    this.createdAt =
      data.createdAt || data.issueDate || new Date().toISOString();
    this.updatedAt = data.updatedAt || null;
    this.calledAt = data.calledAt || null;
    this.completedAt = data.completedAt || null;
    this.cancelledAt = data.cancelledAt || null;
    this.skippedAt = data.skippedAt || null;
    this.notes = data.notes || "";
    this.reason = data.reason || "";

    // Propiedades de compatibilidad con el formato anterior
    this.ticketId = this.number;
    this.issueDate =
      data.issueDate || new Date(this.createdAt).toLocaleDateString();
    this.issueTime =
      data.issueTime || new Date(this.createdAt).toLocaleTimeString();
    this.waitTime =
      data.waitTime || `${Math.round(this.estimatedWaitTime / 60)} min`;
    this.peopleTime = data.peopleTime || "4 min";
    this.currentTicket = data.currentTicket || "";
  }
}

// Modelo de tenant (empresa)
export class Tenant {
  constructor(data = {}) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.settings = data.settings || {
      timezone: "America/Lima",
      businessHours: {
        start: "08:00",
        end: "18:00",
      },
    };
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }
}
