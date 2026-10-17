# AGENTS.md – Academia Cotopaxi

App móvil para estudiantes de la Academia Cotopaxi: temporizador Pomodoro de estudio y descansos, notificaciones locales que funcionan con el celular bloqueado, ajustes personalizados, sin anuncios, sin registro y funcional 100% offline. Proyecto académico.

## Stack y estructura
- Expo SDK 57 (plantilla por defecto de create-expo-app), TypeScript y Expo Router.
- Persistencia local con `@react-native-async-storage/async-storage`. Sin backend ni cuentas.
- `src/domain/`: lógica pura del temporizador y cálculo de tiempo (`endsAt`) sin React ni AsyncStorage. `src/storage/`: persistencia. `app/`: pantallas. Pruebas junto a cada módulo, en `__tests__/`.

## Comandos
- Ejecutar: `npx expo start` (si la red bloquea: `npx expo start --tunnel`)
- Pruebas: `npx jest`
- Tipos: `npx tsc --noEmit`

## Convenciones
- Código y nombres en inglés; textos de interfaz y comentarios en español.
- Las reglas de negocio del temporizador se definen con la skill `grill-me` y se registran en la spec de cada historia (`specs/NNN-*/decisiones.md`), no se improvisan.
- Colores y contraste: skill `cotopaxi-brand`. Trampas de interfaz: `rn-conventions`.

## Forma de trabajar
- Lee `docs/constitution.md` y la spec activa (`specs/NNN-*/`) antes de tocar código.
- Si una historia deja vacíos, usa `grill-me` para entrevistar al estudiante antes de redactar las decisiones.
- Antes de escribir código muestra el plan. Una tarea por vez.
- Si tienes dudas, pregunta antes de asumir.

## Límites
- Siempre: pruebas primero en la lógica (`src/domain/`) y textos en español.
- Pregunta antes: instalar dependencias, crear archivos fuera del plan, cambiar el formato de los datos guardados.
- Nunca: agregar cuentas, backend, analítica, publicidad ni reemplazar archivos sin que la tarea lo pida.

## Memoria
- Al empezar lee `MEMORY.md`. Al terminar cada fase de SDD o cada tarea, actualiza solo "Estado actual" y "Próximos pasos" (con el siguiente comando `/sdd-*` a ejecutar).
- No copies decisiones ni contenido de las specs en `MEMORY.md`: remite al archivo (`specs/NNN-*/decisiones.md`). Sin detalles de implementación.
- Máximo ~50 líneas; si lo superas, resúmelo.

## Verificación
- Lógica: `npx jest` en verde. Interfaz: la prueba manual de la tarea en Expo Go / emulador Android.