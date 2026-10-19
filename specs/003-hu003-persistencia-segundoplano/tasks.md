# Tareas – HU-003

Estado: Implementación y validación completadas
Spec: spec.md
Plan: plan.md
HU: ../../docs/historias/HU-003.md

- [x] **T1. Escribir pruebas del estado temporal serializable.** RF-1 a RF-4,
  RF-9.
  Hecho cuando: Jest cubre `endsAt`, restante al volver, pausa y finalización
  vencida única.
- [x] **T2. Implementar reconciliación pura de sesiones.** RF-1 a RF-4, RF-9.
  Hecho cuando: transiciones deterministas pasan T1 sin React ni almacenamiento.
- [x] **T3. Escribir pruebas de almacenamiento de sesión.** RF-2, RF-4, RF-7.
  Hecho cuando: prueba datos ausentes, válidos, corruptos y fallos de lectura/
  escritura.
- [x] **T4. Implementar persistencia local validada de sesión.** RF-2, RF-4, RF-7.
  Hecho cuando: adaptador guarda/restaura sesión, rechaza formato inválido y
  propaga fallos.
- [x] **T5. Escribir pruebas de permisos y notificaciones.** RF-5, RF-6, RF-8.
  Hecho cuando: Jest cubre autorización, programación en `endsAt` y cancelación.
- [x] **T6. Implementar notificaciones locales mínimas.** RF-5, RF-6, RF-8.
  Hecho cuando: se programa un aviso por fase, se cancela al pausar/reiniciar y
  el permiso denegado produce un estado explícito.
- [x] **T7. Escribir pruebas del proveedor de sesión y restauración.** RF-1 a
  RF-7.
  Hecho cuando: RNTL/Jest cubre hidratación corriendo/pausada, expiración,
  escritura y errores visibles.
- [x] **T8. Implementar proveedor de sesión persistente.** RF-1 a RF-9.
  Hecho cuando: layout hidrata y persiste transiciones, se deriva restante de
  `endsAt`, notificaciones siguen el estado, pasan T7 y TypeScript.
- [x] **T9. Verificar HU-003 en Android.** RF-1 a RF-8.
  Hecho cuando: se cierra/abre la app, se compara restante, se valida pausa,
  permiso y aviso local y se registra el resultado y limitaciones.
  Resultado: el usuario confirma la validación manual en Android del cierre y
  reapertura, el restante, la pausa, el permiso y el aviso local. No se
  registraron modelo ni versión del dispositivo.
