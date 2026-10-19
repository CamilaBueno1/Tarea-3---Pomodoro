# Pomodoro Cotopaxi

Aplicación móvil de estudio basada en la técnica Pomodoro, diseñada para estudiantes de la Academia Cotopaxi. La app prioriza un flujo sencillo, funcionamiento offline, persistencia local y ausencia de anuncios.

## Descripción

Pomodoro Cotopaxi permite gestionar sesiones de estudio y descanso con un temporizador claro y configurable. La experiencia está pensada para usarse sin crear cuentas ni depender de acceso a internet.

La aplicación se centra en estas metas:

- Iniciar directamente en el temporizador sin registro.
- Mantener la funcionalidad con datos móviles o Wi‑Fi desactivados.
- Guardar ajustes localmente en el dispositivo.
- Evitar cualquier tipo de publicidad en la interfaz.
- Funcionar completamente en modo offline.

## Características principales

- Temporizador de estudio y descanso.
- Alternancia de fases de trabajo y pausa.
- Persistencia local con AsyncStorage.
- Ajustes del usuario guardados en el dispositivo.
- Notificaciones locales para avisos de cambio de fase.
- Sin inicio de sesión ni cuenta.
- Sin anuncios ni integración de terceros.

## Stack tecnológico

- Expo SDK 57
- React Native
- TypeScript
- Expo Router
- AsyncStorage
- Expo Notifications
- Jest + jest-expo

## Requisitos

- Node.js 18 o superior
- npm
- Expo CLI
- Android Studio / emulador Android o dispositivo físico para pruebas en Expo Go

## Instalación

1. Clona este repositorio.
2. Entra a la carpeta del proyecto.
3. Instala dependencias:

```bash
npm install
```

## Ejecución

Inicia la aplicación con:

```bash
npm start
```

También puedes ejecutarla en plataformas específicas:

```bash
npm run android
npm run ios
npm run web

## Reglas de negocio y calidad

El proyecto sigue la constitución del repositorio y las especificaciones de cada historia. La lógica del temporizador se mantiene en `src/domain/`, mientras que la persistencia y la capa visual se separan para mantener un flujo verificable y seguro.

Se prioriza:

- pruebas automatizadas de reglas de dominio;
- uso local y privado de datos;
- funcionamiento sin backend ni cuentas;
- validación de comportamiento antes de cerrar tareas.

