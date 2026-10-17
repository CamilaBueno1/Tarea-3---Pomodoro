# Spec 001 - Temporizador Pomodoro

Estado: aprobada
HU de origen: docs/historias/HU-001.md

## Contexto y objetivo

Permitir que el estudiante inicie, pause, reanude y reinicie el temporizador
para concentrarse durante un tiempo definido, mostrando cuánto tiempo queda.

Esta especificación cubre HU-001. La alternancia entre estudio y descanso se
define en HU-002; el comportamiento con la aplicación en segundo plano o
cerrada, en HU-003; las notificaciones, en HU-004; y la configuración de
duraciones, en HU-005.

## Usuarios

- Estudiante.

## Historias de usuario

Como estudiante, quiero iniciar, pausar y reiniciar un temporizador de estudio,
para concentrarme durante un tiempo definido.

## Definiciones

- **Tiempo inicial de la fase:** la duración con la que comenzó la fase actual.
  Al confirmar el reinicio, el temporizador vuelve a ese tiempo y conserva el
  estado que tenía antes del reinicio: corriendo o pausado. Decisión D-001.

## Requisitos funcionales

- **RF-1:** CUANDO el estudiante inicia el temporizador desde la pantalla
  principal, EL SISTEMA comienza la cuenta regresiva con el tiempo de estudio
  configurado. Origen: HU-001, escenario «Iniciar el temporizador».
- **RF-2:** MIENTRAS el temporizador está activo, EL SISTEMA muestra el tiempo
  restante en minutos y segundos. Origen: HU-001, escenario «Iniciar el
  temporizador».
- **RF-3:** CUANDO el estudiante pausa el temporizador, EL SISTEMA detiene la
  cuenta regresiva y conserva el tiempo restante de la pausa. Origen: HU-001,
  escenario «Pausar y continuar».
- **RF-4:** CUANDO el estudiante reanuda un temporizador pausado, EL SISTEMA
  continúa la cuenta regresiva desde el tiempo restante conservado al pausarlo.
  Origen: HU-001, escenario «Pausar y continuar».
- **RF-5:** CUANDO el estudiante confirma el reinicio de un temporizador
  corriendo o pausado, EL SISTEMA devuelve el tiempo restante al tiempo inicial
  de la fase actual y conserva el estado que tenía antes del reinicio. Origen:
  HU-001, escenario «Reiniciar el temporizador» y decisión D-001.
- **RF-6:** CUANDO el estudiante cancela el reinicio de un temporizador
  corriendo o pausado, EL SISTEMA conserva el tiempo restante que llevaba.
  Origen: HU-001, escenario «Cambiar de opinión al reiniciar».

## Requisitos no funcionales

- No se derivan requisitos no funcionales adicionales de HU-001.

## Casos límite

- El reinicio confirmado aplica tanto a un temporizador corriendo como a uno
  pausado; conserva el estado previo en cada caso (RF-5).
- La cancelación del reinicio debe conservar el tiempo restante (RF-6).

## Fuera de alcance

- La preparación automática de la fase siguiente y el avance del ciclo
  Pomodoro, definidos por HU-002.
- Recuperar el temporizador después de cerrar la aplicación o mantener el
  conteo en segundo plano, definidos por HU-003.
- Los avisos al terminar una fase, definidos por HU-004.
- La edición y persistencia de duraciones, definidas por HU-005.

## Criterios de finalización

- RF-1 y RF-2 pueden verificarse iniciando el temporizador y comprobando que
  usa el tiempo de estudio configurado y muestra minutos y segundos restantes.
- RF-3 y RF-4 pueden verificarse comprobando que la pausa conserva el tiempo y
  que la reanudación parte de ese tiempo.
- RF-5 puede verificarse comprobando que el reinicio vuelve al tiempo inicial
  de la fase y conserva el estado previo, tanto si corría como si estaba
  pausado.
- RF-6 puede verificarse cancelando el reinicio en estado corriendo y pausado
  y comprobando que se conserva el tiempo restante.

## Dudas abiertas

- Ninguna para HU-001.
