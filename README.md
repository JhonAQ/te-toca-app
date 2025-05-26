# TeToca App

Una aplicación móvil para gestión de turnos que permite a los usuarios registrarse virtualmente en una fila de atención.

## Características

- Registro y autenticación de usuarios
- Selección de empresas disponibles
- Visualización de diferentes colas por empresa
- Solicitud de turnos virtuales
- Gestión del estado del ticket (pausar, cancelar)
- Notificaciones sobre el avance de la fila
- Interfaz limpia y sencilla

## Requisitos previos

- Node.js
- Expo CLI
- Un dispositivo móvil con Expo Go instalado o un emulador

## Instalación

1. Clona este repositorio:

```
git clone https://github.com/tu-usuario/tetoca-app.git
cd TeToca
```

2. Instala las dependencias:

```
npm install
```

3. Inicia la aplicación:

```
npx expo start
```

4. Escanea el código QR con la app Expo Go en tu dispositivo o presiona 'a' para abrir en un emulador Android o 'i' para iOS.

## Estructura del proyecto

- `/screens` - Pantallas principales de la aplicación
- `/components` - Componentes reutilizables
- `App.js` - Punto de entrada de la aplicación con la configuración de navegación

## Prototipos incluidos

1. **Pantalla de bienvenida**
2. **Pantalla de login**
3. **Pantalla de registro**
4. **Dashboard del usuario**
5. **Selección de empresas**
6. **Tipos de colas por empresa**
7. **Detalles de la cola**
8. **Visualización y gestión de tickets**
9. **Confirmación de turno**
10. **Simulación de notificaciones**

## Desarrollo

Este proyecto es un prototipo inicial con wireframes básicos. La funcionalidad real (backend, autenticación, notificaciones push) debe implementarse en fases futuras.

## Licencia

MIT
