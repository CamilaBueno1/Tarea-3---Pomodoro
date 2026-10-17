# Tareas propuestas – Ajustes de Pomodoro

Estado: Aprobado
Spec: [spec.md](./spec.md)
Plan propuesto: [plan.md](./plan.md)
HU: [HU-005](../../docs/historias/HU-005.md)

Las tareas están aprobadas y se ejecutarán secuencialmente.

- [x] **T1. Escribir pruebas del modelo y validación de ajustes.** RF-1, RF-2,
  RF-3, RF-4.
  Hecho cuando: pruebas Jest cubren valores predeterminados, extremos válidos,
  valores inmediatamente fuera de rango, entradas vacías/no enteras y fallan
  antes de existir el modelo.
- [x] **T2. Implementar el modelo puro y la validación de ajustes.** RF-1,
  RF-2, RF-3, RF-4.
  Hecho cuando: las pruebas de T1 pasan para los cuatro campos, las reglas
  están aisladas de React Native y almacenamiento, y Jest pasa.
- [x] **T3. Declarar e instalar las dependencias Expo autorizadas.**
  RF-5, RF-10.
  Hecho cuando: `@react-native-async-storage/async-storage` queda disponible y
  el manifiesto/lockfile se actualizan. También se instala `expo-image`,
  autorizado para reparar imports del scaffold que bloqueaban el type-check.
- [x] **T4. Escribir pruebas del adaptador de almacenamiento.** RF-5, RF-10.
  Hecho cuando: pruebas Jest con almacenamiento simulado cubren lectura,
  escritura y fallos, y fallan antes de existir el adaptador.
- [x] **T5. Implementar el adaptador local de ajustes.** RF-5, RF-10.
  Hecho cuando: el adaptador persiste solo los cuatro valores configurados,
  propaga fallos para que puedan mostrarse y pasan las pruebas de T4.
  Depende de T2, T3 y T4.
- [x] **T6. Escribir pruebas del proveedor compartido de ajustes.** RF-4, RF-5,
  RF-6, RF-7, RF-10.
  Hecho cuando: Jest cubre carga inicial, publicación solo tras escritura
  exitosa, error de lectura/escritura y actualización del valor consumible;
  las pruebas fallan antes del proveedor. RF-7 requiere además la integración
  pendiente de HU-002.
- [x] **T7. Implementar el proveedor compartido y conectarlo al layout.**
  RF-4, RF-5, RF-6, RF-7, RF-10, RF-11.
  Hecho cuando: rutas de temporizador y ajustes consultan el mismo estado,
  valores predeterminados se muestran ante configuración inicial vacía, los
  fallos se exponen y las pruebas de T6 pasan. La prueba integral de objetivo
  de ciclo queda pendiente de HU-002.
  Depende de T2, T5 y T6.
- [x] **T8. Escribir pruebas de la pantalla y la segunda pestaña.** RF-1 a
  RF-5, RF-8, RF-9, RF-11.
  Hecho cuando: React Native Testing Library verifica campos, validaciones,
  confirmaciones, cancelaciones, accesibilidad y la pestaña «Ajustes», y
  detecta fallos antes de implementar la pantalla.
  Depende de T7.
- [x] **T9. Implementar la pantalla Ajustes y conectar la segunda pestaña.**
  RF-1 a RF-5, RF-8 a RF-11.
  Hecho cuando: la interfaz española permite guardar y restablecer con
  confirmación, rechaza y señala valores inválidos, el teclado no tapa acciones,
  y pasan las pruebas de T8 y `npx tsc --noEmit`.
  Depende de T8.
- [ ] **T10. Validar ajustes en Expo Go o emulador Android.** RF-1 a RF-11.
  Hecho cuando: se comprueban pestaña, orientación, áreas seguras, teclado,
  límites, mensajes, confirmación/cancelación, persistencia tras reiniciar,
  uso sin conexión y errores; con HU-001/HU-002 disponibles se comprueba
  también que la fase/ciclo en curso conserva el valor anterior y los
  siguientes usan el nuevo. Registrar el resultado antes de cerrar la tarea.
  Depende de T9 y de las integraciones HU-001/HU-002 aplicables.

## Dependencias y límites

- Dependencia principal: T1 → T2; T3 y T2 → T4; T2, T3 y T4 → T5; T5 y T2 →
  T6; T6 → T7; T7 → T8 → T9 → T10.
- La implementación de RF-7 depende de la lógica de ciclos de HU-002, aún
  ausente en el alcance revisado. No se inventa ni se reemplaza aquí el
  algoritmo de esa historia.
- La integración de la duración configurada con la pantalla del temporizador
  también depende de T7 de HU-001, que debe quedar condicionada a esta fuente
  real de HU-005.
- No se realizan ahora cambios de aplicación, manifiestos, lockfile ni
  `MEMORY.md`.
