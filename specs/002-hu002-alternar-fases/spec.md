# Spec 002 - Alternar entre estudio y descanso

Estado: Aprobada para implementación
HU de origen: docs/historias/HU-002.md
Decisiones: decisiones.md

## Contexto y objetivo

Avanzar la sesión Pomodoro entre estudio, descanso corto y descanso largo, y
mostrar a la persona estudiante la fase y el progreso del ciclo.

## Usuarios

- Estudiante.

## Requisitos funcionales

- **RF-1:** CUANDO termina una fase de estudio antes de alcanzar la cantidad de
  pomodoros definida para el ciclo, EL SISTEMA registra el pomodoro completado
  y deja preparado un descanso corto. Origen: HU-002, «Terminar un pomodoro»,
  decisiones D-001 y D-002.
- **RF-2:** CUANDO termina una fase de estudio que completa la cantidad de
  pomodoros definida para el ciclo, EL SISTEMA deja preparado un descanso largo
  y reinicia a cero el conteo del ciclo. Origen: HU-002, «Llegar al descanso
  largo», decisiones D-001 y D-002.
- **RF-3:** CUANDO termina una fase de descanso corto o largo, EL SISTEMA deja
  preparado el siguiente tiempo de estudio. Origen: HU-002, «Terminar un
  descanso», decisión D-001.
- **RF-4:** MIENTRAS existe una sesión Pomodoro, EL SISTEMA muestra si la fase
  actual es estudio, descanso corto o descanso largo, y cuántos pomodoros lleva
  el ciclo actual. Origen: HU-002, «Ver mi avance», decisión D-004.
- **RF-5:** CUANDO empieza una nueva fase, EL SISTEMA usa la duración configurada
  para ese tipo de fase, sin alterar la duración inicial de una fase ya
  iniciada. Origen: HU-005, escenario «Cambiar un tiempo con una fase en
  curso», decisión D-003.
- **RF-6:** CUANDO empieza un ciclo Pomodoro, EL SISTEMA conserva para ese ciclo
  el objetivo de pomodoros configurado al iniciarlo. Origen: HU-005,
  decisiones D-002 de esta spec y D-007 de HU-005.

## Requisitos no funcionales

- Las transiciones de fase y ciclo se definen como lógica pura en el dominio.
- Los textos visibles de fases y progreso se presentan en español.

## Casos límite

- La fase siguiente queda preparada; su cuenta no empieza sin que el
  estudiante la inicie.
- El último pomodoro de un ciclo produce descanso largo, no corto.
- El contador reiniciado es cero durante el descanso largo.
- Cambiar la configuración durante una fase o ciclo no altera su duración u
  objetivo ya capturados.

## Fuera de alcance

- Persistencia tras cerrar o durante segundo plano, cubierta por HU-003.
- Notificaciones y permisos adicionales a las notificaciones locales mínimas
  requeridas por HU-003; la alarma completa pertenece a HU-004.
- Cambiar y persistir la configuración, cubierta por HU-005.

## Criterios de finalización

- Pruebas deterministas verifican las transiciones al descanso corto, descanso
  largo y estudio, el reinicio de conteo y el progreso visible.
- La pantalla muestra la fase, el tiempo y el avance sin depender solo del
  color.

