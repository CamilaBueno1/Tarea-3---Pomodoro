# Tareas – HU-002

Estado: Implementación automatizada completada; verificación manual pendiente
Spec: spec.md
Plan: plan.md
HU: ../../docs/historias/HU-002.md

- [x] **T1. Escribir pruebas de transiciones de fase y ciclo.** RF-1 a RF-6.
  Hecho cuando: Jest cubre fin de estudio con descanso corto/largo, conteo,
  descanso que prepara estudio y ciclo nuevo que toma el objetivo actualizado.
- [x] **T2. Implementar el dominio de sesión Pomodoro.** RF-1 a RF-6.
  Hecho cuando: transiciones puras reciben reloj/configuración y pasan las
  pruebas de T1 y Jest.
- [x] **T3. Escribir pruebas del hook de sesión compartida.** RF-1 a RF-6.
  Hecho cuando: se prueban inicio, pausa, reanudación, reinicio, fase siguiente
  preparada y finalización desde el reloj inyectado.
- [x] **T4. Implementar el hook y conectar controles.** RF-1 a RF-6.
  Hecho cuando: el temporizador consume ajustes reales, mantiene el ciclo y
  expone transiciones deterministas; pasan T3 y TypeScript.
- [x] **T5. Escribir pruebas de fase y progreso visibles.** RF-1 a RF-6.
  Hecho cuando: RNTL verifica fases, conteo y accesibilidad en la pantalla.
- [x] **T6. Mostrar fase y progreso en la pantalla principal.** RF-1 a RF-6.
  Hecho cuando: se ven fase, tiempo y pomodoros, los estados se entienden sin
  color, y pasan T5, Jest y TypeScript.
- [ ] **T7. Verificar secuencia completa en dispositivo.** RF-1 a RF-6.
  Hecho cuando: se observan ciclos corto/largo, descanso que prepara estudio,
  ajustes aplicados a fases/ciclos siguientes y controles en ambas
  orientaciones; registrar las limitaciones del dispositivo.
  Pendiente: prueba manual en dispositivo/emulador Android.
