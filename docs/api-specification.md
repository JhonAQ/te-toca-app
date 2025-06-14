# Especificacion de API para la app

## General

- **Base URL**: `https://api.tetoca.com/api` 
- **Formato de Respuesta**: JSON
- **Autenticación**: JWT

## Autenticación

### Login de Usuario

- **Endpoint**: `/auth/login`
- **Método**: POST
- **Descripción**: Autenticar un usuario y obtener un token de acceso
- **Cuerpo de la Solicitud**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "password": "contraseña"
  }
  ```
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "1",
      "name": "Nombre Usuario",
      "email": "usuario@ejemplo.com",
      "phone": "987654321", // si no hay puede omitirse
      //"rol": "user", esto para la web de los operarios
      "profilePicture": "https://ejemplo.com/photo.jpg"
    }
  }
  ```
- **Respuesta Errónea** (401 Unauthorized):
  ```json
  {
    "message": "Credenciales invalidas"
  }
  ```

### Registro de Usuario

- **Endpoint**: `/auth/register`
- **Método**: POST
- **Descripción**: Registrar un nuevo usuario
- **Cuerpo de la Solicitud**:
  ```json
  {
    "name": "Nombre Completo",
    "email": "usuario@ejemplo.com",
    "password": "contraseña",
    "phone": "987654321"
  }
  ```
- **Respuesta Exitosa** (201 Created):
  ```json
  {
    "message": "Usuario registrado exitosamente",
    "user": {
      "id": "1",
      "name": "Nombre Usuario",
      "email": "usuario@ejemplo.com"
    }
  }
  ```
- **Respuesta Errónea** (400 Bad Request):
  ```json
  {
    "message": "El correo ya está registrado"
  }
  ```

## Empresas (Enterprises)

### Listar Empresas

- **Endpoint**: `/enterprises`
- **Método**: GET
- **Descripción**: Obtener listado de todas las empresas disponibles
- **Parámetros Query (opcionales)**:
  - `page`: Número de página (por defecto 1)
  - `limit`: Resultados por página (por defecto 20)
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "data": [
      {
        "id": "1",
        "name": "Banco de Crédito del Perú",
        "shortName": "BCP",
        "type": "Entidad bancaria",
        "logo": "https://api.tetoca.com/logos/bcp.png",
        "address": "Av. Independencia 123, Arequipa",
        "schedule": "Lun - Vie: 9:00 - 18:00, Sáb: 9:00 - 13:00",
        "phone": "954123456",
        "isAvailable": true,
        "activeQueues": 3
      },
      {
        "id": "2",
        "name": "RENIEC",
        "shortName": "RENIEC",
        "type": "Entidad gubernamental",
        "logo": "https://api.tetoca.com/logos/reniec.png",
        "address": "Av. Dolores Prolongación 456, Arequipa",
        "schedule": "Lun - Vie: 8:00 - 17:00",
        "phone": "954789123",
        "isAvailable": true,
        "activeQueues": 2
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalPages": 5,
      "totalRecords": 97
    }
  }
  ```

### Detalle de Empresa

- **Endpoint**: `/enterprises/{enterpriseId}`
- **Método**: GET
- **Descripción**: Obtener información detallada de una empresa específica
- **Parámetros Path**:
  - `enterpriseId`: ID de la empresa
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "id": "1",
    "name": "Banco de Crédito del Perú",
    "shortName": "BCP",
    "type": "Entidad bancaria",
    "logo": "https://api.tetoca.com/logos/bcp.png",
    "address": "Av. Independencia 123, Arequipa",
    "schedule": "Lun - Vie: 9:00 - 18:00, Sáb: 9:00 - 13:00",
    "phone": "954123456",
    "isAvailable": true,
    "activeQueues": 3,
    "queues": [
      {
        "id": "1",
        "name": "Operaciones en ventanilla",
        "icon": "cash-outline",
        "peopleWaiting": 12,
        "avgTime": "15 min"
      },
      {
        "id": "2",
        "name": "Atencion al cliente",
        "icon": "people-outline",
        "peopleWaiting": 8,
        "avgTime": "20 min"
      }
    ]
  }
  ```
- **Respuesta Errónea** (404 Not Found):
  ```json
  {
    "message": "Empresa no encontrada"
  }
  ```

### Buscar Empresas (futuro, para proximas ir)teraciones puede ser

- **Endpoint**: `/enterprises/search`
- **Método**: GET
- **Descripción**: Buscar empresas por texto
- **Parámetros Query**:
  - `q`: Texto de búsqueda (requerido)
  - `page`: Número de página (por defecto 1)
  - `limit`: Resultados por página (por defecto 20)
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "data": [
      {
        "id": "1",
        "name": "Banco de Crédito del Perú",
        "shortName": "BCP",
        "type": "Entidad bancaria",
        "logo": "https://api.tetoca.com/logos/bcp.png",
        "address": "Av. Independencia 123, Arequipa",
        "isAvailable": true,
        "activeQueues": 3
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalPages": 1,
      "totalRecords": 1
    }
  }
  ```

### Empresas por Categoría

- **Endpoint**: `/categories/{categoryId}/enterprises`
- **Método**: GET
- **Descripción**: Obtener empresas por categoría
- **Parámetros Path**:
  - `categoryId`: ID de la categoría
- **Parámetros Query (opcionales)**:
  - `page`: Número de página (por defecto 1)
  - `limit`: Resultados por página (por defecto 20)
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "data": [
      {
        "id": "1",
        "name": "Banco de Crédito del Perú",
        "shortName": "BCP",
        "type": "Entidad bancaria",
        "logo": "https://api.tetoca.com/logos/bcp.png",
        "address": "Av. Independencia 123, Arequipa",
        "isAvailable": true,
        "activeQueues": 3
      },
      {
        "id": "5",
        "name": "BBVA",
        "shortName": "BBVA",
        "type": "Entidad bancaria",
        "logo": "https://api.tetoca.com/logos/bbva.png",
        "address": "Av. Ejército 789, Arequipa",
        "isAvailable": true,
        "activeQueues": 4
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalPages": 1,
      "totalRecords": 2
    }
  }
  ```

## Categorías

### Listar Categorías

- **Endpoint**: `/categories`
- **Método**: GET
- **Descripción**: Obtener todas las categorías disponibles
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "data": [
      {
        "id": "1",
        "name": "Documentos",
        "iconName": "document-text",
        "color": "#4b7bec"
      },
      {
        "id": "2",
        "name": "Vivienda",
        "iconName": "home",
        "color": "#2ecc71"
      },
      {
        "id": "3",
        "name": "Vehículos",
        "iconName": "car",
        "color": "#e74c3c"
      }
    ]
  }
  ```

## Colas (Queues)

### Listar Colas por Empresa

- **Endpoint**: `/enterprises/{enterpriseId}/queues`
- **Método**: GET
- **Descripción**: Obtener todas las colas disponibles para una empresa
- **Parámetros Path**:
  - `enterpriseId`: ID de la empresa
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "data": [
      {
        "id": "1",
        "name": "Operaciones en ventanilla",
        "icon": "cash-outline",
        "peopleWaiting": 12,
        "avgTime": "15 min",
        "enterpriseId": "1",
        "isActive": true
      },
      {
        "id": "2",
        "name": "Atención al cliente",
        "icon": "people-outline",
        "peopleWaiting": 8,
        "avgTime": "20 min",
        "enterpriseId": "1",
        "isActive": true
      }
    ]
  }
  ```
- **Respuesta Errónea** (404 Not Found):
  ```json
  {
    "message": "Empresa no encontrada"
  }
  ```

### Detalle de Cola

- **Endpoint**: `/queues/{queueId}`
- **Método**: GET
- **Descripción**: Obtener detalles de una cola específica
- **Parámetros Path**:
  - `queueId`: ID de la cola
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "id": "1",
    "name": "Operaciones en ventanilla",
    "icon": "cash-outline",
    "peopleWaiting": 12,
    "avgTime": "15 min",
    "enterpriseId": "1",
    "isActive": true,
    "currentTicket": "AB17",
    "waitTimePerPerson": "4 min",
    "enterprise": {
      "id": "1",
      "name": "Banco de Crédito del Perú",
      "shortName": "BCP",
      "logo": "https://api.tetoca.com/logos/bcp.png"
    }
  }
  ```
- **Respuesta Errónea** (404 Not Found):
  ```json
  {
    "message": "Cola no encontrada"
  }
  ```

## Tickets

### Unirse a una Cola (Crear Ticket)

- **Endpoint**: `/queues/{queueId}/join`
- **Método**: POST
- **Descripción**: Crear un nuevo ticket para unirse a una cola
- **Parámetros Path**:
  - `queueId`: ID de la cola
- **Cuerpo de la Solicitud**: Vacío (para usuarios anónimos) o token de autenticación (para usuarios registrados)
- **Respuesta Exitosa** (201 Created):
  ```json
  {
    "id": "123456",
    "ticketId": "AB25",
    "queueId": "1",
    "enterpriseId": "1",
    "enterpriseName": "Banco de Crédito del Perú",
    "queueName": "Atención al Cliente",
    "issueDate": "15 de Mayo, 2023",
    "issueTime": "10:45 AM",
    "status": "waiting",
    "position": 8,
    "currentTicket": "AB17",
    "waitTime": "35 min",
    "peopleTime": "4 min"
  }
  ```
- **Respuesta Errónea** (400 Bad Request):
  ```json
  {
    "message": "No se puede unir a esta cola. La cola no está activa o la empresa no está disponible."
  }
  ```

### Obtener Detalles de un Ticket

- **Endpoint**: `/tickets/{ticketId}`
- **Método**: GET
- **Descripción**: Obtener información actual de un ticket
- **Parámetros Path**:
  - `ticketId`: ID del ticket
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "id": "123456",
    "ticketId": "AB25",
    "queueId": "1",
    "enterpriseId": "1",
    "enterpriseName": "Banco de Crédito del Perú",
    "queueName": "Atención al Cliente",
    "issueDate": "15 de Mayo, 2023",
    "issueTime": "10:45 AM",
    "status": "waiting",
    "position": 8,
    "currentTicket": "AB17",
    "waitTime": "35 min",
    "peopleTime": "4 min"
  }
  ```
- **Respuesta Errónea** (404 Not Found):
  ```json
  {
    "message": "Ticket no encontrado o expirado"
  }
  ```

### Pausar Ticket

- **Endpoint**: `/tickets/{ticketId}/pause`
- **Método**: PUT
- **Descripción**: Pausar un ticket activo
- **Parámetros Path**:
  - `ticketId`: ID del ticket
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "id": "123456",
    "ticketId": "AB25",
    "status": "paused",
    "position": 8,
    "message": "Ticket pausado exitosamente"
  }
  ```
- **Respuesta Errónea** (400 Bad Request):
  ```json
  {
    "message": "El ticket ya está pausado o no puede ser pausado"
  }
  ```

### Reanudar Ticket

- **Endpoint**: `/tickets/{ticketId}/resume`
- **Método**: PUT
- **Descripción**: Reanudar un ticket pausado
- **Parámetros Path**:
  - `ticketId`: ID del ticket
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "id": "123456",
    "ticketId": "AB25",
    "status": "waiting",
    "position": 10,
    "message": "Ticket reanudado exitosamente"
  }
  ```
- **Respuesta Errónea** (400 Bad Request):
  ```json
  {
    "message": "El ticket no está pausado o no puede ser reanudado"
  }
  ```

### Cancelar Ticket

- **Endpoint**: `/tickets/{ticketId}/cancel`
- **Método**: DELETE
- **Descripción**: Cancelar un ticket y salir de la cola
- **Parámetros Path**:
  - `ticketId`: ID del ticket
  - `description`: Descripción opcional del motivo de la cancelación
- **Respuesta Exitosa** (200 OK):
  ```json
  {
    "message": "Ticket cancelado exitosamente"
  }
  ```
- **Respuesta Errónea** (404 Not Found):
  ```json
  {
    "message": "Ticket no encontrado o ya ha sido cancelado"
  }
  ```

## Códigos de Error Comunes

- **400 Bad Request**: Solicitud inválida
- **401 Unauthorized**: No autenticado o token inválido
- **403 Forbidden**: No tiene permisos para esta acción
- **404 Not Found**: Recurso no encontrado
- **429 Too Many Requests**: Demasiadas solicitudes, límite excedido
- **500 Internal Server Error**: Error interno del servidor