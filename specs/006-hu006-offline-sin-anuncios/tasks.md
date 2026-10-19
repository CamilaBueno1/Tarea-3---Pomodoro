# Tareas - Spec 006: Uso sin registro, sin internet y sin publicidad

Trazabilidad: HU-006, escenario «Abrir la aplicación por primera vez» → RF-1;
«Usarla sin conexión» → RF-2 y RF-3; «Usarla sin publicidad» → RF-4. Las tareas
siguen el plan aprobado en `plan.md`. Las pruebas Jest verifican la lógica y la
integración local; la desconexión real, la primera apertura limpia y la
ausencia visible de anuncios requieren validación manual.

- [x] **T1. Comprobar el flujo de entrada y la pantalla del temporizador (20–30 min).** RF-1
  Hecho cuando: `src/app/__tests__/index.test.tsx` verifica que se presenta el temporizador sin controles o textos de registro/inicio de sesión; cualquier ajuste se limita a esa prueba existente y `npx jest src/app/__tests__/index.test.tsx` termina en verde.

- [x] **T2. Ejecutar regresión Jest del temporizador y su lógica local (20–30 min).** RF-2
  Hecho cuando: las pruebas existentes `src/domain/__tests__/pomodoro-session.test.ts` y `src/domain/__tests__/study-timer.test.ts` pasan; si falta una aserción directamente verificable según el plan, se amplían esas pruebas sin cambiar las reglas de HU-001–HU-003.

- [x] **T3. Ejecutar regresión Jest de los avisos locales (20–30 min).** RF-2
  Hecho cuando: `src/storage/__tests__/study-notifications.test.ts` pasa y cualquier aserción añadida se limita a las capacidades ya definidas por HU-004; no se presenta esta prueba como verificación de recepción real sin conexión.

- [x] **T4. Verificar por Jest validación y persistencia local de ajustes (20–30 min).** RF-2, RF-3
  Hecho cuando: `src/domain/__tests__/pomodoro-settings.test.ts` y `src/storage/__tests__/pomodoro-settings-storage.test.ts` pasan y comprueban los casos existentes de validación, lectura/escritura local y fallo de almacenamiento; cualquier ajuste se limita a esas pruebas y no cambia el formato guardado.

- [x] **T5. Verificar la presentación de ajustes y errores de operación (20–30 min).** RF-3
  Hecho cuando: `src/app/__tests__/settings.test.tsx` pasa y comprueba los estados y mensajes existentes de ajustes, incluido que un fallo de carga o guardado no se presenta como éxito; cualquier ajuste se limita a la prueba de pantalla existente.

- [x] **T6. Revisar manifiestos, navegación y dependencias contra anuncios, cuentas y red (20–30 min).** RF-1, RF-2, RF-3, RF-4
  Hecho cuando: se revisan `app.json`, `package.json`, la navegación Expo Router y las pantallas previstas en `plan.md`; queda registrado si existe alguna integración declarada de publicidad, autenticación o servicios de red, sin añadir dependencias, rutas ni permisos.
  Resultado: los manifiestos declaran Expo Router, notificaciones locales y dependencias de interfaz/almacenamiento; no declaran SDK de anuncios, autenticación ni servicios de red. El componente `ExternalLink` no tiene usos. La navegación y las rutas Temporizador/Ajustes se revisaron; no se añadieron dependencias, rutas ni permisos.

- [x] **T7. Validar manualmente la primera apertura limpia (20–30 min).** RF-1
  Hecho cuando: en una instalación limpia o tras restablecer los datos se comprueba que la primera apertura muestra el temporizador, sin pantalla de registro ni inicio de sesión.
  Depende de: T1, T6.
  Resultado: el usuario confirmó la primera apertura en APK físico Android; abrió directamente el temporizador, sin registro ni inicio de sesión.

- [x] **T8. Validar manualmente temporizador y ajustes sin conexión (20–30 min).** RF-2, RF-3
  Hecho cuando: con datos móviles y Wi-Fi desactivados se usan el temporizador y los ajustes, se guarda un cambio y, tras cerrar y reabrir la app aún desconectada, se confirma que el ajuste continúa disponible; cualquier fallo observado queda visible y la tarea permanece abierta.
  Depende de: T2, T4, T5.
  Resultado: el usuario confirmó que el temporizador y los ajustes funcionaron offline, y que un ajuste guardado permaneció disponible tras cerrar y reabrir la app sin conexión en APK físico Android.

- [x] **T9. Validar manualmente los avisos locales sin conexión (20–30 min).** RF-2
  Hecho cuando: con datos móviles y Wi-Fi desactivados se prueba el flujo de avisos conforme a HU-004 y se registra el resultado real y las condiciones del dispositivo, sin afirmar garantías adicionales de entrega, sonido o vibración.
  Depende de: T3.
  Resultado: el usuario confirmó alertas en pantalla y notificaciones con sonido/banner con datos y Wi-Fi desactivados, en primer plano, segundo plano y con pantalla bloqueada. Dispositivo/versión de Android no especificados; el resultado documenta el dispositivo probado, no una garantía general de plataforma.

- [x] **T10. Revisar ausencia visible de anuncios y ejecutar regresión completa (20–30 min).** RF-1, RF-2, RF-3, RF-4
  Hecho cuando: se recorren las pantallas y rutas accesibles y se confirma que no aparece publicidad; además, `npx jest` pasa. La revisión visual, no Jest, es la comprobación de ausencia de anuncios.
  Depende de: T1–T9.
  Resultado: el usuario confirmó que no observó anuncios ni rastreadores en el dispositivo físico. La revisión visual local previa de Temporizador y Ajustes tampoco mostró anuncios. `npx jest --runInBand` pasó (10 suites, 102 pruebas).

- [x] **T11. Evitar notificaciones duplicadas al finalizar una fase.** RF-2
  Hecho cuando: la programación cancela las notificaciones pendientes antes de agendar una nueva; los re-renders no duplican la programación de una sesión restaurada; al finalizar en primer plano se conserva el aviso del sistema sin emitir otro manual.
  Resultado: se añadieron pruebas de orden de cancelación y de re-render; `npx jest` pasó (10 suites, 102 pruebas) y `npx tsc --noEmit` pasó.
