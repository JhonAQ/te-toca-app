// Modelos que representan la estructura de datos de la aplicación

// Modelo de usuario
export class User {
  constructor(data = {}) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.email = data.email || "";
    this.phone = data.phone || "";
    this.profilePicture = data.profilePicture || null;
  }
}

// Modelo de empresa
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
    this.isAvailable = data.isAvailable !== undefined ? data.isAvailable : true;
    this.activeQueues = data.activeQueues || 0;
    this.queues = data.queues || [];
  }
}

// Modelo de categoría
export class Category {
  constructor(data = {}) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.iconName = data.iconName || "";
    this.color = data.color || "#4b7bec";
  }
}

// Modelo de cola
export class Queue {
  constructor(data = {}) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.icon = data.icon || "document-text-outline";
    this.peopleWaiting = data.peopleWaiting || 0;
    this.avgTime = data.avgTime || "0 min";
    this.enterpriseId = data.enterpriseId || "";
    this.isActive = data.isActive !== undefined ? data.isActive : true;
  }
}

// Modelo de ticket
export class Ticket {
  constructor(data = {}) {
    this.id = data.id || "";
    this.ticketId = data.ticketId || "";
    this.queueId = data.queueId || "";
    this.enterpriseId = data.enterpriseId || "";
    this.enterpriseName = data.enterpriseName || "";
    this.queueName = data.queueName || "";
    this.issueDate = data.issueDate || new Date().toLocaleDateString();
    this.issueTime = data.issueTime || new Date().toLocaleTimeString();
    this.status = data.status || "waiting"; // 'waiting', 'paused', 'attended', 'cancelled'
    this.position = data.position || 0;
    this.currentTicket = data.currentTicket || "";
    this.waitTime = data.waitTime || "0 min";
    this.peopleTime = data.peopleTime || "0 min";
  }
}
