# Modo Mock - TeToca App

## Descripción

La aplicación TeToca incluye un sistema completo de datos mock que permite desarrollar y probar la aplicación sin necesidad de un backend funcional.

## Configuración

### Activar/Desactivar Modo Mock

Para cambiar entre modo mock y API real, modifica el archivo `services/apiService.js`:

```javascript
export const MOCK_CONFIG = {
  USE_MOCK_DATA: true, // true = modo mock, false = API real
  MOCK_DELAY: 800, // Delay simulado en milisegundos
};
```

### Scripts NPM

```bash
# Iniciar en modo mock
npm run start:mock

# Iniciar con API real
npm run start:api

# Build para Android en modo mock
npm run android:mock
```

## Datos Mock Disponibles

### Usuarios de Prueba

- **Email:** juan.perez@email.com
- **Contraseña:** 123456

- **Email:** maria.garcia@email.com
- **Contraseña:** 123456

### Empresas Mock

1. **Banco de Crédito del Perú (BCP)**

   - 4 colas activas
   - Horario: Lun - Vie: 9:00 - 18:00

2. **RENIEC**

   - 3 colas activas
   - Horario: Lun - Vie: 8:00 - 17:00

3. **SUNAT**

   - 2 colas activas
   - Horario: Lun - Vie: 8:30 - 17:30

4. **Hospital Regional**
   - 5 colas activas
   - Horario: 24 horas

### Colas por Empresa

#### BCP (ID: "1")

- Operaciones en ventanilla (12 personas, 15 min)
- Atención al cliente (8 personas, 20 min)
- Apertura de cuentas (5 personas, 25 min)
- Préstamos y créditos (3 personas, 30 min)

#### RENIEC (ID: "2")

- Trámites de DNI (20 personas, 35 min)
- Pasaportes (15 personas, 25 min)
- Certificados (8 personas, 20 min)

#### SUNAT (ID: "3")

- Declaraciones (18 personas, 40 min)
- RUC y comprobantes (10 personas, 30 min)

#### Hospital (ID: "4")

- Consulta externa (25 personas, 45 min)
- Emergencias (5 personas, 60 min)
- Laboratorio (12 personas, 30 min)
- Farmacia (7 personas, 15 min)
- Admisión (15 personas, 20 min)

## Funcionalidades Mock

### Autenticación

- ✅ Login con email/contraseña
- ✅ Registro de nuevos usuarios
- ✅ Logout
- ✅ Verificación de estado de autenticación

### Empresas

- ✅ Listar todas las empresas
- ✅ Buscar empresas por texto
- ✅ Filtrar por categoría
- ✅ Obtener detalles de empresa

### Colas

- ✅ Listar colas por empresa
- ✅ Obtener detalles de cola
- ✅ Estados en tiempo real

### Tickets

- ✅ Crear ticket (unirse a cola)
- ✅ Pausar/reanudar ticket
- ✅ Cancelar ticket
- ✅ Obtener detalles de ticket
- ✅ Listar tickets del usuario

### Categorías

- ✅ Listar todas las categorías
- ✅ Iconos y colores personalizados

## Simulaciones

### Errores de Red

```javascript
// En mockData.js
export const shouldSimulateError = (errorRate = 0.1) => {
  return Math.random() < errorRate;
};
```

### Delays de Red

Todos los servicios mock incluyen delays simulados para replicar condiciones reales de red.

### Estados de Aplicación

- Tickets en diferentes estados (waiting, paused, completed, cancelled)
- Colas con diferentes niveles de ocupación
- Empresas activas/inactivas

## Estructura de Archivos

```
services/
├── mockData.js          # Datos centralizados
├── apiService.js        # Configuración mock/real
├── authService.js       # Auth con soporte mock
├── enterpriseService.js # Empresas con soporte mock
├── queueService.js      # Colas con soporte mock
├── ticketService.js     # Tickets con soporte mock
└── categoryService.js   # Categorías con soporte mock
```

## Desarrollo

### Agregar Nuevos Datos Mock

1. Edita `services/mockData.js`
2. Agrega nuevos objetos siguiendo la estructura existente
3. Actualiza los servicios correspondientes

### Simular Errores

```javascript
// En cualquier servicio
if (MOCK_CONFIG.USE_MOCK_DATA) {
  if (shouldSimulateError(0.2)) {
    // 20% probabilidad de error
    throw {
      response: {
        status: 500,
        data: { error: "Error simulado" },
      },
    };
  }
}
```

### Testing

El modo mock es ideal para:

- Desarrollo sin backend
- Testing de UI/UX
- Demos y presentaciones
- Testing de flujos completos
- Desarrollo offline

## Migración a API Real

1. Cambiar `USE_MOCK_DATA` a `false`
2. Configurar `API_BASE_URL` correcta
3. Verificar estructura de respuestas de API
4. Ajustar transformadores de datos si es necesario

## Troubleshooting

### La app no muestra datos

- Verificar que `USE_MOCK_DATA = true`
- Revisar console logs por errores
- Verificar que los datos mock existen

### Errores de autenticación

- Usar credenciales de prueba: juan.perez@email.com / 123456
- Verificar que el servicio de auth está en modo mock

### Performance lenta

- Reducir `MOCK_DELAY` en la configuración
- Verificar que no hay loops infinitos en los datos mock
